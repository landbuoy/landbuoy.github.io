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
    "Himalayan Rubythroat", "White-browed Rosefinch", "Alpine Chough",
    
    // Additional Bird
    "Common Waxbill"
];

// Planet names for player identification
const PLANET_NAMES = [
    "Sun",
    "Moon", 
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto"
];

// Domino to Bird mapping based on the specified associations
const DOMINO_BIRD_MAP = {
    // 6-x dominoes
    "6-6": "Wood Thrush",
    "6-5": "Black-throated Blue Warbler", 
    "6-4": "Scarlet Tanager",
    "6-3": "Rose-breasted Grosbeak",
    "6-2": "Veery",
    "6-1": "Hermit Thrush",
    "6-0": "Black-capped Chickadee",
    
    // 5-x dominoes
    "5-6": "Musician Wren",
    "5-5": "Screaming Piha",
    "5-4": "White-bellied Antbird",
    "5-3": "Amazonian Umbrellabird",
    "5-2": "Spix's Guan",
    "5-1": "Hoatzin",
    "5-0": "Amazonian Royal Flycatcher",
    
    // 4-x dominoes
    "4-6": "Superb Lyrebird",
    "4-5": "Australian Magpie",
    "4-4": "Pied Butcherbird",
    "4-3": "Grey Shrike-thrush",
    "4-2": "Rufous Whistler",
    "4-1": "Golden Whistler",
    "4-0": "Eastern Whipbird",
    
    // 3-x dominoes
    "3-6": "African Grey Hornbill",
    "3-5": "Lilac-breasted Roller",
    "3-4": "Red-billed Oxpecker",
    "3-3": "Superb Starling",
    "3-2": "Fiscal Shrike",
    "3-1": "Yellow-billed Hornbill",
    "3-0": "Red-chested Cuckoo",
    
    // 2-x dominoes
    "2-6": "Siberian Rubythroat",
    "2-5": "Bluethroat",
    "2-4": "Pallas's Leaf Warbler",
    "2-3": "Siberian Accentor",
    "2-2": "Red-flanked Bluetail",
    "2-1": "Siberian Jay",
    "2-0": "Pine Grosbeak",
    
    // 1-x dominoes
    "1-6": "Common Nightingale",
    "1-5": "European Robin",
    "1-4": "Blackcap",
    "1-3": "Sardinian Warbler",
    "1-2": "Subalpine Warbler",
    "1-1": "Cirl Bunting",
    "1-0": "Thekla Lark",
    
    // 0-x dominoes
    "0-6": "Himalayan Monal",
    "0-5": "Blood Pheasant",
    "0-4": "Himalayan Bulbul",
    "0-3": "Rufous-breasted Accentor",
    "0-2": "Himalayan Rubythroat",
    "0-1": "White-browed Rosefinch",
    "0-0": "Alpine Chough"
};

// Consolidated Game Table Window Manager
class GameTableWindowManager {
    constructor(game) {
        this.game = game;
        this.gameTableWindow = null;
        this.isOpen = false;
        this.playerAudio = [null, null, null, null]; // Audio objects for each player
        this.imagePaths = null;
        this.loadImagePaths();
    }
    
    async loadImagePaths() {
        try {
            const response = await fetch('../assets/img/songbirds/songbird_image_paths.json');
            this.imagePaths = await response.json();
        } catch (error) {
            console.warn('Could not load songbird image paths:', error);
            // Provide fallback image paths for local development
            this.imagePaths = {
                "Wood Thrush": "../assets/img/songbirds/Wood_Thrush.jpg",
                "Black-throated Blue Warbler": "../assets/img/songbirds/Black_throated_Blue_Warbler.jpg",
                "Scarlet Tanager": "../assets/img/songbirds/Scarlet_Tanager.jpg",
                "Rose-breasted Grosbeak": "../assets/img/songbirds/Rose_breasted_Grosbeak.jpg",
                "Veery": "../assets/img/songbirds/Veery.jpg",
                "Hermit Thrush": "../assets/img/songbirds/Hermit_Thrush.jpg",
                "Black-capped Chickadee": "../assets/img/songbirds/Black_capped_Chickadee.jpg",
                "Musician Wren": "../assets/img/songbirds/Musician_Wren.jpg",
                "Screaming Piha": "../assets/img/songbirds/Screaming_Piha.jpg",
                "White-bellied Antbird": "../assets/img/songbirds/White_bellied_Antbird.jpg",
                "Amazonian Umbrellabird": "../assets/img/songbirds/Amazonian_Umbrellabird.jpg",
                "Spix's Guan": "../assets/img/songbirds/Spixs_Guan.jpg",
                "Hoatzin": "../assets/img/songbirds/Hoatzin.jpg",
                "Amazonian Royal Flycatcher": "../assets/img/songbirds/Amazonian_Royal_Flycatcher.jpg",
                "Superb Lyrebird": "../assets/img/songbirds/Superb_Lyrebird.jpg",
                "Australian Magpie": "../assets/img/songbirds/Australian_Magpie.jpg",
                "Pied Butcherbird": "../assets/img/songbirds/Pied_Butcherbird.jpg",
                "Grey Shrike-thrush": "../assets/img/songbirds/Grey_Shrike_thrush.jpg",
                "Rufous Whistler": "../assets/img/songbirds/Rufous_Whistler.jpg",
                "Golden Whistler": "../assets/img/songbirds/Golden_Whistler.jpg",
                "Eastern Whipbird": "../assets/img/songbirds/Eastern_Whipbird.jpg",
                "African Grey Hornbill": "../assets/img/songbirds/African_Grey_Hornbill.jpg",
                "Lilac-breasted Roller": "../assets/img/songbirds/Lilac_breasted_Roller.jpg",
                "Red-billed Oxpecker": "../assets/img/songbirds/Red_billed_Oxpecker.jpg",
                "Superb Starling": "../assets/img/songbirds/Superb_Starling.jpg",
                "Fiscal Shrike": "../assets/img/songbirds/Fiscal_Shrike.jpg",
                "Yellow-billed Hornbill": "../assets/img/songbirds/Yellow_billed_Hornbill.jpg",
                "Red-chested Cuckoo": "../assets/img/songbirds/Red_chested_Cuckoo.jpg",
                "Siberian Rubythroat": "../assets/img/songbirds/Siberian_Rubythroat.jpg",
                "Bluethroat": "../assets/img/songbirds/Bluethroat.jpg",
                "Pallas's Leaf Warbler": "../assets/img/songbirds/Pallass_Leaf_Warbler.jpg",
                "Siberian Accentor": "../assets/img/songbirds/Siberian_Accentor.jpg",
                "Red-flanked Bluetail": "../assets/img/songbirds/Red_flanked_Bluetail.jpg",
                "Siberian Jay": "../assets/img/songbirds/Siberian_Jay.jpg",
                "Pine Grosbeak": "../assets/img/songbirds/Pine_Grosbeak.jpg",
                "Common Nightingale": "../assets/img/songbirds/Common_Nightingale.jpg",
                "European Robin": "../assets/img/songbirds/European_Robin.jpg",
                "Blackcap": "../assets/img/songbirds/Blackcap.jpg",
                "Sardinian Warbler": "../assets/img/songbirds/Sardinian_Warbler.jpg",
                "Subalpine Warbler": "../assets/img/songbirds/Subalpine_Warbler.jpg",
                "Cirl Bunting": "../assets/img/songbirds/Cirl_Bunting.jpg",
                "Thekla Lark": "../assets/img/songbirds/Thekla_Lark.jpg",
                "Himalayan Monal": "../assets/img/songbirds/Himalayan_Monal.png",
                "Blood Pheasant": "../assets/img/songbirds/Blood_Pheasant.jpg",
                "Himalayan Bulbul": "../assets/img/songbirds/Himalayan_Bulbul.jpg",
                "Rufous-breasted Accentor": "../assets/img/songbirds/Rufous_breasted_Accentor.jpg",
                "Himalayan Rubythroat": "../assets/img/songbirds/Himalayan_Rubythroat.jpg",
                "White-browed Rosefinch": "../assets/img/songbirds/White_browed_Rosefinch.jpg",
                "Alpine Chough": "../assets/img/songbirds/Alpine_Chough.jpg",
                "Common Waxbill": "../assets/img/songbirds/Common_Waxbill.jpg"
            };
        }
    }
    
    getDominoBird(domino, trump, ledSuit) {
        // Determine the modal domino based on trump and led suit
        const modalDomino = domino.modulate(trump, ledSuit);
        const dominoKey = `${modalDomino[0]}-${modalDomino[1]}`;
        return DOMINO_BIRD_MAP[dominoKey] || "Unknown Bird";
    }
    
    getBirdAudioPath(birdName, playerRole) {
        const birdFolder = birdName.toLowerCase().replace(/[^a-z0-9]/g, '_');
        let recordingNumber = 1; // Default for LEADER
        
        if (playerRole === 'SUPPORTER') {
            recordingNumber = 2;
        } else if (playerRole === 'SETTER1' || playerRole === 'SETTER2') {
            recordingNumber = 3;
        }
        
        return `../assets/audio/birdsongs/downloads/${birdFolder}/${birdFolder}_recording_${recordingNumber}.mp3`;
    }
    
    async getBirdAudioPathWithFallback(birdName, playerRole) {
        const birdFolder = birdName.toLowerCase().replace(/[^a-z0-9]/g, '_');
        let preferredRecordingNumber = 1; // Default for LEADER
        
        if (playerRole === 'SUPPORTER') {
            preferredRecordingNumber = 2;
        } else if (playerRole === 'SETTER1' || playerRole === 'SETTER2') {
            preferredRecordingNumber = 3;
        }
        
        // Check if we're running from a file:// URL (which will cause CORS issues)
        const isFileProtocol = window.location.protocol === 'file:';
        
        if (isFileProtocol) {
            // When running from file://, just return the preferred path
            // The audio will fail to load gracefully if the file doesn't exist
            return `../assets/audio/birdsongs/downloads/${birdFolder}/${birdFolder}_recording_${preferredRecordingNumber}.mp3`;
        }
        
        // Try preferred recording first (only for http/https protocols)
        const preferredPath = `../assets/audio/birdsongs/downloads/${birdFolder}/${birdFolder}_recording_${preferredRecordingNumber}.mp3`;
        
        try {
            // Check if the preferred file exists
            const response = await fetch(preferredPath, { method: 'HEAD' });
            if (response.ok) {
                return preferredPath;
            }
        } catch (e) {
            // If fetch fails due to CORS or other issues, just return the preferred path
            // The audio will fail to load gracefully if the file doesn't exist
            console.warn(`Could not check if ${preferredPath} exists (CORS or network issue), using preferred path`);
            return preferredPath;
        }
        
        // Fallback to recording 1 if preferred doesn't exist
        return `../assets/audio/birdsongs/downloads/${birdFolder}/${birdFolder}_recording_1.mp3`;
    }
    
    playBirdAudio(audioPath, playerIndex) {
        // Stop current audio for this player if playing
        if (this.playerAudio[playerIndex]) {
            this.playerAudio[playerIndex].pause();
            this.playerAudio[playerIndex] = null;
        }
        
        // Create and play new audio for this player
        this.playerAudio[playerIndex] = new Audio(audioPath);
        this.playerAudio[playerIndex].loop = true;
        this.playerAudio[playerIndex].play().catch(e => console.warn(`Could not play audio for player ${playerIndex}:`, e));
    }
    
    stopBirdAudio(playerIndex = null) {
        if (playerIndex !== null) {
            // Stop audio for specific player
            if (this.playerAudio[playerIndex]) {
                this.playerAudio[playerIndex].pause();
                this.playerAudio[playerIndex] = null;
            }
        } else {
            // Stop all audio
            for (let i = 0; i < 4; i++) {
                if (this.playerAudio[i]) {
                    this.playerAudio[i].pause();
                    this.playerAudio[i] = null;
                }
            }
        }
    }
    
    playBirdAudioForPlayer(playerIndex) {
        // Play stored audio for this player when bird is revealed
        if (this.playerAudioPaths && this.playerAudioPaths[playerIndex]) {
            const audioPath = this.playerAudioPaths[playerIndex];
            this.playBirdAudio(audioPath, playerIndex);
        }
    }
    
    updateBidWinnerHeader(playerIndex, bid) {
        const nameElement = document.getElementById(`player-name-${playerIndex}`);
        if (nameElement) {
            // Get the original player name and relationship
            const player = this.game.players[playerIndex];
            const relationship = this.game.getPlayerRelationship(playerIndex);
            const originalName = `${player.name} (${relationship})`;
            
            // Update the name element to include the bid information
            nameElement.textContent = `${originalName} - won bid for: ${bid}`;
            nameElement.style.color = 'lime';
            nameElement.style.fontWeight = 'bold';
        }
    }
    
    updateGameTableHeader(trumpSuit, currentSuit = null) {
        const titleElement = this.gameTableWindow?.querySelector('.game-table-title');
        if (titleElement) {
            if (trumpSuit && currentSuit !== null) {
                titleElement.textContent = `Trumps: ${trumpSuit} -- Follow Suit: ${currentSuit}'s`;
            } else if (trumpSuit) {
                titleElement.textContent = `Trumps: ${trumpSuit}`;
            } else {
                titleElement.textContent = 'Game Table';
            }
        }
    }
    
    resetGameTableHeader() {
        const titleElement = this.gameTableWindow?.querySelector('.game-table-title');
        if (titleElement) {
            titleElement.textContent = 'Game Table -- Bidding';
        }
    }
    
    showPlayNextTrickButton() {
        const playNextTrickBtn = this.gameTableWindow?.querySelector('#game-table-play-next-trick-btn');
        if (playNextTrickBtn) {
            playNextTrickBtn.style.display = 'inline-block';
            playNextTrickBtn.onclick = () => {
                this.hidePlayNextTrickButton();
                this.game.playTrick();
            };
        }
    }
    
    hidePlayNextTrickButton() {
        const playNextTrickBtn = this.gameTableWindow?.querySelector('#game-table-play-next-trick-btn');
        if (playNextTrickBtn) {
            playNextTrickBtn.style.display = 'none';
        }
    }
    
    showShuffleNextHandButton() {
        const shuffleNextHandBtn = this.gameTableWindow?.querySelector('#game-table-shuffle-next-hand-btn');
        if (shuffleNextHandBtn) {
            shuffleNextHandBtn.style.display = 'inline-block';
            shuffleNextHandBtn.onclick = () => {
                this.hideShuffleNextHandButton();
                this.game.startNewHand();
            };
        }
    }
    
    hideShuffleNextHandButton() {
        const shuffleNextHandBtn = this.gameTableWindow?.querySelector('#game-table-shuffle-next-hand-btn');
        if (shuffleNextHandBtn) {
            shuffleNextHandBtn.style.display = 'none';
        }
    }
    

    
    createGameTableWindow() {
        const container = document.getElementById('player-windows-container');
        if (!container) return;
        
        // Create window element
        this.gameTableWindow = document.createElement('div');
        this.gameTableWindow.className = 'game-table-window modalContainer modalContainer--gameTable';
        this.gameTableWindow.id = 'game-table-window';
        
        // Generate random color for box-shadow
        const colors = [
            '#ff6347', // tomato
            '#ff9966', // orange
            '#9999ff', // light blue
            '#cc66ff', // purple
            '#ff99ff', // pink
            '#99ff66', // light green
            '#66ff99', // mint
            '#33ccff', // sky blue
            '#0066ff', // blue
            '#ff6b6b', // coral
            '#4ecdc4', // turquoise
            '#45b7d1', // steel blue
            '#96ceb4', // sage
            '#feca57', // yellow
            '#ff9ff3', // light pink
            '#54a0ff', // electric blue
            '#5f27cd', // purple
            '#00d2d3', // cyan
            '#ff9f43', // orange
            '#10ac84'  // emerald
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.gameTableWindow.style.boxShadow = `0px 0px 32px ${randomColor}`;
        
        // Generate complementary color for aquaButton
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };
        
        const rgbToHex = (r, g, b) => {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        };
        
        const getComplementaryColor = (hex) => {
            const rgb = hexToRgb(hex);
            if (!rgb) return '#04c204'; // fallback to green
            
            // Calculate complementary color (opposite on color wheel)
            const complementaryRgb = {
                r: 255 - rgb.r,
                g: 255 - rgb.g,
                b: 255 - rgb.b
            };
            
            return rgbToHex(complementaryRgb.r, complementaryRgb.g, complementaryRgb.b);
        };
        
        const complementaryColor = getComplementaryColor(randomColor);
        
        // Store colors for later use when creating the aquaButton
        this.gameTableWindow.dataset.boxShadowColor = randomColor;
        this.gameTableWindow.dataset.aquaButtonColor = complementaryColor;
        
        // Position in center of screen
        const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0, document.body.clientWidth || 0);
        const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0, document.body.clientHeight || 0);
        
        const screenWidth = viewportWidth || 1200;
        const screenHeight = viewportHeight || 800;
        
        const baseLeft = screenWidth / 2 - 300; // Center horizontally
        const baseTop = screenHeight / 2 - 300; // Center vertically
        
        this.gameTableWindow.style.left = `${baseLeft}px`;
        this.gameTableWindow.style.top = `${baseTop}px`;
        this.gameTableWindow.style.zIndex = '1000';
        
        // Get player names and relationships
        const playerNames = [];
        const playerRelationships = [];
        for (let i = 0; i < 4; i++) {
            if (this.game.players[i]) {
                const player = this.game.players[i];
                const relationship = this.game.getPlayerRelationship(i);
                playerNames[i] = player.name || `Player ${i}`;
                playerRelationships[i] = relationship;
            } else {
                playerNames[i] = `Player ${i}`;
                playerRelationships[i] = 'Unknown';
            }
        }
        
        // Create window content with 4-square grid
        this.gameTableWindow.innerHTML = `
            <div class="game-table-header modalHeader">
                <h3 class="game-table-title modalTitle">Game Table</h3>
                <div class="game-table-score-display">
                    <div class="score-item">Us: <span id="game-table-us-score">0</span></div>
                    <div class="score-item">Them: <span id="game-table-them-score">0</span></div>
                    <button id="game-table-show-history-btn" class="btn history-btn">View History</button>
                </div>
                <button id="game-table-play-next-trick-btn" class="btn game-table-play-next-trick-btn" style="display: none;">Play Next Trick</button>
                <button id="game-table-shuffle-next-hand-btn" class="btn game-table-shuffle-next-hand-btn" style="display: none;">Shuffle Next Hand</button>
                <div class="aquaButton aquaButton--gameTable" style="background: ${this.gameTableWindow.dataset.aquaButtonColor}; box-shadow: 0px 5px 10px ${this.gameTableWindow.dataset.boxShadowColor};">×</div>
            </div>
            <div class="game-table-content">
                <div class="game-table-grid">
                    <!-- Top Left: LEADER -->
                    <div class="player-slot role-slot" id="role-slot-leader">
                        <div class="role-label">LEADER</div>
                        <div class="player-slot" id="player-slot-0">
                            <div class="player-slot-header">
                                <h4 class="player-name" id="player-name-0">${playerNames[0]} (${playerRelationships[0]})</h4>
                                <div class="player-role" id="player-role-0">Bidding...</div>
                            </div>
                            <div class="player-slot-content">
                                <div class="domino-display" id="domino-display-0" style="display: none;">
                                    <div class="domino-image-container">
                                        <img class="domino-image" id="domino-image-0" alt="Domino">
                                        <img class="bird-image" id="bird-image-0" alt="Bird">
                                    </div>
                                    <div class="domino-label" id="domino-label-0"></div>
                                </div>
                                <div class="player-bid-input-area" id="player-bid-input-0" style="display: none;">
                                    <label for="player-bid-input-field-0">Enter bid (or 'p' to pass):</label>
                                    <input type="text" id="player-bid-input-field-0" class="player-bid-input" maxlength="3">
                                    <button id="player-submit-bid-0" class="player-submit-bid-btn">Submit</button>
                                </div>
                                <div class="player-trump-selection-area" id="player-trump-selection-0" style="display: none;">
                                    <label>Select a trump suit:</label>
                                    <div class="player-trump-selector">
                                        <div class="player-trump-option" data-trump="0">0 (Blanks)</div>
                                        <div class="player-trump-option" data-trump="1">1</div>
                                        <div class="player-trump-option" data-trump="2">2</div>
                                        <div class="player-trump-option" data-trump="3">3</div>
                                        <div class="player-trump-option" data-trump="4">4</div>
                                        <div class="player-trump-option" data-trump="5">5</div>
                                        <div class="player-trump-option" data-trump="6">6</div>
                                    </div>
                                    <button id="player-confirm-trump-0" class="player-confirm-trump-btn">Confirm Trump</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Top Right: SETTER 1 -->
                    <div class="player-slot role-slot" id="role-slot-setter1">
                        <div class="role-label">SETTER 1</div>
                        <div class="player-slot" id="player-slot-1">
                            <div class="player-slot-header">
                                <h4 class="player-name" id="player-name-1">${playerNames[1]} (${playerRelationships[1]})</h4>
                                <div class="player-role" id="player-role-1">Bidding...</div>
                            </div>
                            <div class="player-slot-content">
                                <div class="domino-display" id="domino-display-1" style="display: none;">
                                    <div class="domino-image-container">
                                        <img class="domino-image" id="domino-image-1" alt="Domino">
                                        <img class="bird-image" id="bird-image-1" alt="Bird">
                                    </div>
                                    <div class="domino-label" id="domino-label-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bottom Left: SUPPORTER -->
                    <div class="player-slot role-slot" id="role-slot-supporter">
                        <div class="role-label">SUPPORTER</div>
                        <div class="player-slot" id="player-slot-2">
                            <div class="player-slot-header">
                                <h4 class="player-name" id="player-name-2">${playerNames[2]} (${playerRelationships[2]})</h4>
                                <div class="player-role" id="player-role-2">Bidding...</div>
                            </div>
                            <div class="player-slot-content">
                                <div class="domino-display" id="domino-display-2" style="display: none;">
                                    <div class="domino-image-container">
                                        <img class="domino-image" id="domino-image-2" alt="Domino">
                                        <img class="bird-image" id="bird-image-2" alt="Bird">
                                    </div>
                                    <div class="domino-label" id="domino-label-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bottom Right: SETTER 2 -->
                    <div class="player-slot role-slot" id="role-slot-setter2">
                        <div class="role-label">SETTER 2</div>
                        <div class="player-slot" id="player-slot-3">
                            <div class="player-slot-header">
                                <h4 class="player-name" id="player-name-3">${playerNames[3]} (${playerRelationships[3]})</h4>
                                <div class="player-role" id="player-role-3">Bidding...</div>
                            </div>
                            <div class="player-slot-content">
                                <div class="domino-display" id="domino-display-3" style="display: none;">
                                    <div class="domino-image-container">
                                        <img class="domino-image" id="domino-image-3" alt="Domino">
                                        <img class="bird-image" id="bird-image-3" alt="Bird">
                                    </div>
                                    <div class="domino-label" id="domino-label-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add close button event listener - enhanced for mobile compatibility
        const closeBtn = this.gameTableWindow.querySelector('.aquaButton--gameTable');
        if (closeBtn) {
            // Handle both click and touch events
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                this.closeGameTableWindow();
            });
            
            closeBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button touched');
                this.closeGameTableWindow();
            });
            
            // Prevent default touch behavior that might interfere
            closeBtn.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            });
        } else {
            console.error('Close button not found');
        }
        
        // Make window draggable
        this.makeDraggable(this.gameTableWindow);
        
        // Add to container
        container.appendChild(this.gameTableWindow);
        this.isOpen = true;
        
        // Set up event listeners for human player interactions
        this.setupHumanPlayerEventListeners();
        
        return this.gameTableWindow;
    }
    
    makeDraggable(window) {
        const header = window.querySelector('.modalHeader');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        
        // Initialize offset values based on current window position
        let xOffset = parseInt(window.style.left) || 0;
        let yOffset = parseInt(window.style.top) || 0;
        
        // Add click handler to bring window to front
        window.addEventListener('mousedown', (e) => {
            this.bringWindowToFront(window);
        });
        
        // Mouse event handlers
        header.addEventListener('mousedown', (e) => {
            if (e.target === header || header.contains(e.target)) {
                isDragging = true;
                this.bringWindowToFront(window);
                
                // Update initial position based on current mouse position and window offset
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                
                window.style.left = `${currentX}px`;
                window.style.top = `${currentY}px`;
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                initialX = currentX;
                initialY = currentY;
                isDragging = false;
            }
        });
        
        // Touch event handlers for mobile
        header.addEventListener('touchstart', (e) => {
            if (e.target === header || header.contains(e.target)) {
                e.preventDefault();
                isDragging = true;
                this.bringWindowToFront(window);
                
                const touch = e.touches[0];
                // Update initial position based on current touch position and window offset
                initialX = touch.clientX - xOffset;
                initialY = touch.clientY - yOffset;
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                e.preventDefault();
                const touch = e.touches[0];
                currentX = touch.clientX - initialX;
                currentY = touch.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                
                window.style.left = `${currentX}px`;
                window.style.top = `${currentY}px`;
            }
        });
        
        document.addEventListener('touchend', () => {
            if (isDragging) {
                initialX = currentX;
                initialY = currentY;
                isDragging = false;
            }
        });
        
        document.addEventListener('touchcancel', () => {
            if (isDragging) {
                initialX = currentX;
                initialY = currentY;
                isDragging = false;
            }
        });
    }
    
    bringWindowToFront(clickedWindow) {
        // Get all game table windows
        const allWindows = document.querySelectorAll('.game-table-window');
        
        // Find the highest current z-index among game table windows
        let maxZIndex = 1000; // Base z-index for game table windows
        allWindows.forEach(win => {
            const currentZIndex = parseInt(win.style.zIndex) || 1000;
            maxZIndex = Math.max(maxZIndex, currentZIndex);
        });
        
        // Check if there are any modals with higher z-index
        const modals = document.querySelectorAll('.modalContainer');
        modals.forEach(modal => {
            const modalZIndex = parseInt(modal.style.zIndex) || 0;
            maxZIndex = Math.max(maxZIndex, modalZIndex);
        });
        
        // Set the clicked window to the highest z-index + 1
        clickedWindow.style.zIndex = (maxZIndex + 1).toString();
    }
    
    closeGameTableWindow() {
        console.log('closeGameTableWindow called');
        if (this.gameTableWindow) {
            console.log('Removing game table window');
            this.gameTableWindow.remove();
            this.gameTableWindow = null;
            this.isOpen = false;
            // Stop all audio when closing window
            this.stopBirdAudio();
            this.addReopenButton();
        }
    }
    
    addReopenButton() {
        const container = document.getElementById('player-windows-container');
        if (!container) return;
        
        // Remove existing reopen button if any
        const existingButton = container.querySelector('.game-table-reopen-btn');
        if (existingButton) {
            existingButton.remove();
        }
        
        // Create new reopen button
        const reopenButton = document.createElement('button');
        reopenButton.className = 'game-table-reopen-btn';
        reopenButton.textContent = 'Game Table';
        reopenButton.addEventListener('click', () => {
            this.reopenGameTableWindow();
        });
        
        container.appendChild(reopenButton);
    }
    
    reopenGameTableWindow() {
        this.createGameTableWindow();
        
        // Add a small delay to ensure DOM elements are ready
        setTimeout(async () => {
        await this.restoreCurrentGameState();
        }, 100);
        
        // Remove reopen button
        const reopenButton = document.querySelector('.game-table-reopen-btn');
        if (reopenButton) {
            reopenButton.remove();
        }
    }
    
    async restoreCurrentGameState() {
        console.log('Restoring current game state...');
        console.log('Current trick:', this.game.currentTrick);
        console.log('Current trick plays:', this.game.currentTrick?.plays);
        
        // Restore player names and roles
        for (let i = 0; i < 4; i++) {
            const player = this.game.players[i];
            if (player) {
                const relationship = this.game.getPlayerRelationship(i);
                const playerNameWithRelationship = `${player.name} (${relationship})`;
                this.updatePlayerName(i, playerNameWithRelationship);
                this.updatePlayerRole(i, player.role || 'Bidding...');
            }
        }
        
        // Restore trump suit and current suit in header if a hand is in progress
        if (this.game.trump !== null && this.game.trump !== undefined) {
            const currentSuit = this.game.currentTrick?.currentSuit;
            this.updateGameTableHeader(`${this.game.trump}'s`, currentSuit);
        }
        
        // Restore any current domino displays
        if (this.game.currentTrick && this.game.currentTrick.playedDominoes) {
            console.log('Restoring domino displays for', this.game.currentTrick.playedDominoes.length, 'plays');
            for (let i = 0; i < this.game.currentTrick.playedDominoes.length; i++) {
                const [domino, playerIdx, playedEnds] = this.game.currentTrick.playedDominoes[i];
                console.log(`Restoring play ${i}:`, domino, 'for player', playerIdx);
                await this.displayPlayedDomino(domino, playerIdx, playedEnds);
            }
        } else {
            console.log('No current trick or plays to restore');
        }
        
        // Restore player order based on current game state
        this.updatePlayerOrder();
        
        // Check if we're in bidding phase and restore bidding interface
        if (this.game.currentPhase === 'bidding' && this.game.currentBiddingState) {
            this.restoreBiddingInterface();
        }
        
        // Make sure shuffle next hand button is hidden when restoring state
        this.hideShuffleNextHandButton();
    }
    
    restoreBiddingInterface() {
        if (this.game.currentBiddingState && this.game.currentBiddingState.waitingForHuman && this.game.currentPhase === 'bidding') {
            const humanPlayerIndex = 0;
            this.addPlayerMessage(humanPlayerIndex, 
                `It's your turn to bid! Current bid: ${this.game.currentBid === 0 ? 'pass' : this.game.currentBid}`, 'action');
            
            // Show bid input in player window
            this.showBidInput(humanPlayerIndex);
        }
    }
    
    updatePlayerName(playerIndex, name) {
        const nameElement = document.getElementById(`player-name-${playerIndex}`);
        if (nameElement) {
            nameElement.textContent = name;
        }
    }
    
    updatePlayerRole(playerIndex, role) {
        const roleElement = document.getElementById(`player-role-${playerIndex}`);
        if (roleElement) {
            roleElement.textContent = role;
        }
    }
    
    updatePlayerBid(playerIndex, bid) {
        const roleElement = document.getElementById(`player-role-${playerIndex}`);
        if (roleElement) {
            const bidText = bid === 'pass' ? 'Pass' : `Bid: ${bid}`;
            roleElement.textContent = bidText;
            
            // Style the bid display
            if (bid !== 'pass') {
                roleElement.style.color = 'lime';
                roleElement.style.fontWeight = 'bold';
            } else {
                roleElement.style.color = '#0000ff';
                roleElement.style.fontWeight = 'normal';
            }
        }
    }
    
    clearPlayerBid(playerIndex) {
        const roleElement = document.getElementById(`player-role-${playerIndex}`);
        if (roleElement) {
            roleElement.textContent = 'Bidding...';
            roleElement.style.color = '#0000ff';
            roleElement.style.fontWeight = 'normal';
        }
        
        // Reset player name element to original state
        const nameElement = document.getElementById(`player-name-${playerIndex}`);
        if (nameElement) {
            const player = this.game.players[playerIndex];
            const relationship = this.game.getPlayerRelationship(playerIndex);
            const originalName = `${player.name} (${relationship})`;
            nameElement.textContent = originalName;
            nameElement.style.color = 'lime';
            nameElement.style.fontWeight = 'normal';
        }
    }
    
    addPlayerMessage(playerIndex, message, type = 'info') {
        // Disabled - no status messages in player windows
        // Only domino and bird images are displayed
    }
    
    clearPlayerMessages(playerIndex) {
        // Disabled - no status messages in player windows
        // Only domino and bird images are displayed
    }
    
    async displayPlayedDomino(domino, playerIndex, playedEnds) {
        const dominoDisplay = document.getElementById(`domino-display-${playerIndex}`);
        const dominoImage = document.getElementById(`domino-image-${playerIndex}`);
        const birdImage = document.getElementById(`bird-image-${playerIndex}`);
        const dominoLabel = document.getElementById(`domino-label-${playerIndex}`);
        
        console.log(`Displaying domino for player ${playerIndex}:`, {
            dominoDisplay: !!dominoDisplay,
            dominoImage: !!dominoImage,
            birdImage: !!birdImage,
            dominoLabel: !!dominoLabel,
            domino: domino
        });
        
        if (dominoDisplay && dominoImage && birdImage && dominoLabel) {
            // Show domino display
            dominoDisplay.style.display = 'block';
            
            // Use modulated orientation for proper display
            const modulatedEnds = domino.modulate(this.game.trump, this.game.currentTrick?.currentSuit);
            const dominoKey = `${modulatedEnds[0]}-${modulatedEnds[1]}`;
            dominoImage.src = `../assets/img/dominoes/${dominoKey}.png`;
            dominoImage.onerror = () => {
                console.warn(`Failed to load domino image: ${dominoKey}.png`);
                dominoImage.style.display = 'none';
            };
            
            // Get bird name based on domino modality
            const birdName = this.getDominoBird(domino, this.game.trump, this.game.currentTrick?.currentSuit);
            const birdImagePath = this.imagePaths[birdName];
            if (birdImagePath) {
                birdImage.src = birdImagePath;
                birdImage.onerror = () => {
                    console.warn(`Failed to load bird image: ${birdName}`);
                    birdImage.style.display = 'none';
                };
            }
            
            // Set the label with domino and bird information
            dominoLabel.textContent = `${dominoKey} : ${birdName}`;
            dominoLabel.style.display = 'block';
            
            // Add click event listener for flipping
            dominoDisplay.onclick = () => {
                this.flipDomino(playerIndex);
            };
            
            // Ensure domino is visible and bird is hidden by default
            dominoImage.style.opacity = '1';
            birdImage.style.opacity = '0';
            
            // Store bird info for later audio playback when flipped
            const playerRole = this.game.players[playerIndex]?.role;
            if (playerRole) {
                // Use fallback function to get audio path with fallback to recording 1
                const audioPath = await this.getBirdAudioPathWithFallback(birdName, playerRole);
                // Store the audio path for this player (don't play immediately)
                this.playerAudioPaths = this.playerAudioPaths || {};
                this.playerAudioPaths[playerIndex] = audioPath;
            }
        }
    }
    
    clearDominoDisplay(playerIndex) {
        const dominoDisplay = document.getElementById(`domino-display-${playerIndex}`);
        if (dominoDisplay) {
            dominoDisplay.style.display = 'none';
            // Reset flipping state
            dominoDisplay.classList.remove('flipped');
            // Remove click event listener
            dominoDisplay.onclick = null;
        }
    }
    
    clearAllDominoDisplays() {
        for (let i = 0; i < 4; i++) {
            this.clearDominoDisplay(i);
        }
        // Stop all audio when clearing displays
        this.stopBirdAudio();
    }
    
    clearAllDisplaysAndAudio() {
        this.clearAllDominoDisplays();
        this.stopBirdAudio();
    }
    
    flipDomino(playerIndex) {
        const dominoDisplay = document.getElementById(`domino-display-${playerIndex}`);
        const dominoImage = document.getElementById(`domino-image-${playerIndex}`);
        const birdImage = document.getElementById(`bird-image-${playerIndex}`);
        if (dominoDisplay && dominoImage && birdImage) {
            // Toggle visibility by opacity
            const isDominoVisible = dominoImage.style.opacity !== '0';
            dominoImage.style.opacity = isDominoVisible ? '0' : '1';
            birdImage.style.opacity = isDominoVisible ? '1' : '0';
            
            // Play or stop bird audio based on what's visible
            if (isDominoVisible) {
                // Bird is now visible, play audio
                this.playBirdAudioForPlayer(playerIndex);
            } else {
                // Domino is now visible, stop audio
                this.stopBirdAudio(playerIndex);
            }
        }
    }
    
        updatePlayerOrder(bidOrder = null) {
        const roleLabels = document.querySelectorAll('.role-label');
        
        if (bidOrder) {
            // Bidding phase: hide role labels and arrange by bidding order
            roleLabels.forEach(label => {
                label.style.display = 'none';
            });
            
            // Convert formatted names back to player indices
            const playerOrder = [];
            for (const playerName of bidOrder) {
                for (let i = 0; i < 4; i++) {
                    if (this.game.players[i] && this.game.formatPlayerNameWithRelationship(this.game.players[i]) === playerName) {
                        playerOrder.push(i);
                        break;
                    }
                }
            }
            
            // Move player slots to role slots in bidding order
            const roleSlots = [
                document.getElementById('role-slot-leader'),
                document.getElementById('role-slot-setter1'),
                document.getElementById('role-slot-supporter'),
                document.getElementById('role-slot-setter2')
            ];
            
            playerOrder.forEach((playerIndex, gridIndex) => {
                const playerSlot = document.getElementById(`player-slot-${playerIndex}`);
                const roleSlot = roleSlots[gridIndex];
                
                if (playerSlot && roleSlot) {
                    // Remove from current parent
                    if (playerSlot.parentNode) {
                        playerSlot.parentNode.removeChild(playerSlot);
                    }
                    // Add to role slot
                    roleSlot.appendChild(playerSlot);
                }
            });
            
        } else if (this.game.currentTrick) {
            // Trick phase: show role labels and assign players to roles
            roleLabels.forEach(label => {
                label.style.display = 'block';
            });
            
            // Get current player roles
            const playerRoles = {};
            for (let i = 0; i < 4; i++) {
                if (this.game.players[i]) {
                    playerRoles[i] = this.game.players[i].role;
                }
            }
            
            // Map roles to positions
            const rolePositions = {
                'LEADER': 'role-slot-leader',
                'SETTER1': 'role-slot-setter1',
                'SUPPORTER': 'role-slot-supporter',
                'SETTER2': 'role-slot-setter2'
            };
            
            // Move each player to their role position
            Object.entries(playerRoles).forEach(([playerIndex, role]) => {
                const playerSlot = document.getElementById(`player-slot-${playerIndex}`);
                const roleSlot = document.getElementById(rolePositions[role]);
                
                if (playerSlot && roleSlot) {
                    // Remove from current parent
                    if (playerSlot.parentNode) {
                        playerSlot.parentNode.removeChild(playerSlot);
                    }
                    // Add to role slot
                    roleSlot.appendChild(playerSlot);
                }
            });
            
        } else {
            // Default state: hide role labels and use default order
            roleLabels.forEach(label => {
                label.style.display = 'none';
            });
            
            // Reset to default positions
            const roleSlots = [
                document.getElementById('role-slot-leader'),
                document.getElementById('role-slot-setter1'),
                document.getElementById('role-slot-supporter'),
                document.getElementById('role-slot-setter2')
            ];
            
            for (let i = 0; i < 4; i++) {
                const playerSlot = document.getElementById(`player-slot-${i}`);
                const roleSlot = roleSlots[i];
                
                if (playerSlot && roleSlot) {
                    // Remove from current parent
                    if (playerSlot.parentNode) {
                        playerSlot.parentNode.removeChild(playerSlot);
                    }
                    // Add to role slot
                    roleSlot.appendChild(playerSlot);
                }
            }
        }
    }
    
    showBidInput(playerIndex) {
        const bidInput = document.getElementById(`player-bid-input-${playerIndex}`);
        if (bidInput) {
            bidInput.style.display = 'block';
        }
    }
    
    hideBidInput(playerIndex) {
        const bidInput = document.getElementById(`player-bid-input-${playerIndex}`);
        if (bidInput) {
            bidInput.style.display = 'none';
        }
    }
    
    showTrumpSelection(playerIndex) {
        const trumpSelection = document.getElementById(`player-trump-selection-${playerIndex}`);
        if (trumpSelection) {
            trumpSelection.style.display = 'block';
        }
    }
    
    hideTrumpSelection(playerIndex) {
        const trumpSelection = document.getElementById(`player-trump-selection-${playerIndex}`);
        if (trumpSelection) {
            trumpSelection.style.display = 'none';
        }
    }
    
    createAllPlayerWindows(players) {
        // This method is kept for compatibility but now creates the game table
        this.createGameTableWindow();
    }
    
    updateAllPlayerRoles() {
        for (let i = 0; i < 4; i++) {
            const player = this.game.players[i];
            if (player) {
                this.updatePlayerRole(i, player.role || 'Bidding...');
            }
        }
    }
    
    // Additional methods for compatibility with the Game class
    setupBidInputHandler(playerIndex, game) {
        // This method is not needed in the new system as the bid input is handled differently
        console.log('setupBidInputHandler called - not needed in new system');
    }
    
    setupTrumpSelectionHandler(playerIndex) {
        // Set up trump option click handlers for the human player
        if (playerIndex === 0) {
            const trumpOptions = document.querySelectorAll('.player-trump-option');
            trumpOptions.forEach(option => {
                option.addEventListener('click', () => {
                    // Remove selection from all options
                    trumpOptions.forEach(o => o.classList.remove('selected'));
                    // Add selection to clicked option
                    option.classList.add('selected');
                });
            });
            
            // Set up confirm button handler
            const confirmBtn = document.getElementById('player-confirm-trump-0');
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    this.handlePlayerTrumpConfirm(playerIndex);
                });
            }
        }
    }
    
    handlePlayerTrumpConfirm(playerIndex) {
        const selectedTrump = document.querySelector('.player-trump-option.selected');
        if (!selectedTrump) {
            this.addPlayerMessage(playerIndex, "Please select a trump suit.", 'warning');
            return;
        }
        
        const trump = parseInt(selectedTrump.dataset.trump);
        
        // Hide trump selection
        this.hideTrumpSelection(playerIndex);
        
        // Add confirmation message
        this.addPlayerMessage(playerIndex, `Selected trump: ${trump}'s`, 'action');
        
        // Process the trump selection through the game
        this.game.setTrumpAndStartHand(trump);
    }
    
    handlePlayerBidSubmit(playerIndex, game) {
        const inputField = document.getElementById(`player-bid-input-field-${playerIndex}`);
        if (!inputField) return;
        
        const input = inputField.value.trim().toLowerCase();
        let bid;
        
        if (input === 'p') {
            bid = 'pass';
        } else {
            bid = parseInt(input);
            if (isNaN(bid) || bid <= game.currentBid) {
                game.updateStatus("Invalid bid. Enter a number higher than current bid or 'p' to pass.");
                return;
            }
        }
        
        // Clear input field
        inputField.value = '';
        
        // Hide bid input
        this.hideBidInput(playerIndex);
        
        // Process the bid through the game
        game.processPlayerBid(bid);
    }
    
    setupHumanPlayerEventListeners() {
        // Set up bid input event listeners for human player (player 0)
        const bidInputField = document.getElementById('player-bid-input-field-0');
        const bidSubmitBtn = document.getElementById('player-submit-bid-0');
        
        if (bidInputField && bidSubmitBtn) {
            bidSubmitBtn.addEventListener('click', () => {
                this.handlePlayerBidSubmit(0, this.game);
            });
            
            bidInputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handlePlayerBidSubmit(0, this.game);
                }
            });
        }
        
        // Set up trump selection event listeners
        const trumpOptions = document.querySelectorAll('.player-trump-option');
        const trumpConfirmBtn = document.getElementById('player-confirm-trump-0');
        
        trumpOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selection from all options
                trumpOptions.forEach(o => o.classList.remove('selected'));
                // Add selection to clicked option
                option.classList.add('selected');
            });
        });
        
        if (trumpConfirmBtn) {
            trumpConfirmBtn.addEventListener('click', () => {
                this.handlePlayerTrumpConfirm(0);
            });
        }
        
        // Set up history button event listener
        const historyBtn = document.getElementById('game-table-show-history-btn');
        if (historyBtn) {
            historyBtn.addEventListener('click', () => {
                this.game.showScoreboardHistory();
            });
        }
    }
}

// PlayerRole enum equivalent
const PlayerRole = {
    LEADER: 'LEADER',      // Won bid or took lead, trying to make bid
    SUPPORTER: 'SUPPORTER', // Partner of leader, helping make bid
    SETTER1: 'SETTER1',     // First opponent trying to prevent bid
    SETTER2: 'SETTER2'      // Second opponent trying to prevent bid
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
    
    static isModal(domino, trump) {
        // Modal: not a double, not a trump
        return !domino.isDouble() && !domino.isTrump(trump);
    }
    
    static getModalDominoes(trump) {
        // Return all modal dominoes for a given trump
        const modal = [];
        for (let a = 0; a < 7; a++) {
            for (let b = a + 1; b < 7; b++) {
                const d = new Domino(a, b);
                if (Domino.isModal(d, trump)) {
                    modal.push(d);
                }
            }
        }
        return modal;
    }
    
    // For UI: flip a modal domino's orientation (returns a new Domino with ends flipped)
    static flipModal(domino) {
        if (domino.isDouble()) return domino;
        return new Domino(domino.ends[1], domino.ends[0]);
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
    
    // playedEnds is the [a, b] as played
    addPlay(domino, playerIdx, playedEnds) {
        if (this.playedDominoes.length === 0) { // First domino played sets the suit
            this.currentSuit = domino.getSuit(this.trump);
        }
        this.playedDominoes.push([domino, playerIdx, playedEnds]);
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
            
            // Calculate potential trumps for this candidate suit
            const potentialTrumps = []; // Dominoes that would become trumps if this suit is chosen
            const potentialTrumpPlays = []; // Off dominoes that could be played as trumps when needed
            
            for (const domino of this.hand) {
                if (domino.isDouble() && domino.ends[0] === suit) {
                    // This double would become the trump double
                    potentialTrumps.push(domino);
                } else if (domino.ends.includes(suit)) {
                    // This domino would become a trump if this suit is chosen
                    potentialTrumps.push(domino);
                    if (!domino.isDouble()) {
                        // Off dominoes that could be played as trumps when needed
                        potentialTrumpPlays.push(domino);
                    }
                }
            }
            
            // Count potential trumps by type
            const potentialTrumpDoubles = potentialTrumps.filter(d => d.isDouble());
            const potentialTrumpNonDoubles = potentialTrumps.filter(d => !d.isDouble());
            const potentialTrumpCount = potentialTrumpPlays.length;
            
            // Base score: number of potential trumps for this suit
            let score = potentialTrumps.length;
            
            // Bonus for potential trump double
            if (potentialTrumpDoubles.length > 0) {
                score += 3;
            }
            
            // Bonus for high potential trump dominoes
            if (potentialTrumpNonDoubles.length > 0) {
                const highestTrump = Math.max(...potentialTrumpNonDoubles.map(d => d.getDegree(suit)));
                score += highestTrump * 0.5; // Higher trump degree = better
            }
            
            // Bonus for potential trump plays (off dominoes that could be played as trumps when needed)
            // Higher quality potential trump plays are more valuable
            let potentialTrumpBonus = 0;
            for (const potentialTrumpPlay of potentialTrumpPlays) {
                const otherEnd = potentialTrumpPlay.ends[0] === suit ? potentialTrumpPlay.ends[1] : potentialTrumpPlay.ends[0];
                // Higher other end = more valuable potential trump play
                potentialTrumpBonus += otherEnd * 0.1; // 6-4 = 0.4, 6-3 = 0.3, etc.
            }
            score += potentialTrumpBonus;
            
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
            // Count potential trumps for the chosen trump suit
            const potentialTrumps = this.hand.filter(d => d.isTrump(trump));
            const trumpCount = potentialTrumps.length;
            
            // Count all doubles in hand (separate consideration for bidding strength)
            const doubleCount = doubles.length;
            
            // Count offs (dominoes that are not trumps or doubles)
            const offs = this.hand.filter(d => !d.isTrump(trump) && !d.isDouble()).length;
            
            // Check if we have the trump double
            const hasTrumpDouble = this.hand.some(d => d.isDouble() && d.isTrump(trump));
            
            // Check for three highest potential trump dominoes (excluding double)
            const nonDoubleTrumps = potentialTrumps.filter(d => !d.isDouble());
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
            let countOffsProtected = 0; // Count dominoes that are protected by doubles
            for (const d of this.hand) {
                if (!d.isTrump(trump) && !d.isDouble()) {
                    // Check if this domino contains 4, 5, or 6 (could be captured by 5-5 or 4-6)
                    if (d.ends.includes(4) || d.ends.includes(5) || d.ends.includes(6)) {
                        countOffs++;
                        // Check if this count domino is protected by a double
                        const hasProtectingDouble = this.hand.some(double => 
                            double.isDouble() && (double.ends[0] === 4 || double.ends[0] === 5 || double.ends[0] === 6)
                        );
                        if (hasProtectingDouble) {
                            countOffsProtected++;
                        }
                    }
                }
            }
            
            // Count count dominoes in trump suit
            const trumpCountDominoes = potentialTrumps.filter(d => this.isCountDomino(d));
            const trumpCountValue = trumpCountDominoes.reduce((total, d) => {
                const [a, b] = d.ends.slice().sort((x, y) => x - y);
                if ((a === 5 && b === 5) || (a === 4 && b === 6)) {
                    return total + 10; // 10-count dominoes
                } else {
                    return total + 5;  // 5-count dominoes
                }
            }, 0);
            
            // Calculate confidence based on refined requirements
            if (hasTrumpDouble) {
                // With trump double - more nuanced scoring
                let baseConfidence = 0;
                
                // Base confidence from trump count
                if (trumpCount >= 3) baseConfidence = 1;
                if (trumpCount >= 4) baseConfidence = 2;
                if (trumpCount >= 5) baseConfidence = 3;
                if (trumpCount >= 6) baseConfidence = 4;
                
                // Bonus for good double count
                if (doubleCount >= 2) baseConfidence += 1;
                if (doubleCount >= 3) baseConfidence += 1;
                
                // Bonus for count value in trump
                if (trumpCountValue >= 10) baseConfidence += 1;
                if (trumpCountValue >= 20) baseConfidence += 1;
                
                // Penalty for too many offs
                if (offs > 2) baseConfidence = Math.max(0, baseConfidence - 1);
                if (offs > 3) baseConfidence = Math.max(0, baseConfidence - 1);
                
                confidence = Math.min(6, baseConfidence);
                
            } else {
                // Without trump double - more flexible but still strict
                let baseConfidence = 0;
                
                // Must have minimum requirements
                if (trumpCount < 3) {
                    confidence = 0;
                } else if (!hasThreeHighest) {
                    confidence = 0;
                } else if (doubleCount < 1) {
                    confidence = 0;
                } else {
                    // Base confidence from trump count
                    if (trumpCount >= 3) baseConfidence = 0; // Minimum viable
                    if (trumpCount >= 4) baseConfidence = 1;
                    if (trumpCount >= 5) baseConfidence = 2;
                    if (trumpCount >= 6) baseConfidence = 3;
                    
                    // Bonus for good double count
                    if (doubleCount >= 2) baseConfidence += 1;
                    if (doubleCount >= 3) baseConfidence += 1;
                    
                    // Bonus for count value in trump
                    if (trumpCountValue >= 10) baseConfidence += 1;
                    if (trumpCountValue >= 20) baseConfidence += 1;
                    
                    // Penalty for unprotected count offs (but allow some)
                    const unprotectedCountOffs = countOffs - countOffsProtected;
                    if (unprotectedCountOffs > 1) baseConfidence = Math.max(0, baseConfidence - 1);
                    if (unprotectedCountOffs > 2) baseConfidence = Math.max(0, baseConfidence - 1);
                    
                    confidence = Math.min(4, baseConfidence); // Cap at 4 without trump double
                }
            }
        }
        
        // Adjust max bid based on trump quality and strategic factors
        let maxBid = confidence < 6 ? 30 + confidence : 42;
        
        // Bonus for very strong trump combinations
        if (trump !== null) {
            const trumpDominoes = this.hand.filter(d => d.isTrump(trump));
            const trumpDoubles = trumpDominoes.filter(d => d.isDouble());
            const trumpNonDoubles = trumpDominoes.filter(d => !d.isDouble());
            
            // Bonus for having both trump double and high trumps
            if (trumpDoubles.length > 0 && trumpNonDoubles.length >= 3) {
                const highestTrump = Math.max(...trumpNonDoubles.map(d => d.getDegree(trump)));
                if (highestTrump >= 5) {
                    maxBid = Math.min(42, maxBid + 1); // Bonus for strong trump combination
                }
            }
            
            // Bonus for having multiple doubles in addition to trump
            const otherDoubles = this.hand.filter(d => d.isDouble() && !d.isTrump(trump));
            if (otherDoubles.length >= 2) {
                maxBid = Math.min(42, maxBid + 1); // Bonus for multiple doubles
            }
        }
        
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
        } else if (this.role === PlayerRole.SETTER1) {
            return this.chooseDominoSetter1(trickState);
        } else if (this.role === PlayerRole.SETTER2) {
            return this.chooseDominoSetter2(trickState);
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
        if (this.hasAnySetterBeatenLeader(trickState)) {
            // SETTER has beaten LEADER - try to take the trick back
            const winningPlays = validPlays.filter(d => this.canWinTrick(trickState, d));
            if (winningPlays.length > 0) {
                // Can win the trick back - prioritize non-count dominoes when possible
                const nonCountWinners = this.getNonCountDominoes(winningPlays);
                if (nonCountWinners.length > 0) {
                    return nonCountWinners.reduce((max, d) => 
                        this.evaluateDominoStrength(d, trickState.trump) > this.evaluateDominoStrength(max, trickState.trump) ? d : max
                    );
                }
                // Forced to use count domino to take the trick back - prefer 5-counts over 10-counts
                const countWinners = this.getCountDominoes(winningPlays);
                if (countWinners.length > 0) {
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
                    // Partner not winning but no SETTER has beaten them - be conservative about count dominoes
                    if (!this.mustFollowSuit(trickState)) {
                        // Playing off suit - be conservative about throwing count when LEADER hasn't been beaten
                        const offPlays = this.getOffSuitPlays(validPlays, trickState.trump);
                        if (offPlays.length > 0) {
                            // First priority: non-count, non-double offs (safest to throw)
                            const nonCountNonDoubleOffs = this.getNonCountDominoes(this.getNonDoubles(offPlays));
                            if (nonCountNonDoubleOffs.length > 0) {
                                return nonCountNonDoubleOffs.reduce((min, d) => 
                                    this.evaluateDominoValueForThrowing(d, trickState.trump) < this.evaluateDominoValueForThrowing(min, trickState.trump) ? d : min
                                );
                            }
                            
                            // Second priority: non-count doubles (preserve ALL doubles when possible)
                            const nonCountDoubles = this.getNonCountDominoes(this.getDoubles(offPlays));
                            if (nonCountDoubles.length > 0) {
                                // Only throw very low doubles when absolutely necessary
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
                            
                            // Third priority: count dominoes (only if no non-count options available)
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
    

    
    chooseDominoSetter1(trickState) {
        // SETTER1 logic: Try to beat LEADER's domino, if impossible play lowest value (never count unless forced)
        const validPlays = this.getValidPlays(trickState);
        if (validPlays.length === 0) {
            return null;
        }
        
        // If leading the trick (shouldn't happen often for setter)
        if (trickState.playedDominoes.length === 0) {
            return this.getStrongestDominoSetter1(trickState);
        }
        
        // Check if we can win the trick (beat LEADER)
        const winningPlays = validPlays.filter(d => this.canWinTrick(trickState, d));
        if (winningPlays.length > 0) {
            // Can beat LEADER - use non-count dominoes if possible
            const nonCountWinners = this.getNonCountDominoes(winningPlays);
            if (nonCountWinners.length > 0) {
                console.log(`SETTER1: Can beat LEADER with non-count domino`);
                return nonCountWinners.reduce((max, d) => 
                    this.evaluateDominoStrengthSetter1(d, trickState.trump) > this.evaluateDominoStrengthSetter1(max, trickState.trump) ? d : max
                );
            } else {
                // Forced to use count domino to beat LEADER
                console.log(`SETTER1: FORCED to use count domino to beat LEADER`);
                return winningPlays.reduce((max, d) => 
                    this.evaluateDominoStrengthSetter1(d, trickState.trump) > this.evaluateDominoStrengthSetter1(max, trickState.trump) ? d : max
                );
            }
        }
        
        // Cannot beat LEADER - play lowest value domino, NEVER count unless absolutely forced
        console.log(`SETTER1: Cannot beat LEADER, playing lowest value domino`);
        return this.chooseSetterOffSuit(trickState, validPlays);
    }
    
    chooseDominoSetter2(trickState) {
        // SETTER2 logic: Check if SETTER1 has beaten LEADER and SUPPORTER hasn't beaten SETTER1 back
        // If so, reinforce SETTER1's victory with count. Otherwise, play normally.
        const validPlays = this.getValidPlays(trickState);
        if (validPlays.length === 0) {
            return null;
        }
        
        // If leading the trick (shouldn't happen often for setter)
        if (trickState.playedDominoes.length === 0) {
            return this.getStrongestDominoSetter2(trickState);
        }
        
        // Check if SETTER1 has beaten LEADER
        if (this.hasSetter1BeatenLeader(trickState)) {
            // Check if SUPPORTER has beaten SETTER1 back
            if (this.hasSupporterBeatenSetter1(trickState)) {
                // SUPPORTER has beaten SETTER1 back - try to win the trick back
                const winningPlays = validPlays.filter(d => this.canWinTrick(trickState, d));
                if (winningPlays.length > 0) {
                    // Try to win while preserving count dominoes if possible
                    return this.chooseSetterWinningPlay(trickState, winningPlays);
                }
                // Cannot win - throw least valuable domino
                return this.chooseSetterOffSuit(trickState, validPlays);
            } else {
                // SETTER1 is still winning and SUPPORTER hasn't beaten them back
                // This is the ONLY time SETTER2 should voluntarily use count dominoes
                console.log(`SETTER2: SETTER1 is winning and SUPPORTER hasn't beaten back - reinforcing with count`);
                const countPlays = this.getCountDominoes(validPlays);
                if (countPlays.length > 0) {
                    // Prefer 10-counts over 5-counts to maximize points for the victory
                    const tenCountPlays = countPlays.filter(d => 
                        (d.ends[0] === 5 && d.ends[1] === 5) || 
                        (d.ends[0] === 4 && d.ends[1] === 6) || 
                        (d.ends[0] === 6 && d.ends[1] === 4)
                    );
                    if (tenCountPlays.length > 0) {
                        return tenCountPlays.reduce((max, d) => 
                            this.evaluateDominoStrengthSetter2(d, trickState.trump) > this.evaluateDominoStrengthSetter2(max, trickState.trump) ? d : max
                        );
                    }
                    return countPlays.reduce((max, d) => 
                        this.evaluateDominoStrengthSetter2(d, trickState.trump) > this.evaluateDominoStrengthSetter2(max, trickState.trump) ? d : max
                    );
                }
                // No count dominoes available - use highest non-count
                const nonCountPlays = this.getNonCountDominoes(validPlays);
                if (nonCountPlays.length > 0) {
                    return nonCountPlays.reduce((max, d) => 
                        this.evaluateDominoStrengthSetter2(d, trickState.trump) > this.evaluateDominoStrengthSetter2(max, trickState.trump) ? d : max
                    );
                }
                // Fallback - any valid play
                return validPlays.reduce((max, d) => 
                    this.evaluateDominoStrengthSetter2(d, trickState.trump) > this.evaluateDominoStrengthSetter2(max, trickState.trump) ? d : max
                );
            }
        }
        
        // SETTER1 hasn't beaten LEADER yet or hasn't played - use normal SETTER logic
        // Check if we can win the trick
        const winningPlays = validPlays.filter(d => this.canWinTrick(trickState, d));
        if (winningPlays.length > 0) {
            // Try to win while preserving count dominoes if possible
            return this.chooseSetterWinningPlay(trickState, winningPlays);
        }
        
        // Cannot win - throw least valuable domino (never count unless forced)
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
            const hasBeenPlayed = this.game.playedDominoesThisHand.some(entry => 
                entry.domino.toString() === dominoKey
            );
            if (!hasBeenPlayed) {
                // This higher trump is still out there
                return true;
            }
        }
        return false;
    }
    
    // Helper method to check if trump double is still out there
    isTrumpDoubleOutThere(trump) {
        const trumpDoubleKey = JSON.stringify([trump, trump]);
        const hasBeenPlayed = this.game.playedDominoesThisHand.some(entry => 
            entry.domino.toString() === trumpDoubleKey
        );
        return !hasBeenPlayed;
    }
    
    // Helper method to check if a specific domino has been played
    hasDominoBeenPlayed(domino) {
        return this.game.playedDominoesThisHand.some(entry => 
            entry.domino.toString() === domino.toString()
        );
    }
    
    // Helper method to check if it's safe to lead with a specific domino
    isSafeToLeadWith(domino, trump) {
        // If it's a double or trump, it's generally safe
        if (domino.isDouble() || domino.isTrump(trump)) {
            return true;
        }
        
        // For off dominoes, check if higher dominoes of the same suit are still out there
        const suit = domino.getSuit(trump);
        const degree = domino.getDegree(trump);
        
        // Check all possible dominoes of this suit with higher degree
        for (let d = 6; d > degree; d--) {
            if (d === suit) continue; // skip double
            const higherDomino = new Domino(suit, d);
            if (!this.hasDominoBeenPlayed(higherDomino)) {
                // Higher domino is still out there - not safe to lead
                return false;
            }
        }
        
        // No higher dominoes of this suit are out there - safe to lead
        return true;
    }
    
    // Helper method to check if opponents have played off-suit on a specific suit
    haveOpponentsPlayedOffSuitOnSuit(suit) {
        const opponentIndices = this.game.teams['Us'].includes(this) ? [1, 3] : [0, 2];
        
        for (const opponentIdx of opponentIndices) {
            const opponent = this.game.players[opponentIdx];
            const hasPlayedOffSuit = this.game.playerHasNo[opponentIdx].has(suit);
            if (!hasPlayedOffSuit) {
                // This opponent hasn't played off-suit on this suit yet
                return false;
            }
        }
        
        // Both opponents have played off-suit on this suit
        return true;
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
            // Off dominoes - for leading, we want the highest possible value
            // Higher dominoes are more likely to win when no trumps are played
            const maxEnd = Math.max(...domino.ends);
            const minEnd = Math.min(...domino.ends);
            // Prefer dominoes with higher values, and among equal max values, prefer higher min values
            return maxEnd * 10 + minEnd; // 6-5 = 65, 6-4 = 64, 5-4 = 54, etc.
        }
    }
    
    // Role-specific evaluation methods for Setter1
    evaluateDominoStrengthSetter1(domino, trump) {
        // Setter1 should be aggressive and prioritize winning over preserving resources
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
            // Off dominoes - Setter1 should be less concerned about risk
            const maxEnd = Math.max(...domino.ends);
            return maxEnd + 10; // Boost off dominoes slightly for Setter1
        }
    }
    
    evaluateDominoValueForThrowingSetter1(domino, trump) {
        // Setter1 should be more willing to throw valuable dominoes
        if (domino.isDouble()) {
            // Doubles are valuable but Setter1 can be more aggressive
            return 80 + domino.ends[0]; // Lower value than other roles
        } else if (domino.isTrump(trump)) {
            // Trump dominoes are valuable
            const degree = domino.getDegree(trump);
            return 70 + degree; // Slightly lower than other roles
        } else if (this.isCountDomino(domino)) {
            // Count dominoes are valuable but Setter1 can use them more aggressively
            const [a, b] = domino.ends.slice().sort((x, y) => x - y);
            if ((a === 5 && b === 5) || (a === 4 && b === 6)) {
                return 60; // 10-count dominoes
            } else {
                return 50; // 5-count dominoes
            }
        } else {
            // Regular off dominoes
            const maxEnd = Math.max(...domino.ends);
            return maxEnd + 5; // Slightly higher than base
        }
    }
    
    evaluateDominoForLeadingSetter1(domino, trump) {
        // Setter1 should be aggressive when leading
        if (domino.isDouble()) {
            // Doubles are excellent for leading
            if (domino.isTrump(trump)) {
                return 200; // Trump double is best for leading
            } else {
                return 160 + domino.ends[0]; // Higher doubles are better for leading
            }
        } else if (domino.isTrump(trump)) {
            // Trump dominoes - higher degree = better for leading
            const degree = domino.getDegree(trump);
            return 110 + degree; // Boost trump values for Setter1
        } else {
            // Off dominoes - Setter1 should be more willing to lead with offs
            const maxEnd = Math.max(...domino.ends);
            const minEnd = Math.min(...domino.ends);
            return maxEnd * 10 + minEnd + 5; // Boost off dominoes for Setter1
        }
    }
    
    // Role-specific evaluation methods for Setter2
    evaluateDominoStrengthSetter2(domino, trump) {
        // Setter2 should be conservative and preserve resources for critical moments
        if (domino.isDouble()) {
            // Doubles are very strong - only trump doubles can beat them
            if (domino.isTrump(trump)) {
                return 100; // Trump double is strongest
            } else {
                return 95;  // Non-trump double is very strong (higher than Setter1)
            }
        } else if (domino.isTrump(trump)) {
            // Trump dominoes - higher degree = stronger
            const degree = domino.getDegree(trump);
            return 85 + degree; // Trump 6 = 91, Trump 5 = 90, etc. (higher than Setter1)
        } else {
            // Off dominoes - Setter2 should be more conservative
            const maxEnd = Math.max(...domino.ends);
            return maxEnd; // Base value, no boost
        }
    }
    
    evaluateDominoValueForThrowingSetter2(domino, trump) {
        // Setter2 should be very conservative about throwing valuable dominoes
        if (domino.isDouble()) {
            // Doubles are very valuable - Setter2 should preserve them
            return 120 + domino.ends[0]; // Higher value than other roles
        } else if (domino.isTrump(trump)) {
            // Trump dominoes are very valuable
            const degree = domino.getDegree(trump);
            return 90 + degree; // Higher than other roles
        } else if (this.isCountDomino(domino)) {
            // Count dominoes are very valuable - Setter2 should preserve them
            const [a, b] = domino.ends.slice().sort((x, y) => x - y);
            if ((a === 5 && b === 5) || (a === 4 && b === 6)) {
                return 80; // 10-count dominoes
            } else {
                return 70; // 5-count dominoes
            }
        } else {
            // Regular off dominoes
            const maxEnd = Math.max(...domino.ends);
            return maxEnd; // Base value
        }
    }
    
    evaluateDominoForLeadingSetter2(domino, trump) {
        // Setter2 should be conservative when leading
        if (domino.isDouble()) {
            // Doubles are excellent for leading
            if (domino.isTrump(trump)) {
                return 200; // Trump double is best for leading
            } else {
                return 140 + domino.ends[0]; // Lower than Setter1 to preserve doubles
            }
        } else if (domino.isTrump(trump)) {
            // Trump dominoes - higher degree = better for leading
            const degree = domino.getDegree(trump);
            return 100 + degree; // Base trump values
        } else {
            // Off dominoes - Setter2 should be more conservative
            const maxEnd = Math.max(...domino.ends);
            const minEnd = Math.min(...domino.ends);
            return maxEnd * 10 + minEnd; // Base off domino values
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
    
    getStrongestDominoLeader(trickState) {
        // LEADER should prioritize doubles for leading and avoid throwing trumps when higher trumps are out there
        // If no walkers are available, LEADER should still lead with the best available domino
        
        console.log(`LEADER ${this.name} choosing domino to lead with. Hand:`, this.hand.map(d => d.toString()));
        
        // First priority: doubles (excellent for leading)
        const doubles = this.getDoubles(this.hand);
        if (doubles.length > 0) {
            console.log(`LEADER: Found doubles:`, doubles.map(d => d.toString()));
            // Prefer trump double first, then higher non-trump doubles
            const trumpDoubles = doubles.filter(d => d.isTrump(trickState.trump));
            if (trumpDoubles.length > 0) {
                console.log(`LEADER: Using trump double:`, trumpDoubles[0].toString());
                return trumpDoubles[0]; // Trump double is best
            }
            
            // Sort non-trump doubles by value (higher is better for leading)
            doubles.sort((a, b) => b.ends[0] - a.ends[0]);
            console.log(`LEADER: Using highest non-trump double:`, doubles[0].toString());
            return doubles[0]; // Highest double
        }
        
        // Second priority: trump dominoes (but avoid if higher trumps are out there)
        const trumpPlays = this.hand.filter(d => d.isTrump(trickState.trump));
        if (trumpPlays.length > 0) {
            console.log(`LEADER: Found trumps:`, trumpPlays.map(d => d.toString()));
            // Find the highest trump we have
            const highestTrump = trumpPlays.reduce((max, d) => 
                d.getDegree(trickState.trump) > max.getDegree(trickState.trump) ? d : max
            );
            const highestDegree = highestTrump.getDegree(trickState.trump);
            console.log(`LEADER: Highest trump degree:`, highestDegree);
            
            // Check if higher trumps are still out there
            if (!this.isHigherTrumpOutThere(trickState.trump, highestDegree)) {
                // No higher trumps out there - safe to lead with this trump
                console.log(`LEADER: No higher trumps out there, using trump:`, highestTrump.toString());
                return highestTrump;
            } else {
                // Higher trumps are out there - avoid leading with trump
                console.log(`LEADER: Higher trumps out there, looking for off plays`);
                // Look for strong off dominoes instead
                const offPlays = this.hand.filter(d => !d.isTrump(trickState.trump));
                if (offPlays.length > 0) {
                    console.log(`LEADER: Found off plays:`, offPlays.map(d => d.toString()));
                    // Prefer non-count dominoes for leading (preserve count for later)
                    const nonCountPlays = this.getNonCountDominoes(offPlays);
                    if (nonCountPlays.length > 0) {
                        console.log(`LEADER: Found non-count off plays:`, nonCountPlays.map(d => d.toString()));
                        
                        // Filter for safe dominoes to lead with
                        const safeNonCountPlays = nonCountPlays.filter(d => {
                            const isSafe = this.isSafeToLeadWith(d, trickState.trump);
                            const suit = d.getSuit(trickState.trump);
                            const opponentsPlayedOffSuit = this.haveOpponentsPlayedOffSuitOnSuit(suit);
                            const isLastDomino = this.hand.length === 1;
                            
                            // Special case for 6-4: only lead if safe, opponents played off-suit, or last domino
                            if ((d.ends[0] === 6 && d.ends[1] === 4) || (d.ends[0] === 4 && d.ends[1] === 6)) {
                                const sixFivePlayed = this.hasDominoBeenPlayed(new Domino(6, 5));
                                const sixSixPlayed = this.hasDominoBeenPlayed(new Domino(6, 6));
                                const isSafeForSixFour = sixFivePlayed && sixSixPlayed;
                                
                                if (!isSafeForSixFour && !opponentsPlayedOffSuit && !isLastDomino) {
                                    console.log(`LEADER: Avoiding 6-4 because higher 6's are still out there`);
                                    return false;
                                }
                            }
                            
                            if (!isSafe && !opponentsPlayedOffSuit && !isLastDomino) {
                                console.log(`LEADER: Avoiding ${d.toString()} because higher ${suit}'s are still out there`);
                                return false;
                            }
                            
                            return true;
                        });
                        
                        if (safeNonCountPlays.length > 0) {
                            const bestNonCount = safeNonCountPlays.reduce((max, d) => 
                                this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
                            );
                            console.log(`LEADER: Best safe non-count off play:`, bestNonCount.toString(), `(score: ${this.evaluateDominoForLeading(bestNonCount, trickState.trump)})`);
                            return bestNonCount;
                        } else {
                            console.log(`LEADER: No safe non-count plays, using best available`);
                            const bestNonCount = nonCountPlays.reduce((max, d) => 
                                this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
                            );
                            console.log(`LEADER: Best non-count off play (unsafe):`, bestNonCount.toString(), `(score: ${this.evaluateDominoForLeading(bestNonCount, trickState.trump)})`);
                            return bestNonCount;
                        }
                    }
                    // Only use count dominoes if no other options
                    const countPlays = this.getCountDominoes(offPlays);
                    if (countPlays.length > 0) {
                        console.log(`LEADER: Found count off plays:`, countPlays.map(d => d.toString()));
                        const bestCount = countPlays.reduce((max, d) => 
                            this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
                        );
                        console.log(`LEADER: Best count off play:`, bestCount.toString(), `(score: ${this.evaluateDominoForLeading(bestCount, trickState.trump)})`);
                        return bestCount;
                    }
                }
                // No off plays available - forced to lead with trump
                console.log(`LEADER: No off plays available, forced to use trump:`, highestTrump.toString());
                return highestTrump;
            }
        }
        
        // Third priority: non-count dominoes (preserve count for later)
        const nonCountPlays = this.getNonCountDominoes(this.hand);
        if (nonCountPlays.length > 0) {
            console.log(`LEADER: No trumps available, using non-count dominoes:`, nonCountPlays.map(d => d.toString()));
            
            // Filter for safe dominoes to lead with
            const safeNonCountPlays = nonCountPlays.filter(d => {
                const isSafe = this.isSafeToLeadWith(d, trickState.trump);
                const suit = d.getSuit(trickState.trump);
                const opponentsPlayedOffSuit = this.haveOpponentsPlayedOffSuitOnSuit(suit);
                const isLastDomino = this.hand.length === 1;
                
                // Special case for 6-4: only lead if safe, opponents played off-suit, or last domino
                if ((d.ends[0] === 6 && d.ends[1] === 4) || (d.ends[0] === 4 && d.ends[1] === 6)) {
                    const sixFivePlayed = this.hasDominoBeenPlayed(new Domino(6, 5));
                    const sixSixPlayed = this.hasDominoBeenPlayed(new Domino(6, 6));
                    const isSafeForSixFour = sixFivePlayed && sixSixPlayed;
                    
                    if (!isSafeForSixFour && !opponentsPlayedOffSuit && !isLastDomino) {
                        console.log(`LEADER: Avoiding 6-4 because higher 6's are still out there`);
                        return false;
                    }
                }
                
                if (!isSafe && !opponentsPlayedOffSuit && !isLastDomino) {
                    console.log(`LEADER: Avoiding ${d.toString()} because higher ${suit}'s are still out there`);
                    return false;
                }
                
                return true;
            });
            
            if (safeNonCountPlays.length > 0) {
                const bestNonCount = safeNonCountPlays.reduce((max, d) => 
                    this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
                );
                console.log(`LEADER: Best safe non-count play:`, bestNonCount.toString(), `(score: ${this.evaluateDominoForLeading(bestNonCount, trickState.trump)})`);
                return bestNonCount;
            } else {
                console.log(`LEADER: No safe non-count plays, using best available`);
                const bestNonCount = nonCountPlays.reduce((max, d) => 
                    this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
                );
                console.log(`LEADER: Best non-count play (unsafe):`, bestNonCount.toString(), `(score: ${this.evaluateDominoForLeading(bestNonCount, trickState.trump)})`);
                return bestNonCount;
            }
        }
        
        // Last resort: count dominoes (LEADER should avoid leading with count if possible)
        const countPlays = this.getCountDominoes(this.hand);
        if (countPlays.length > 0) {
            console.log(`LEADER: Only count dominoes available:`, countPlays.map(d => d.toString()));
            const bestCount = countPlays.reduce((max, d) => 
                this.evaluateDominoForLeading(d, trickState.trump) > this.evaluateDominoForLeading(max, trickState.trump) ? d : max
            );
            console.log(`LEADER: Best count play:`, bestCount.toString(), `(score: ${this.evaluateDominoForLeading(bestCount, trickState.trump)})`);
            return bestCount;
        }
        
        // Fallback: any domino (should never reach here, but just in case)
        console.log(`LEADER: Fallback to first domino:`, this.hand[0].toString());
        return this.hand[0];
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
    
    getStrongestDominoSetter1(trickState) {
        // SETTER1 should be aggressive and try to beat LEADER when leading
        // Priority: strong trumps > count dominoes > strong offs > doubles
        
        // First priority: strong trumps (including doubles)
        const trumpPlays = this.hand.filter(d => d.isTrump(trickState.trump));
        if (trumpPlays.length > 0) {
            // Find highest trump
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
                this.evaluateDominoForLeadingSetter1(d, trickState.trump) > this.evaluateDominoForLeadingSetter1(max, trickState.trump) ? d : max
            );
        }
        
        // Third priority: strong off dominoes (preserve doubles)
        const offPlays = this.hand.filter(d => !d.isTrump(trickState.trump) && !d.isDouble());
        if (offPlays.length > 0) {
            return offPlays.reduce((max, d) => 
                this.evaluateDominoForLeadingSetter1(d, trickState.trump) > this.evaluateDominoForLeadingSetter1(max, trickState.trump) ? d : max
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
    
    getStrongestDominoSetter2(trickState) {
        // SETTER2 should be more conservative and preserve resources for critical moments
        // Priority: strong non-double trumps > strong offs > count dominoes > doubles
        
        // First priority: strong non-double trumps (preserve doubles for critical moments)
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
        
        // Second priority: strong off dominoes (preserve doubles and count dominoes)
        const offPlays = this.hand.filter(d => !d.isTrump(trickState.trump) && !d.isDouble());
        if (offPlays.length > 0) {
            return offPlays.reduce((max, d) => 
                this.evaluateDominoForLeadingSetter2(d, trickState.trump) > this.evaluateDominoForLeadingSetter2(max, trickState.trump) ? d : max
            );
        }
        
        // Third priority: count dominoes (preserve for critical moments)
        const countPlays = this.getCountDominoes(this.hand);
        if (countPlays.length > 0) {
            return countPlays.reduce((max, d) => 
                this.evaluateDominoForLeadingSetter2(d, trickState.trump) > this.evaluateDominoForLeadingSetter2(max, trickState.trump) ? d : max
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
    
    hasSetter1BeatenLeader(trickState) {
        // Check if SETTER1 has beaten the LEADER in the current trick
        if (trickState.playedDominoes.length === 0) {
            return false;
        }
        
        const leaderIdx = trickState.leaderIdx;
        const leader = this.game.players[leaderIdx];
        const leaderTeam = this.game.teams['Us'].includes(leader) ? 'Us' : 'Them';
        const setterTeam = leaderTeam === 'Us' ? 'Them' : 'Us';
        
        // Find the current winning play
        const [winningDomino, winnerIdx] = trickState.getWinningPlay();
        
        // Check if the winner is on the setter team and is SETTER1
        const winner = this.game.players[winnerIdx];
        if (!this.game.teams[setterTeam].includes(winner)) {
            return false;
        }
        
        // Check if the winner is SETTER1 (the first setter to play)
        const setter1Idx = (leaderIdx + 1) % 4;
        return winnerIdx === setter1Idx;
    }
    
    hasAnySetterBeatenLeader(trickState) {
        // Check if any SETTER has beaten the LEADER in the current trick
        if (trickState.playedDominoes.length === 0) {
            return false;
        }
        
        const leaderIdx = trickState.leaderIdx;
        const leader = this.game.players[leaderIdx];
        const leaderTeam = this.game.teams['Us'].includes(leader) ? 'Us' : 'Them';
        const setterTeam = leaderTeam === 'Us' ? 'Them' : 'Us';
        
        // Find the current winning play
        const [winningDomino, winnerIdx] = trickState.getWinningPlay();
        
        // Check if the winner is on the setter team
        const winner = this.game.players[winnerIdx];
        return this.game.teams[setterTeam].includes(winner);
    }
    
    hasSupporterBeatenSetter1(trickState) {
        // Check if SUPPORTER has beaten SETTER1 back
        if (trickState.playedDominoes.length === 0) {
            return false;
        }
        
        const leaderIdx = trickState.leaderIdx;
        const leader = this.game.players[leaderIdx];
        const leaderTeam = this.game.teams['Us'].includes(leader) ? 'Us' : 'Them';
        const setterTeam = leaderTeam === 'Us' ? 'Them' : 'Us';
        
        // Find the current winning play
        const [winningDomino, winnerIdx] = trickState.getWinningPlay();
        
        // Check if the winner is on the leader's team (SUPPORTER)
        const winner = this.game.players[winnerIdx];
        if (!this.game.teams[leaderTeam].includes(winner)) {
            return false;
        }
        
        // Check if SUPPORTER is winning (not LEADER)
        const supporterIdx = (leaderIdx + 2) % 4;
        return winnerIdx === supporterIdx;
    }
    
    areTrumpsOnlyOnTeam(trickState) {
        // Check if trumps are only on the leader's team
        const leaderIdx = trickState.leaderIdx;
        const leader = this.game.players[leaderIdx];
        const leaderTeam = this.game.teams['Us'].includes(leader) ? 'Us' : 'Them';
        const setterTeam = leaderTeam === 'Us' ? 'Them' : 'Us';
        
        // Check if any setter has trumps
        for (const setter of this.game.teams[setterTeam]) {
            const hasTrumps = setter.hand.some(d => d.isTrump(trickState.trump));
            if (hasTrumps) {
                return false;
            }
        }
        return true;
    }
    
    mustFollowSuit(trickState) {
        // Check if the current player must follow suit
        if (trickState.currentSuit === null) {
            return false; // Leading the trick
        }
        
        // Check if we have any dominoes that can follow the led suit
        return this.hand.some(d => d.canFollowSuit(trickState.currentSuit, trickState.trump));
    }
    
    chooseSupporterLeaderWinning(trickState, validPlays) {
        // When LEADER is winning, SUPPORTER should prioritize count dominoes to maximize points
        // Priority: count dominoes > non-count non-doubles > non-count doubles
        
        // If playing off suit, prioritize count dominoes when leader is winning
        if (this.isPlayingOffSuit(trickState)) {
            const offPlays = this.getOffSuitPlays(validPlays, trickState.trump);
            if (offPlays.length > 0) {
                // First priority: count dominoes (maximize points when leader is winning)
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
                    // Only throw very low doubles when absolutely necessary
                    const veryLowDoubles = nonCountDoubles.filter(d => d.ends[0] <= 1); // Only 0-0, 1-1
                    if (veryLowDoubles.length > 0) {
                        return veryLowDoubles.reduce((min, d) => 
                            d.ends[0] < min.ends[0] ? d : min
                        );
                    }
                    // If no very low doubles, try to avoid throwing doubles entirely
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
        // SETTER playing off suit - preserve count dominoes over doubles except 6-6 unless 6-4 has been played
        // Priority: non-count non-doubles > non-count doubles > count dominoes (only if no other options)
        
        const offPlays = this.getOffSuitPlays(validPlays, trickState.trump);
        
        // Choose the appropriate evaluation method based on role
        const evalMethod = this.role === PlayerRole.SETTER1 ? 
            this.evaluateDominoValueForThrowingSetter1 : 
            this.evaluateDominoValueForThrowingSetter2;
        const strengthEvalMethod = this.role === PlayerRole.SETTER1 ? 
            this.evaluateDominoStrengthSetter1 : 
            this.evaluateDominoStrengthSetter2;
        
        if (offPlays.length > 0) {
            // First priority: non-count, non-double offs (safest to throw)
            const nonCountNonDoubleOffs = this.getNonCountDominoes(this.getNonDoubles(offPlays));
            if (nonCountNonDoubleOffs.length > 0) {
                console.log(`SETTER: Using non-count non-double off (${nonCountNonDoubleOffs.length} options available)`);
                // Throw the least valuable non-count non-double
                return nonCountNonDoubleOffs.reduce((min, d) => 
                    evalMethod.call(this, d, trickState.trump) < evalMethod.call(this, min, trickState.trump) ? d : min
                );
            }
            
            // Second priority: non-count doubles (preserve high doubles when possible)
            const nonCountDoubles = this.getNonCountDominoes(this.getDoubles(offPlays));
            if (nonCountDoubles.length > 0) {
                // Check for special case: 6-6 vs 6-4
                const sixSix = nonCountDoubles.find(d => d.ends[0] === 6 && d.ends[1] === 6);
                const sixFourDomino = new Domino(6, 4);
                const sixFourPlayed = this.hasDominoBeenPlayed(sixFourDomino);
                
                if (sixSix && !sixFourPlayed) {
                    // 6-6 is available but 6-4 has not been played - preserve 6-6
                    const otherDoubles = nonCountDoubles.filter(d => !(d.ends[0] === 6 && d.ends[1] === 6));
                    if (otherDoubles.length > 0) {
                        // Throw other doubles first
                        return otherDoubles.reduce((min, d) => 
                            d.ends[0] < min.ends[0] ? d : min
                        );
                    }
                }
                
                // SETTER should be very conservative about throwing doubles
                // Only throw very low doubles (0-0, 1-1) when absolutely necessary
                const veryLowDoubles = nonCountDoubles.filter(d => d.ends[0] <= 1); // Only 0-0, 1-1
                if (veryLowDoubles.length > 0) {
                    return veryLowDoubles.reduce((min, d) => 
                        d.ends[0] < min.ends[0] ? d : min
                    );
                }
                // If no very low doubles, try to avoid throwing doubles entirely
                // Look for any other off plays first (EXCLUDING count dominoes)
                const otherOffPlays = offPlays.filter(d => !d.isDouble() && !this.isCountDomino(d));
                if (otherOffPlays.length > 0) {
                    return otherOffPlays.reduce((min, d) => 
                        evalMethod.call(this, d, trickState.trump) < evalMethod.call(this, min, trickState.trump) ? d : min
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
                // Triple-check: if we have any non-count options, we should NOT be here
                const allNonCountOffs = this.getNonCountDominoes(offPlays);
                if (allNonCountOffs.length > 0) {
                    console.log(`SETTER: ERROR - Found non-count options but trying to use count! Using non-count instead.`);
                    // We have non-count options - use them instead of count dominoes
                    return allNonCountOffs.reduce((min, d) => 
                        evalMethod.call(this, d, trickState.trump) < evalMethod.call(this, min, trickState.trump) ? d : min
                    );
                }
                
                // Only reach here if we have NO non-count options available
                console.log(`SETTER: FORCED to use count domino (no other options available)`);
                // Prefer 5-counts over 10-counts when forced to throw count
                const fiveCountPlays = countPlays.filter(d => {
                    const [a, b] = d.ends.slice().sort((x, y) => x - y);
                    return (a === 0 && b === 5) || (a === 1 && b === 4) || (a === 2 && b === 3);
                });
                if (fiveCountPlays.length > 0) {
                    console.log(`SETTER: Using 5-count domino`);
                    return fiveCountPlays.reduce((min, d) => 
                        evalMethod.call(this, d, trickState.trump) < evalMethod.call(this, min, trickState.trump) ? d : min
                    );
                }
                console.log(`SETTER: Using 10-count domino (no 5-counts available)`);
                return countPlays.reduce((min, d) => 
                    evalMethod.call(this, d, trickState.trump) < evalMethod.call(this, min, trickState.trump) ? d : min
                );
            }
            
            // Fallback - any off play
            return offPlays.reduce((min, d) => 
                evalMethod.call(this, d, trickState.trump) < evalMethod.call(this, min, trickState.trump) ? d : min
            );
        }
        
        // No off plays available - must play trump
        const trumpPlays = validPlays.filter(d => d.isTrump(trickState.trump));
        if (trumpPlays.length > 0) {
            // Play lowest trump to preserve higher trumps
            return trumpPlays.reduce((min, d) => 
                strengthEvalMethod.call(this, d, trickState.trump) < strengthEvalMethod.call(this, min, trickState.trump) ? d : min
            );
        }
        
        // Fallback - any valid play
        return validPlays.reduce((min, d) => 
            evalMethod.call(this, d, trickState.trump) < evalMethod.call(this, min, trickState.trump) ? d : min
        );
    }
    
    /**
     * Determines if a domino is a walker (cannot be beaten if led), for the LEADER.
     * Follows the sequence: test trumps first, then doubles, then other dominoes.
     * @param {Domino} domino
     * @param {Game} game
     * @returns {boolean}
     */
    isWalker(domino, game) {
        // Only meaningful for LEADER
        if (this.role !== PlayerRole.LEADER) return false;
        const trump = game.trump;
        // 1. Test trumps first: is the highest trump in hand?
        const allTrumps = [];
        for (let i = 0; i < 7; i++) {
            if (i !== trump) {
                allTrumps.push(new Domino(trump, i));
            }
        }
        allTrumps.push(new Domino(trump, trump)); // Add trump double
        // Find highest trump in hand
        const trumpsInHand = this.hand.filter(d => d.isTrump(trump));
        const playedTrumps = game.playedDominoesThisHand.filter(e => e.domino.isTrump(trump)).map(e => e.domino.toString());
        // Find highest trump not played
        let highestTrump = null;
        for (let deg = 6; deg >= 0; deg--) {
            const d = deg === trump ? new Domino(trump, trump) : new Domino(trump, deg);
            if (!playedTrumps.includes(d.toString()) && trumpsInHand.some(td => td.toString() === d.toString())) {
                highestTrump = d;
                break;
            }
        }
        // If no highest trump in hand, no walkers
        if (!highestTrump) return false;
        // If domino is the highest trump, it's a walker
        if (domino.toString() === highestTrump.toString()) return true;
        // If there are any trumps left in play not in hand, no walkers
        for (let deg = 6; deg >= 0; deg--) {
            const d = deg === trump ? new Domino(trump, trump) : new Domino(trump, deg);
            if (!playedTrumps.includes(d.toString()) && !trumpsInHand.some(td => td.toString() === d.toString())) {
                return false;
            }
        }
        // At this point, LEADER has all remaining trumps
        // 2. All doubles in hand are walkers
        if (domino.isDouble()) return true;
        // 3. For other dominoes, check if any higher dominoes of that suit are left in play
        const suit = domino.getSuit(trump);
        const degree = domino.getDegree(trump);
        // Find all dominoes of this suit with higher degree
        for (let d = 6; d > degree; d--) {
            if (d === suit) continue; // skip double
            const candidate = new Domino(suit, d);
            // If not played and not in hand, it's still out there
            const played = game.playedDominoesThisHand.some(e => e.domino.toString() === candidate.toString());
            const inHand = this.hand.some(hd => hd.toString() === candidate.toString());
            if (!played && !inHand) {
                return false;
            }
        }
        // If no higher dominoes of this suit are left, it's a walker
        return true;
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
        
        // Assign initial planet names to players
        this.assignPlanetNames();
        
        this.handScoreboards = []; // Store scoreboard for each hand
        this.lastHandPlayerHands = null; // For troubleshooting
        this.lastHandBiddingInfo = null;
        this.playedDominoesThisHand = []; // Now an array of {domino, playerIdx, role, relationship}
        this.playedDominoesThisTrick = []; // Reset each trick
        
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
        
        // Bidding state tracking for window restoration
        this.currentBiddingState = {
            bidOrder: null,
            playerMap: null,
            playerData: null,
            currentIndex: null,
            waitingForHuman: false
        };
        
        // UI elements
        // Score display elements moved to game table window header
        this.scoreDisplay = null;
        this.usScore = null;
        this.themScore = null;
        // Bidding elements removed from main container - now handled in player windows
        this.biddingArea = null;
        this.biddingStatus = null;
        this.biddingBoard = null;
        this.biddingResults = null;
        this.bidInputArea = null;
        this.bidInput = null;
        this.submitBid = null;
        this.trumpSelection = null;
        this.trumpSuggested = null;
        this.confirmTrump = null;
        this.playerHand = document.getElementById('player-hand');
        this.dominoes = document.getElementById('dominoes');
        this.trickArea = null; // Element doesn't exist in HTML
        this.trickInfo = null; // Element doesn't exist in HTML
        this.playedDominoes = null; // Element doesn't exist in HTML
        this.handScoreboard = document.getElementById('hand-scoreboard');
        this.usHandPointsElement = document.getElementById('us-hand-points');
        this.themHandPointsElement = document.getElementById('them-hand-points');
        this.usTricks = document.getElementById('us-tricks');
        this.themTricks = document.getElementById('them-tricks');
        this.scoreboard = document.getElementById('scoreboard');
        this.scoreboardContent = document.getElementById('scoreboard-content');
        this.startGame = document.getElementById('start-game');
        this.playDomino = document.getElementById('play-domino');
        this.showHistoryBtn = null; // Moved to game table window header
        this.scoreboardHistoryModal = document.getElementById('scoreboard-history-modal');
        this.historyContent = document.getElementById('history-content');
        
        // Hand history tracking
        this.handHistory = []; // Array to store previous hand scoreboards
        
        // Initialize player window manager
        this.gameTableManager = new GameTableWindowManager(this);
        
        // Bind event listeners
        this.bindEventListeners();
        
        // Display team introductions on page load
        this.displayTeamIntroductions();
        
        this.playerHasNo = [new Set(), new Set(), new Set(), new Set()]; // Track suits each player cannot follow
    }
    
    bindEventListeners() {
        if (this.startGame) this.startGame.addEventListener('click', () => this.startNewGame());
        // Bidding and trump selection event listeners removed - now handled in player windows
        if (this.playDomino) this.playDomino.addEventListener('click', async () => await this.playSelectedDomino());
        // History button event listener moved to game table window header
        
        // Close modal button - enhanced for mobile compatibility
        const scoreboardCloseBtn = document.querySelector('.aquaButton--scoreboard');
        if (scoreboardCloseBtn) {
            // Handle both click and touch events
            scoreboardCloseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.hideElement(this.scoreboardHistoryModal);
                // Reset z-index when modal is closed
                if (this.scoreboardHistoryModal) this.scoreboardHistoryModal.style.zIndex = '';
            });
            
            scoreboardCloseBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.hideElement(this.scoreboardHistoryModal);
                // Reset z-index when modal is closed
                if (this.scoreboardHistoryModal) this.scoreboardHistoryModal.style.zIndex = '';
            });
            
            // Prevent default touch behavior that might interfere
            scoreboardCloseBtn.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            });
        }
        
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
    
    assignPlanetNames() {
        // Randomly assign planet names to players
        let availableNames = [...PLANET_NAMES];
        availableNames = shuffleArray(availableNames);
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].name = availableNames[i];
        }
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
        this.playedDominoesThisHand = [];
        this.playedDominoesThisTrick = [];
        this.playerHasNo = [new Set(), new Set(), new Set(), new Set()];
    }
    
    addPlayedDomino(domino, playerIdx) {
        // Track a domino that has been played, with player, role, and relationship
        const player = this.players[playerIdx];
        const role = player.role;
        const relationship = this.getPlayerRelationship(playerIdx);
        const entry = { domino, playerIdx, role, relationship };
        this.playedDominoesThisHand.push(entry);
        this.playedDominoesThisTrick.push(entry);
        
        // Out-of-suit tracking
        if (this.currentTrick && this.currentTrick.currentSuit !== null) {
            const ledSuit = this.currentTrick.currentSuit;
            // If player could have followed suit but didn't, record it
            const couldFollow = player.hand.some(d => d.canFollowSuit(ledSuit, this.trump));
            if (!domino.canFollowSuit(ledSuit, this.trump) && couldFollow) {
                this.playerHasNo[playerIdx].add(ledSuit);
            }
        }
    }
    
    updateStatus(text) {
        // Status display removed - no longer needed
        console.log('Status:', text);
    }
    
    showElement(element) {
        if (element) {
        element.classList.remove('hidden');
        }
    }
    
    hideElement(element) {
        if (element) {
        element.classList.add('hidden');
        }
    }
    
    updateScoreDisplay() {
        // Update original score display (if it exists)
        if (this.usScore) this.usScore.textContent = this.scores[0];
        if (this.themScore) this.themScore.textContent = this.scores[1];
        this.showElement(this.scoreDisplay);
        
        // Update game table window score display
        if (this.gameTableManager) {
            const gameTableUsScore = document.getElementById('game-table-us-score');
            const gameTableThemScore = document.getElementById('game-table-them-score');
            if (gameTableUsScore) gameTableUsScore.textContent = this.scores[0];
            if (gameTableThemScore) gameTableThemScore.textContent = this.scores[1];
        }
    }
    
    updateHandScoreboard() {
        if (this.usHandPointsElement) this.usHandPointsElement.textContent = this.usHandPoints;
        if (this.themHandPointsElement) this.themHandPointsElement.textContent = this.themHandPoints;
        this.showElement(this.handScoreboard);
    }
    
    showPlayNextTrickButton() {
        // Show the button in the game table window header
        if (this.gameTableManager) {
            this.gameTableManager.showPlayNextTrickButton();
        }
    }
    
    hidePlayNextTrickButton() {
        // Hide the button in the game table window header
        if (this.gameTableManager) {
            this.gameTableManager.hidePlayNextTrickButton();
        }
    }
    
    showShuffleNextHandButton() {
        // Show the button in the game table window header
        if (this.gameTableManager) {
            this.gameTableManager.showShuffleNextHandButton();
        }
    }
    
    hideShuffleNextHandButton() {
        // Hide the button in the game table window header
        if (this.gameTableManager) {
            this.gameTableManager.hideShuffleNextHandButton();
        }
    }
    
    resetGameTableHeader() {
        // Reset the game table window header to bidding mode
        if (this.gameTableManager) {
            this.gameTableManager.resetGameTableHeader();
        }
    }
    
    displayPlayedDomino(domino, player) {
        // This method is now only used for the game table window display
        // The main display is handled by gameTableManager.displayPlayedDomino()
        const mod = domino.modulate(this.trump, this.currentTrick?.currentSuit);
        console.log(`${this.formatPlayerNameWithRelationship(player)} plays ${mod[0]}-${mod[1]}`);
    }
    
    addTrickToScoreboard(trickData) {
        this.currentHandTricks.push(trickData);
        
        // Clear previous scoreboard
        if (this.usTricks) this.usTricks.innerHTML = '';
        if (this.themTricks) this.themTricks.innerHTML = '';
        
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
            if (this.usTricks) this.usTricks.appendChild(trickGroup);
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
            if (this.themTricks) this.themTricks.appendChild(trickGroup);
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
        this.playedDominoesThisHand = []; // Now an array of {domino, playerIdx, role, relationship}
        this.playedDominoesThisTrick = []; // Reset each trick
        this.handHistory = []; // Clear hand history for new game
        
        // Reset player hands and roles (keep existing planet names)
        for (let i = 0; i < this.players.length; i++) {
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
        
        // Create game table window
        this.gameTableManager.createGameTableWindow();
        
        // Hide start game button
        this.hideElement(this.startGame);
        
        this.updateStatus("Starting first hand...");
        
        // Automatically start bidding
        this.startBidding();
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
        if (this.dominoes) this.dominoes.innerHTML = '';
        const humanPlayer = this.players[0];
        
        humanPlayer.hand.forEach((domino, index) => {
            const dominoElement = document.createElement('div');
            dominoElement.className = 'domino';
            dominoElement.textContent = domino.toString();
            dominoElement.dataset.index = index;
            
            dominoElement.addEventListener('click', () => {
                this.selectDomino(index);
            });
            
            if (this.dominoes) this.dominoes.appendChild(dominoElement);
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
        if (this.playDomino) this.playDomino.disabled = false;
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
        
        // Initialize bidding board in player windows
        this.initializeBiddingBoardInPlayerWindows(bidOrder);
        
        // Update game table player order for bidding phase
        if (this.gameTableManager) {
            this.gameTableManager.updatePlayerOrder(bidOrder);
        }
        
        // Reset game table header to bidding mode
        this.resetGameTableHeader();
        
        this.updateStatus("Bidding phase in progress...");
        
        // Process bidding for each player
        this.processBidding(bidOrder, playerMap, playerData, 0);
    }
    
    processBidding(bidOrder, playerMap, playerData, currentIndex) {
        console.log(`processBidding: currentIndex=${currentIndex}, bidOrder.length=${bidOrder.length}`);
        
        if (currentIndex >= bidOrder.length) {
            // Bidding complete
            console.log('Bidding complete, finishing...');
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
        // Store current bidding state for window restoration
        this.currentBiddingState = {
            bidOrder: bidOrder,
            playerMap: playerMap,
            playerData: playerData,
            currentIndex: currentIndex,
            waitingForHuman: true
        };
        
        // Update main status
        this.updateStatus(`Bidding phase in progress...`);
        
        // Show bidding interface in human player window
        const humanPlayerIndex = 0;
        this.gameTableManager.addPlayerMessage(humanPlayerIndex, 
            `It's your turn to bid! Current bid: ${this.currentBid === 0 ? 'pass' : this.currentBid}`, 'action');
        
        // Show bid input in player window
        this.gameTableManager.showBidInput(humanPlayerIndex);
        // Note: setupBidInputHandler is not needed in the new system
    }
    
    restoreBiddingInterface() {
        if (this.currentBiddingState.waitingForHuman && this.currentPhase === 'bidding') {
            const humanPlayerIndex = 0;
            this.gameTableManager.addPlayerMessage(humanPlayerIndex, 
                `It's your turn to bid! Current bid: ${this.currentBid === 0 ? 'pass' : this.currentBid}`, 'action');
            
            // Show bid input in player window
            this.gameTableManager.showBidInput(humanPlayerIndex);
            // Note: setupBidInputHandler is not needed in the new system
        }
    }
    
    submitBidHandler() {
        // This method is no longer used - bidding is handled in player windows
        console.warn('submitBidHandler called but bidding is now handled in player windows');
    }
    
    processPlayerBid(bid) {
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
        
        // Bid input area removed from main container - handled in player windows
        
        // Add player-specific message for human player
        this.gameTableManager.addPlayerMessage(0, `Bids ${bid}`, 'action');
        
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
        // Enhanced AI bidding logic with strategic considerations
        const partnerName = this.getPartnerName(currentPlayer);
        const partnerBid = this.bidHistory[partnerName];
        const partnerIsLeader = partnerBid !== undefined && partnerBid !== 'pass' && partnerBid === this.currentBid;
        
        // Get current game score for strategic adjustments
        const currentTeam = this.teams['Us'].includes(currentPlayer) ? 'Us' : 'Them';
        const ourScore = this.scores[currentTeam === 'Us' ? 0 : 1];
        const theirScore = this.scores[currentTeam === 'Us' ? 1 : 0];
        const scoreDifference = ourScore - theirScore;
        
        // Adjust confidence based on game situation
        let adjustedConfidence = pdata.confidence;
        
        // More aggressive when behind
        if (scoreDifference < -2) {
            adjustedConfidence += 1;
        }
        // More conservative when ahead
        if (scoreDifference > 2) {
            adjustedConfidence = Math.max(0, adjustedConfidence - 1);
        }
        
        // Adjust based on position in bidding order
        if (currentIndex === 0) {
            // First to bid - be more conservative
            adjustedConfidence = Math.max(0, adjustedConfidence - 1);
        } else if (currentIndex === bidOrder.length - 1) {
            // Last to bid - be more aggressive if we can win
            if (pdata.maxBid > this.currentBid) {
                adjustedConfidence += 1;
            }
        }
        
        // If partner is leader and AI has a supporting hand, may pass
        if (partnerIsLeader && adjustedConfidence <= playerData[partnerName].confidence) {
            console.log(`${this.formatPlayerNameWithRelationship(currentPlayer)}: Partner is leader, passing to support`);
            const playerIndex = this.players.indexOf(currentPlayer);
            this.gameTableManager.addPlayerMessage(playerIndex, `Partner is leading, passing to support`, 'info');
            return 'pass';
        }
        
        // If AI's confidence is significantly higher than partner's, take the bid
        if (partnerIsLeader && adjustedConfidence >= playerData[partnerName].confidence + 2) {
            // Must outbid current bid by at least 1
            if (pdata.maxBid > this.currentBid) {
                // If last to bid, only outbid by 1
                if (currentIndex === bidOrder.length - 1) {
                    console.log(`${this.formatPlayerNameWithRelationship(currentPlayer)}: Last to bid, outbidding by 1`);
                    return this.currentBid + 1;
                } else {
                    console.log(`${this.formatPlayerNameWithRelationship(currentPlayer)}: Taking bid from partner`);
                    return pdata.maxBid;
                }
            } else {
                console.log(`${this.formatPlayerNameWithRelationship(currentPlayer)}: Cannot outbid current bid, passing`);
                return 'pass';
            }
        }
        
        // If last to bid and can win, only outbid by 1
        if (currentIndex === bidOrder.length - 1 && pdata.maxBid > this.currentBid) {
            console.log(`${this.formatPlayerNameWithRelationship(currentPlayer)}: Last to bid, minimal outbid`);
            return this.currentBid + 1;
        }
        
        // Check if we should be more aggressive based on hand strength
        if (adjustedConfidence >= 4) {
            // Very strong hand - be more aggressive
            if (pdata.maxBid > this.currentBid) {
                console.log(`${this.formatPlayerNameWithRelationship(currentPlayer)}: Strong hand, bidding aggressively`);
                return pdata.maxBid;
            }
        }
        
        if (pdata.maxBid <= this.currentBid) {
            console.log(`${this.formatPlayerNameWithRelationship(currentPlayer)}: Cannot outbid, passing`);
            const playerIndex = this.players.indexOf(currentPlayer);
            this.gameTableManager.addPlayerMessage(playerIndex, `Cannot outbid ${this.currentBid}, passing`, 'info');
            return 'pass';
        } else {
            console.log(`${this.formatPlayerNameWithRelationship(currentPlayer)}: Bidding ${pdata.maxBid}`);
            const playerIndex = this.players.indexOf(currentPlayer);
            this.gameTableManager.addPlayerMessage(playerIndex, `Bidding ${pdata.maxBid}`, 'action');
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
        console.log('finishBidding called');
        console.log('highestBidder:', this.highestBidder);
        console.log('currentBid:', this.currentBid);
        
        // Ensure someone wins: if all pass except last bidder, they get it for 30
        if (this.highestBidder === null) {
            const lastBidder = this.lastHandBidOrder[this.lastHandBidOrder.length - 1];
            this.highestBidder = lastBidder;
            this.currentBid = 30;
            this.bidHistory[lastBidder] = 30;
            this.updateBiddingBoard(lastBidder, 30);
            console.log('No winner, defaulting to last bidder:', lastBidder);
        }
        
        // Show bidding results in all player windows
        this.players.forEach((player, index) => {
            const playerName = this.formatPlayerNameWithRelationship(player);
            const bid = this.bidHistory[playerName] || 'pass';
            const bidText = bid === 'pass' ? 'Passed' : `Bid: ${bid}`;
            
            if (playerName === this.highestBidder) {
                this.gameTableManager.addPlayerMessage(index, `WON BID with ${this.currentBid}!`, 'success');
            } else {
                this.gameTableManager.addPlayerMessage(index, bidText, 'info');
            }
        });
        
        // Clear bidding state since bidding is complete
        this.currentBiddingState = {
            bidOrder: null,
            playerMap: null,
            playerData: null,
            currentIndex: null,
            waitingForHuman: false
        };
        
        // Show ready to start prompt
        this.showReadyToStart();
    }
    
    showTrumpSelection(suggestedTrump) {
        this.currentPhase = 'trump-selection';
        
        // Add trump selection prompt to human player window
        this.gameTableManager.addPlayerMessage(0, "Select a trump suit", 'action');
        
        // Show trump selection interface in human player window
        this.gameTableManager.showTrumpSelection(0);
    }
    
    confirmTrumpHandler() {
        // This method is no longer used - trump selection is handled in player windows
        console.warn('confirmTrumpHandler called but trump selection is now handled in player windows');
    }
    
    setTrumpAndStartHand(trump) {
        this.trump = trump;
        this.bidWinner = this.highestBidder;
        this.winningBid = this.currentBid;
        this.handModes = this.profileHandModes(trump);
        
        // Trump selection and bidding area removed from main container - handled in player windows
        
        this.updateStatus(`${this.bidWinner} wins the bid with ${this.winningBid} on ${this.trump} as trump.`);
        
        // Update bid winner header and game table header
        const bidWinnerIdx = this.players.findIndex(p => this.formatPlayerNameWithRelationship(p) === this.bidWinner);
        if (bidWinnerIdx !== -1 && this.gameTableManager) {
            this.gameTableManager.updateBidWinnerHeader(bidWinnerIdx, this.winningBid);
            this.gameTableManager.updateGameTableHeader(`${this.trump}'s`, null);
        }
        
        // Show trump selection in all player windows
        this.players.forEach((player, index) => {
            const playerName = this.formatPlayerNameWithRelationship(player);
            if (playerName === this.bidWinner) {
                this.gameTableManager.addPlayerMessage(index, `Trump: ${this.trump}'s`, 'success');
            } else {
                this.gameTableManager.addPlayerMessage(index, `Trump: ${this.trump}'s`, 'info');
            }
        });
        
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
        
        // Assign roles for this hand
        this.assignRoles(bidWinnerIdx);
        
        console.log('Bid winner:', this.bidWinner);
        console.log('Bid winner index:', bidWinnerIdx);
        console.log('Current leader index:', this.currentLeaderIdx);
        console.log('Bid winner is human:', this.players[bidWinnerIdx].isHuman);
        
        this.showElement(this.handScoreboard);
        this.updateHandScoreboard();
        
        // Update game table player order for trick phase
        if (this.gameTableManager) {
            this.gameTableManager.updatePlayerOrder();
        }
        
        // Start the first trick
        this.playTrick();
    }
    

    
    playTrick() {
        // Clear all domino displays in game table
        if (this.gameTableManager) {
            this.gameTableManager.clearAllDominoDisplays();
        }
        
        console.log('Starting new trick!');
        console.log('Current leader index:', this.currentLeaderIdx);
        console.log('Leader will be:', this.formatPlayerNameWithRelationship(this.players[this.currentLeaderIdx]));
        
        // Initialize new trick
        this.currentTrick = new TrickState(this.currentLeaderIdx, this.trump, this.handModes);
        
        // Update game table player order for this trick
        if (this.gameTableManager) {
            this.gameTableManager.updatePlayerOrder();
        }
        
        // Update header to show trump suit (no current suit yet since no domino has been played)
        if (this.gameTableManager) {
            this.gameTableManager.updateGameTableHeader(`${this.trump}'s`, null);
        }
        
        // Determine play order for this trick - start with leader, then go in order 0,1,2,3
        const trickOrder = [this.currentLeaderIdx];
        for (let i = 1; i < 4; i++) {
            const nextPlayer = (this.currentLeaderIdx + i) % 4;
            trickOrder.push(nextPlayer);
        }
        
        console.log('Trick order:', trickOrder.map(idx => this.formatPlayerNameWithRelationship(this.players[idx])));
        
        this.currentPlayerIndex = 0;
        this.playNextPlayer(trickOrder);
        this.playedDominoesThisTrick = []; // Reset playedDominoesThisTrick at the start of each trick
    }
    
    async playNextPlayer(trickOrder) {
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
                this.currentTrick.addPlay(chosenDomino, playerIdx, [chosenDomino.ends[0], chosenDomino.ends[1]]);
                this.addPlayedDomino(chosenDomino, playerIdx); // Now passes playerIdx
                
                // Update header with current suit if this is the first domino played
                if (this.gameTableManager && this.currentTrick.playedDominoes.length === 1) {
                    this.gameTableManager.updateGameTableHeader(`${this.trump}'s`, this.currentTrick.currentSuit);
                }
                
                // Update display
                this.displayPlayedDomino(chosenDomino, player);
                
                // Update game table display
                await this.gameTableManager.displayPlayedDomino(chosenDomino, playerIdx, [chosenDomino.ends[0], chosenDomino.ends[1]]);
                
                // Show modulated representation
                const mod = chosenDomino.modulate(this.trump, this.currentTrick.currentSuit);
                const roleName = player.role || "None";
                console.log(`${roleName}: ${this.formatPlayerNameWithRelationship(player)} plays ${mod[0]}-${mod[1]}`);
                this.updateStatus(`${roleName}: ${this.formatPlayerNameWithRelationship(player)} plays ${mod[0]}-${mod[1]}`);
                
                // Add player-specific message for AI player
                this.gameTableManager.addPlayerMessage(playerIdx, `Plays ${mod[0]}-${mod[1]} (${roleName})`, 'action');
            }
            
            this.currentPlayerIndex++;
            setTimeout(async () => {
                await this.playNextPlayer(trickOrder);
            }, 1000);
        }
    }
    
    async playSelectedDomino() {
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
        const playedEnds = [chosenDomino.ends[0], chosenDomino.ends[1]];
        this.currentTrick.addPlay(chosenDomino, 0, playedEnds);
        this.addPlayedDomino(chosenDomino, 0); // Now passes playerIdx
        
        // Update header with current suit if this is the first domino played
        if (this.gameTableManager && this.currentTrick.playedDominoes.length === 1) {
            this.gameTableManager.updateGameTableHeader(`${this.trump}'s`, this.currentTrick.currentSuit);
        }
        
        // Update display
        this.displayPlayedDomino(chosenDomino, humanPlayer);
        this.displayPlayerHand();
        
        // Update game table display
        await this.gameTableManager.displayPlayedDomino(chosenDomino, 0, [chosenDomino.ends[0], chosenDomino.ends[1]]);
        
        // Add player-specific message for human player
        const mod = chosenDomino.modulate(this.trump, this.currentTrick.currentSuit);
        const roleName = humanPlayer.role || "None";
        this.gameTableManager.addPlayerMessage(0, `Plays ${mod[0]}-${mod[1]} (${roleName})`, 'action');
        
        // Clear selection
        this.selectedDomino = null;
        if (this.playDomino) this.playDomino.disabled = true;
        
        // Continue with next player in the current trick order
        this.currentPlayerIndex++;
        
        // Determine the correct trick order for the current leader
        const trickOrder = [this.currentLeaderIdx];
        for (let i = 1; i < 4; i++) {
            const nextPlayer = (this.currentLeaderIdx + i) % 4;
            trickOrder.push(nextPlayer);
        }
        
        await this.playNextPlayer(trickOrder);
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
            playerPlays: this.currentTrick.playedDominoes.map(([domino, playerIdx, playedEnds]) => ({
                domino: domino,
                playerIdx: playerIdx,
                playedEnds: playedEnds
            }))
        };
        
        // Add to scoreboard
        this.addTrickToScoreboard(trickData);
        
        this.updateStatus(`${this.formatPlayerNameWithRelationship(winner)} wins the trick! ${team} gets ${trickPoints} points.`);
        
        // Add player-specific message for trick winner
        this.gameTableManager.addPlayerMessage(winnerIdx, `Wins trick! +${trickPoints} points for ${team}`, 'action');
        
        // Update for next trick
        this.currentLeaderIdx = winnerIdx;
        
        // Update roles for the new leader
        this.assignRoles(this.currentLeaderIdx);
        
        // Update player window headers with new roles
        this.gameTableManager.updateAllPlayerRoles();
        
        console.log('New leader index set to:', this.currentLeaderIdx);
        console.log('New leader will be:', this.formatPlayerNameWithRelationship(this.players[this.currentLeaderIdx]));
        
        // Check if hand is over
        if (this.isHandOver()) {
            this.finishHand();
        } else {
            // Show "Play Next Trick" button instead of automatically starting
            this.showPlayNextTrickButton();
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
        
        // Hide the play next trick button since hand is over
        this.hidePlayNextTrickButton();
        
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
            // Show shuffle next hand button instead of automatically starting
            this.showShuffleNextHandButton();
        }
    }
    
    startNewHand() {
        // Reset hand tracking
        this.currentHandTricks = [];
        this.usHandPoints = 0;
        this.themHandPoints = 0;
        this.playedDominoesThisHand = []; // Now an array of {domino, playerIdx, role, relationship}
        this.playedDominoesThisTrick = []; // Reset each trick
        
        // Rotate starting bidder
        this.startingBidderIndex = (this.startingBidderIndex + 1) % 4;
        
        // Clear UI
        this.hideElement(this.handScoreboard);
        if (this.trickArea) this.hideElement(this.trickArea);
        this.hideElement(this.playerHand);
        if (this.biddingBoard) this.hideElement(this.biddingBoard);
        if (this.playedDominoes) this.playedDominoes.innerHTML = '';
        this.hidePlayNextTrickButton();
        this.hideShuffleNextHandButton();
        
        // Clear scoreboard
        if (this.usTricks) this.usTricks.innerHTML = '';
        if (this.themTricks) this.themTricks.innerHTML = '';
        
        // Clear bidding display from all player windows
        this.players.forEach((player, index) => {
            this.gameTableManager.clearPlayerBid(index);
        });
        
        // Stop all audio when starting a new hand
        if (this.gameTableManager) {
            this.gameTableManager.stopBirdAudio();
        }
        
        // Clear all domino displays from player windows
        if (this.gameTableManager) {
            this.gameTableManager.clearAllDominoDisplays();
        }
        
        // Reset game table header to bidding mode
        this.resetGameTableHeader();
        
        // Start new hand
        this.shuffleAndDeal();
        this.handSortingPhase();
        this.displayPlayerHand();
        
        this.updateStatus("New hand dealt! Starting bidding...");
        
        // Automatically start bidding
        this.startBidding();
    }
    
    initializeBiddingBoard(bidOrder) {
        // No-op since bidding area was removed from main container
        // Bidding is now handled entirely in player windows
    }
    
    initializeBiddingBoardInPlayerWindows(bidOrder) {
        // Clear all player messages and add bidding info
        this.players.forEach((player, index) => {
                    this.gameTableManager.clearPlayerMessages(index);
        this.gameTableManager.addPlayerMessage(index, 'Bidding phase starting...', 'info');
            // Initialize bidding display in player window header
            this.gameTableManager.clearPlayerBid(index);
        });
        
        // Add bidding order to each player's window
        bidOrder.forEach((playerName, index) => {
            const playerIndex = this.players.findIndex(p => 
                this.formatPlayerNameWithRelationship(p) === playerName
            );
            if (playerIndex !== -1) {
                this.gameTableManager.addPlayerMessage(playerIndex, 
                    `Bidding order: ${index + 1} of ${bidOrder.length}`, 'info');
            }
        });
    }
    
    updateBiddingBoard(playerName, bid) {
        // Update player window only since bidding area was removed from main container
        const playerIndex = this.players.findIndex(p => 
            this.formatPlayerNameWithRelationship(p) === playerName
        );
        if (playerIndex !== -1) {
            const bidText = bid === 'pass' ? 'Pass' : `Bid: ${bid}`;
            this.gameTableManager.addPlayerMessage(playerIndex, bidText, 'action');
            // Update the player window header with bid information
            this.gameTableManager.updatePlayerBid(playerIndex, bid);
        }
    }
    
    showReadyToStart() {
        // Bid input area removed from main container - handled in player windows
        this.updateStatus("Bidding complete! Starting hand...");
        
        // Add message to human player window
        this.gameTableManager.addPlayerMessage(0, "Bidding complete! Starting hand...", 'info');
        
        // Automatically start the hand after a short delay
        setTimeout(() => {
            this.startHandAfterBidding();
        }, 1000);
    }
    
    startHandAfterBidding() {
        // Bidding board removed from main container - handled in player windows
        
        // Clear bidding messages from all player windows and hide bid input
        this.players.forEach((player, index) => {
            this.gameTableManager.clearPlayerMessages(index);
            this.gameTableManager.hideBidInput(index);
            // Clear bidding display from player window headers
            this.gameTableManager.clearPlayerBid(index);
        });
        
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
    
    assignRoles(leaderIdx) {
        // Assign roles based on the current leader
        // LEADER: The player who is leading the current trick
        // SUPPORTER: The partner of the leader
        // SETTER1/SETTER2: The two opponents trying to prevent the bid
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            if (i === leaderIdx) {
                player.role = PlayerRole.LEADER;
            } else if (this.teams['Us'].includes(player) && this.teams['Us'].includes(this.players[leaderIdx])) {
                player.role = PlayerRole.SUPPORTER;
            } else if (this.teams['Them'].includes(player) && this.teams['Them'].includes(this.players[leaderIdx])) {
                player.role = PlayerRole.SUPPORTER;
            } else {
                // Assign SETTER1 and SETTER2 based on position relative to leader
                // SETTER1: next opponent clockwise from leader, SETTER2: other opponent
                const oppIndices = [1, 3].filter(idx => idx !== leaderIdx && idx !== (leaderIdx + 2) % 4);
                // Find the two opponents
                const opponents = this.players.map((p, idx) => ({p, idx})).filter(({p, idx}) => !this.teams['Us'].includes(p) === !this.teams['Us'].includes(this.players[leaderIdx]) && idx !== leaderIdx);
                // Determine which is SETTER1 (next clockwise from leader)
                let setter1Idx = (leaderIdx + 1) % 4;
                let setter2Idx = (leaderIdx + 3) % 4;
                if (!this.teams['Us'].includes(this.players[leaderIdx])) {
                    // If leader is THEM, swap for correct assignment
                    setter1Idx = (leaderIdx + 1) % 4;
                    setter2Idx = (leaderIdx + 3) % 4;
                }
                if (i === setter1Idx) {
                    player.role = PlayerRole.SETTER1;
                } else if (i === setter2Idx) {
                    player.role = PlayerRole.SETTER2;
                }
            }
        }
        console.log('Roles assigned:');
        this.players.forEach((player, idx) => {
            console.log(`${this.formatPlayerNameWithRelationship(player)}: ${player.role}`);
            // Add role assignment message to player window
            this.gameTableManager.addPlayerMessage(idx, `Role: ${player.role}`, 'info');
            // Update player window header with new role
            this.gameTableManager.updatePlayerRole(idx, player.role);
        });
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
        
        if (this.historyContent) this.historyContent.innerHTML = '';
        
        if (this.handHistory.length === 0) {
            if (this.historyContent) this.historyContent.innerHTML = '<p>No hand history available yet.</p>';
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
                
                if (this.historyContent) this.historyContent.appendChild(handDiv);
            });
        }
        
        console.log('Showing modal');
        this.showElement(this.scoreboardHistoryModal);
        
        // Ensure the modal is brought to front
        if (this.scoreboardHistoryModal) this.scoreboardHistoryModal.style.zIndex = '9999';
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
    
    playerHasNoSuit(playerIdx, suit) {
        return this.playerHasNo[playerIdx].has(suit);
    }
}

// Initialize the game when the page loads
let game;

document.addEventListener('DOMContentLoaded', function() {
    game = new Game();
}); 