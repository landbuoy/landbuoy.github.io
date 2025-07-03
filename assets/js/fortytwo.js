// 42 Domino Game JavaScript Implementation

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
                const currentDegree = current.domino.ends[0] === this.currentSuit ? 
                    current.domino.ends[1] : current.domino.ends[0];
                const bestDegree = best.domino.ends[0] === this.currentSuit ? 
                    best.domino.ends[1] : best.domino.ends[0];
                return currentDegree > bestDegree ? current : best;
            });
        }
        
        return this.playedDominoes[0];
    }
}

class Game42 {
    constructor() {
        this.players = [
            new Player("You", true),
            new Player("Wood Thrush", false),
            new Player("Musician Wren", false),
            new Player("Superb Lyrebird", false)
        ];
        
        this.scores = [0, 0]; // Us, Them
        this.currentHand = 0;
        this.gameState = 'waiting'; // waiting, bidding, playing, finished
        this.currentBid = 0;
        this.bidWinner = null;
        this.trump = null;
        this.currentLeader = 0;
        this.trickState = null;
        this.handPoints = [0, 0]; // Us, Them
        this.tricksPlayed = 0;
        
        this.initializeUI();
        this.bindEvents();
    }
    
    initializeUI() {
        // Update player names
        document.getElementById('player1Name').textContent = this.players[1].name;
        document.getElementById('player2Name').textContent = this.players[2].name;
        document.getElementById('player3Name').textContent = this.players[3].name;
        
        this.updateScores();
        this.updateGameInfo();
        this.updateControls();
    }
    
    bindEvents() {
        // Modal events
        $('.button--rules').click(() => {
            $('.modalContainer--rules').fadeIn().css('zIndex', '9999');
        });
        
        $('.aquaButton--rules').click(() => {
            $('.modalContainer--rules').fadeOut();
        });
        
        $('.button--newGame').click(() => {
            this.startNewGame();
        });
        
        // Game control events
        $('#startGame').click(() => this.startNewGame());
        $('#dealHand').click(() => this.dealHand());
        $('#makeBid').click(() => this.startBidding());
        $('#playDomino').click(() => this.playSelectedDomino());
        
        // Bidding events
        $('.bidOption').click((e) => {
            const bid = $(e.target).data('bid');
            this.makeBid(bid);
        });
        
        // Trump selection events
        $('.trumpOption').click((e) => {
            const trump = parseInt($(e.target).data('trump'));
            this.selectTrump(trump);
        });
        
        // Domino selection events
        $(document).on('click', '.domino', (e) => {
            this.selectDomino(e.target);
        });
    }
    
    startNewGame() {
        this.scores = [0, 0];
        this.currentHand = 0;
        this.gameState = 'waiting';
        this.updateScores();
        this.updateGameInfo();
        this.updateControls();
        this.clearTrickArea();
        this.clearHumanHand();
        this.updateAIHands();
        
        $('#dealHand').prop('disabled', false);
        $('#makeBid').prop('disabled', true);
        $('#playDomino').prop('disabled', true);
    }
    
    dealHand() {
        // Create all dominoes
        const allDominoes = [];
        for (let a = 0; a <= 6; a++) {
            for (let b = a; b <= 6; b++) {
                allDominoes.push(new Domino(a, b));
            }
        }
        
        // Shuffle
        for (let i = allDominoes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allDominoes[i], allDominoes[j]] = [allDominoes[j], allDominoes[i]];
        }
        
        // Deal 7 to each player
        this.players.forEach((player, i) => {
            player.hand = allDominoes.slice(i * 7, (i + 1) * 7);
            player.sortHand();
        });
        
        this.gameState = 'bidding';
        this.currentBid = 0;
        this.bidWinner = null;
        this.trump = null;
        this.currentLeader = 0;
        this.handPoints = [0, 0];
        this.tricksPlayed = 0;
        
        this.displayHumanHand();
        this.updateAIHands();
        this.updateGameInfo();
        this.updateControls();
        
        $('#dealHand').prop('disabled', true);
        $('#makeBid').prop('disabled', false);
    }
    
    startBidding() {
        this.showBiddingModal();
    }
    
    showBiddingModal() {
        const evalResult = this.players[0].evaluateBidConfidence();
        $('#suggestedTrump').text(evalResult.trump);
        $('#modalCurrentBid').text(this.currentBid);
        
        // Enable/disable bid options
        $('.bidOption').each(function() {
            const bid = $(this).data('bid');
            if (bid === 'pass') {
                $(this).removeClass('disabled');
            } else {
                const bidValue = parseInt(bid);
                if (bidValue > evalResult.maxBid || bidValue <= this.currentBid) {
                    $(this).addClass('disabled');
                } else {
                    $(this).removeClass('disabled');
                }
            }
        });
        
        $('.modalContainer--bidding').fadeIn().css('zIndex', '9999');
    }
    
    makeBid(bid) {
        $('.modalContainer--bidding').fadeOut();
        
        if (bid === 'pass') {
            this.processAIBidding();
        } else {
            this.currentBid = bid;
            this.bidWinner = 0;
            this.showTrumpModal();
        }
    }
    
    processAIBidding() {
        // Simple AI bidding
        for (let i = 1; i < 4; i++) {
            const evalResult = this.players[i].evaluateBidConfidence();
            if (evalResult.maxBid > this.currentBid) {
                this.currentBid = evalResult.maxBid;
                this.bidWinner = i;
            }
        }
        
        if (this.bidWinner === null) {
            // All passed, last player gets it for 30
            this.currentBid = 30;
            this.bidWinner = 3;
        }
        
        if (this.bidWinner === 0) {
            this.showTrumpModal();
        } else {
            // AI selects trump
            const evalResult = this.players[this.bidWinner].evaluateBidConfidence();
            this.selectTrump(evalResult.trump);
        }
    }
    
    showTrumpModal() {
        $('.modalContainer--trump').fadeIn().css('zIndex', '9999');
    }
    
    selectTrump(trump) {
        $('.modalContainer--trump').fadeOut();
        
        this.trump = trump;
        this.currentLeader = this.bidWinner;
        this.gameState = 'playing';
        this.trickState = new TrickState(this.currentLeader, this.trump);
        
        this.updateGameInfo();
        this.updateControls();
        this.updateValidPlays();
        
        if (this.currentLeader !== 0) {
            this.playAITurn();
        }
    }
    
    updateValidPlays() {
        if (this.gameState !== 'playing') return;
        
        const validPlays = this.players[0].getValidPlays(this.trickState);
        $('.domino').removeClass('valid invalid');
        
        this.players[0].hand.forEach((domino, index) => {
            const dominoElement = $(`.domino[data-index="${index}"]`);
            if (validPlays.includes(domino)) {
                dominoElement.addClass('valid');
            } else {
                dominoElement.addClass('invalid');
            }
        });
    }
    
    selectDomino(element) {
        if (this.gameState !== 'playing') return;
        
        $('.domino').removeClass('selected');
        $(element).addClass('selected');
        
        $('#playDomino').prop('disabled', false);
    }
    
    playSelectedDomino() {
        const selectedElement = $('.domino.selected');
        if (selectedElement.length === 0) return;
        
        const index = parseInt(selectedElement.data('index'));
        const domino = this.players[0].hand[index];
        
        this.playDomino(0, domino);
    }
    
    playDomino(playerIdx, domino) {
        // Remove from hand
        this.players[playerIdx].hand.splice(this.players[playerIdx].hand.indexOf(domino), 1);
        
        // Add to trick
        this.trickState.addPlay(domino, playerIdx);
        
        // Display in trick area
        this.displayDominoInTrick(domino, playerIdx);
        
        // Update displays
        this.updateHumanHand();
        this.updateAIHands();
        
        // Check if trick is complete
        if (this.trickState.playedDominoes.length === 4) {
            this.completeTrick();
        } else {
            // Next player's turn
            const nextPlayer = (this.currentLeader + this.trickState.playedDominoes.length) % 4;
            if (nextPlayer !== 0) {
                setTimeout(() => this.playAITurn(), 1000);
            } else {
                this.updateValidPlays();
            }
        }
    }
    
    playAITurn() {
        const playerIdx = (this.currentLeader + this.trickState.playedDominoes.length) % 4;
        const player = this.players[playerIdx];
        
        const domino = player.chooseDomino(this.trickState);
        this.playDomino(playerIdx, domino);
    }
    
    completeTrick() {
        const winningPlay = this.trickState.getWinningPlay();
        const winner = winningPlay.playerIdx;
        const team = winner % 2 === 0 ? 0 : 1; // Us = 0,2; Them = 1,3
        
        // Award points
        this.handPoints[team] += this.trickState.pointsInTrick + 1; // +1 for winning trick
        
        // Display winner
        $('#trickWinner').text(`${this.players[winner].name} wins the trick!`);
        
        // Update displays
        this.updateGameInfo();
        
        // Check for hand end
        const bidTeam = this.bidWinner % 2 === 0 ? 0 : 1;
        const setTeam = 1 - bidTeam;
        
        if (this.handPoints[bidTeam] >= this.currentBid || 
            this.handPoints[setTeam] > (42 - this.currentBid) ||
            this.tricksPlayed >= 6) {
            this.endHand();
        } else {
            // Start next trick
            this.tricksPlayed++;
            this.currentLeader = winner;
            this.trickState = new TrickState(this.currentLeader, this.trump);
            this.clearTrickArea();
            
            if (this.currentLeader !== 0) {
                setTimeout(() => this.playAITurn(), 1000);
            } else {
                this.updateValidPlays();
            }
        }
    }
    
    endHand() {
        const bidTeam = this.bidWinner % 2 === 0 ? 0 : 1;
        const setTeam = 1 - bidTeam;
        
        if (this.handPoints[bidTeam] >= this.currentBid) {
            this.scores[bidTeam]++;
        } else {
            this.scores[setTeam]++;
        }
        
        this.updateScores();
        
        // Check for game end
        if (this.scores[0] >= 7 || this.scores[1] >= 7) {
            this.endGame();
        } else {
            this.gameState = 'waiting';
            this.updateGameInfo();
            this.updateControls();
            $('#dealHand').prop('disabled', false);
        }
    }
    
    endGame() {
        const winner = this.scores[0] >= 7 ? 'Us' : 'Them';
        alert(`Game Over! ${winner} wins!`);
        this.gameState = 'finished';
        this.updateControls();
    }
    
    // UI Update Methods
    updateScores() {
        $('#scoreUs').text(this.scores[0]);
        $('#scoreThem').text(this.scores[1]);
    }
    
    updateGameInfo() {
        if (this.gameState === 'waiting') {
            $('#currentBid').text('No bid yet');
            $('#trumpSuit').text('No trump');
            $('#currentLeader').text('Waiting...');
        } else if (this.gameState === 'bidding') {
            $('#currentBid').text(`Current bid: ${this.currentBid}`);
            $('#trumpSuit').text('No trump');
            $('#currentLeader').text('Bidding...');
        } else if (this.gameState === 'playing') {
            $('#currentBid').text(`Bid: ${this.currentBid}`);
            $('#trumpSuit').text(`Trump: ${this.trump}'s`);
            $('#currentLeader').text(`Leader: ${this.players[this.currentLeader].name}`);
        }
    }
    
    updateControls() {
        $('#startGame').prop('disabled', this.gameState === 'playing');
        $('#dealHand').prop('disabled', this.gameState !== 'waiting');
        $('#makeBid').prop('disabled', this.gameState !== 'bidding');
        $('#playDomino').prop('disabled', this.gameState !== 'playing');
    }
    
    displayHumanHand() {
        const handContainer = $('#humanHand');
        handContainer.empty();
        
        this.players[0].hand.forEach((domino, index) => {
            const dominoElement = $('<div>')
                .addClass('domino')
                .attr('data-index', index)
                .text(domino.toString())
                .attr('data-dots', domino.ends[0])
                .attr('data-dots2', domino.ends[1]);
            
            handContainer.append(dominoElement);
        });
    }
    
    updateHumanHand() {
        this.displayHumanHand();
        this.updateValidPlays();
    }
    
    updateAIHands() {
        [1, 2, 3].forEach(i => {
            const count = this.players[i].hand.length;
            $(`#player${i}Hand .dominoCount`).text(`${count} dominoes`);
        });
    }
    
    displayDominoInTrick(domino, playerIdx) {
        const trickContainer = $('#playedDominoes');
        const dominoElement = $('<div>')
            .addClass('domino played')
            .text(domino.toString())
            .attr('data-dots', domino.ends[0])
            .attr('data-dots2', domino.ends[1]);
        
        trickContainer.append(dominoElement);
    }
    
    clearTrickArea() {
        $('#playedDominoes').empty();
        $('#trickWinner').text('');
    }
    
    clearHumanHand() {
        $('#humanHand').empty();
    }
}

// Initialize game when page loads
$(document).ready(function() {
    // Apply the same color scheme as the main site
    function randomColor() {
        const color = Math.floor(Math.random() * 0x1000000).toString(16);
        return "#" + ("000000" + color).slice(-6);
    }
    
    function invertColor(hexTripletColor) {
        const color = parseInt(hexTripletColor.substring(1), 16);
        const inverted = (0xFFFFFF ^ color).toString(16);
        return "#" + ("000000" + inverted).slice(-6);
    }
    
    const c1 = randomColor();
    const c2 = invertColor(c1);
    
    $('.mainContainer').css('background-color', c1);
    $('.logoContainer').css('color', c2);
    $('.modalContainer--rules').css('box-shadow', '0px 0px 32px' + c2);
    $('.modalContainer--bidding').css('box-shadow', '0px 0px 32px' + c2);
    $('.modalContainer--trump').css('box-shadow', '0px 0px 32px' + c2);
    
    // Initialize the game
    window.game42 = new Game42();
}); 