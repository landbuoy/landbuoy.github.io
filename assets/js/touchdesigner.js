// Behavior for touchdesigner.html ("Video Compositing with TouchDesigner Systems").
// Requires gallery.js (draggable modals, backgrounds, window.galleryColors)
// and modalAudio.js (playModalAudio / stopModalAudio) to be loaded first.

// ---------------------------------------------------------------------
// Modal glow colors (shared with gallery.js so the page matches itself)
// ---------------------------------------------------------------------
// gallery.js sets window.galleryColors in its own document-ready handler,
// which is registered first, so it has run by the time this one fires.
$(document).ready(function () {
  var tdGlow = "0px 0px 32px" + (window.galleryColors ? window.galleryColors.c2 : "#ffffff");

  [
    "photonPlayground",
    "horses",
    "wesleyanBirds",
    "dancyArms",
    "dancers",
    "mercuralia",
    "grass",
    "ballet"
  ].forEach(function (name) {
    $(".modalContainer--" + name).css("box-shadow", tdGlow);
  });
});

// ---------------------------------------------------------------------
// Photon playground: video plays only while the modal is visible
// ---------------------------------------------------------------------
var photonPlayground = document.getElementById("photonPlayground");
photonPlayground.pause();

$(".glyph--photonPlayground").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--photonPlayground").fadeToggle().css("zIndex", "9999");
  if (photonPlayground.paused == false) {
    photonPlayground.pause();
  } else {
    photonPlayground.play();
  }
});

// ---------------------------------------------------------------------
// Hausaufgabe: video (and its sound) plays only while the modal is visible
// ---------------------------------------------------------------------
var hausaufgabeVideo = document.getElementById("hausaufgabeVideo");
hausaufgabeVideo.pause();

$(".glyph--hausaufgabe").click(function () {
  var $modal = $(".modalContainer--hausaufgabe");
  var opening = $modal.is(":hidden");
  $(".modalContainer").css("zIndex", "0");
  $modal.fadeToggle().css("zIndex", "9999");
  if (opening) {
    hausaufgabeVideo.play().catch(function (e) {
      console.log("Hausaufgabe playback prevented:", e);
    });
  } else {
    hausaufgabeVideo.pause();
  }
});

// ---------------------------------------------------------------------
// YouTube players
// ---------------------------------------------------------------------
let horsesPlayer = null;
let wesleyanBirdsPlayer = null;
let dancyArmsPlayer = null;
let dancersPlayer = null;
let grassPlayer = null;

// YouTube Player API ready function (called by the iframe API script)
function onYouTubeIframeAPIReady() {
  horsesPlayer = new YT.Player('horsesVideo');
  wesleyanBirdsPlayer = new YT.Player('wesleyanBirdsVideo');
  dancyArmsPlayer = new YT.Player('dancyArmsVideo');
  dancersPlayer = new YT.Player('dancersVideo');
  grassPlayer = new YT.Player('grassVideo');
}

// Shared handler for glyphs that open a YouTube modal
function bindYouTubeGlyph(glyphClass, modalClass, getPlayer) {
  $(glyphClass).click(function () {
    var player = getPlayer();
    $(".modalContainer").css("zIndex", "0");
    $(modalClass).fadeToggle().css("zIndex", "9999");

    // Play video when modal opens, pause when it closes
    if ($(modalClass).is(":visible") && player) {
      player.playVideo();
      playModalAudio(); // Play random audio
    } else if (player) {
      player.pauseVideo();
      stopModalAudio(); // Stop audio when modal closes
    }
  });
}

bindYouTubeGlyph(".glyph--horses", ".modalContainer--horses", function () { return horsesPlayer; });
bindYouTubeGlyph(".glyph--wesleyanBirds", ".modalContainer--wesleyanBirds", function () { return wesleyanBirdsPlayer; });
bindYouTubeGlyph(".glyph--dancyArms", ".modalContainer--dancyArms", function () { return dancyArmsPlayer; });
bindYouTubeGlyph(".glyph--dancers", ".modalContainer--dancers", function () { return dancersPlayer; });
bindYouTubeGlyph(".glyph--grass", ".modalContainer--grass", function () { return grassPlayer; });

// ---------------------------------------------------------------------
// Mercuralia: self-referential GIF
// ---------------------------------------------------------------------
$(".glyph--mercuralia").click(function () {
  $(".modalContainer").css("zIndex", "0");
  $(".modalContainer--mercuralia").fadeToggle().css("zIndex", "9999");

  // Play/stop audio based on modal visibility
  if ($(".modalContainer--mercuralia").is(":visible")) {
    playModalAudio();
  } else {
    stopModalAudio();
  }
});

// ---------------------------------------------------------------------
// Ballet modal with alternating videos
// ---------------------------------------------------------------------
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
    playModalAudio();
  } else {
    stopModalAudio();
  }
});
