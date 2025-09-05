  function randomColor() {
        var color;
        color = Math.floor(Math.random() * 0x1000000); // integer between 0x0 and 0xFFFFFF
        color = color.toString(16); // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = "#" + color; // prepend #
        return color;
    }
  
  function invertColor(hexTripletColor) {
        var color = hexTripletColor;
        color = color.substring(1); // remove #
        color = parseInt(color, 16); // convert to integer
        color = 0xFFFFFF ^ color; // invert three bytes
        color = color.toString(16); // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = "#" + color; // prepend #
        return color;
    }

    var c1 = randomColor();

    var c2 = invertColor(c1);

$(".modalContainer--dancingTriangle").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--mossComposite").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--marchComp3-6").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--marchComp3-8").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--marchComp3-18").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--marchComp3-31").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--beees01").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--beees02").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--beees03").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--horses").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--wesleyanBirds").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--dancyArms").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--dancers").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--mercuralia").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--grass").css("box-shadow", "0px 0px 32px" + c2);
$(".modalContainer--ballet").css("box-shadow", "0px 0px 32px" + c2);

//dancing triangle scripts

var musicDT = [
  "../assets/audio/newGraphic001/fax.mp3",
  "../assets/audio/newGraphic001/fax2.mp3",
  "../assets/audio/newGraphic001/percussive.mp3",
  "../assets/audio/newGraphic001/shrillambient.mp3",
];

shuffleDT(musicDT);

initDT();

function initDT() {
  current = 0;
  audioDT = $("#dancingTriangle");
  audioDT[0].volume = 0.8;
  lenDT = audioDT.length;

  runDT(musicDT[current], audioDT[0]);
  
  audioDT[0].addEventListener("ended", function (e) {
    current++;
    if (current == lenDT) {
      current = 0;
    }
    runDT(musicDT[current], audioDT[0]);
  });

  audioDT[0].pause();

  //play audio on opening modal, pause on close
  $(".glyph--dancingTriangle").click(function () {
    if (audioDT[0].paused == false) {
      audioDT[0].pause();
    } else {
      audioDT[0].play();
    }
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--dancingTriangle").fadeToggle().css("zIndex", "9999");
    
    // Also play/stop additional modal audio
    if ($(".modalContainer--dancingTriangle").is(":visible")) {
      playModalAudio(); // Play random audio
    } else {
      stopModalAudio(); // Stop audio when modal closes
    }
  });

}

function runDT(link, $audio) {
  audioDT[0].src = link;
  audioDT[0].load();
}

function shuffleDT(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//march six composite audio visual modal window scripts

var music36 = [
  "../assets/audio/newGraphic001/fax.mp3",
  "../assets/audio/newGraphic001/fax2.mp3",
  "../assets/audio/newGraphic001/percussive.mp3",
  "../assets/audio/newGraphic001/shrillambient.mp3",
];

shuffle36(music36);

init36();

function init36() {
  current = 0;
  audio36 = $("#comp3-6");
  audio36[0].volume = 0.8;
  len36 = audio36.length;

  run36(music36[current], audio36[0]);
  
  audio36[0].addEventListener("ended", function (e) {
    current++;
    if (current == len36) {
      current = 0;
    }
    run36(music36[current], audio36[0]);
  });

  audio36[0].pause();

  //play audio on opening modal, pause on close
  $(".glyph--marchComp3-6").click(function () {
    if (audio36[0].paused == false) {
      audio36[0].pause();
    } else {
      audio36[0].play();
    }
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--marchComp3-6").fadeToggle().css("zIndex", "9999");
    
    // Also play/stop additional modal audio
    if ($(".modalContainer--marchComp3-6").is(":visible")) {
      playModalAudio(); // Play random audio
    } else {
      stopModalAudio(); // Stop audio when modal closes
    }
  });

}

function run36(link, $audio) {
  audio36[0].src = link;
  audio36[0].load();
}

function shuffle36(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// beees modal click handlers

$(".glyph--beees01").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--beees01").fadeToggle().css("zIndex", "9999");
  
  // Play/stop audio based on modal visibility
  if ($(".modalContainer--beees01").is(":visible")) {
    playModalAudio(); // Play random audio
  } else {
    stopModalAudio(); // Stop audio when modal closes
  }
});

$(".glyph--beees02").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--beees02").fadeToggle().css("zIndex", "9999");
  
  // Play/stop audio based on modal visibility
  if ($(".modalContainer--beees02").is(":visible")) {
    playModalAudio(); // Play random audio
  } else {
    stopModalAudio(); // Stop audio when modal closes
  }
});

$(".glyph--beees03").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--beees03").fadeToggle().css("zIndex", "9999");
  
  // Play/stop audio based on modal visibility
  if ($(".modalContainer--beees03").is(":visible")) {
    playModalAudio(); // Play random audio
  } else {
    stopModalAudio(); // Stop audio when modal closes
  }
});

// YouTube Player API variables
let horsesPlayer = null;
let wesleyanBirdsPlayer = null;
let dancyArmsPlayer = null;
let dancersPlayer = null;
let grassPlayer = null;

// Audio system for modals
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

// YouTube Player API ready function
function onYouTubeIframeAPIReady() {
  horsesPlayer = new YT.Player('horsesVideo', {
    events: {
      'onReady': onHorsesPlayerReady
    }
  });
  
  wesleyanBirdsPlayer = new YT.Player('wesleyanBirdsVideo', {
    events: {
      'onReady': onWesleyanBirdsPlayerReady
    }
  });
  
  dancyArmsPlayer = new YT.Player('dancyArmsVideo', {
    events: {
      'onReady': onDancyArmsPlayerReady
    }
  });
  
  dancersPlayer = new YT.Player('dancersVideo', {
    events: {
      'onReady': onDancersPlayerReady
    }
  });
  
  grassPlayer = new YT.Player('grassVideo', {
    events: {
      'onReady': onGrassPlayerReady
    }
  });
}

function onHorsesPlayerReady(event) {
  // Player is ready, but don't auto-play yet
}

function onWesleyanBirdsPlayerReady(event) {
  // Player is ready, but don't auto-play yet
}

function onDancyArmsPlayerReady(event) {
  // Player is ready, but don't auto-play yet
}

function onDancersPlayerReady(event) {
  // Player is ready, but don't auto-play yet
}

function onGrassPlayerReady(event) {
  // Player is ready, but don't auto-play yet
}


// horses modal click handler
$(".glyph--horses").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--horses").fadeToggle().css("zIndex", "9999");
  
  // Play video when modal opens
  if ($(".modalContainer--horses").is(":visible") && horsesPlayer) {
    horsesPlayer.playVideo();
    playModalAudio(); // Play random audio
  } else if (horsesPlayer) {
    horsesPlayer.pauseVideo();
    stopModalAudio(); // Stop audio when modal closes
  }
});

// wesleyan birds modal click handler
$(".glyph--wesleyanBirds").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--wesleyanBirds").fadeToggle().css("zIndex", "9999");
  
  // Play video when modal opens
  if ($(".modalContainer--wesleyanBirds").is(":visible") && wesleyanBirdsPlayer) {
    wesleyanBirdsPlayer.playVideo();
    playModalAudio(); // Play random audio
  } else if (wesleyanBirdsPlayer) {
    wesleyanBirdsPlayer.pauseVideo();
    stopModalAudio(); // Stop audio when modal closes
  }
});

// dancy arms modal click handler
$(".glyph--dancyArms").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--dancyArms").fadeToggle().css("zIndex", "9999");
  
  // Play video when modal opens
  if ($(".modalContainer--dancyArms").is(":visible") && dancyArmsPlayer) {
    dancyArmsPlayer.playVideo();
    playModalAudio(); // Play random audio
  } else if (dancyArmsPlayer) {
    dancyArmsPlayer.pauseVideo();
    stopModalAudio(); // Stop audio when modal closes
  }
});

// dancers modal click handler
$(".glyph--dancers").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--dancers").fadeToggle().css("zIndex", "9999");
  
  // Play video when modal opens
  if ($(".modalContainer--dancers").is(":visible") && dancersPlayer) {
    dancersPlayer.playVideo();
    playModalAudio(); // Play random audio
  } else if (dancersPlayer) {
    dancersPlayer.pauseVideo();
    stopModalAudio(); // Stop audio when modal closes
  }
});

// mercuralia modal click handler
$(".glyph--mercuralia").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--mercuralia").fadeToggle().css("zIndex", "9999");
  
  // Play/stop audio based on modal visibility
  if ($(".modalContainer--mercuralia").is(":visible")) {
    playModalAudio(); // Play random audio
  } else {
    stopModalAudio(); // Stop audio when modal closes
  }
});

// grass modal click handler
$(".glyph--grass").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--grass").fadeToggle().css("zIndex", "9999");
  
  // Play video when modal opens
  if ($(".modalContainer--grass").is(":visible") && grassPlayer) {
    grassPlayer.playVideo();
    playModalAudio(); // Play random audio
  } else if (grassPlayer) {
    grassPlayer.pauseVideo();
    stopModalAudio(); // Stop audio when modal closes
  }
});

// ballet modal with alternating videos
let balletVideoIndex = 0;
let balletClickCount = 0;
const balletVideos = [
  "assets/vid/ballet01.mp4",
  "assets/vid/ballet02.mp4"
];

$(".glyph--ballet").click(function () {
  const balletVideo = $("#balletVideo")[0];
  const balletModal = $(".modalContainer--ballet");
  
  balletClickCount++;
  
  // Only change video on odd clicks (after modal has been closed)
  if (balletClickCount % 2 === 1) {
    balletVideoIndex = (balletVideoIndex + 1) % balletVideos.length;
    balletVideo.src = balletVideos[balletVideoIndex];
    balletVideo.load();
  }
  
  // Show modal and bring to front
  $(".modalContainer").css("zIndex", "0");
  balletModal.fadeToggle().css("zIndex", "9999");
  
  // Play/stop audio based on modal visibility
  if (balletModal.is(":visible")) {
    playModalAudio(); // Play random audio
  } else {
    stopModalAudio(); // Stop audio when modal closes
  }
});