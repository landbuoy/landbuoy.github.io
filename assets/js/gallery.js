// Shared behavior for gallery pages (videogallery.html and future gallery pages).
// Glyph click handlers for each gallery go in the "GALLERY GLYPHS" section below.

$(document).ready(function () {

  // ---------------------------------------------------------------------
  // Draggable modals
  // ---------------------------------------------------------------------
  $(".modalContainer").draggable();

  // Lift up the last clicked modal on vertical stack
  $(".modalContainer").click(function () {
    $(".modalContainer").not(this).css("zIndex", "0");
    $(this).css("zIndex", "9999");
  });

  // Aqua (close) buttons with click + touch support for mobile
  function setupAquaButton(selector, action) {
    var $button = $(selector);

    $button.on("click touchstart", function (e) {
      e.preventDefault();
      e.stopPropagation();
      action();
    });

    // Prevent default touch behavior that might interfere
    $button.on("touchmove touchend", function (e) {
      e.stopPropagation();
    });
  }

  // ---------------------------------------------------------------------
  // List of works modal
  // ---------------------------------------------------------------------
  setupAquaButton(".aquaButton--info", function () {
    $(".modalContainer--info").fadeOut();
  });

  $(".button--info").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--info").fadeIn().css("zIndex", "9999");
  });

  // ---------------------------------------------------------------------
  // GALLERY GLYPHS
  // Simple show/hide glyphs. Glyphs with audio or YouTube players
  // (dancing triangle, march composite 3-6, bees, horses, wesleyan birds,
  // dancy arms, dancers, mercuralia, grass, ballet) are handled in moss.js.
  // ---------------------------------------------------------------------

  // March composite glyphs
  $(".glyph--marchComp3-8").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--marchComp3-8").fadeToggle().css("zIndex", "9999");
  });
  $(".glyph--marchComp3-18").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--marchComp3-18").fadeToggle().css("zIndex", "9999");
  });
  $(".glyph--marchComp3-31").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--marchComp3-31").fadeToggle().css("zIndex", "9999");
  });
  $(".glyph--mossComposite").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--mossComposite").fadeToggle().css("zIndex", "9999");
  });

  // Photon playground: video plays only while the modal is visible
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

  // Hausaufgabe glyph: video (and its sound) plays only while the modal is visible
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
  // Random backgrounds for title bar, nav and glyph container
  // ---------------------------------------------------------------------
  var localGifs = [
    "assets/img/background/grape.gif",
    "assets/img/background/pink.gif",
    "assets/img/background/red.gif",
    "assets/img/background/wood.gif",
    "assets/img/background/grid.gif"
  ];

  function useLocalGif(targetElement) {
    var randomLocal = localGifs[Math.floor(Math.random() * localGifs.length)];
    $(targetElement).css("background-image", "url(" + randomLocal + ")");
  }

  function loadRandomGif(targetElement) {
    var gifSources = [
      "https://picsum.photos/50/50?random=" + Math.random(),
      "https://source.unsplash.com/50x50/?pattern,texture,abstract&sig=" + Math.random(),
      "https://picsum.photos/50/50?random=" + Math.random() + "&blur=1"
    ];
    var randomSource = gifSources[Math.floor(Math.random() * gifSources.length)];
    var settled = false;

    var testImg = new Image();
    testImg.onload = function () {
      if (settled) return;
      settled = true;
      $(targetElement).css("background-image", "url(" + randomSource + ")");
    };
    testImg.onerror = function () {
      if (settled) return;
      settled = true;
      useLocalGif(targetElement);
    };

    // Don't hang if the external source is slow
    setTimeout(function () {
      if (settled) return;
      settled = true;
      useLocalGif(targetElement);
    }, 3000);

    testImg.src = randomSource;
  }

  loadRandomGif(".landbuoyProjects");
  loadRandomGif(".titleBar");
  loadRandomGif(".nav");

  // ---------------------------------------------------------------------
  // Random color scheme
  // ---------------------------------------------------------------------
  function randomColor() {
    var color = Math.floor(Math.random() * 0x1000000); // 0x0 - 0xFFFFFF
    return "#" + ("000000" + color.toString(16)).slice(-6);
  }

  function invertColor(hexTripletColor) {
    var color = parseInt(hexTripletColor.substring(1), 16);
    color = 0xFFFFFF ^ color; // invert three bytes
    return "#" + ("000000" + color.toString(16)).slice(-6);
  }

  var c1 = randomColor();
  var c2 = invertColor(c1);

  $(".mainContainer").css("background-color", c1);
  $(".modalContainer--info").css("box-shadow", "0px 0px 32px" + c2);
  $(".modalContainer--photonPlayground").css("box-shadow", "0px 0px 32px" + c2);
  $(".landbuoyProjects").css("background", "linear-gradient(to right, transparent, " + c2);
  $(".aquaButton--info").css("background", c2);

  // ---------------------------------------------------------------------
  // Mobile drag improvements (hold-to-drag)
  // ---------------------------------------------------------------------
  var holdTimer;
  var isHoldingToDrag = false;
  var dragStarted = false;

  $(".modalContainer").on("touchstart", function () {
    var $element = $(this);

    clearTimeout(holdTimer);

    holdTimer = setTimeout(function () {
      isHoldingToDrag = true;
      $element.addClass("drag-ready");

      // Visual feedback
      $element.css("transform", "scale(1.02)");
      $element.css("transition", "transform 0.2s ease");

      // Haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 400); // 400ms hold
  });

  $(".modalContainer").on("touchmove", function () {
    // Only allow dragging if holding to drag or if already dragging
    if (isHoldingToDrag || dragStarted) {
      dragStarted = true; // jQuery UI handles the drag
    } else {
      clearTimeout(holdTimer); // moved before hold time elapsed
    }
  });

  $(".modalContainer").on("touchend touchcancel", function () {
    var $element = $(this);

    clearTimeout(holdTimer);
    isHoldingToDrag = false;
    dragStarted = false;

    $element.removeClass("drag-ready");
    $element.css("transform", "");
    $element.css("transition", "");
  });

  // Prevent text selection during drag on mobile
  $(".modalContainer").on("selectstart", function (e) {
    e.preventDefault();
  });

  // CSS for drag-ready state and mobile touch targets
  $("<style>")
    .prop("type", "text/css")
    .html(
      ".drag-ready {" +
      "  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3) !important;" +
      "  z-index: 10000 !important;" +
      "}" +
      "@media (max-width: 640px) {" +
      "  .modalContainer {" +
      "    min-width: 280px;" +
      "    max-width: calc(100vw - 20px);" +
      "    max-height: calc(100vh - 20px);" +
      "  }" +
      "  .modalHeader:active {" +
      "    background-color: rgba(0, 0, 0, 0.1);" +
      "  }" +
      "}"
    )
    .appendTo("head");

});
