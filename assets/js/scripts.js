$(document).ready(function () {

  // Draggable modals
  $(".modalContainer").draggable();
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
  });
  $(".aquaButton--resume").click(function () {
    $(".modalContainer--resume").fadeOut();
  });
  // Info modal
  $(".button--info").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--info").fadeIn().css("zIndex", "9999");
  });
  $(".aquaButton--info").click(function () {
    $(".modalContainer--info").fadeOut();
  }); 
    // hausaufgabe Info modal
  $(".button--hausaufgabeInfo").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--hausaufgabeInfo").fadeIn().css("zIndex", "9999");
  });
  $(".aquaButton--hausaufgabeInfo").click(function () {
    $(".modalContainer--hausaufgabeInfo").fadeOut();
  });
    // UploadiThought glyph
  $(".glyph--uploadIThought").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--uploadIThought").fadeIn().css("zIndex", "9999");
  });
  $(".aquaButton--uploadIThought").click(function () {
    $(".modalContainer--uploadIThought").fadeOut();
  });
    // UploadIIThought glyph
  $(".glyph--uploadIIThoughts").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--uploadIIThoughts").fadeIn().css("zIndex", "9999");
  });
  $(".aquaButton--uploadIIThoughts").click(function () {
    $(".modalContainer--uploadIIThoughts").fadeOut();
  });  

    // glyphs in march composite landbuoy

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

// photon playground scripts

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

  // color stuff

  /*var bgimg = [
    "url(assets/img/background/grape.gif)",
    "url(assets/img/background/pink.gif)",
    "url(assets/img/background/red.gif)",
    "url(assets/img/background/wood.gif)",
    "url(assets/img/background/grid.gif)",
  ];

  var randomNumber = Math.floor(Math.random() * bgimg.length);*/

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
    $(".logoContainer").css("color", c2);
    $(".modalContainer--info").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--resume").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--uploadIThought").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--uploadIIThoughts").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--photonPlayground").css("box-shadow", "0px 0px 32px" + c2);
    //$(".modalContainer--hausaufgabe").css("box-shadow", "0px 0px 32px" + c2);
    $(".bandcampLinks").css("background", "linear-gradient(to right, transparent, " + c2 );
    $(".landbuoyProjects").css("background", "linear-gradient(to right, transparent, " + c2 );
    $(".friendsLinks").css("background", "linear-gradient(to right, transparent, " + c2 );
    
    
        //$(".landBuoyInnerContainer").css("border", "5px" + c2);
    $(".aquaButton--info").css("background", c2);
    $(".aquaButton--resume").css("background", c2);
    $(".aquaButton--uploadIThought").css("background", c2);
    $(".aquaButton--uploadIIThoughts").css("background", c2);

    //DIV BOX STUFF
    var navBoxHeight = document.querySelector('.nav').offsetHeight;
    $(".landBuoyContainer1").css("top", navBoxHeight + 32 +"px");
    
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
