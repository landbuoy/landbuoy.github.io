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
  
  setupAquaButton(".aquaButton--info", function() {
    $(".modalContainer--info").fadeOut();
  });
  
  setupAquaButton(".aquaButton--uploadIThought", function() {
    $(".modalContainer--uploadIThought").fadeOut();
  });
  
  setupAquaButton(".aquaButton--uploadIIThoughts", function() {
    $(".modalContainer--uploadIIThoughts").fadeOut();
  });
  
  
  // Info modal
  $(".button--info").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--info").fadeIn().css("zIndex", "9999");
  });
  
  // UploadiThought glyph
  $(".glyph--uploadIThought").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--uploadIThought").fadeIn().css("zIndex", "9999");
  });
  
  // UploadIIThought glyph
  $(".glyph--uploadIIThoughts").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--uploadIIThoughts").fadeIn().css("zIndex", "9999");
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

  // Random GIF scraping system
  var localGifs = [
    "assets/img/background/grape.gif",
    "assets/img/background/pink.gif", 
    "assets/img/background/red.gif",
    "assets/img/background/wood.gif",
    "assets/img/background/grid.gif"
  ];

  // Function to analyze background and set optimal text color
  function setOptimalTextColor(targetElement, elementName) {
    // Create a canvas to analyze the background image
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    
    img.crossOrigin = 'anonymous'; // Enable CORS for external images
    
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Sample pixels from the image to determine average brightness
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      var brightness = 0;
      var sampleCount = 0;
      
      // Sample every 10th pixel for performance
      for (var i = 0; i < data.length; i += 40) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        
        // Calculate brightness using luminance formula
        var pixelBrightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        brightness += pixelBrightness;
        sampleCount++;
      }
      
      var averageBrightness = brightness / sampleCount;
      
      // Set text color based on background brightness
      var textColor;
      if (averageBrightness > 0.5) {
        // Bright background - use dark text
        textColor = '#000000';
      } else {
        // Dark background - use light text
        textColor = '#ffffff';
      }
      
      // Apply the color to the logo container with !important to override CSS
      $('.logoContainer').css('color', textColor);
      $('.logoContainer').attr('style', $('.logoContainer').attr('style') + '; color: ' + textColor + ' !important;');
      console.log(elementName + " background brightness:", averageBrightness.toFixed(2), "Text color:", textColor);
    };
    
    img.onerror = function() {
      // Fallback to default color
      $('.logoContainer').css('color', '#f44644');
      $('.logoContainer').attr('style', $('.logoContainer').attr('style') + '; color: #f44644 !important;');
      console.log("Could not analyze " + elementName + " background, using default color");
    };
    
    // Get the current background image URL
    var bgImage = $(targetElement).css('background-image');
    if (bgImage && bgImage !== 'none') {
      // Extract URL from CSS background-image property
      var urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (urlMatch && urlMatch[1]) {
        img.src = urlMatch[1];
      }
    }
  }

  // Function to load random GIF from various sources
  function loadRandomGif(targetElement, elementName) {
    // Try multiple GIF sources
    var gifSources = [
      // Giphy API (requires API key - you'd need to get one)
      // 'https://api.giphy.com/v1/gifs/random?tag=pattern&api_key=YOUR_API_KEY',
      
      // Random GIF from Lorem Picsum (static images, but reliable)
      'https://picsum.photos/50/50?random=' + Math.random(),
      
      // Random pattern from Unsplash (static, but good patterns)
      'https://source.unsplash.com/50x50/?pattern,texture,abstract&sig=' + Math.random(),
      
      // Random image from Picsum with blur for pattern effect
      'https://picsum.photos/50/50?random=' + Math.random() + '&blur=1'
    ];

    // Try to load from external source first
    var randomSource = gifSources[Math.floor(Math.random() * gifSources.length)];
    
    // Create a test image to check if URL works
    var testImg = new Image();
    testImg.onload = function() {
      // Success! Use the external image
      $(targetElement).css("background-image", "url(" + randomSource + ")");
      console.log("Loaded external " + elementName + " background:", randomSource);
      
      // Analyze background and set optimal text color
      if (targetElement === '.mainContainer') {
        setTimeout(function() {
          setOptimalTextColor(targetElement, elementName);
        }, 100); // Small delay to ensure background is applied
      }
    };
    testImg.onerror = function() {
      // Fallback to local GIFs
      var randomLocal = localGifs[Math.floor(Math.random() * localGifs.length)];
      $(targetElement).css("background-image", "url(" + randomLocal + ")");
      console.log("Using fallback " + elementName + " background:", randomLocal);
      
      // Analyze fallback background and set optimal text color
      if (targetElement === '.mainContainer') {
        setTimeout(function() {
          setOptimalTextColor(targetElement, elementName);
        }, 100);
      }
    };
    
    // Set a timeout to prevent hanging
    setTimeout(function() {
      if (!testImg.complete) {
        var randomLocal = localGifs[Math.floor(Math.random() * localGifs.length)];
        $(targetElement).css("background-image", "url(" + randomLocal + ")");
        console.log("Timeout - using fallback " + elementName + " background:", randomLocal);
        
        // Analyze timeout fallback background and set optimal text color
        if (targetElement === '.mainContainer') {
          setTimeout(function() {
            setOptimalTextColor(targetElement, elementName);
          }, 100);
        }
      }
    }, 3000);
    
    testImg.src = randomSource;
  }

  // Load random GIFs on page load
  loadRandomGif(".landbuoyProjects", "landbuoy projects");
  loadRandomGif(".titleBar", "title bar");
  loadRandomGif(".nav", "navigation");

  // Advanced GIF scraping with multiple APIs
  function loadAnimatedGif(targetElement, elementName) {
    // List of free GIF APIs and sources
    var gifApis = [
      // Tenor API (free tier available)
      'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=pattern',
      
      // Giphy API (requires free API key)
      // 'https://api.giphy.com/v1/gifs/random?api_key=YOUR_API_KEY&tag=pattern',
      
      // Random animated GIF from various sources
      'https://httpbin.org/image/gif',
      
      // Placeholder animated GIF
      'https://via.placeholder.com/50x50.gif?text=GIF'
    ];

    // Try to fetch from APIs
    var randomApi = gifApis[Math.floor(Math.random() * gifApis.length)];
    
    if (randomApi.includes('api.tenor.com')) {
      // Handle Tenor API response
      fetch(randomApi)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results[0] && data.results[0].media[0]) {
            var gifUrl = data.results[0].media[0].gif.url;
            $(targetElement).css("background-image", "url(" + gifUrl + ")");
            console.log("Loaded Tenor GIF for " + elementName + ":", gifUrl);
          } else {
            throw new Error("No GIF found");
          }
        })
        .catch(error => {
          console.log("Tenor API failed for " + elementName + ", using fallback");
          loadRandomGif(targetElement, elementName);
        });
    } else {
      // Direct image URL
      var testImg = new Image();
      testImg.onload = function() {
        $(targetElement).css("background-image", "url(" + randomApi + ")");
        console.log("Loaded direct GIF for " + elementName + ":", randomApi);
      };
      testImg.onerror = function() {
        console.log("Direct GIF failed for " + elementName + ", using fallback");
        loadRandomGif(targetElement, elementName);
      };
      testImg.src = randomApi;
    }
  }

  // Uncomment the lines below to use animated GIF scraping instead
  // loadAnimatedGif(".mainContainer", "main container");
  // loadAnimatedGif(".nav", "navigation");

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
    // Logo color is now handled by dynamic contrast system
    // $(".logoContainer").css("color", c2);
    $(".modalContainer--info").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--resume").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--uploadIThought").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--uploadIIThoughts").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--photonPlayground").css("box-shadow", "0px 0px 32px" + c2);
    //$(".modalContainer--hausaufgabe").css("box-shadow", "0px 0px 32px" + c2);
    $(".landbuoyProjects").css("background", "linear-gradient(to right, transparent, " + c2 );

    
    
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
