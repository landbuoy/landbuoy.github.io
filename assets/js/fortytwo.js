// 42 Domino Game JavaScript Implementation

// Songbird names from 7 biomes around the world (same as Python version)
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

class Domino {
    constructor(a, b) {
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
    
    getSuit(trump) {
        if (this.isTrump(trump)) {
            return trump;
        }
        return this.ends[0];
    }
    
    getDegree(trump) {
        if (this.isTrump(trump)) {
            return this.ends[0] === trump ? this.ends[1] : this.ends[0];
        }
        return this.ends[1];
    }
    
    canFollowSuit(suit, trump) {
        if (this.isDouble()) {
            return this.ends[0] === suit;
        }
        if (this.isTrump(trump)) {
            return suit === trump;
        }
        return this.ends.includes(suit);
    }
    
    isCountDomino() {
        const countDominoes = [[5, 5], [4, 6], [0, 5], [1, 4], [2, 3]];
        return countDominoes.some(([a, b]) => 
            (this.ends[0] === a && this.ends[1] === b) || 
            (this.ends[0] === b && this.ends[1] === a)
        );
    }
    
    getCountValue() {
        if (this.ends[0] === 5 && this.ends[1] === 5) return 10;
        if ((this.ends[0] === 4 && this.ends[1] === 6) || 
            (this.ends[0] === 6 && this.ends[1] === 4)) return 10;
        if ((this.ends[0] === 0 && this.ends[1] === 5) || 
            (this.ends[0] === 5 && this.ends[1] === 0)) return 5;
        if ((this.ends[0] === 1 && this.ends[1] === 4) || 
            (this.ends[0] === 4 && this.ends[1] === 1)) return 5;
        if ((this.ends[0] === 2 && this.ends[1] === 3) || 
            (this.ends[0] === 3 && this.ends[1] === 2)) return 5;
        return 0;
    }
}

class Player {
    constructor(name, isHuman = false) {
        this.name = name;
        this.isHuman = isHuman;
        this.hand = [];
        this.tricksWon = [];
    }
    
    sortHand() {
        this.hand.sort((a, b) => {
            if (a.ends[0] !== b.ends[0]) return a.ends[0] - b.ends[0];
            return a.ends[1] - b.ends[1];
        });
    }
    
    getValidPlays(trickState) {
        if (!trickState.currentSuit) {
            return this.hand;
        }
        
        const valid = this.hand.filter(d => d.canFollowSuit(trickState.currentSuit, trickState.trump));
        return valid.length > 0 ? valid : this.hand;
    }
    
    evaluateBidConfidence() {
        const suitCount = {};
        const doubles = [];
        
        // Count dominoes by suit
        this.hand.forEach(d => {
            suitCount[d.ends[0]] = (suitCount[d.ends[0]] || 0) + 1;
            suitCount[d.ends[1]] = (suitCount[d.ends[1]] || 0) + 1;
            if (d.isDouble()) doubles.push(d);
        });
        
        // Find best trump suit
        let bestSuit = 0;
        let bestScore = 0;
        
        for (let suit = 0; suit <= 6; suit++) {
            let score = 0;
            const trumpDominoes = this.hand.filter(d => d.isTrump(suit));
            score += trumpDominoes.length;
            
            if (trumpDominoes.some(d => d.isDouble())) {
                score += 3; // Bonus for trump double
            }
            
            if (suit === 5 && !this.hand.some(d => d.isDouble() && d.ends[0] === 5)) {
                score = 0; // Don't pick 5s without 5-5
            }
            
            if (score > bestScore) {
                bestScore = score;
                bestSuit = suit;
            }
        }
        
        // Calculate confidence
        let confidence = 0;
        const trumpDominoes = this.hand.filter(d => d.isTrump(bestSuit));
        const doubleCount = doubles.length;
        const offs = this.hand.filter(d => !d.isTrump(bestSuit) && !d.isDouble()).length;
        
        if (trumpDominoes.some(d => d.isDouble())) {
            if (trumpDominoes.length >= 4 && doubleCount >= 1 && offs <= 2) {
                confidence = 2;
            } else if (trumpDominoes.length >= 3 && doubleCount >= 1) {
                confidence = 1;
            }
        } else {
            if (trumpDominoes.length >= 5 && doubleCount >= 2 && offs <= 1) {
                confidence = 2;
            } else if (trumpDominoes.length >= 4 && doubleCount >= 1) {
                confidence = 1;
            }
        }
        
        return {
            trump: bestSuit,
            confidence: confidence,
            maxBid: 30 + confidence
        };
    }
    
    chooseDomino(trickState) {
        const validPlays = this.getValidPlays(trickState);
        if (validPlays.length === 0) return null;
        
        // Simple AI: prefer non-count dominoes, then highest value
        const nonCount = validPlays.filter(d => !d.isCountDomino());
        const plays = nonCount.length > 0 ? nonCount : validPlays;
        
        return plays.reduce((best, current) => {
            const bestValue = best.ends[0] + best.ends[1];
            const currentValue = current.ends[0] + current.ends[1];
            return currentValue > bestValue ? current : best;
        });
    }
}

class TrickState {
    constructor(leaderIdx, trump) {
        this.leaderIdx = leaderIdx;
        this.trump = trump;
        this.playedDominoes = [];
        this.currentSuit = null;
        this.pointsInTrick = 0;
    }
    
    addPlay(domino, playerIdx) {
        if (this.playedDominoes.length === 0) {
            this.currentSuit = domino.getSuit(this.trump);
        }
        this.playedDominoes.push({domino, playerIdx});
        this.pointsInTrick += domino.getCountValue();
    }
    
    getWinningPlay() {
        if (this.playedDominoes.length === 0) return null;
        
        // Check for trumps
        const trumps = this.playedDominoes.filter(p => p.domino.isTrump(this.trump));
        if (trumps.length > 0) {
            return trumps.reduce((best, current) => {
                if (current.domino.isDouble() && current.domino.isTrump(this.trump)) return current;
                if (best.domino.isDouble() && best.domino.isTrump(this.trump)) return best;
                return current.domino.getDegree(this.trump) > best.domino.getDegree(this.trump) ? current : best;
            });
        }
        
        // No trumps: highest of led suit wins
        const ledSuitDominoes = this.playedDominoes.filter(p => 
            p.domino.canFollowSuit(this.currentSuit, this.trump)
        );
        
        if (ledSuitDominoes.length > 0) {
            return ledSuitDominoes.reduce((best, current) => {
                if (current.domino.isDouble()) return current;
                if (best.domino.isDouble()) return best;
                
                // Get the degree of the led suit
                const currentDegree = current.domino.ends[0] === this.currentSuit ? 
                    current.domino.ends[1] : current.domino.ends[0];
                const bestDegree = best.domino.ends[0] === this.currentSuit ? 
                    best.domino.ends[1] : best.domino.ends[0];
                
                return currentDegree > bestDegree ? current : best;
            });
        }
        
        // First domino wins (shouldn't happen in legal play)
        return this.playedDominoes[0];
    }
}

class Game42 {
    constructor() {
        this.players = [];
        this.scores = [0, 0]; // [Us, Them]
        this.currentTrick = null;
        this.trump = null;
        this.bidWinner = null;
        this.winningBid = null;
        this.currentLeader = 0;
        this.gameState = 'waiting'; // waiting, bidding, playing, complete
        this.selectedDomino = null;
        this.trickHistory = []; // Store completed tricks
        this.currentHandTricks = []; // Store current hand's tricks
        
        this.initializePlayers();
        this.initializeUI();
        this.bindEvents();
    }
    
    initializePlayers() {
        // Shuffle songbird names and assign to players
        const shuffledNames = [...SONGBIRD_NAMES].sort(() => Math.random() - 0.5);
        
        this.players = [
            new Player(shuffledNames[0], true),  // Human player
            new Player(shuffledNames[1], false), // AI opponent
            new Player(shuffledNames[2], false), // AI partner
            new Player(shuffledNames[3], false)  // AI opponent
        ];
        
        // Update player names in UI
        this.updatePlayerNames();
    }
    
    updatePlayerNames() {
        // Update team info section
        document.getElementById('player0Info').querySelector('.playerName').textContent = 'You (Human)';
        document.getElementById('player1Name').textContent = this.players[1].name;
        document.getElementById('player2Name').textContent = this.players[2].name;
        document.getElementById('player3Name').textContent = this.players[3].name;
        
        // Update AI player sections
        document.getElementById('aiPlayer1Name').textContent = `${this.players[1].name} (Opponent)`;
        document.getElementById('aiPlayer2Name').textContent = `${this.players[2].name} (Partner)`;
        document.getElementById('aiPlayer3Name').textContent = `${this.players[3].name} (Opponent)`;
    }
    
    initializeUI() {
        this.updateScores();
        this.updateGameInfo();
        this.updateControls();
    }
    
    bindEvents() {
        // Control buttons
        document.getElementById('startGame').addEventListener('click', () => this.startNewGame());
        document.getElementById('dealHand').addEventListener('click', () => this.dealHand());
        document.getElementById('makeBid').addEventListener('click', () => this.startBidding());
        document.getElementById('playDomino').addEventListener('click', () => this.playSelectedDomino());
        
        // Modal buttons
        document.querySelector('.button--rules').addEventListener('click', () => {
            document.querySelector('.modalContainer--rules').style.display = 'block';
        });
        
        document.querySelector('.button--trickHistory').addEventListener('click', () => {
            this.showTrickHistory();
        });
        
        document.querySelector('.button--newGame').addEventListener('click', () => this.startNewGame());
        
        // Modal close buttons
        document.querySelector('.aquaButton--rules').addEventListener('click', () => {
            document.querySelector('.modalContainer--rules').style.display = 'none';
        });
        
        document.querySelector('.aquaButton--trickHistory').addEventListener('click', () => {
            document.querySelector('.modalContainer--trickHistory').style.display = 'none';
        });
        
        document.querySelector('.aquaButton--bidding').addEventListener('click', () => {
            document.querySelector('.modalContainer--bidding').style.display = 'none';
        });
        
        document.querySelector('.aquaButton--trump').addEventListener('click', () => {
            document.querySelector('.modalContainer--trump').style.display = 'none';
        });
        
        // Bid options
        document.querySelectorAll('.bidOption').forEach(option => {
            option.addEventListener('click', (e) => {
                const bid = e.target.dataset.bid;
                this.makeBid(bid === 'pass' ? 'pass' : parseInt(bid));
            });
        });
        
        // Trump options
        document.querySelectorAll('.trumpOption').forEach(option => {
            option.addEventListener('click', (e) => {
                const trump = parseInt(e.target.dataset.trump);
                this.selectTrump(trump);
            });
        });
    }
    
    startNewGame() {
        this.scores = [0, 0];
        this.gameState = 'waiting';
        this.trickHistory = [];
        this.currentHandTricks = [];
        this.initializePlayers();
        this.updateScores();
        this.updateGameInfo();
        this.updateControls();
        this.clearTrickArea();
        this.clearHumanHand();
        this.updateAIHands();
    }
    
    dealHand() {
        // Create all dominoes
        const dominoes = [];
        for (let a = 0; a <= 6; a++) {
            for (let b = a; b <= 6; b++) {
                dominoes.push(new Domino(a, b));
            }
        }
        
        // Shuffle and deal
        for (let i = dominoes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dominoes[i], dominoes[j]] = [dominoes[j], dominoes[i]];
        }
        
        // Deal 7 dominoes to each player
        this.players.forEach((player, index) => {
            player.hand = dominoes.slice(index * 7, (index + 1) * 7);
            player.sortHand();
        });
        
        this.gameState = 'bidding';
        this.updateGameInfo();
        this.updateControls();
        this.displayHumanHand();
        this.updateAIHands();
    }
    
    startBidding() {
        this.showBiddingModal();
    }
    
    showBiddingModal() {
        const evalResult = this.players[0].evaluateBidConfidence();
        document.getElementById('suggestedTrump').textContent = evalResult.trump;
        document.getElementById('modalCurrentBid').textContent = '30';
        document.querySelector('.modalContainer--bidding').style.display = 'block';
    }
    
    makeBid(bid) {
        document.querySelector('.modalContainer--bidding').style.display = 'none';
        
        // Process human bid
        this.processBidding(0, bid);
        
        // Process AI bidding
        this.processAIBidding();
        
        // Determine winner and continue
        this.determineBidWinner();
    }
    
    processBidding(playerIdx, bid) {
        // Store bid information
        if (!this.bidHistory) this.bidHistory = {};
        this.bidHistory[playerIdx] = bid;
    }
    
    processAIBidding() {
        let currentBid = 30;
        let highestBidder = null;
        
        // Process AI players (1, 2, 3)
        for (let i = 1; i < 4; i++) {
            const player = this.players[i];
            const evalResult = player.evaluateBidConfidence();
            
            let bid = 'pass';
            if (evalResult.maxBid > currentBid) {
                bid = evalResult.maxBid;
                currentBid = bid;
                highestBidder = i;
            }
            
            this.processBidding(i, bid);
        }
        
        // If no one bid, last player gets it for 30
        if (!highestBidder) {
            highestBidder = 3;
            this.bidHistory[3] = 30;
        }
        
        this.bidWinner = highestBidder;
        this.winningBid = this.bidHistory[highestBidder];
    }
    
    determineBidWinner() {
        if (this.bidWinner === 0) {
            // Human won the bid
            this.showTrumpModal();
        } else {
            // AI won the bid
            const aiPlayer = this.players[this.bidWinner];
            const evalResult = aiPlayer.evaluateBidConfidence();
            this.selectTrump(evalResult.trump);
        }
    }
    
    showTrumpModal() {
        document.querySelector('.modalContainer--trump').style.display = 'block';
    }
    
    selectTrump(trump) {
        document.querySelector('.modalContainer--trump').style.display = 'none';
        this.trump = trump;
        this.currentLeader = this.bidWinner;
        this.gameState = 'playing';
        this.currentTrick = new TrickState(this.currentLeader, this.trump);
        
        this.updateGameInfo();
        this.updateControls();
        this.updateValidPlays();
        
        // Start the first trick
        if (this.currentLeader !== 0) {
            this.playAITurn();
        }
    }
    
    updateValidPlays() {
        if (this.gameState !== 'playing') return;
        
        const validPlays = this.players[0].getValidPlays(this.currentTrick);
        const humanHand = document.getElementById('humanHand');
        
        humanHand.querySelectorAll('.domino').forEach(dominoEl => {
            const domino = this.players[0].hand.find(d => 
                d.ends[0] === parseInt(dominoEl.dataset.left) && 
                d.ends[1] === parseInt(dominoEl.dataset.right)
            );
            
            if (validPlays.includes(domino)) {
                dominoEl.classList.add('valid');
                dominoEl.classList.remove('invalid');
            } else {
                dominoEl.classList.add('invalid');
                dominoEl.classList.remove('valid');
            }
        });
    }
    
    selectDomino(element) {
        if (element.classList.contains('invalid')) return;
        
        // Remove previous selection
        document.querySelectorAll('.domino.selected').forEach(d => d.classList.remove('selected'));
        
        // Select new domino
        element.classList.add('selected');
        this.selectedDomino = this.players[0].hand.find(d => 
            d.ends[0] === parseInt(element.dataset.left) && 
            d.ends[1] === parseInt(element.dataset.right)
        );
    }
    
    playSelectedDomino() {
        if (!this.selectedDomino || this.gameState !== 'playing') return;
        
        this.playDomino(0, this.selectedDomino);
        this.selectedDomino = null;
        
        // Continue with AI turns
        setTimeout(() => this.playAITurn(), 1000);
    }
    
    playDomino(playerIdx, domino) {
        // Remove domino from player's hand
        const player = this.players[playerIdx];
        const dominoIndex = player.hand.findIndex(d => 
            d.ends[0] === domino.ends[0] && d.ends[1] === domino.ends[1]
        );
        player.hand.splice(dominoIndex, 1);
        
        // Add to current trick
        this.currentTrick.addPlay(domino, playerIdx);
        
        // Display in trick area
        this.displayDominoInTrick(domino, playerIdx);
        
        // Update player hands
        if (playerIdx === 0) {
            this.updateHumanHand();
        } else {
            this.updateAIHands();
        }
        
        // Check if trick is complete
        if (this.currentTrick.playedDominoes.length === 4) {
            setTimeout(() => this.completeTrick(), 1000);
        }
    }
    
    playAITurn() {
        if (this.gameState !== 'playing') return;
        
        // Find next AI player to play
        let nextPlayer = null;
        for (let i = 1; i < 4; i++) {
            const playerIdx = (this.currentLeader + i) % 4;
            if (playerIdx !== 0 && this.players[playerIdx].hand.length > 0) {
                const hasPlayed = this.currentTrick.playedDominoes.some(p => p.playerIdx === playerIdx);
                if (!hasPlayed) {
                    nextPlayer = playerIdx;
                    break;
                }
            }
        }
        
        if (nextPlayer !== null) {
            const player = this.players[nextPlayer];
            const chosenDomino = player.chooseDomino(this.currentTrick);
            
            if (chosenDomino) {
                setTimeout(() => {
                    this.playDomino(nextPlayer, chosenDomino);
                }, 500);
            }
        }
    }
    
    completeTrick() {
        const winningPlay = this.currentTrick.getWinningPlay();
        const winner = this.players[winningPlay.playerIdx];
        
        // Add trick to history
        this.currentHandTricks.push({
            trick: this.currentTrick,
            winner: winningPlay.playerIdx,
            points: this.currentTrick.pointsInTrick + 1
        });
        
        // Display winner
        document.getElementById('trickWinner').textContent = `${winner.name} wins the trick!`;
        
        // Update scores
        const team = winningPlay.playerIdx % 2 === 0 ? 0 : 1; // 0,2 = Us, 1,3 = Them
        this.scores[team]++;
        
        this.updateScores();
        
        // Check if hand is over
        if (this.players[0].hand.length === 0) {
            setTimeout(() => this.endHand(), 2000);
        } else {
            // Start next trick
            this.currentLeader = winningPlay.playerIdx;
            this.currentTrick = new TrickState(this.currentLeader, this.trump);
            this.updateGameInfo();
            this.updateValidPlays();
            
            // Clear trick area
            setTimeout(() => {
                this.clearTrickArea();
                if (this.currentLeader !== 0) {
                    this.playAITurn();
                }
            }, 1500);
        }
    }
    
    endHand() {
        // Add current hand tricks to overall history
        this.trickHistory.push([...this.currentHandTricks]);
        this.currentHandTricks = [];
        
        // Check for game end
        if (this.scores[0] >= 7 || this.scores[1] >= 7) {
            this.endGame();
        } else {
            // Start new hand
            this.gameState = 'waiting';
            this.updateGameInfo();
            this.updateControls();
            this.clearTrickArea();
            this.clearHumanHand();
            this.updateAIHands();
        }
    }
    
    endGame() {
        const winner = this.scores[0] >= 7 ? 'Us' : 'Them';
        alert(`Game Over! Team ${winner} wins!`);
        this.gameState = 'complete';
        this.updateControls();
    }
    
    updateScores() {
        document.getElementById('scoreUs').textContent = this.scores[0];
        document.getElementById('scoreThem').textContent = this.scores[1];
    }
    
    updateGameInfo() {
        const bidInfo = this.bidWinner !== null ? 
            `${this.players[this.bidWinner].name} won with ${this.winningBid}` : 
            'No bid yet';
        
        const trumpInfo = this.trump !== null ? `${this.trump}'s` : 'No trump';
        const leaderInfo = this.currentLeader !== null ? 
            this.players[this.currentLeader].name : 'Waiting...';
        
        document.getElementById('currentBid').textContent = bidInfo;
        document.getElementById('trumpSuit').textContent = trumpInfo;
        document.getElementById('currentLeader').textContent = leaderInfo;
    }
    
    updateControls() {
        const startBtn = document.getElementById('startGame');
        const dealBtn = document.getElementById('dealHand');
        const bidBtn = document.getElementById('makeBid');
        const playBtn = document.getElementById('playDomino');
        
        startBtn.disabled = false;
        dealBtn.disabled = this.gameState !== 'waiting';
        bidBtn.disabled = this.gameState !== 'bidding';
        playBtn.disabled = this.gameState !== 'playing' || !this.selectedDomino;
    }
    
    displayHumanHand() {
        const humanHand = document.getElementById('humanHand');
        humanHand.innerHTML = '';
        
        this.players[0].hand.forEach(domino => {
            const dominoEl = document.createElement('div');
            dominoEl.className = 'domino';
            dominoEl.dataset.left = domino.ends[0];
            dominoEl.dataset.right = domino.ends[1];
            dominoEl.textContent = `${domino.ends[0]}-${domino.ends[1]}`;
            
            dominoEl.addEventListener('click', () => this.selectDomino(dominoEl));
            humanHand.appendChild(dominoEl);
        });
    }
    
    updateHumanHand() {
        this.displayHumanHand();
        this.updateValidPlays();
    }
    
    updateAIHands() {
        // Update domino counts for AI players
        for (let i = 1; i < 4; i++) {
            const count = this.players[i].hand.length;
            document.getElementById(`player${i}Hand`).querySelector('.dominoCount').textContent = 
                `${count} dominoes`;
        }
    }
    
    displayDominoInTrick(domino, playerIdx) {
        const playedDominoes = document.getElementById('playedDominoes');
        const dominoEl = document.createElement('div');
        dominoEl.className = 'domino played';
        dominoEl.dataset.left = domino.ends[0];
        dominoEl.dataset.right = domino.ends[1];
        dominoEl.textContent = `${domino.ends[0]}-${domino.ends[1]}`;
        
        // Add player name
        const playerName = document.createElement('div');
        playerName.textContent = this.players[playerIdx].name;
        playerName.style.fontSize = '10px';
        playerName.style.marginTop = '5px';
        playerName.style.color = '#00ff00';
        
        const container = document.createElement('div');
        container.style.textAlign = 'center';
        container.appendChild(dominoEl);
        container.appendChild(playerName);
        
        playedDominoes.appendChild(container);
    }
    
    clearTrickArea() {
        document.getElementById('playedDominoes').innerHTML = '';
        document.getElementById('trickWinner').textContent = '';
    }
    
    clearHumanHand() {
        document.getElementById('humanHand').innerHTML = '';
    }
    
    showTrickHistory() {
        const table = document.getElementById('trickHistoryTable');
        table.innerHTML = '';
        
        if (this.trickHistory.length === 0) {
            table.innerHTML = '<tr><td colspan="5">No tricks played yet</td></tr>';
            document.querySelector('.modalContainer--trickHistory').style.display = 'block';
            return;
        }
        
        // Create header
        const header = document.createElement('tr');
        header.innerHTML = `
            <th>Trick</th>
            <th>${this.players[0].name} (You)</th>
            <th>${this.players[1].name}</th>
            <th>${this.players[2].name}</th>
            <th>${this.players[3].name}</th>
        `;
        table.appendChild(header);
        
        // Add each hand's tricks
        this.trickHistory.forEach((hand, handIndex) => {
            hand.forEach((trickData, trickIndex) => {
                const row = document.createElement('tr');
                const trickNumber = handIndex * 7 + trickIndex + 1;
                
                // Create trick number cell
                const trickCell = document.createElement('td');
                trickCell.className = 'trickNumber';
                trickCell.textContent = trickNumber;
                row.appendChild(trickCell);
                
                // Create cells for each player
                for (let playerIdx = 0; playerIdx < 4; playerIdx++) {
                    const cell = document.createElement('td');
                    cell.className = 'dominoCell';
                    
                    // Find this player's play in the trick
                    const play = trickData.trick.playedDominoes.find(p => p.playerIdx === playerIdx);
                    if (play) {
                        const dominoEl = document.createElement('div');
                        dominoEl.className = 'dominoInHistory';
                        dominoEl.dataset.left = play.domino.ends[0];
                        dominoEl.dataset.right = play.domino.ends[1];
                        dominoEl.textContent = `${play.domino.ends[0]}-${play.domino.ends[1]}`;
                        cell.appendChild(dominoEl);
                        
                        // Highlight winner
                        if (playerIdx === trickData.winner) {
                            cell.classList.add('winner');
                        }
                    }
                    
                    row.appendChild(cell);
                }
                
                table.appendChild(row);
            });
        });
        
        document.querySelector('.modalContainer--trickHistory').style.display = 'block';
    }
}

// Utility functions
function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function invertColor(hexTripletColor) {
    const color = hexTripletColor;
    const colorNum = color.replace("#","");
    const r = parseInt(colorNum.substr(0,2),16);
    const g = parseInt(colorNum.substr(2,2),16);
    const b = parseInt(colorNum.substr(4,2),16);
    const rInv = 255 - r;
    const gInv = 255 - g;
    const bInv = 255 - b;
    return "#" + rInv.toString(16).padStart(2, '0') + gInv.toString(16).padStart(2, '0') + bInv.toString(16).padStart(2, '0');
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game42 = new Game42();
}); 