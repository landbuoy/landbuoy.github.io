$(document).ready(function () {

  // Draggable modals (the color data modal can only be dragged by its header)
  $(".modalContainer").not(".modalContainer--colorData").draggable();
  $(".modalContainer--colorData").draggable({ handle: ".modalHeader" });

  // Shrink a modal title's font until it fits inside its header.
  // Must run while the modal is visible, because hidden elements have no width.
  function fitModalTitles() {
    $(".modalTitle:visible").each(function () {
      var el = this;
      el.style.fontSize = ""; // start from the CSS size
      var size = parseFloat(window.getComputedStyle(el).fontSize);
      while (el.scrollWidth > el.clientWidth && size > 10) {
        size -= 1;
        el.style.fontSize = size + "px";
      }
    });
  }
  $(window).on("resize orientationchange", fitModalTitles);
  // Lift up the last clicked modal on vertical stack
  $(".modalContainer").click(function () {
    $(".modalContainer")
      .not(this)
      .each(function () {
        $(this).css("zIndex", "0");
      });
    $(this).css("zIndex", "9999");
  });
  // Resume modal
  $(".button--resume").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--resume").fadeIn().css("zIndex", "9999");
    fitModalTitles();
  });
  // 42 domino game: the 5-5 domino starts a new game and opens the game table.
  // fortytwo.css / fortytwo.js are only fetched the first time it is clicked.
  var fortytwoLoading = null;
  function loadFortytwo() {
    if (window.Fortytwo) {
      return $.Deferred().resolve().promise();
    }
    if (!fortytwoLoading) {
      $("head").append(
        '<link rel="stylesheet" type="text/css" href="assets/css/fortytwo.css" />'
      );
      // A plain <script> tag (not $.ajax) so this also works when index.html is
      // opened straight from disk (file://), where XHR is blocked.
      var loaded = $.Deferred();
      var script = document.createElement("script");
      script.src = "assets/js/fortytwo.js";
      script.onload = function () {
        loaded.resolve();
      };
      script.onerror = function () {
        fortytwoLoading = null;
        loaded.reject();
      };
      document.head.appendChild(script);
      fortytwoLoading = loaded.promise();
    }
    return fortytwoLoading;
  }
  $(".button--fortytwo").on("click keydown", function (e) {
    if (e.type === "keydown" && e.which !== 13 && e.which !== 32) return;
    e.preventDefault();
    loadFortytwo().done(function () {
      window.Fortytwo.startNewGame();
    });
  });

  // Color data modal
  $(".button--colordata").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--colorData").fadeIn().css("zIndex", "9999");
  });
  
  // Enhanced aquaButton event handlers for mobile compatibility
  function setupAquaButton(selector, action) {
    const $button = $(selector);
    
    // Handle both click and touch events
    $button.on('click touchstart', function(e) {
      e.preventDefault();
      e.stopPropagation();
      action();
    });
    
    // Prevent default touch behavior that might interfere
    $button.on('touchmove touchend', function(e) {
      e.stopPropagation();
    });
  }
  
  // Setup all aquaButtons with proper mobile support
  setupAquaButton(".aquaButton--resume", function() {
    $(".modalContainer--resume").fadeOut();
  });
  
  setupAquaButton(".aquaButton--colorData", function() {
    $(".modalContainer--colorData").fadeOut();
  });
  
  setupAquaButton(".aquaButton--uploadIThought", function() {
    $(".modalContainer--uploadIThought").fadeOut();
  });
  
  setupAquaButton(".aquaButton--uploadIIThoughts", function() {
    $(".modalContainer--uploadIIThoughts").fadeOut();
  });
  
  
  // Bandcamp players are loaded the first time their modal is opened. Loading them
  // while the modal is display:none gives the embed a zero-size window, and its album
  // art may not lay out until something (like pressing play) forces a redraw.
  function loadBandcampPlayer(modalSelector) {
    var $frame = $(modalSelector).find("iframe");
    if (!$frame.attr("src")) {
      $frame.attr("src", $frame.attr("data-src"));
    }
  }

  // UploadiThought glyph
  $(".glyph--uploadIThought").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--uploadIThought").fadeIn().css("zIndex", "9999");
    loadBandcampPlayer(".modalContainer--uploadIThought");
    fitModalTitles();
  });
  
  // UploadIIThought glyph
  $(".glyph--uploadIIThoughts").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--uploadIIThoughts").fadeIn().css("zIndex", "9999");
    loadBandcampPlayer(".modalContainer--uploadIIThoughts");
    fitModalTitles();
  });  


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

    //var b = bgimg[randomNumber];

    //$(".mainContainer").css("background-image", b);
    $(".mainContainer").css("background-color", c1);
    // Logo text takes the inverse of the page's random color so it always contrasts
    $(".logoContainer").css("color", c2);
    // Modal header text (titles and the mobile drag hint) uses the inverted color too
    $(".modalHeader").css("color", c2);

    // The logo box is taller than the old 30px title bar, so keep the nav
    // just below it (recomputed on load and when the window changes size).
    function positionNav() {
      var bar = document.querySelector(".titleBar");
      var nav = document.querySelector(".nav");
      if (!bar || !nav) return;
      nav.style.top = Math.ceil(bar.getBoundingClientRect().bottom + 10) + "px";
    }
    positionNav();
    $(window).on("load resize orientationchange", positionNav);
    $(".modalContainer--resume").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--colorData").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--uploadIThought").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--uploadIIThoughts").css("box-shadow", "0px 0px 32px" + c2);

    
    
        //$(".landBuoyInnerContainer").css("border", "5px" + c2);
    $(".aquaButton--resume").css("background", c2);
    $(".aquaButton--colorData").css("background", c2);

    // The Bandcamp modals' shifting background cycle starts at the inverted color
    document.documentElement.style.setProperty("--morph-start", c2);

    // CV button text uses the page background color so it reads on the inverted fill
    document.documentElement.style.setProperty("--page-bg", c1);

    // Color data button: an icon filled with the inverted color
    $(".button--colordata").css("background-color", c2);

    // Color data modal: print each hex code and fill its swatch with the color
    $("#colorDataBackgroundHex").text(c1.toUpperCase());
    $("#colorDataBackgroundSwatch").css("background-color", c1);
    $("#colorDataInverseHex").text(c2.toUpperCase());
    $("#colorDataInverseSwatch").css("background-color", c2);
    $(".aquaButton--uploadIThought").css("background", c2);
    $(".aquaButton--uploadIIThoughts").css("background", c2);

    // MOBILE DRAG IMPROVEMENTS
    // Add hold-to-drag functionality for better mobile UX
    let holdTimer;
    let isHoldingToDrag = false;
    let dragStarted = false;
    
    // Enhanced mobile dragging with hold-to-drag
    $(".modalContainer").on('touchstart', function(e) {
        const element = this;
        const $element = $(element);
        
        // Clear any existing timer
        clearTimeout(holdTimer);
        
        // Set up hold-to-drag timer
        holdTimer = setTimeout(function() {
            isHoldingToDrag = true;
            $element.addClass('drag-ready');
            
            // Add visual feedback
            $element.css('transform', 'scale(1.02)');
            $element.css('transition', 'transform 0.2s ease');
            
            // Haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }, 400); // 400ms hold
    });
    
    $(".modalContainer").on('touchmove', function(e) {
        const touchCount = e.originalEvent.touches.length;
        
        // Only allow dragging if holding to drag or if already dragging
        if (isHoldingToDrag || dragStarted) {
            dragStarted = true;
            // Let jQuery UI handle the drag
        } else {
            // Clear hold timer if moving before hold time
            clearTimeout(holdTimer);
        }
    });
    
    $(".modalContainer").on('touchend touchcancel', function() {
        const $element = $(this);
        
        // Clear hold timer
        clearTimeout(holdTimer);
        
        // Reset states
        isHoldingToDrag = false;
        dragStarted = false;
        
        // Remove visual feedback
        $element.removeClass('drag-ready');
        $element.css('transform', '');
        $element.css('transition', '');
    });
    
    // Prevent text selection during drag on mobile
    $(".modalContainer").on('selectstart', function(e) {
        e.preventDefault();
    });
    
    // Add CSS class for drag-ready state
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .drag-ready {
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.3) !important;
                z-index: 10000 !important;
            }
            
            /* Improve touch targets on mobile */
            @media (max-width: 640px) {
                .modalContainer {
                    /* Ensure modals stay within viewport */
                    min-width: 280px;
                    max-width: calc(100vw - 20px);
                    max-height: calc(100vh - 20px);
                }
                
                /* Better touch feedback */
                .modalHeader:active {
                    background-color: rgba(0, 0, 0, 0.1);
                }
            }
        `)
        .appendTo('head');
    
});
