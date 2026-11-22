// Shared random-audio system for gallery modals.
// Load this before moss.js / touchdesigner.js; they call playModalAudio()
// and stopModalAudio() when a modal opens or closes.

let currentAudio = null;

const birdsongFiles = [
  'assets/audio/birdsongs/downloads/african_grey_hornbill/african_grey_hornbill_recording_1.mp3',
  'assets/audio/birdsongs/downloads/alpine_chough/alpine_chough_recording_1.mp3',
  'assets/audio/birdsongs/downloads/amazonian_royal_flycatcher/amazonian_royal_flycatcher_recording_1.mp3',
  'assets/audio/birdsongs/downloads/australian_magpie/australian_magpie_recording_1.mp3',
  'assets/audio/birdsongs/downloads/black_capped_chickadee/black_capped_chickadee_recording_1.mp3',
  'assets/audio/birdsongs/downloads/blackcap/blackcap_recording_1.mp3',
  'assets/audio/birdsongs/downloads/bluethroat/bluethroat_recording_1.mp3',
  'assets/audio/birdsongs/downloads/common_nightingale/common_nightingale_recording_1.mp3',
  'assets/audio/birdsongs/downloads/european_robin/european_robin_recording_1.mp3',
  'assets/audio/birdsongs/downloads/golden_whistler/golden_whistler_recording_1.mp3',
  'assets/audio/birdsongs/downloads/hermit_thrush/hermit_thrush_recording_1.mp3',
  'assets/audio/birdsongs/downloads/musician_wren/musician_wren_recording_1.mp3',
  'assets/audio/birdsongs/downloads/pied_butcherbird/pied_butcherbird_recording_1.mp3',
  'assets/audio/birdsongs/downloads/rose_breasted_grosbeak/rose_breasted_grosbeak_recording_1.mp3',
  'assets/audio/birdsongs/downloads/scarlet_tanager/scarlet_tanager_recording_1.mp3',
  'assets/audio/birdsongs/downloads/superb_lyrebird/superb_lyrebird_recording_1.mp3',
  'assets/audio/birdsongs/downloads/wood_thrush/wood_thrush_recording_1.mp3'
];

const tbilisiFiles = [
  'assets/audio/tbilisi supercollider recordings/birdland.mp3',
  'assets/audio/tbilisi supercollider recordings/fax.mp3',
  'assets/audio/tbilisi supercollider recordings/fax2.mp3',
  'assets/audio/tbilisi supercollider recordings/graphic025.mp3',
  'assets/audio/tbilisi supercollider recordings/graphic025b.mp3',
  'assets/audio/tbilisi supercollider recordings/graphic026.mp3',
  'assets/audio/tbilisi supercollider recordings/keys.mp3',
  'assets/audio/tbilisi supercollider recordings/percussive.mp3',
  'assets/audio/tbilisi supercollider recordings/semimelodic.mp3',
  'assets/audio/tbilisi supercollider recordings/semimelodic2.mp3',
  'assets/audio/tbilisi supercollider recordings/shrillambient.mp3',
  'assets/audio/tbilisi supercollider recordings/vocalsample.mp3'
];

// Function to play random audio for modal
function playModalAudio() {
  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Randomly choose between birdsong and tbilisi recordings
  const useBirdsong = Math.random() < 0.5;
  const audioFiles = useBirdsong ? birdsongFiles : tbilisiFiles;
  const randomFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];

  // Create and play new audio
  currentAudio = new Audio(randomFile);
  currentAudio.loop = true;
  currentAudio.volume = 0.3; // Set volume to 30%
  currentAudio.play().catch(e => {
    console.log('Audio autoplay prevented:', e);
  });
}

// Function to stop modal audio
function stopModalAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}
