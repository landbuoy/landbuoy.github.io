// Songbird names from 7 biomes around the world
const SONGBIRD_NAMES = [
    // Appalachian Mountains (Upstate New York)
    "Wood Thrush", "Black-throated Blue Warbler", "Scarlet Tanager", "Rose-breasted Grosbeak", 
    "Veery", "Hermit Thrush", "Black-capped Chickadee",
    
    // Amazon Rainforest (South America)
    "Musician Wren", "Screaming Piha", "White-bellied Antbird", "Amazonian Umbrellabird",
    "Spix's Guan", "Hoatzin", "Amazonian Royal Flycatcher",
    
    // Australian Outback (Australia)
    "Superb Lyrebird", "Australian Magpie", "Pied Butcherbird", "Grey Shrike-thrush",
    "Rufous Whistler", "Golden Whistler", "Eastern Whipbird",
    
    // African Savanna (East Africa)
    "African Grey Hornbill", "Lilac-breasted Roller", "Red-billed Oxpecker", "Superb Starling",
    "Fiscal Shrike", "Yellow-billed Hornbill", "Red-chested Cuckoo",
    
    // Siberian Taiga (Russia)
    "Siberian Rubythroat", "Bluethroat", "Pallas's Leaf Warbler", "Siberian Accentor",
    "Red-flanked Bluetail", "Siberian Jay", "Pine Grosbeak",
    
    // Mediterranean Scrub (Southern Europe)
    "Common Nightingale", "European Robin", "Blackcap", "Sardinian Warbler",
    "Subalpine Warbler", "Cirl Bunting", "Thekla Lark",
    
    // Himalayan Alpine (Nepal/India)
    "Himalayan Monal", "Blood Pheasant", "Himalayan Bulbul", "Rufous-breasted Accentor",
    "Himalayan Rubythroat", "White-browed Rosefinch", "Alpine Chough"
];

// PlayerRole enum equivalent
const PlayerRole = {
    LEADER: 'LEADER',      // Won bid or took lead, trying to make bid
    SUPPORTER: 'SUPPORTER', // Partner of leader, helping make bid
    SETTER: 'SETTER'       // Opponent trying to prevent bid
};

// Domino class
class Domino {
    constructor(a, b) {
        // By default, modular: higher is suit, lower is degree
        this.ends = [Math.max(a, b), Math.min(a, b)];
    }
    
    toString() {
        return `${this.ends[0]}-${this.ends[1]}`;
    }
    
    isDouble() {
        return this.ends[0] === this.ends[1];
    }
    
    isTrump(trump) {
        return this.ends.includes(trump);
    }
    
    getSuit(trump = null) {
        if (trump !== null && this.isTrump(trump)) {
            return trump;
        }
        return this.ends[0];
    }
    
    getDegree(trump = null) {
        if (trump !== null && this.isTrump(trump)) {
            return this.ends[0] === trump ? this.ends[1] : this.ends[0];
        }
        return this.ends[1];
    }
    
    canFollowSuit(suit, trump) {
        // Doubles: only match their own suit
        if (this.isDouble()) {
            return this.ends[0] === suit;
        }
        // Trumps: only match trump
        if (this.isTrump(trump)) {
            return suit === trump;
        }
        // Modular: can match either end, unless one end is trump (then it's a trump)
        return this.ends.includes(suit);
    }
    
    modulate(trump, suitToFollow = null) {
        // If this is a double, always (x, x)
        if (this.isDouble()) {
            return [this.ends[0], this.ends[1]];
        }
        // If this is a trump, ALWAYS show as (trump, other) - never modulate trumps
        if (this.isTrump(trump)) {
            if (this.ends[0] === trump) {
                return [this.ends[0], this.ends[1]];
            } else {
                return [this.ends[1], this.ends[0]];
            }
        }
        // If suitToFollow is set and this domino can follow suit, orient as (suitToFollow, other)
        // BUT only if it's not a trump
        if (suitToFollow !== null && this.ends.includes(suitToFollow) && !this.isTrump(trump)) {
            if (this.ends[0] === suitToFollow) {
                return [this.ends[0], this.ends[1]];
            } else {
                return [this.ends[1], this.ends[0]];
            }
        }
        // Otherwise, default orientation (higher, lower)
        return [this.ends[0], this.ends[1]];
    }
}

// TrickState class
class TrickState {
    constructor(leaderIdx, trump, handModes) {
        this.leaderIdx = leaderIdx;
        this.trump = trump;
        this.handModes = handModes;
        this.playedDominoes = [];
        this.currentSuit = null;
        this.pointsInTrick = 0;
    }
    
    addPlay(domino, playerIdx) {
        if (this.playedDominoes.length === 0) { // First domino played sets the suit
            this.currentSuit = domino.getSuit(this.trump);
        }
        this.playedDominoes.push([domino, playerIdx]);
        // Add points if count domino
        const [a, b] = domino.ends.slice().sort((x, y) => x - y);
        if ((a === 5 && b === 5) || (a === 4 && b === 6)) { // 10-count dominoes
            this.pointsInTrick += 10;
        } else if ((a === 0 && b === 5) || (a === 1 && b === 4) || (a === 2 && b === 3)) { // 5-count dominoes
            this.pointsInTrick += 5;
        }
    }
    
    getWinningPlay() {
        if (this.playedDominoes.length === 0) {
            return [null, null];
        }
        
        // 1. Check for trumps played
        const trumps = this.playedDominoes.filter(([domino, idx]) => domino.isTrump(this.trump));
        if (trumps.length > 0) {
            const trumpValue = (play) => {
                const [domino, _] = play;
                const val = domino.isDouble() && domino.isTrump(this.trump) ? [2, 7] : [1, domino.getDegree(this.trump)];
                return val;
            };
            const winner = trumps.reduce((max, current) => {
                const maxVal = trumpValue(max);
                const currentVal = trumpValue(current);
                return (currentVal[0] > maxVal[0] || (currentVal[0] === maxVal[0] && currentVal[1] > maxVal[1])) ? current : max;
            });
            return winner;
        }
        
        // 2. No trumps: highest of led suit wins
        const ledSuitDominoes = this.playedDominoes.filter(([domino, idx]) => 
            domino.canFollowSuit(this.currentSuit, this.trump)
        );
        
        if (ledSuitDominoes.length > 0) {
            // Calculate values for all led suit dominoes
            const dominoValues = ledSuitDominoes.map(([domino, idx]) => {
                let val;
                if (domino.isDouble()) {
                    val = [2, 7]; // Double always wins in led suit
                } else {
                    // Get the degree of the led suit (the other end of the domino)
                    const ledSuit = this.currentSuit;
                    const degree = domino.ends[0] === ledSuit ? domino.ends[1] : domino.ends[0];
                    val = [1, degree];
                }
                return [val, domino, idx];
            });
            
            // Find the winner
            const winner = dominoValues.reduce((max, current) => {
                const maxVal = max[0];
                const currentVal = current[0];
                return (currentVal[0] > maxVal[0] || (currentVal[0] === maxVal[0] && currentVal[1] > maxVal[1])) ? current : max;
            });
            
            return [winner[1], winner[2]];
        }
        
        // 3. Otherwise, first domino wins (should not happen in legal play)
        return this.playedDominoes[0];
    }
}

// Utility functions
function shuffleArray(array) {
    const shuffled = [...array];
    
    // Seed the random number generator with current time
    const seed = Date.now() + Math.random();
    let seedValue = seed;
    
    // Simple but effective seeded random number generator
    function seededRandom() {
        seedValue = (seedValue * 9301 + 49297) % 233280;
        return seedValue / 233280;
    }
    
    // Use seeded random for shuffling
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}

// Counter class equivalent (for suit counting)
class Counter {
    constructor() {
        this.counts = {};
    }
    
    get(key) {
        return this.counts[key] || 0;
    }
    
    set(key, value) {
        this.counts[key] = value;
    }
    
    increment(key) {
        this.counts[key] = (this.counts[key] || 0) + 1;
    }
    
    values() {
        return Object.values(this.counts);
    }
    
    keys() {
        return Object.keys(this.counts);
    }
    
    entries() {
        return Object.entries(this.counts);
    }
}

// DefaultDict class equivalent
class DefaultDict {
    constructor(defaultFactory) {
        this.defaultFactory = defaultFactory;
        this.data = {};
    }
    
    get(key) {
        if (!(key in this.data)) {
            this.data[key] = this.defaultFactory();
        }
        return this.data[key];
    }
    
    set(key, value) {
        this.data[key] = value;
    }
    
    has(key) {
        return key in this.data;
    }
    
    keys() {
        return Object.keys(this.data);
    }
    
    values() {
        return Object.values(this.data);
    }
    
    entries() {
        return Object.entries(this.data);
    }
}

// Player class
class Player {
    constructor(name, isHuman = false, game = null) {
        this.name = name;
        this.isHuman = isHuman;
        this.hand = [];
        this.role = null;
        this.tricksWon = [];
        this.game = game; // Reference to the game for helper methods
    }
    
    sortHand() {
        this.hand.sort((a, b) => {
            if (a.ends[0] !== b.ends[0]) {
                return a.ends[0] - b.ends[0];
            }
            return a.ends[1] - b.ends[1];
        });
    }
    
    isCountDomino(domino) {
        // Count dominoes: any domino that adds up to 5 or 10 (5-0, 1-4, 2-3, 4-6, 5-5)
        // This includes trumps that are count dominoes
        const countDominoes = new Set([
            [5, 5], [4, 6], [6, 4], [0, 5], [5, 0], [1, 4], [4, 1], [2, 3], [3, 2]
        ]);
        return countDominoes.has(JSON.stringify(domino.ends));
    }
    
    isCatchableDouble(domino) {
        // Doubles that can catch count: 4-4, 5-5, 6-6
        return domino.ends[0] === domino.ends[1] && [4, 5, 6].includes(domino.ends[0]);
    }
    
    getNonCountOffs(hand, trump) {
        const offs = [];
        for (const d of hand) {
            const [a, b] = d.ends;
            if (a !== trump && b !== trump) {
                if (!this.isCountDomino(d) && !this.isCatchableDouble(d)) {
                    offs.push(d);
                }
            }
        }
        return offs;
    }
    
    getOffsForTrump(trump) {
        // Get all offs (dominoes that are not doubles or trumps) for a given trump suit
        const offs = [];
        for (const d of this.hand) {
            // Skip doubles
            if (d.isDouble()) {
                continue;
            }
            // Skip trumps
            if (d.isTrump(trump)) {
                continue;
            }
            // Everything else is an off
            offs.push(d);
        }
        return offs;
    }
    
    getValidPlays(trickState) {
        if (trickState.currentSuit === null) { // Leading the trick
            return this.hand;
        }
        const valid = [];
        const ledSuit = trickState.currentSuit;
        const trump = trickState.trump;
        for (const d of this.hand) {
            if (d.canFollowSuit(ledSuit, trump)) {
                valid.push(d);
            }
        }
        if (valid.length > 0) {
            return valid;
        }
        return this.hand;
    }
    
    evaluateBidConfidence() {
        const suitCount = new Counter();
        const doubles = [];
        const dominoBySuit = new DefaultDict(() => []);
        const hand = this.hand.map(d => d.ends);
        
        for (const [a, b] of hand) {
            suitCount.increment(a);
            suitCount.increment(b);
            if (a === b) {
                doubles.push([a, b]);
            }
            dominoBySuit.get(a).push([a, b]);
            if (a !== b) {
                dominoBySuit.get(b).push([a, b]);
            }
        }
        const handSet = new Set(hand.map(h => JSON.stringify(h)));
        
        // --- Enhanced suit scoring logic with modality consideration ---
        const suitScores = {};
        for (let suit = 0; suit < 7; suit++) {
            // Never pick 5's as trump unless 5-5 is in hand
            if (suit === 5 && !handSet.has(JSON.stringify([5, 5]))) {
                suitScores[suit] = 0;
                continue;
            }
            
            // Calculate unimodal vs modal dominoes for this suit
            const unimodalDominoes = []; // Doubles and trumps (always unimodal)
            const modalDominoes = [];    // Offs that can be played as trumps
            
            for (const domino of this.hand) {
                if (domino.isDouble() && domino.ends[0] === suit) {
                    // Trump double is unimodal
                    unimodalDominoes.push(domino);
                } else if (domino.isTrump(suit)) {
                    // Trump dominoes are unimodal
                    unimodalDominoes.push(domino);
                } else if (domino.ends.includes(suit)) {
                    // Off dominoes that can be played as trumps are modal
                    modalDominoes.push(domino);
                }
            }
            
            // Count dominoes by type
            const trumpDoubles = unimodalDominoes.filter(d => d.isDouble());
            const trumpNonDoubles = unimodalDominoes.filter(d => !d.isDouble());
            const modalCount = modalDominoes.length;
            
            // Base score: number of unimodal dominoes (actual trumps)
            let score = unimodalDominoes.length;
            
            // Bonus for trump double
            if (trumpDoubles.length > 0) {
                score += 3;
            }
            
            // Bonus for high trump dominoes
            if (trumpNonDoubles.length > 0) {
                const highestTrump = Math.max(...trumpNonDoubles.map(d => d.getDegree(suit)));
                score += highestTrump * 0.5; // Higher trump degree = better
            }
            
            // Bonus for modal dominoes (can be played as trumps when needed)
            score += modalCount * 0.3;
            
            // Check for three highest dominoes in suit (excluding double)
            const nonDoubleDominoes = hand.filter(d => d.includes(suit) && !(d[0] === suit && d[1] === suit));
            if (nonDoubleDominoes.length > 0) {
                const allPossible = [];
                for (let x = 0; x < 7; x++) {
                    if (x !== suit) {
                        allPossible.push(suit < x ? [suit, x] : [x, suit]);
                    }
                }
                allPossible.sort((a, b) => Math.max(b[0], b[1]) - Math.max(a[0], a[1]));
                const threeHighestPossible = allPossible.slice(0, 3);
                const hasThreeHighest = threeHighestPossible.every(d => 
                    nonDoubleDominoes.some(nd => 
                        (nd[0] === d[0] && nd[1] === d[1]) || (nd[0] === d[1] && nd[1] === d[0])
                    )
                );
                if (hasThreeHighest) {
                    score += 2;
                }
            }
            
            // Count other doubles (not the trump double)
            const otherDoubles = doubles.filter(d => d[0] !== suit);
            score += otherDoubles.length * 0.5;
            
            // Penalize 5-offs if 5-5 not in hand
            const fiveOffs = hand.filter(d => d.includes(5) && !d.includes(suit) && !handSet.has(JSON.stringify([5, 5])));
            score -= fiveOffs.length * 0.5;
            
            suitScores[suit] = score;
        }
        
        // Pick best suit
        const maxScore = Math.max(...Object.values(suitScores));
        const bestSuits = Object.keys(suitScores).filter(s => suitScores[s] === maxScore);
        const trump = bestSuits.length > 0 ? Math.min(...bestSuits.map(s => parseInt(s))) : null;
        
        // Find strongest domino in trump
        let strongest = null;
        if (trump !== null) {
            const trumpDominoes = this.hand.filter(d => d.isTrump(trump));
            if (trumpDominoes.length > 0) {
                // Find the strongest trump (double first, then highest degree)
                const trumpDoubles = trumpDominoes.filter(d => d.isDouble());
                if (trumpDoubles.length > 0) {
                    strongest = trumpDoubles[0];
                } else {
                    strongest = trumpDominoes.reduce((max, d) => 
                        d.getDegree(trump) > max.getDegree(trump) ? d : max
                    );
                }
            }
        }
        
        // Calculate confidence based on actual trump strength
        let confidence = 0;
        if (trump !== null) {
            // Count actual trumps (unimodal dominoes)
            const actualTrumps = this.hand.filter(d => d.isTrump(trump));
            const trumpCount = actualTrumps.length;
            
            // Count doubles
            const doubleCount = doubles.length;
            
            // Count offs (dominoes that are not trumps or doubles)
            const offs = this.hand.filter(d => !d.isTrump(trump) && !d.isDouble()).length;
            
            // Check if we have the trump double
            const hasTrumpDouble = this.hand.some(d => d.isDouble() && d.isTrump(trump));
            
            // Check for three highest dominoes in trump suit (excluding double)
            const nonDoubleTrumps = actualTrumps.filter(d => !d.isDouble());
            let hasThreeHighest = false;
            if (nonDoubleTrumps.length > 0) {
                const allPossibleTrumps = [];
                for (let x = 0; x < 7; x++) {
                    if (x !== trump) {
                        allPossibleTrumps.push(trump < x ? [trump, x] : [x, trump]);
                    }
                }
                allPossibleTrumps.sort((a, b) => Math.max(b[0], b[1]) - Math.max(a[0], a[1]));
                const threeHighestPossible = allPossibleTrumps.slice(0, 3);
                hasThreeHighest = threeHighestPossible.every(d => 
                    nonDoubleTrumps.some(nd => 
                        (nd.ends[0] === d[0] && nd.ends[1] === d[1]) || (nd.ends[0] === d[1] && nd.ends[1] === d[0])
                    )
                );
            }
            
            // Count count offs - dominoes with 4, 5, or 6 that could be captured by doubles
            // These are dominoes that contain 4, 5, or 6 but are not trumps and not doubles
            let countOffs = 0;
            for (const d of this.hand) {
                if (!d.isTrump(trump) && !d.isDouble()) {
                    // Check if this domino contains 4, 5, or 6 (could be captured by 5-5 or 4-6)
                    if (d.ends.includes(4) || d.ends.includes(5) || d.ends.includes(6)) {
                        countOffs++;
                    }
                }
            }
            
            // Calculate confidence based on strict requirements
            if (hasTrumpDouble) {
                // With trump double, use original logic but more conservative
                if (trumpCount <= 2) {
                    confidence = 0;
                } else if (trumpCount === 3 && doubleCount >= 1) {
                    confidence = 1;
                } else if (trumpCount >= 4 && doubleCount >= 1 && offs <= 2) {
                    confidence = 2;
                } else if (trumpCount >= 4 && doubleCount >= 2 && offs <= 1) {
                    confidence = 3;
                } else if (trumpCount >= 5 && doubleCount >= 2 && offs <= 1) {
                    confidence = 4;
                } else if (trumpCount >= 5 && doubleCount >= 3 && offs === 0) {
                    confidence = 5;
                } else if (trumpCount === 6 || (doubleCount >= 3 && trumpCount >= 5 && offs === 0)) {
                    confidence = 6;
                }
            } else {
                // Without trump double - much stricter requirements
                if (!hasThreeHighest) {
                    confidence = 0; // Must have three highest dominoes
                } else if (countOffs > 0) {
                    confidence = 0; // Must have no count offs
                } else if (doubleCount < 1) {
                    confidence = 0; // Must have at least one other double
                } else if (trumpCount < 4) {
                    confidence = 0; // Must have at least 4 trumps
                } else if (trumpCount >= 4 && doubleCount >= 1 && hasThreeHighest && countOffs === 0) {
                    confidence = 1; // Minimum viable hand without trump double
                } else if (trumpCount >= 5 && doubleCount >= 2 && hasThreeHighest && countOffs === 0) {
                    confidence = 2; // Strong hand without trump double
                } else if (trumpCount >= 6 && doubleCount >= 2 && hasThreeHighest && countOffs === 0) {
                    confidence = 3; // Very strong hand without trump double
                } else {
                    confidence = 0;
                }
            }
        }
        
        const maxBid = confidence < 6 ? 30 + confidence : 42;
        return {
            trump: trump,
            strongestDomino: strongest,
            confidence: confidence,
            maxBid: maxBid
        };
    }
    
    bid() {
        if (this.isHuman) {
            // Placeholder for human bidding logic
            return [30, null, 0]; // bid, trump, confidence
        } else {
            const evalResult = this.evaluateBidConfidence();
            return [evalResult.maxBid, evalResult.trump, evalResult.confidence];
        }
    }
    
    canWinTrick(trickState, domino) {
        // Check if a domino can win the current trick
        if (trickState.playedDominoes.length === 0) {
            return true; // Leading, so any domino can win
        }
        
        // Create temporary trick state to test this domino
        const tempTrick = new TrickState(trickState.leaderIdx, trickState.trump, trickState.handModes);
        for (const [d, idx] of trickState.playedDominoes) {
            tempTrick.addPlay(d, idx);
        }
        tempTrick.addPlay(domino, -1); // Add our domino
        
        const [winningDomino, winningIdx] = tempTrick.getWinningPlay();
        return winningIdx === -1; // Our domino wins
    }
    
    getHighestTrump(trump) {
        // Get the highest trump domino in hand
        const trumpDominoes = this.hand.filter(d => d.isTrump(trump));
        if (trumpDominoes.length === 0) {
            return null;
        }
        
        // Trump double is highest
        const trumpDoubles = trumpDominoes.filter(d => d.isDouble());
        if (trumpDoubles.length > 0) {
            return trumpDoubles[0];
        }
        
        // Otherwise highest degree
        return trumpDominoes.reduce((max, d) => 
            d.getDegree(trump) > max.getDegree(trump) ? d : max
        );
    }
    
    getTrumpDouble(trump) {
        // Get the trump double if in hand
        for (const d of this.hand) {
            if (d.isDouble() && d.isTrump(trump)) {
                return d;
            }
        }
        return null;
    }
    
    isFirstTrumpTrick(trickState) {
        // Check if this is the first trick where trumps are led
        if (trickState.currentSuit === null) {
            return false; // No suit led yet
        }
        
        // Check if this is the first time trumps are being led
        for (const [d, _] of trickState.playedDominoes) {
            if (d.isTrump(trickState.trump)) {
                return false; // Trump already played
            }
        }
        return trickState.currentSuit === trickState.trump;
    }
    
    chooseDomino(trickState) {
        // Main method that delegates to role-specific choose_domino methods
        if (this.role === PlayerRole.LEADER) {
            return this.chooseDominoLeader(trickState);
        } else if (this.role === PlayerRole.SUPPORTER) {
            return this.chooseDominoSupporter(trickState);
        } else if (this.role === PlayerRole.SETTER) {
            return this.chooseDominoSetter(trickState);
        } else {
            // Fallback to original logic
            return this.chooseDominoFallback(trickState);
        }
    }
    
    chooseDominoLeader(trickState) {
        // LEADER logic for choosing domino to play
        const validPlays = this.getValidPlays(trickState);
        if (validPlays.length === 0) {
            return null;
        }
        
        // If leading the trick, use strategic evaluation
        if (trickState.playedDominoes.length === 0) {
            return this.getStrongestDominoLeader(trickState);
        }
        
        // Following suit - check if trumps are only on our team
        const trumpsOnlyOnTeam = this.areTrumpsOnlyOnTeam(trickState);
        
        if (trumpsOnlyOnTeam && trickState.currentSuit === trickState.trump) {
            // If trumps are only on our team and we're following trump suit,
            // try to win with the lowest trump possible to preserve higher trumps
            const trumpPlays = validPlays.filter(d => d.isTrump(trickState.trump));
            if (trumpPlays.length > 0) {
                // Find the lowest trump that can still win
                const winningTrumps = trumpPlays.filter(d => this.canWinTrick(trickState, d));
                if (winningTrumps.length > 0) {
                    return winningTrumps.reduce((min, d) => 
                        this.evaluateDominoStrength(d, trickState.trump) < this.evaluateDominoStrength(min, trickState.trump) ? d : min
                    );
                }
                // If no trump can win, play lowest trump
                return trumpPlays.reduce((min, d) => 
                    this.evaluateDominoStrength(d, trickState.trump) < this.evaluateDominoStrength(min, trickState.trump) ? d : min
                );
            }
        }
        
        // Normal logic - try to win with highest valid play, but avoid trump if higher trumps are out there
        const trumpPlays = validPlays.filter(d => d.isTrump(trickState.trump));
        if (trumpPlays.length > 0) {
            // Find the highest trump we can play
            const highestTrump = trumpPlays.reduce((max, d) => 
                d.getDegree(trickState.trump) > max.getDegree(trickState.trump) ? d : max
            );
            const highestDegree = highestTrump.getDegree(trickState.trump);
            
            // Check if higher trumps are still out there
            if (this.isHigherTrumpOutThere(trickState.trump, highestDegree)) {
                // Higher trumps are out there - avoid using trump if possible
                const nonTrumpPlays = validPlays.filter(d => !d.isTrump(trickState.trump));
                if (nonTrumpPlays.length > 0) {
                    // Use non-trump play instead
                    return nonTrumpPlays.reduce((max, d) => 
                        this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                    );
                }
            }
            // No higher trumps out there or no non-trump options - use trump
            return highestTrump;
        }
        
        // No trump plays available - use highest non-trump
        return validPlays.reduce((max, d) => 
            this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
        );
    }
    
    chooseDominoSupporter(trickState) {
        // SUPPORTER logic for choosing domino to play
        const validPlays = this.getValidPlays(trickState);
        if (validPlays.length === 0) {
            return null;
        }
        
        // If leading the trick (shouldn't happen often for supporter)
        if (trickState.playedDominoes.length === 0) {
            return this.getStrongestDominoSupporter(trickState);
        }
        
        // Check if any SETTER has beaten the LEADER
        if (this.hasSetterBeatenLeader(trickState)) {
            // SETTER has beaten LEADER - try to take the trick back
            const winningPlays = validPlays.filter(d => this.canWinTrick(trickState, d));
            if (winningPlays.length > 0) {
                // Prefer non-count dominoes when trying to take the trick back
                const nonCountWinners = this.getNonCountDominoes(winningPlays);
                if (nonCountWinners.length > 0) {
                    return nonCountWinners.reduce((max, d) => 
                        this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                    );
                }
                // Forced to use count domino to take the trick back
                return winningPlays.reduce((max, d) => 
                    this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                );
            } else {
                // Cannot take the trick back - withhold count dominoes and preserve doubles
                const nonCountNonDoublePlays = this.getNonCountDominoes(this.getNonDoubles(validPlays));
                if (nonCountNonDoublePlays.length > 0) {
                    return nonCountNonDoublePlays.reduce((min, d) => 
                        this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                    );
                }
                
                // Next, try non-count doubles (preserve ALL doubles when possible)
                const nonCountDoubles = this.getNonCountDominoes(this.getDoubles(validPlays));
                if (nonCountDoubles.length > 0) {
                    // Only throw very low doubles when absolutely necessary
                    const veryLowDoubles = nonCountDoubles.filter(d => d.ends[0] <= 1); // Only 0-0, 1-1
                    if (veryLowDoubles.length > 0) {
                        return veryLowDoubles.reduce((min, d) => 
                            d.ends[0] < min.ends[0] ? d : min
                        );
                    }
                    // If no very low doubles, try to avoid throwing doubles entirely
                    // Look for any other plays first
                    const otherPlays = validPlays.filter(d => !d.isDouble());
                    if (otherPlays.length > 0) {
                        return otherPlays.reduce((min, d) => 
                            this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                        );
                    }
                    // Forced to throw a double - prefer lowest
                    return nonCountDoubles.reduce((min, d) => 
                        d.ends[0] < min.ends[0] ? d : min
                    );
                }
                
                // Only count dominoes available - prefer non-double count over count doubles
                const countNonDoublePlays = this.getCountDominoes(this.getNonDoubles(validPlays));
                if (countNonDoublePlays.length > 0) {
                    return countNonDoublePlays.reduce((min, d) => 
                        this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                    );
                }
                
                // Last resort - count doubles
                const countDoubles = this.getCountDominoes(this.getDoubles(validPlays));
                if (countDoubles.length > 0) {
                    return countDoubles.reduce((min, d) => 
                        this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                    );
                }
                
                // Fallback - any domino
                return validPlays.reduce((min, d) => 
                    this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                );
            }
        }
        
        // No SETTER has beaten LEADER - check if partner (LEADER) is winning
        const partnerIdx = (trickState.leaderIdx + 2) % 4;
        const partnerPlay = trickState.playedDominoes.find(([d, idx]) => idx === partnerIdx);
        
        if (partnerPlay) {
            // Rebuild trick state to check if partner is winning
            const tempTrick = new TrickState(trickState.leaderIdx, trickState.trump, trickState.handModes);
            for (const [d, idx] of trickState.playedDominoes) {
                tempTrick.addPlay(d, idx);
            }
            const [currentWinner, winnerIdx] = tempTrick.getWinningPlay();
            
            if (winnerIdx === partnerIdx) {
                // Partner (LEADER) is winning - optimize for count dominoes
                return this.chooseSupporterLeaderWinning(trickState, validPlays);
            } else {
                // Partner not winning but no SETTER has beaten them - prioritize count dominoes
                if (!this.mustFollowSuit(trickState)) {
                    // Playing off suit - prioritize count dominoes when LEADER hasn't been beaten
                    const offPlays = this.getOffSuitPlays(validPlays, trickState.trump);
                    if (offPlays.length > 0) {
                        // First priority: count dominoes (be more liberal about throwing count)
                        const countPlays = this.getCountDominoes(offPlays);
                        if (countPlays.length > 0) {
                            // Prefer 10-counts over 5-counts to maximize points
                            const tenCountPlays = countPlays.filter(d => 
                                (d.ends[0] === 5 && d.ends[1] === 5) || 
                                (d.ends[0] === 4 && d.ends[1] === 6) || 
                                (d.ends[0] === 6 && d.ends[1] === 4)
                            );
                            if (tenCountPlays.length > 0) {
                                return tenCountPlays.reduce((max, d) => 
                                    this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                                );
                            }
                            return countPlays.reduce((max, d) => 
                                this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                            );
                        }
                        
                        // Second priority: non-count, non-double offs (preserve doubles)
                        const nonCountNonDoubleOffs = this.getNonCountDominoes(this.getNonDoubles(offPlays));
                        if (nonCountNonDoubleOffs.length > 0) {
                            return nonCountNonDoubleOffs.reduce((min, d) => 
                                this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                            );
                        }
                        
                                        // Third priority: non-count doubles (preserve ALL doubles when possible)
                const nonCountDoubles = this.getNonCountDominoes(this.getDoubles(offPlays));
                if (nonCountDoubles.length > 0) {
                    // Only throw low doubles when absolutely necessary
                    const lowDoubles = nonCountDoubles.filter(d => d.ends[0] <= 2); // Only 0-0, 1-1, 2-2
                    if (lowDoubles.length > 0) {
                        return lowDoubles.reduce((min, d) => 
                            d.ends[0] < min.ends[0] ? d : min
                        );
                    }
                    // If no low doubles, try to avoid throwing doubles entirely
                    // Look for any other off plays first
                    const otherOffPlays = offPlays.filter(d => !d.isDouble());
                    if (otherOffPlays.length > 0) {
                        return otherOffPlays.reduce((min, d) => 
                            this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                        );
                    }
                    // Forced to throw a double - prefer lowest
                    return nonCountDoubles.reduce((min, d) => 
                        d.ends[0] < min.ends[0] ? d : min
                    );
                }
                        
                        // Fallback - any off
                        return offPlays.reduce((min, d) => 
                            this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                        );
                    }
                    // No offs available - must play trump
                    return validPlays.reduce((min, d) => 
                        this.evaluateDominoStrength(d, trickState.trump) < this.evaluateDominoStrength(min, trickState.trump) ? d : min
                    );
                } else {
                    // Must follow suit - try to take the trick
                    return this.chooseSupporterTakeTrick(trickState, validPlays);
                }
            }
        }
        
        // No partner play yet - follow suit optimally
        return this.chooseSupporterFollowSuit(trickState, validPlays);
    }
    
    chooseDominoSetter(trickState) {
        // SETTER logic for choosing domino to play
        const validPlays = this.getValidPlays(trickState);
        if (validPlays.length === 0) {
            return null;
        }
        
        // If leading the trick (shouldn't happen often for setter)
        if (trickState.playedDominoes.length === 0) {
            return this.getStrongestDominoSetter(trickState);
        }
        
        // Check if the other SETTER has already beaten the LEADER
        if (this.hasOtherSetterBeatenLeader(trickState)) {
            // Check if SUPPORTER has beaten the other SETTER back
            if (this.hasSupporterBeatenOtherSetter(trickState)) {
                // SUPPORTER has beaten the other SETTER - try to win the trick back
                const winningPlays = validPlays.filter(d => this.canWinTrick(trickState, d));
                if (winningPlays.length > 0) {
                    // Try to win while preserving count dominoes if possible
                    return this.chooseSetterWinningPlay(trickState, winningPlays);
                }
                // Cannot win - throw least valuable domino
                return this.chooseSetterOffSuit(trickState, validPlays);
            } else {
                // Other SETTER is still winning - reinforce the victory with count if possible
                const countPlays = this.getCountDominoes(validPlays);
                if (countPlays.length > 0) {
                    // Prefer 10-counts over 5-counts to maximize points
                    const tenCountPlays = countPlays.filter(d => 
                        (d.ends[0] === 5 && d.ends[1] === 5) || 
                        (d.ends[0] === 4 && d.ends[1] === 6) || 
                        (d.ends[0] === 6 && d.ends[1] === 4)
                    );
                    if (tenCountPlays.length > 0) {
                        return tenCountPlays.reduce((max, d) => 
                            this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                        );
                    }
                    return countPlays.reduce((max, d) => 
                        this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                    );
                }
                // No count dominoes available - play highest valid domino
                return validPlays.reduce((max, d) => 
                    this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                );
            }
        }
        
        // Other SETTER hasn't beaten LEADER yet or hasn't played - use normal logic
        // Check if we can win the trick
        const winningPlays = validPlays.filter(d => this.canWinTrick(trickState, d));
        if (winningPlays.length > 0) {
            // Try to win while preserving count dominoes if possible
            return this.chooseSetterWinningPlay(trickState, winningPlays);
        }
        
        // Cannot win - throw least valuable domino
        return this.chooseSetterOffSuit(trickState, validPlays);
    }
    
    chooseDominoFallback(trickState) {
        // Fallback logic for when role is not set
        const validPlays = this.getValidPlays(trickState);
        if (validPlays.length === 0) {
            return null;
        }
        
        // Simple logic - try to win if possible, otherwise play highest
        const winningPlays = validPlays.filter(d => this.canWinTrick(trickState, d));
        if (winningPlays.length > 0) {
            return winningPlays.reduce((max, d) => 
                this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
            );
        }
        
        return validPlays.reduce((max, d) => 
            this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
        );
    }
    
    evaluateDominoStrength(domino, trump) {
        // Evaluate how strong a domino is for leading purposes (lower risk = higher strength)
        if (domino.isDouble()) {
            // Doubles are very strong - only trump doubles can beat them
            if (domino.isTrump(trump)) {
                return 100; // Trump double is strongest
            } else {
                return 90;  // Non-trump double is very strong
            }
        } else if (domino.isTrump(trump)) {
            // Trump dominoes - higher degree = stronger
            const degree = domino.getDegree(trump);
            return 80 + degree; // Trump 6 = 86, Trump 5 = 85, etc.
        } else {
            // Off dominoes - these are risky to lead
            // Higher dominoes are slightly less risky but still dangerous
            const maxEnd = Math.max(...domino.ends);
            return maxEnd; // 6-5 = 6, 4-3 = 4, etc.
        }
    }
    
    // Helper method to evaluate domino value for throwing off suit
    evaluateDominoValueForThrowing(domino, trump) {
        // Higher value = more valuable to keep, lower value = better to throw
        if (domino.isDouble()) {
            // Doubles are very valuable - higher doubles are more valuable
            return 100 + domino.ends[0]; // 6-6 = 106, 5-5 = 105, etc.
        } else if (domino.isTrump(trump)) {
            // Trump dominoes are valuable - higher degree = more valuable
            const degree = domino.getDegree(trump);
            return 80 + degree; // Trump 6 = 86, Trump 5 = 85, etc.
        } else if (this.isCountDomino(domino)) {
            // Count dominoes are valuable - 10-counts more than 5-counts
            const [a, b] = domino.ends.slice().sort((x, y) => x - y);
            if ((a === 5 && b === 5) || (a === 4 && b === 6)) {
                return 70; // 10-count dominoes
            } else {
                return 60; // 5-count dominoes
            }
        } else {
            // Regular off dominoes - higher values are slightly more valuable
            const maxEnd = Math.max(...domino.ends);
            return maxEnd; // 6-5 = 6, 4-3 = 4, etc.
        }
    }
    
    // Helper method to check if playing off suit
    isPlayingOffSuit(trickState) {
        if (trickState.currentSuit === null) {
            return false; // Leading the trick
        }
        // Check if we have any dominoes that can follow the led suit
        const canFollowSuit = this.hand.some(d => d.canFollowSuit(trickState.currentSuit, trickState.trump));
        return !canFollowSuit;
    }
    
    // Helper method to get off suit plays
    getOffSuitPlays(validPlays, trump) {
        return validPlays.filter(d => !d.isTrump(trump));
    }
    
    // Helper method to get count dominoes from a list
    getCountDominoes(dominoes) {
        return dominoes.filter(d => this.isCountDomino(d));
    }
    
    // Helper method to get non-count dominoes from a list
    getNonCountDominoes(dominoes) {
        return dominoes.filter(d => !this.isCountDomino(d));
    }
    
    // Helper method to get doubles from a list
    getDoubles(dominoes) {
        return dominoes.filter(d => d.isDouble());
    }
    
    // Helper method to get non-doubles from a list
    getNonDoubles(dominoes) {
        return dominoes.filter(d => !d.isDouble());
    }
    
    // Helper method to check if a higher trump is still out there
    isHigherTrumpOutThere(trump, degree) {
        // Check if any domino with higher trump degree has been played
        const higherTrumpDominoes = [
            [trump, 6], [trump, 5], [trump, 4], [trump, 3], [trump, 2], [trump, 1], [trump, 0]
        ];
        
        for (const [a, b] of higherTrumpDominoes) {
            const dominoKey = JSON.stringify([a, b]);
            if (!this.game.playedDominoesThisHand.has(dominoKey)) {
                // This higher trump is still out there
                return true;
            }
        }
        return false;
    }
    
    // Helper method to check if trump double is still out there
    isTrumpDoubleOutThere(trump) {
        const trumpDoubleKey = JSON.stringify([trump, trump]);
        return !this.game.playedDominoesThisHand.has(trumpDoubleKey);
    }
    
    // Helper method to evaluate domino for leading (doubles are very strong for leading)
    evaluateDominoForLeading(domino, trump) {
        if (domino.isDouble()) {
            // Doubles are excellent for leading - only trump doubles can beat them
            if (domino.isTrump(trump)) {
                return 200; // Trump double is best for leading
            } else {
                return 150 + domino.ends[0]; // Higher doubles are better for leading
            }
        } else if (domino.isTrump(trump)) {
            // Trump dominoes - higher degree = better for leading
            const degree = domino.getDegree(trump);
            return 100 + degree; // Trump 6 = 106, Trump 5 = 105, etc.
        } else {
            // Off dominoes - these are risky to lead
            const maxEnd = Math.max(...domino.ends);
            return maxEnd; // 6-5 = 6, 4-3 = 4, etc.
        }
    }
    
    // Helper method to count remaining dominoes in hand by type
    countRemainingDominoes() {
        const counts = {
            doubles: this.getDoubles(this.hand).length,
            trumps: this.hand.filter(d => d.isTrump(this.game.trump)).length,
            countDominoes: this.getCountDominoes(this.hand).length,
            total: this.hand.length
        };
        return counts;
    }
    
    // Placeholder methods that will be implemented later
    getStrongestDominoLeader(trickState) {
        // LEADER should prioritize doubles for leading and avoid throwing trumps when higher trumps are out there
        
        // First priority: doubles (excellent for leading)
        const doubles = this.getDoubles(this.hand);
        if (doubles.length > 0) {
            // Prefer trump double first, then higher non-trump doubles
            const trumpDoubles = doubles.filter(d => d.isTrump(trickState.trump));
            if (trumpDoubles.length > 0) {
                return trumpDoubles[0]; // Trump double is best
            }
            
            // Sort non-trump doubles by value (higher is better for leading)
            doubles.sort((a, b) => b.ends[0] - a.ends[0]);
            return doubles[0]; // Highest double
        }
        
        // Second priority: trump dominoes (but avoid if higher trumps are out there)
        const trumpPlays = this.hand.filter(d => d.isTrump(trickState.trump));
        if (trumpPlays.length > 0) {
            // Find the highest trump we have
            const highestTrump = trumpPlays.reduce((max, d) => 
                d.getDegree(trickState.trump) > max.getDegree(trickState.trump) ? d : max
            );
            const highestDegree = highestTrump.getDegree(trickState.trump);
            
            // Check if higher trumps are still out there
            if (!this.isHigherTrumpOutThere(trickState.trump, highestDegree)) {
                // No higher trumps out there - safe to lead with this trump
                return highestTrump;
            } else {
                // Higher trumps are out there - avoid leading with trump
                // Look for strong off dominoes instead
                const offPlays = this.hand.filter(d => !d.isTrump(trickState.trump));
                if (offPlays.length > 0) {
                    // Prefer count dominoes for leading
                    const countPlays = this.getCountDominoes(offPlays);
                    if (countPlays.length > 0) {
                        return countPlays.reduce((max, d) => 
                            this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
                        );
                    }
                    // Otherwise, lead with highest off domino
                    return offPlays.reduce((max, d) => 
                        this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
                    );
                }
                // No off plays available - forced to lead with trump
                return highestTrump;
            }
        }
        
        // Third priority: count dominoes (good for leading)
        const countPlays = this.getCountDominoes(this.hand);
        if (countPlays.length > 0) {
            return countPlays.reduce((max, d) => 
                this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
            );
        }
        
        // Last resort: any domino
        return this.hand.reduce((max, d) => 
            this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
        );
    }
    
    getStrongestDominoSupporter(trickState) {
        // SUPPORTER should preserve doubles for critical moments and lead with strong non-doubles
        
        // First priority: strong non-double trumps (preserve doubles)
        const trumpPlays = this.hand.filter(d => d.isTrump(trickState.trump) && !d.isDouble());
        if (trumpPlays.length > 0) {
            // Find highest non-double trump
            const highestTrump = trumpPlays.reduce((max, d) => 
                d.getDegree(trickState.trump) > max.getDegree(trickState.trump) ? d : max
            );
            const highestDegree = highestTrump.getDegree(trickState.trump);
            
            // Check if higher trumps are still out there
            if (!this.isHigherTrumpOutThere(trickState.trump, highestDegree)) {
                // No higher trumps out there - safe to lead with this trump
                return highestTrump;
            }
        }
        
        // Second priority: count dominoes (good for scoring)
        const countPlays = this.getCountDominoes(this.hand);
        if (countPlays.length > 0) {
            return countPlays.reduce((max, d) => 
                this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
            );
        }
        
        // Third priority: strong off dominoes (preserve doubles)
        const offPlays = this.hand.filter(d => !d.isTrump(trickState.trump) && !d.isDouble());
        if (offPlays.length > 0) {
            return offPlays.reduce((max, d) => 
                this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
            );
        }
        
        // Last resort: doubles (only if no other options)
        const doubles = this.getDoubles(this.hand);
        if (doubles.length > 0) {
            // Prefer trump double first, then higher non-trump doubles
            const trumpDoubles = doubles.filter(d => d.isTrump(trickState.trump));
            if (trumpDoubles.length > 0) {
                return trumpDoubles[0];
            }
            doubles.sort((a, b) => b.ends[0] - a.ends[0]);
            return doubles[0];
        }
        
        // Fallback
        return this.hand[0];
    }
    
    getStrongestDominoSetter(trickState) {
        // SETTER should preserve doubles for critical moments and lead with strong non-doubles
        
        // First priority: strong non-double trumps (preserve doubles)
        const trumpPlays = this.hand.filter(d => d.isTrump(trickState.trump) && !d.isDouble());
        if (trumpPlays.length > 0) {
            // Find highest non-double trump
            const highestTrump = trumpPlays.reduce((max, d) => 
                d.getDegree(trickState.trump) > max.getDegree(trickState.trump) ? d : max
            );
            const highestDegree = highestTrump.getDegree(trickState.trump);
            
            // Check if higher trumps are still out there
            if (!this.isHigherTrumpOutThere(trickState.trump, highestDegree)) {
                // No higher trumps out there - safe to lead with this trump
                return highestTrump;
            }
        }
        
        // Second priority: count dominoes (good for scoring)
        const countPlays = this.getCountDominoes(this.hand);
        if (countPlays.length > 0) {
            return countPlays.reduce((max, d) => 
                this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
            );
        }
        
        // Third priority: strong off dominoes (preserve doubles)
        const offPlays = this.hand.filter(d => !d.isTrump(trickState.trump) && !d.isDouble());
        if (offPlays.length > 0) {
            return offPlays.reduce((max, d) => 
                this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
            );
        }
        
        // Last resort: doubles (only if no other options)
        const doubles = this.getDoubles(this.hand);
        if (doubles.length > 0) {
            // Prefer trump double first, then higher non-trump doubles
            const trumpDoubles = doubles.filter(d => d.isTrump(trickState.trump));
            if (trumpDoubles.length > 0) {
                return trumpDoubles[0];
            }
            doubles.sort((a, b) => b.ends[0] - a.ends[0]);
            return doubles[0];
        }
        
        // Fallback
        return this.hand[0];
    }
    
    hasSetterBeatenLeader(trickState) {
        // TODO: Implement
        return false;
    }
    
    hasOtherSetterBeatenLeader(trickState) {
        // TODO: Implement
        return false;
    }
    
    hasSupporterBeatenOtherSetter(trickState) {
        // TODO: Implement
        return false;
    }
    
    areTrumpsOnlyOnTeam(trickState) {
        // TODO: Implement
        return false;
    }
    
    mustFollowSuit(trickState) {
        // TODO: Implement
        return false;
    }
    
    chooseSupporterLeaderWinning(trickState, validPlays) {
        // When LEADER is winning, SUPPORTER should optimize for count dominoes
        // Priority: count dominoes > non-count non-doubles > non-count doubles
        
        // If playing off suit, prioritize count dominoes
        if (this.isPlayingOffSuit(trickState)) {
            const offPlays = this.getOffSuitPlays(validPlays, trickState.trump);
            if (offPlays.length > 0) {
                // First priority: count dominoes (be liberal about throwing count when leader is winning)
                const countPlays = this.getCountDominoes(offPlays);
                if (countPlays.length > 0) {
                    // Prefer 10-counts over 5-counts to maximize points
                    const tenCountPlays = countPlays.filter(d => 
                        (d.ends[0] === 5 && d.ends[1] === 5) || 
                        (d.ends[0] === 4 && d.ends[1] === 6) || 
                        (d.ends[0] === 6 && d.ends[1] === 4)
                    );
                    if (tenCountPlays.length > 0) {
                        return tenCountPlays.reduce((max, d) => 
                            this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                        );
                    }
                    return countPlays.reduce((max, d) => 
                        this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                    );
                }
                
                // Second priority: non-count, non-double offs (preserve doubles)
                const nonCountNonDoubleOffs = this.getNonCountDominoes(this.getNonDoubles(offPlays));
                if (nonCountNonDoubleOffs.length > 0) {
                    return nonCountNonDoubleOffs.reduce((min, d) => 
                        this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                    );
                }
                
                // Third priority: non-count doubles (preserve ALL doubles when possible)
                const nonCountDoubles = this.getNonCountDominoes(this.getDoubles(offPlays));
                if (nonCountDoubles.length > 0) {
                    // Only throw doubles if we have no other options or if it's a very low double
                    // Prefer to preserve all doubles for critical moments
                    const lowDoubles = nonCountDoubles.filter(d => d.ends[0] <= 2); // Only 0-0, 1-1, 2-2
                    if (lowDoubles.length > 0) {
                        return lowDoubles.reduce((min, d) => 
                            d.ends[0] < min.ends[0] ? d : min
                        );
                    }
                    // If no low doubles, try to avoid throwing doubles entirely
                    // Look for any other off plays first
                    const otherOffPlays = offPlays.filter(d => !d.isDouble());
                    if (otherOffPlays.length > 0) {
                        return otherOffPlays.reduce((min, d) => 
                            this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                        );
                    }
                    // Forced to throw a double - prefer lowest
                    return nonCountDoubles.reduce((min, d) => 
                        d.ends[0] < min.ends[0] ? d : min
                    );
                }
                
                // Fallback - any off
                return offPlays.reduce((min, d) => 
                    this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                );
            }
        }
        
        // Must follow suit - play highest valid domino to support leader
        return validPlays.reduce((max, d) => 
            this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
        );
    }
    
    chooseSupporterTakeTrick(trickState, validPlays) {
        // SUPPORTER trying to take the trick back from SETTER
        // Priority: winning plays that preserve count > winning plays with count > highest valid play
        
        const winningPlays = validPlays.filter(d => this.canWinTrick(trickState, d));
        
        if (winningPlays.length > 0) {
            // First priority: winning plays that don't use count dominoes
            const nonCountWinners = this.getNonCountDominoes(winningPlays);
            if (nonCountWinners.length > 0) {
                return nonCountWinners.reduce((max, d) => 
                    this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                );
            }
            
            // Second priority: winning plays with count dominoes (forced to use count)
            const countWinners = this.getCountDominoes(winningPlays);
            if (countWinners.length > 0) {
                // Prefer 5-counts over 10-counts when forced to use count
                const fiveCountWinners = countWinners.filter(d => {
                    const [a, b] = d.ends.slice().sort((x, y) => x - y);
                    return (a === 0 && b === 5) || (a === 1 && b === 4) || (a === 2 && b === 3);
                });
                if (fiveCountWinners.length > 0) {
                    return fiveCountWinners.reduce((max, d) => 
                        this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                    );
                }
                return countWinners.reduce((max, d) => 
                    this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                );
            }
            
            // Fallback - any winning play
            return winningPlays.reduce((max, d) => 
                this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
            );
        }
        
        // Cannot win - play highest valid domino
        return validPlays.reduce((max, d) => 
            this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
        );
    }
    
    chooseSupporterFollowSuit(trickState, validPlays) {
        // SUPPORTER following suit - play optimally to support leader
        // Priority: highest valid play that can win > highest valid play
        
        const winningPlays = validPlays.filter(d => this.canWinTrick(trickState, d));
        
        if (winningPlays.length > 0) {
            // Can win - play highest winning play
            return winningPlays.reduce((max, d) => 
                this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
            );
        }
        
        // Cannot win - play lowest valid play to preserve higher dominoes
        return validPlays.reduce((min, d) => 
            this.evaluateDominoStrength(d, trickState.trump) < this.evaluateDominoStrength(min, trickState.trump) ? d : min
        );
    }
    
    chooseSetterWinningPlay(trickState, winningPlays) {
        // SETTER trying to win the trick
        // Priority: winning plays that preserve count > winning plays with count > highest winning play
        
        // First priority: winning plays that don't use count dominoes
        const nonCountWinners = this.getNonCountDominoes(winningPlays);
        if (nonCountWinners.length > 0) {
            return nonCountWinners.reduce((max, d) => 
                this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
            );
        }
        
        // Second priority: winning plays with count dominoes (forced to use count)
        const countWinners = this.getCountDominoes(winningPlays);
        if (countWinners.length > 0) {
            // Prefer 5-counts over 10-counts when forced to use count
            const fiveCountWinners = countWinners.filter(d => {
                const [a, b] = d.ends.slice().sort((x, y) => x - y);
                return (a === 0 && b === 5) || (a === 1 && b === 4) || (a === 2 && b === 3);
            });
            if (fiveCountWinners.length > 0) {
                return fiveCountWinners.reduce((max, d) => 
                    this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                );
            }
            return countWinners.reduce((max, d) => 
                this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
            );
        }
        
        // Fallback - any winning play
        return winningPlays.reduce((max, d) => 
            this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
        );
    }
    
    chooseSetterOffSuit(trickState, validPlays) {
        // SETTER playing off suit - NEVER throw count dominoes if there are other options
        // Priority: non-count non-doubles > non-count doubles > count dominoes (only if no other options)
        
        const offPlays = this.getOffSuitPlays(validPlays, trickState.trump);
        
        if (offPlays.length > 0) {
            // First priority: non-count, non-double offs (safest to throw)
            const nonCountNonDoubleOffs = this.getNonCountDominoes(this.getNonDoubles(offPlays));
            if (nonCountNonDoubleOffs.length > 0) {
                // Throw the least valuable non-count non-double
                return nonCountNonDoubleOffs.reduce((min, d) => 
                    this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                );
            }
            
            // Second priority: non-count doubles (preserve high doubles when possible)
            const nonCountDoubles = this.getNonCountDominoes(this.getDoubles(offPlays));
            if (nonCountDoubles.length > 0) {
                // SETTER should be very conservative about throwing doubles
                // Only throw very low doubles (0-0, 1-1) when absolutely necessary
                const veryLowDoubles = nonCountDoubles.filter(d => d.ends[0] <= 1); // Only 0-0, 1-1
                if (veryLowDoubles.length > 0) {
                    return veryLowDoubles.reduce((min, d) => 
                        d.ends[0] < min.ends[0] ? d : min
                    );
                }
                // If no very low doubles, try to avoid throwing doubles entirely
                // Look for any other off plays first (including count dominoes)
                const otherOffPlays = offPlays.filter(d => !d.isDouble());
                if (otherOffPlays.length > 0) {
                    return otherOffPlays.reduce((min, d) => 
                        this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                    );
                }
                // Forced to throw a double - prefer lowest
                return nonCountDoubles.reduce((min, d) => 
                    d.ends[0] < min.ends[0] ? d : min
                );
            }
            
            // Third priority: count dominoes (ONLY if no non-count options available)
            // This should NEVER be reached if there are non-count options available
            const countPlays = this.getCountDominoes(offPlays);
            if (countPlays.length > 0) {
                // Double-check: if we have any non-count options, we should NOT be here
                const allNonCountOffs = this.getNonCountDominoes(offPlays);
                if (allNonCountOffs.length > 0) {
                    // We have non-count options - use them instead of count dominoes
                    return allNonCountOffs.reduce((min, d) => 
                        this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                    );
                }
                
                // Only reach here if we have NO non-count options available
                // Prefer 5-counts over 10-counts when forced to throw count
                const fiveCountPlays = countPlays.filter(d => {
                    const [a, b] = d.ends.slice().sort((x, y) => x - y);
                    return (a === 0 && b === 5) || (a === 1 && b === 4) || (a === 2 && b === 3);
                });
                if (fiveCountPlays.length > 0) {
                    return fiveCountPlays.reduce((min, d) => 
                        this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                    );
                }
                return countPlays.reduce((min, d) => 
                    this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                );
            }
            
            // Fallback - any off play
            return offPlays.reduce((min, d) => 
                this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
            );
        }
        
        // No off plays available - must play trump
        const trumpPlays = validPlays.filter(d => d.isTrump(trickState.trump));
        if (trumpPlays.length > 0) {
            // Play lowest trump to preserve higher trumps
            return trumpPlays.reduce((min, d) => 
                this.evaluateDominoStrength(d, trickState.trump) < this.evaluateDominoStrength(min, trickState.trump) ? d : min
            );
        }
        
        // Fallback - any valid play
        return validPlays.reduce((min, d) => 
            this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
        );
    }
}

// Game class
class Game {
    constructor() {
        // Create players with placeholder names (will be assigned in startNewGame)
        this.players = [
            new Player("", true, this),      // Player 0: Human
            new Player("", false, this),     // Player 1: AI Opponent
            new Player("", false, this),     // Player 2: AI Partner
            new Player("", false, this)      // Player 3: AI Opponent
        ];
        
        this.scores = [0, 0];
        this.startingBidderIndex = 0;
        this.bidOrderNames = [];
        
        // Assign teams: 'Us' = Player 0 (Human) + Player 2 (Partner), 'Them' = Player 1 + Player 3
        this.teams = {
            'Us': [this.players[0], this.players[2]],
            'Them': [this.players[1], this.players[3]]
        };
        
        this.handScoreboards = []; // Store scoreboard for each hand
        this.lastHandPlayerHands = null; // For troubleshooting
        this.lastHandBiddingInfo = null;
        this.playedDominoesThisHand = new Set(); // Track all dominoes played this hand
        
        // Hand tracking
        this.currentHandTricks = []; // Track tricks in current hand
        this.usHandPoints = 0;
        this.themHandPoints = 0;
        
        // Game state
        this.currentPhase = 'waiting'; // waiting, bidding, trump-selection, playing
        this.currentTrick = null;
        this.currentPlayerIndex = 0;
        this.selectedDomino = null;
        this.bidHistory = {};
        this.currentBid = 0;
        this.highestBidder = null;
        this.trump = null;
        this.bidWinner = null;
        this.winningBid = null;
        this.handModes = {};
        
        // UI elements
        this.statusText = document.getElementById('status-text');
        this.scoreDisplay = document.getElementById('score-display');
        this.usScore = document.getElementById('us-score');
        this.themScore = document.getElementById('them-score');
        this.biddingArea = document.getElementById('bidding-area');
        this.biddingStatus = document.getElementById('bidding-status');
        this.biddingBoard = document.getElementById('bidding-board');
        this.biddingResults = document.getElementById('bidding-results');
        this.readyToStart = document.getElementById('ready-to-start');
        this.startHandBtn = document.getElementById('start-hand-btn');
        this.bidInputArea = document.getElementById('bid-input-area');
        this.bidInput = document.getElementById('bid-input');
        this.submitBid = document.getElementById('submit-bid');
        this.trumpSelection = document.getElementById('trump-selection');
        this.trumpSuggested = document.getElementById('trump-suggested');
        this.confirmTrump = document.getElementById('confirm-trump');
        this.playerHand = document.getElementById('player-hand');
        this.dominoes = document.getElementById('dominoes');
        this.trickArea = document.getElementById('trick-area');
        this.trickInfo = document.getElementById('trick-info');
        this.playedDominoes = document.getElementById('played-dominoes');
        this.handScoreboard = document.getElementById('hand-scoreboard');
        this.usHandPointsElement = document.getElementById('us-hand-points');
        this.themHandPointsElement = document.getElementById('them-hand-points');
        this.usTricks = document.getElementById('us-tricks');
        this.themTricks = document.getElementById('them-tricks');
        this.scoreboard = document.getElementById('scoreboard');
        this.scoreboardContent = document.getElementById('scoreboard-content');
        this.startGame = document.getElementById('start-game');
        this.readyBidding = document.getElementById('ready-bidding');
        this.playDomino = document.getElementById('play-domino');
        this.showHistoryBtn = document.getElementById('show-history-btn');
        this.scoreboardHistoryModal = document.getElementById('scoreboard-history-modal');
        this.historyContent = document.getElementById('history-content');
        
        // Hand history tracking
        this.handHistory = []; // Array to store previous hand scoreboards
        
        // Bind event listeners
        this.bindEventListeners();
        
        // Display initial welcome message
        this.updateStatus("Welcome to 42! Click 'Start New Game' to begin.");
    }
    
    bindEventListeners() {
        this.startGame.addEventListener('click', () => this.startNewGame());
        this.readyBidding.addEventListener('click', () => this.startBidding());
        this.submitBid.addEventListener('click', () => this.submitBidHandler());
        this.bidInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitBidHandler();
            }
        });
        this.confirmTrump.addEventListener('click', () => this.confirmTrumpHandler());
        this.playDomino.addEventListener('click', () => this.playSelectedDomino());
        this.startHandBtn.addEventListener('click', () => this.startHandAfterBidding());
        this.showHistoryBtn.addEventListener('click', () => this.showScoreboardHistory());
        
        // Close modal button
        document.querySelector('.aquaButton--scoreboard').addEventListener('click', () => {
            this.hideElement(this.scoreboardHistoryModal);
        });
        
        // Trump selection
        document.querySelectorAll('.trump-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.trump-option').forEach(o => o.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });
        
        // Initialize draggable modal
        $(document).ready(() => {
            $('#scoreboard-history-modal').draggable({
                handle: '.modalHeader',
                containment: 'window'
            });
        });
    }
    
    displayTeamIntroductions() {
        this.updateStatus(`NEW GAME<br><br>
            <strong>Us:</strong><br>
            &nbsp;&nbsp;${this.formatPlayerNameWithRelationship(this.players[0])}<br>
            &nbsp;&nbsp;${this.formatPlayerNameWithRelationship(this.players[2])}<br><br>
            <strong>Them:</strong><br>
            &nbsp;&nbsp;${this.formatPlayerNameWithRelationship(this.players[1])}<br>
            &nbsp;&nbsp;${this.formatPlayerNameWithRelationship(this.players[3])}`);
    }
    
    getPlayerRelationship(playerIdx) {
        // Get the relationship of a player to the human player
        if (playerIdx === 0) {
            return "Human";
        } else if (playerIdx === 2) {
            return "Partner";
        } else if (playerIdx === 1) {
            return "Opponent L";
        } else if (playerIdx === 3) {
            return "Opponent R";
        } else {
            return "Unknown";
        }
    }
    
    formatPlayerNameWithRelationship(player) {
        // Format a player's name with their relationship to the human player
        const playerIdx = this.players.indexOf(player);
        const relationship = this.getPlayerRelationship(playerIdx);
        return `${player.name} (${relationship})`;
    }
    
    resetHandTracking() {
        // Reset tracking for a new hand
        this.playedDominoesThisHand = new Set();
    }
    
    addPlayedDomino(domino) {
        // Track a domino that has been played
        this.playedDominoesThisHand.add(JSON.stringify(domino.ends.slice().sort((a, b) => a - b)));
    }
    
    updateStatus(text) {
        this.statusText.innerHTML = text;
    }
    
    showElement(element) {
        element.classList.remove('hidden');
    }
    
    hideElement(element) {
        element.classList.add('hidden');
    }
    
    updateScoreDisplay() {
        this.usScore.textContent = this.scores[0];
        this.themScore.textContent = this.scores[1];
        this.showElement(this.scoreDisplay);
    }
    
    updateHandScoreboard() {
        this.usHandPointsElement.textContent = this.usHandPoints;
        this.themHandPointsElement.textContent = this.themHandPoints;
        this.showElement(this.handScoreboard);
    }
    
    displayPlayedDomino(domino, player) {
        const mod = domino.modulate(this.trump, this.currentTrick.currentSuit);
        const dominoElement = document.createElement('div');
        dominoElement.className = 'played-domino';
        dominoElement.textContent = `${this.formatPlayerNameWithRelationship(player)}: ${mod[0]}-${mod[1]}`;
        this.playedDominoes.appendChild(dominoElement);
    }
    
    addTrickToScoreboard(trickData) {
        this.currentHandTricks.push(trickData);
        
        // Clear previous scoreboard
        this.usTricks.innerHTML = '';
        this.themTricks.innerHTML = '';
        
        // Group tricks by team
        const usTricks = this.currentHandTricks.filter(t => t.team === 'Us');
        const themTricks = this.currentHandTricks.filter(t => t.team === 'Them');
        
        // Display US tricks
        usTricks.forEach((trick, index) => {
            const trickGroup = document.createElement('div');
            trickGroup.className = 'trick-group';
            
            const trickLabel = document.createElement('div');
            trickLabel.className = 'trick-label';
            trickLabel.textContent = `Trick ${trick.trickNum}`;
            trickGroup.appendChild(trickLabel);
            
            const trickDominoes = document.createElement('div');
            trickDominoes.className = 'trick-dominoes';
            
            // Display plays in the order they were made
            trick.playerPlays.forEach((play, playIndex) => {
                const playerPlay = document.createElement('div');
                playerPlay.className = 'player-play';
                
                const playerName = document.createElement('div');
                playerName.className = 'player-name';
                playerName.textContent = this.getPlayerRelationship(play.playerIdx);
                playerPlay.appendChild(playerName);
                
                const dominoElement = document.createElement('div');
                dominoElement.className = 'domino-small';
                const mod = play.domino.modulate(this.trump, trick.ledSuit);
                dominoElement.textContent = `${mod[0]}-${mod[1]}`;
                playerPlay.appendChild(dominoElement);
                
                trickDominoes.appendChild(playerPlay);
            });
            
            trickGroup.appendChild(trickDominoes);
            this.usTricks.appendChild(trickGroup);
        });
        
        // Display THEM tricks
        themTricks.forEach((trick, index) => {
            const trickGroup = document.createElement('div');
            trickGroup.className = 'trick-group';
            
            const trickLabel = document.createElement('div');
            trickLabel.className = 'trick-label';
            trickLabel.textContent = `Trick ${trick.trickNum}`;
            trickGroup.appendChild(trickLabel);
            
            const trickDominoes = document.createElement('div');
            trickDominoes.className = 'trick-dominoes';
            
            // Display plays in the order they were made
            trick.playerPlays.forEach((play, playIndex) => {
                const playerPlay = document.createElement('div');
                playerPlay.className = 'player-play';
                
                const playerName = document.createElement('div');
                playerName.className = 'player-name';
                playerName.textContent = this.getPlayerRelationship(play.playerIdx);
                playerPlay.appendChild(playerName);
                
                const dominoElement = document.createElement('div');
                dominoElement.className = 'domino-small';
                const mod = play.domino.modulate(this.trump, trick.ledSuit);
                dominoElement.textContent = `${mod[0]}-${mod[1]}`;
                playerPlay.appendChild(dominoElement);
                
                trickDominoes.appendChild(playerPlay);
            });
            
            trickGroup.appendChild(trickDominoes);
            this.themTricks.appendChild(trickGroup);
        });
        
        this.updateHandScoreboard();
    }
    
    startNewGame() {
        // Reset game state
        this.scores = [0, 0];
        this.startingBidderIndex = 0;
        this.handScoreboards = [];
        this.lastHandPlayerHands = null;
        this.lastHandBiddingInfo = null;
        this.playedDominoesThisHand = new Set();
        this.handHistory = []; // Clear hand history for new game
        
        // Assign new random songbird names (only once per game)
        let availableNames = [...SONGBIRD_NAMES];
        availableNames = shuffleArray(availableNames);
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].name = availableNames[i];
            this.players[i].hand = [];
            this.players[i].role = null;
            this.players[i].tricksWon = [];
        }
        
        // Update team assignments
        this.teams = {
            'Us': [this.players[0], this.players[2]],
            'Them': [this.players[1], this.players[3]]
        };
        
        // Update bid order names
        this.bidOrderNames = this.players.map(p => this.formatPlayerNameWithRelationship(p));
        
        // Display new team introductions
        this.displayTeamIntroductions();
        
        // Show ready button
        this.showElement(this.readyBidding);
        this.hideElement(this.startGame);
        
        this.updateStatus("Click 'Ready for Bidding' to start the first hand.");
    }
    
    startBidding() {
        this.currentPhase = 'bidding';
        // Don't shuffle and deal here - it's already done in startNewHand or will be done for first hand
        if (this.players[0].hand.length === 0) {
            // Only shuffle and deal if hands are empty (first hand of the game)
            this.shuffleAndDeal();
            this.handSortingPhase();
        }
        
        // Show overall score and user's hand
        this.updateScoreDisplay();
        this.displayPlayerHand();
        
        this.hideElement(this.readyBidding);
        this.showElement(this.biddingArea);
        
        this.updateStatus("Bidding phase starting. You'll be prompted when it's your turn to bid.");
        
        // Start the bidding process
        this.biddingPhase();
    }
    
    shuffleAndDeal() {
        let dominoes = [];
        for (let a = 0; a < 7; a++) {
            for (let b = a; b < 7; b++) {
                dominoes.push(new Domino(a, b));
            }
        }
        dominoes = shuffleArray(dominoes);
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].hand = dominoes.slice(i * 7, (i + 1) * 7);
        }
    }
    
    handSortingPhase() {
        for (const player of this.players) {
            player.sortHand();
        }
    }
    
    displayPlayerHand() {
        this.dominoes.innerHTML = '';
        const humanPlayer = this.players[0];
        
        humanPlayer.hand.forEach((domino, index) => {
            const dominoElement = document.createElement('div');
            dominoElement.className = 'domino';
            dominoElement.textContent = domino.toString();
            dominoElement.dataset.index = index;
            
            dominoElement.addEventListener('click', () => {
                this.selectDomino(index);
            });
            
            this.dominoes.appendChild(dominoElement);
        });
        
        this.showElement(this.playerHand);
    }
    
    selectDomino(index) {
        // Remove previous selection
        document.querySelectorAll('.domino').forEach(d => d.classList.remove('selected'));
        
        // Add selection to clicked domino
        const dominoElement = document.querySelector(`[data-index="${index}"]`);
        dominoElement.classList.add('selected');
        
        this.selectedDomino = index;
        this.playDomino.disabled = false;
    }
    
    biddingPhase() {
        // Rotate starting bidder each hand
        this.resolveBidding(this.startingBidderIndex);
    }
    
    resolveBidding(startingIndex = 0) {
        // Create bid order with formatted names
        const bidOrder = [];
        for (let i = 0; i < this.players.length; i++) {
            const idx = (startingIndex + i) % this.players.length;
            const player = this.players[idx];
            bidOrder.push(this.formatPlayerNameWithRelationship(player));
        }
        
        // Create mapping from formatted names to players
        const playerMap = {};
        for (const p of this.players) {
            playerMap[this.formatPlayerNameWithRelationship(p)] = p;
        }
        
        // Gather bid data for each player
        const playerData = {};
        for (const p of this.players) {
            const evalResult = p.evaluateBidConfidence();
            const formattedName = this.formatPlayerNameWithRelationship(p);
            playerData[formattedName] = {
                keySuit: evalResult.trump,
                keyToken: evalResult.strongestDomino,
                confidence: evalResult.confidence,
                maxBid: evalResult.maxBid,
                supporting: false
            };
        }
        
        this.currentBid = 0;
        this.highestBidder = null;
        this.bidHistory = {};
        const passes = new Set();
        
        // Save bidding info for this hand for later display
        this.lastHandBiddingInfo = {};
        
        // Save bidding order for scoreboard display
        this.lastHandBidOrder = bidOrder;
        
        // Initialize and show bidding board
        this.initializeBiddingBoard(bidOrder);
        this.showElement(this.biddingBoard);
        
        this.updateStatus("Bidding phase in progress...");
        
        // Process bidding for each player
        this.processBidding(bidOrder, playerMap, playerData, 0);
    }
    
    processBidding(bidOrder, playerMap, playerData, currentIndex) {
        if (currentIndex >= bidOrder.length) {
            // Bidding complete
            this.finishBidding(bidOrder, playerMap, playerData);
            return;
        }
        
        const player = bidOrder[currentIndex];
        const pdata = playerData[player];
        const currentPlayer = playerMap[player];
        
        if (currentPlayer.isHuman) {
            // Human player - show bidding interface
            this.showBiddingInterface(player, currentIndex, bidOrder, playerMap, playerData);
        } else {
            // AI player - make bid automatically
            const bid = this.makeAIBid(currentPlayer, pdata, currentIndex, bidOrder, playerData);
            this.bidHistory[player] = bid;
            this.lastHandBiddingInfo[player] = {
                confidence: pdata.confidence,
                maxBid: pdata.maxBid,
                actualBid: bid
            };
            
            // Update bidding board
            this.updateBiddingBoard(player, bid);
            
            if (bid !== 'pass') {
                this.currentBid = bid;
                this.highestBidder = player;
            }
            
            // Continue with next player
            setTimeout(() => {
                this.processBidding(bidOrder, playerMap, playerData, currentIndex + 1);
            }, 1000);
        }
    }
    
    showBiddingInterface(player, currentIndex, bidOrder, playerMap, playerData) {
        this.biddingStatus.innerHTML = `It's your turn to bid, ${player}.<br>
            Current bid: ${this.currentBid === 0 ? 'pass' : this.currentBid}`;
        
        this.showElement(this.bidInputArea);
        this.bidInput.focus();
    }
    
    submitBidHandler() {
        const input = this.bidInput.value.trim().toLowerCase();
        let bid;
        
        if (input === 'p') {
            bid = 'pass';
        } else {
            bid = parseInt(input);
            if (isNaN(bid) || bid <= this.currentBid) {
                this.updateStatus("Invalid bid. Enter a number higher than current bid or 'p' to pass.");
                return;
            }
        }
        
        // Find current player
        const currentPlayer = this.players.find(p => p.isHuman);
        const playerName = this.formatPlayerNameWithRelationship(currentPlayer);
        
        this.bidHistory[playerName] = bid;
        this.lastHandBiddingInfo[playerName] = {
            confidence: currentPlayer.evaluateBidConfidence().confidence,
            maxBid: currentPlayer.evaluateBidConfidence().maxBid,
            actualBid: bid
        };
        
        // Update bidding board
        this.updateBiddingBoard(playerName, bid);
        
        if (bid !== 'pass') {
            this.currentBid = bid;
            this.highestBidder = playerName;
        }
        
        this.hideElement(this.bidInputArea);
        this.bidInput.value = '';
        
        // Continue bidding process
        this.continueBiddingAfterHuman();
    }
    
    continueBiddingAfterHuman() {
        // Find the current player index in the bidding order
        const currentPlayer = this.players.find(p => p.isHuman);
        const playerName = this.formatPlayerNameWithRelationship(currentPlayer);
        
        // Find the current index in the bidding order
        const bidOrder = [];
        for (let i = 0; i < this.players.length; i++) {
            const idx = (this.startingBidderIndex + i) % this.players.length;
            const player = this.players[idx];
            bidOrder.push(this.formatPlayerNameWithRelationship(player));
        }
        
        const currentIndex = bidOrder.indexOf(playerName);
        
        // Create player map and data for the bidding process
        const playerMap = {};
        for (const p of this.players) {
            playerMap[this.formatPlayerNameWithRelationship(p)] = p;
        }
        
        const playerData = {};
        for (const p of this.players) {
            const evalResult = p.evaluateBidConfidence();
            const formattedName = this.formatPlayerNameWithRelationship(p);
            playerData[formattedName] = {
                keySuit: evalResult.trump,
                keyToken: evalResult.strongestDomino,
                confidence: evalResult.confidence,
                maxBid: evalResult.maxBid,
                supporting: false
            };
        }
        
        // Continue with the next player
        this.processBidding(bidOrder, playerMap, playerData, currentIndex + 1);
    }
    
    makeAIBid(currentPlayer, pdata, currentIndex, bidOrder, playerData) {
        // AI bidding logic
        const partnerName = this.getPartnerName(currentPlayer);
        const partnerBid = this.bidHistory[partnerName];
        const partnerIsLeader = partnerBid !== undefined && partnerBid !== 'pass' && partnerBid === this.currentBid;
        
        // If partner is leader and AI has a supporting hand, may pass
        if (partnerIsLeader && pdata.confidence <= playerData[partnerName].confidence) {
            return 'pass';
        }
        
        // If AI's confidence is 2 or more higher than partner's, take the bid
        if (partnerIsLeader && pdata.confidence >= playerData[partnerName].confidence + 2) {
            // Must outbid current bid by at least 1
            if (pdata.maxBid > this.currentBid) {
                // If last to bid, only outbid by 1
                if (currentIndex === bidOrder.length - 1) {
                    return this.currentBid + 1;
                } else {
                    return pdata.maxBid;
                }
            } else {
                return 'pass';
            }
        }
        
        // If last to bid and can win, only outbid by 1
        if (currentIndex === bidOrder.length - 1 && pdata.maxBid > this.currentBid) {
            return this.currentBid + 1;
        }
        
        if (pdata.maxBid <= this.currentBid) {
            return 'pass';
        } else {
            return pdata.maxBid;
        }
    }
    
    getPartnerName(currentPlayer) {
        // Find partner name
        if (this.teams['Us'].includes(currentPlayer)) {
            return this.formatPlayerNameWithRelationship(this.teams['Us'].find(p => p !== currentPlayer));
        } else {
            return this.formatPlayerNameWithRelationship(this.teams['Them'].find(p => p !== currentPlayer));
        }
    }
    
    finishBidding() {
        // Ensure someone wins: if all pass except last bidder, they get it for 30
        if (this.highestBidder === null) {
            const lastBidder = this.lastHandBidOrder[this.lastHandBidOrder.length - 1];
            this.highestBidder = lastBidder;
            this.currentBid = 30;
            this.bidHistory[lastBidder] = 30;
            this.updateBiddingBoard(lastBidder, 30);
        }
        
        // Show ready to start prompt
        this.showReadyToStart();
    }
    
    showTrumpSelection(suggestedTrump) {
        this.currentPhase = 'trump-selection';
        this.trumpSuggested.innerHTML = `Select a trump suit:`;
        this.showElement(this.trumpSelection);
        this.hideElement(this.biddingArea);
    }
    
    confirmTrumpHandler() {
        const selectedTrump = document.querySelector('.trump-option.selected');
        if (!selectedTrump) {
            this.updateStatus("Please select a trump suit.");
            return;
        }
        
        const trump = parseInt(selectedTrump.dataset.trump);
        this.setTrumpAndStartHand(trump);
    }
    
    setTrumpAndStartHand(trump) {
        this.trump = trump;
        this.bidWinner = this.highestBidder;
        this.winningBid = this.currentBid;
        this.handModes = this.profileHandModes(trump);
        
        this.hideElement(this.trumpSelection);
        this.hideElement(this.biddingArea);
        
        this.updateStatus(`${this.bidWinner} wins the bid with ${this.winningBid} on ${this.trump} as trump.`);
        
        // Start playing the hand
        this.startHand();
    }
    
    profileHandModes(trump) {
        // For the given trump suit (0-6), classify all dominoes as unimodal (doubles and trumps) or modal (the rest).
        const modes = {};
        for (let a = 0; a < 7; a++) {
            for (let b = a; b < 7; b++) {
                if (a === b) {
                    modes[`${a}-${b}`] = 'unimodal'; // Double
                } else if (a === trump || b === trump) {
                    modes[`${a}-${b}`] = 'unimodal'; // Trump
                } else {
                    modes[`${a}-${b}`] = 'modal';    // Modal
                }
            }
        }
        return modes;
    }
    
    startHand() {
        this.currentPhase = 'playing';
        this.resetHandTracking();
        
        // Reset hand points
        this.usHandPoints = 0;
        this.themHandPoints = 0;
        this.currentHandTricks = [];
        
        // Find bid winner's position
        const bidWinnerIdx = this.players.findIndex(p => this.formatPlayerNameWithRelationship(p) === this.bidWinner);
        this.currentLeaderIdx = bidWinnerIdx;
        
        console.log('Bid winner:', this.bidWinner);
        console.log('Bid winner index:', bidWinnerIdx);
        console.log('Current leader index:', this.currentLeaderIdx);
        console.log('Bid winner is human:', this.players[bidWinnerIdx].isHuman);
        
        this.showElement(this.trickArea);
        this.showElement(this.handScoreboard);
        this.updateTrickInfo();
        this.updateHandScoreboard();
        
        // Start the first trick
        this.playTrick();
    }
    
    updateTrickInfo() {
        const leader = this.players[this.currentLeaderIdx];
        this.trickInfo.innerHTML = `
            <strong>Current Trick:</strong><br>
            Leader: ${this.formatPlayerNameWithRelationship(leader)}<br>
            Trump: ${this.trump}'s<br>
            Bid: ${this.bidWinner} won with ${this.winningBid}
        `;
    }
    
    playTrick() {
        // Clear the current trick display for the new trick
        this.playedDominoes.innerHTML = '';
        
        console.log('Starting new trick!');
        console.log('Current leader index:', this.currentLeaderIdx);
        console.log('Leader will be:', this.formatPlayerNameWithRelationship(this.players[this.currentLeaderIdx]));
        
        // Initialize new trick
        this.currentTrick = new TrickState(this.currentLeaderIdx, this.trump, this.handModes);
        
        // Determine play order for this trick - start with leader, then go in order 0,1,2,3
        const trickOrder = [this.currentLeaderIdx];
        for (let i = 1; i < 4; i++) {
            const nextPlayer = (this.currentLeaderIdx + i) % 4;
            trickOrder.push(nextPlayer);
        }
        
        console.log('Trick order:', trickOrder.map(idx => this.formatPlayerNameWithRelationship(this.players[idx])));
        
        this.currentPlayerIndex = 0;
        this.playNextPlayer(trickOrder);
    }
    
    playNextPlayer(trickOrder) {
        if (this.currentPlayerIndex >= trickOrder.length) {
            // Trick complete
            this.finishTrick();
            return;
        }
        
        const playerIdx = trickOrder[this.currentPlayerIndex];
        const player = this.players[playerIdx];
        
        if (player.isHuman) {
            // Human player - wait for input
            this.updateStatus(`Your turn to play. Select a domino from your hand.`);
            this.showElement(this.playerHand);
        } else {
            // AI player - make play automatically
            const chosenDomino = player.chooseDomino(this.currentTrick);
            if (chosenDomino) {
                const index = player.hand.indexOf(chosenDomino);
                player.hand.splice(index, 1);
                this.currentTrick.addPlay(chosenDomino, playerIdx);
                this.addPlayedDomino(chosenDomino);
                
                // Update display
                this.displayPlayedDomino(chosenDomino, player);
                
                // Show modulated representation
                const mod = chosenDomino.modulate(this.trump, this.currentTrick.currentSuit);
                const roleName = player.role || "None";
                this.updateStatus(`${roleName}: ${this.formatPlayerNameWithRelationship(player)} plays ${mod[0]}-${mod[1]}`);
            }
            
            this.currentPlayerIndex++;
            setTimeout(() => {
                this.playNextPlayer(trickOrder);
            }, 1000);
        }
    }
    
    playSelectedDomino() {
        if (this.selectedDomino === null) {
            this.updateStatus("Please select a domino to play.");
            return;
        }
        
        const humanPlayer = this.players[0];
        const chosenDomino = humanPlayer.hand[this.selectedDomino];
        
        // Check if this is a valid play
        const validPlays = humanPlayer.getValidPlays(this.currentTrick);
        const isValidPlay = validPlays.some(validDomino => 
            validDomino.ends[0] === chosenDomino.ends[0] && validDomino.ends[1] === chosenDomino.ends[1]
        );
        
        if (!isValidPlay) {
            this.updateStatus("That domino is not a valid play. You must follow suit if possible.");
            return;
        }
        
        // Remove domino from hand
        humanPlayer.hand.splice(this.selectedDomino, 1);
        this.currentTrick.addPlay(chosenDomino, 0);
        this.addPlayedDomino(chosenDomino);
        
        // Update display
        this.displayPlayedDomino(chosenDomino, humanPlayer);
        this.displayPlayerHand();
        
        // Clear selection
        this.selectedDomino = null;
        this.playDomino.disabled = true;
        
        // Continue with next player in the current trick order
        this.currentPlayerIndex++;
        
        // Determine the correct trick order for the current leader
        const trickOrder = [this.currentLeaderIdx];
        for (let i = 1; i < 4; i++) {
            const nextPlayer = (this.currentLeaderIdx + i) % 4;
            trickOrder.push(nextPlayer);
        }
        
        this.playNextPlayer(trickOrder);
    }
    
    finishTrick() {
        // Determine trick winner
        const [winningDomino, winnerIdx] = this.currentTrick.getWinningPlay();
        const winner = this.players[winnerIdx];
        winner.tricksWon.push(this.currentTrick);
        
        console.log('Trick finished!');
        console.log('Winner index:', winnerIdx);
        console.log('Winner:', this.formatPlayerNameWithRelationship(winner));
        console.log('Current leader index before update:', this.currentLeaderIdx);
        
        // Determine team and update points
        const team = this.teams['Us'].includes(winner) ? 'Us' : 'Them';
        const trickPoints = this.currentTrick.pointsInTrick + 1; // +1 for winning the trick
        
        if (team === 'Us') {
            this.usHandPoints += trickPoints;
        } else {
            this.themHandPoints += trickPoints;
        }
        
        // Create trick data for scoreboard
        const trickData = {
            trickNum: this.currentHandTricks.length + 1,
            team: team,
            points: trickPoints,
            winner: this.formatPlayerNameWithRelationship(winner),
            ledSuit: this.currentTrick.currentSuit,
            playerPlays: this.currentTrick.playedDominoes.map(([domino, playerIdx]) => ({
                domino: domino,
                playerIdx: playerIdx
            }))
        };
        
        // Add to scoreboard
        this.addTrickToScoreboard(trickData);
        
        this.updateStatus(`${this.formatPlayerNameWithRelationship(winner)} wins the trick! ${team} gets ${trickPoints} points.`);
        
        // Update for next trick
        this.currentLeaderIdx = winnerIdx;
        
        console.log('New leader index set to:', this.currentLeaderIdx);
        console.log('New leader will be:', this.formatPlayerNameWithRelationship(this.players[this.currentLeaderIdx]));
        
        // Check if hand is over
        if (this.isHandOver()) {
            this.finishHand();
        } else {
            // Start next trick
            setTimeout(() => {
                this.playTrick();
            }, 2000);
        }
    }
    
    isHandOver() {
        // Determine bid team
        const bidTeam = this.teams['Us'].some(p => this.formatPlayerNameWithRelationship(p) === this.bidWinner) ? 'Us' : 'Them';
        const setTeam = bidTeam === 'Us' ? 'Them' : 'Us';
        
        // Check if bid team has made their bid
        if (bidTeam === 'Us' && this.usHandPoints >= this.winningBid) {
            return true;
        }
        if (bidTeam === 'Them' && this.themHandPoints >= this.winningBid) {
            return true;
        }
        
        // Check if setting team has set the bid team
        if (setTeam === 'Us' && this.usHandPoints > (42 - this.winningBid)) {
            return true;
        }
        if (setTeam === 'Them' && this.themHandPoints > (42 - this.winningBid)) {
            return true;
        }
        
        // Check if all dominoes have been played (all players have empty hands)
        return this.players.every(p => p.hand.length === 0);
    }
    
    finishHand() {
        // Save hand history before determining winner
        this.saveHandHistory();
        
        // Determine hand winner
        const bidTeam = this.teams['Us'].some(p => this.formatPlayerNameWithRelationship(p) === this.bidWinner) ? 'Us' : 'Them';
        const setTeam = bidTeam === 'Us' ? 'Them' : 'Us';
        
        let handWinner = null;
        let handResult = '';
        
        // Check if bid team made their bid
        if (bidTeam === 'Us' && this.usHandPoints >= this.winningBid) {
            handWinner = 'Us';
            handResult = `${bidTeam} made their bid!`;
        } else if (bidTeam === 'Them' && this.themHandPoints >= this.winningBid) {
            handWinner = 'Them';
            handResult = `${bidTeam} made their bid!`;
        }
        // Check if setting team set the bid team
        else if (setTeam === 'Us' && this.usHandPoints > (42 - this.winningBid)) {
            handWinner = 'Us';
            handResult = `${setTeam} set the bidding team!`;
        } else if (setTeam === 'Them' && this.themHandPoints > (42 - this.winningBid)) {
            handWinner = 'Them';
            handResult = `${setTeam} set the bidding team!`;
        }
        // If neither team made their bid and setting team didn't set, bid team loses
        else {
            handWinner = setTeam;
            handResult = `${setTeam} set the bidding team!`;
        }
        
        // Update overall scores
        if (handWinner) {
            if (handWinner === 'Us') {
                this.scores[0]++;
            } else {
                this.scores[1]++;
            }
            this.updateScoreDisplay();
        }
        
        // Display hand result
        this.updateStatus(`Hand completed! ${handResult}<br>
            Final score: Us ${this.usHandPoints} - Them ${this.themHandPoints}<br>
            Overall score: Us ${this.scores[0]} - Them ${this.scores[1]}`);
        
        // Check for game over
        if (this.scores[0] >= 7) {
            this.updateStatus("Game Over! Team Us wins the game!");
            setTimeout(() => {
                if (confirm("Game completed! Start a new game?")) {
                    this.startNewGame();
                }
            }, 3000);
        } else if (this.scores[1] >= 7) {
            this.updateStatus("Game Over! Team Them wins the game!");
            setTimeout(() => {
                if (confirm("Game completed! Start a new game?")) {
                    this.startNewGame();
                }
            }, 3000);
        } else {
            // Start new hand
            setTimeout(() => {
                this.startNewHand();
            }, 3000);
        }
    }
    
    startNewHand() {
        // Reset hand tracking
        this.currentHandTricks = [];
        this.usHandPoints = 0;
        this.themHandPoints = 0;
        this.playedDominoesThisHand = new Set();
        
        // Rotate starting bidder
        this.startingBidderIndex = (this.startingBidderIndex + 1) % 4;
        
        // Clear UI
        this.hideElement(this.handScoreboard);
        this.hideElement(this.trickArea);
        this.hideElement(this.playerHand);
        this.hideElement(this.biddingBoard);
        this.hideElement(this.readyToStart);
        this.playedDominoes.innerHTML = '';
        
        // Clear scoreboard
        this.usTricks.innerHTML = '';
        this.themTricks.innerHTML = '';
        
        // Start new hand
        this.shuffleAndDeal();
        this.handSortingPhase();
        this.displayPlayerHand();
        
        this.updateStatus("New hand dealt! Click 'Ready for Bidding' to start bidding.");
        this.showElement(this.readyBidding);
    }
    
    initializeBiddingBoard(bidOrder) {
        this.biddingResults.innerHTML = '';
        bidOrder.forEach(playerName => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'bidding-result';
            resultDiv.innerHTML = `
                <span class="player-name">${playerName}</span>
                <span class="bid-amount">--</span>
            `;
            resultDiv.dataset.player = playerName;
            this.biddingResults.appendChild(resultDiv);
        });
    }
    
    updateBiddingBoard(playerName, bid) {
        const resultDiv = this.biddingResults.querySelector(`[data-player="${playerName}"]`);
        if (resultDiv) {
            const bidAmount = resultDiv.querySelector('.bid-amount');
            bidAmount.textContent = bid === 'pass' ? 'Pass' : bid;
            if (bid !== 'pass') {
                bidAmount.style.color = 'lime';
                bidAmount.style.fontWeight = 'bold';
            }
        }
    }
    
    showReadyToStart() {
        this.hideElement(this.bidInputArea);
        this.showElement(this.readyToStart);
        this.updateStatus("Bidding complete! Click 'Ready to Start' to begin the hand.");
    }
    
    startHandAfterBidding() {
        this.hideElement(this.readyToStart);
        this.hideElement(this.biddingBoard);
        
        // Set trump and winner info
        const winnerPlayer = this.players.find(p => this.formatPlayerNameWithRelationship(p) === this.highestBidder);
        const evalResult = winnerPlayer.evaluateBidConfidence();
        let keySuit = evalResult.trump;
        
        // If user wins, let them pick trump suit now
        if (winnerPlayer.isHuman) {
            this.showTrumpSelection(keySuit);
        } else {
            this.setTrumpAndStartHand(keySuit);
        }
    }
    
    saveHandHistory() {
        const handData = {
            handNumber: this.handHistory.length + 1,
            bidWinner: this.bidWinner,
            winningBid: this.winningBid,
            trump: this.trump,
            usHandPoints: this.usHandPoints,
            themHandPoints: this.themHandPoints,
            usTricks: this.currentHandTricks.filter(t => t.team === 'Us').length,
            themTricks: this.currentHandTricks.filter(t => t.team === 'Them').length,
            tricks: [...this.currentHandTricks],
            biddingInfo: { ...this.lastHandBiddingInfo },
            bidOrder: [...this.lastHandBidOrder]
        };
        this.handHistory.push(handData);
    }
    
    showScoreboardHistory() {
        console.log('Show scoreboard history called');
        console.log('Hand history length:', this.handHistory.length);
        
        this.historyContent.innerHTML = '';
        
        if (this.handHistory.length === 0) {
            this.historyContent.innerHTML = '<p>No hand history available yet.</p>';
        } else {
            this.handHistory.forEach((hand, index) => {
                const handDiv = document.createElement('div');
                handDiv.className = 'hand-history-item';
                
                const winner = hand.usHandPoints >= hand.winningBid ? 'Us' : 
                              hand.themHandPoints >= hand.winningBid ? 'Them' : 
                              hand.usHandPoints > (42 - hand.winningBid) ? 'Us' : 'Them';
                
                // Create hand display section
                const handDisplay = this.createHandDisplay(hand);
                
                handDiv.innerHTML = `
                    <div class="hand-history-header">
                        Hand ${hand.handNumber}: ${hand.bidWinner} won bid with ${hand.winningBid} on ${hand.trump}'s
                    </div>
                    <div class="hand-history-details">
                        <div>Final Score: Us ${hand.usHandPoints} - Them ${hand.themHandPoints}</div>
                        <div>Tricks: Us ${hand.usTricks} - Them ${hand.themTricks}</div>
                        <div>Winner: ${winner}</div>
                        <div><strong>Bidding Results:</strong></div>
                        <div style="margin-left: 10px;">
                            ${hand.bidOrder.map(player => {
                                const bid = hand.biddingInfo[player]?.actualBid || '--';
                                return `${player}: ${bid}`;
                            }).join('<br>')}
                        </div>
                        <div style="margin-top: 15px;"><strong>Hand Display:</strong></div>
                        <div class="hand-display">
                            ${handDisplay}
                        </div>
                    </div>
                `;
                
                this.historyContent.appendChild(handDiv);
            });
        }
        
        console.log('Showing modal');
        this.showElement(this.scoreboardHistoryModal);
    }
    
    createHandDisplay(hand) {
        // Create a map of player names to their relationship for display
        const playerDisplayNames = {};
        this.players.forEach((player, index) => {
            const relationship = this.getPlayerRelationship(index);
            playerDisplayNames[this.formatPlayerNameWithRelationship(player)] = `${player.name} (${relationship})`;
        });
        
        // Create the header row with play numbers
        let display = '<div class="hand-display-header">';
        display += '<span class="player-label">Player</span>';
        for (let i = 1; i <= 7; i++) {
            display += `<span class="play-number">[   ${i}   ]</span>`;
        }
        display += '</div>';
        
        // Create a row for each player showing their dominoes in play order
        this.players.forEach((player, playerIndex) => {
            const playerName = this.formatPlayerNameWithRelationship(player);
            const displayName = playerDisplayNames[playerName];
            
            display += '<div class="hand-display-row">';
            display += `<span class="player-name">${displayName}:</span>`;
            
            // Find all plays by this player in this hand
            const playerPlays = [];
            hand.tricks.forEach(trick => {
                trick.playerPlays.forEach(play => {
                    if (play.playerIdx === playerIndex) {
                        playerPlays.push({
                            domino: play.domino,
                            trickNum: trick.trickNum
                        });
                    }
                });
            });
            
            // Sort plays by trick number to get chronological order
            playerPlays.sort((a, b) => a.trickNum - b.trickNum);
            
            // Display dominoes in play order
            for (let i = 0; i < 7; i++) {
                if (i < playerPlays.length) {
                    const play = playerPlays[i];
                    const mod = play.domino.modulate(hand.trump, null);
                    display += `<span class="domino-display">[ ${mod[0]}-${mod[1]} ]</span>`;
                } else {
                    display += '<span class="domino-display">[     ]</span>';
                }
            }
            
            display += '</div>';
        });
        
        return display;
    }
}

// Initialize the game when the page loads
let game;

document.addEventListener('DOMContentLoaded', function() {
    game = new Game();
}); 