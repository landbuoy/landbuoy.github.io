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
  
  setupAquaButton(".aquaButton--hausaufgabeInfo", function() {
    $(".modalContainer--hausaufgabeInfo").fadeOut();
  });
  
  setupAquaButton(".aquaButton--uploadIThought", function() {
    $(".modalContainer--uploadIThought").fadeOut();
  });
  
  setupAquaButton(".aquaButton--uploadIIThoughts", function() {
    $(".modalContainer--uploadIIThoughts").fadeOut();
  });
  
  
  // Research modal aqua buttons
  setupAquaButton(".aquaButton--references", function() {
    $(".modalContainer--references").fadeOut();
  });
  
  setupAquaButton(".aquaButton--linguistics", function() {
    $(".modalContainer--linguistics").fadeOut();
  });
  
  setupAquaButton(".aquaButton--movementAnalysis", function() {
    $(".modalContainer--movementAnalysis").fadeOut();
  });
  
  setupAquaButton(".aquaButton--machineLearning", function() {
    $(".modalContainer--machineLearning").fadeOut();
  });
  
  setupAquaButton(".aquaButton--musicEngine", function() {
    $(".modalContainer--musicEngine").fadeOut();
  });
  
  setupAquaButton(".aquaButton--symbolicLanguage", function() {
    $(".modalContainer--symbolicLanguage").fadeOut();
  });
  
  setupAquaButton(".aquaButton--materialStudies", function() {
    $(".modalContainer--materialStudies").fadeOut();
  });
  
  // Info modal
  $(".button--info").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--info").fadeIn().css("zIndex", "9999");
  });
  
  // hausaufgabe Info modal
  $(".button--hausaufgabeInfo").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--hausaufgabeInfo").fadeIn().css("zIndex", "9999");
  });
  
  // Research modals
  $(".button--references").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--references").fadeIn().css("zIndex", "9999");
  });
  
  $(".button--linguistics").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--linguistics").fadeIn().css("zIndex", "9999");
  });
  
  $(".button--movementAnalysis").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--movementAnalysis").fadeIn().css("zIndex", "9999");
  });
  
  $(".button--machineLearning").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--machineLearning").fadeIn().css("zIndex", "9999");
  });
  
  $(".button--musicEngine").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--musicEngine").fadeIn().css("zIndex", "9999");
  });
  
  $(".button--symbolicLanguage").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--symbolicLanguage").fadeIn().css("zIndex", "9999");
  });
  
  $(".button--materialStudies").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--materialStudies").fadeIn().css("zIndex", "9999");
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

  // Hausaufgabe glyph
  $(".glyph--hausaufgabe").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--hausaufgabe").fadeToggle().css("zIndex", "9999");
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
  loadRandomGif(".nav--research", "research navigation");

  // GLSL Shader System for Main Page Background
  function initShaderSystem() {
    const canvas = document.getElementById('shaderCanvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.log('WebGL not supported, falling back to gradient');
      return;
    }

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_uv = (a_position + 1.0) * 0.5;
      }
    `;

    // Fragment shader source - VIDEO_WAAAVES inspired
    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform sampler2D u_feedback;
      uniform float u_feedbackMix;
      uniform float u_feedbackDelay;
      
      // Video texture for Channel 1
      uniform sampler2D u_ch1Video;
      uniform bool u_ch1VideoEnabled;
      
      // Channel controls
      uniform float u_ch1Scale;
      uniform float u_ch1Hue;
      uniform float u_ch1Saturation;
      uniform float u_ch1Brightness;
      uniform float u_ch1Quantize;
      uniform bool u_ch1QuantizeSwitch;
      uniform bool u_ch1HMirror;
      uniform bool u_ch1VMirror;
      
      // Geometry effects
      uniform float u_fisheyeAmount;
      uniform vec2 u_fisheyeCenter;
      uniform float u_spiralAmount;
      uniform float u_spiralAngle;
      uniform vec2 u_spiralCenter;
      uniform float u_kaleidoscopeSegments;
      uniform float u_kaleidoscopeSlice;
      uniform float u_rotate;
      uniform vec4 u_shearMatrix;
      
      // Color processing
      uniform float u_hueOffset;
      uniform float u_saturationOffset;
      uniform float u_brightnessOffset;
      uniform float u_hueAttenuate;
      uniform float u_saturationAttenuate;
      uniform float u_brightnessAttenuate;
      uniform float u_hueShaper;
      uniform vec3 u_powMap;
      
      // LFO system
      uniform float u_lfo1Rate;
      uniform float u_lfo1Amp;
      uniform float u_lfo2Rate;
      uniform float u_lfo2Amp;
      uniform float u_lfo3Rate;
      uniform float u_lfo3Amp;
      
      // Global controls
      uniform float u_blurAmount;
      uniform float u_sharpenAmount;
      uniform float u_pixelScale;
      uniform bool u_pixelSwitch;
      
      varying vec2 v_uv;

      const float PI = 3.14159265359;
      const float TWO_PI = 6.28318530718;

      // LFO function
      float lfo(float rate, float amp, float time) {
        return sin(time * rate * TWO_PI) * amp;
      }

      // Noise function
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      // Smooth noise
      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      // Fractal noise
      float fractalNoise(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for (int i = 0; i < 4; i++) {
          value += amplitude * smoothNoise(p * frequency);
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        
        return value;
      }

      // Rotate function
      vec2 rotate(vec2 v, float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
      }

      // Fisheye distortion
      vec2 fisheye(vec2 uv, float amount, vec2 center) {
        vec2 coord = uv - center;
        float dist = length(coord);
        float angle = atan(coord.y, coord.x);
        
        float newDist = pow(dist, 1.0 + amount);
        return vec2(cos(angle) * newDist, sin(angle) * newDist) + center;
      }

      // Spiral transformation
      vec2 spiralize(vec2 uv, float amount, float angle, vec2 center) {
        vec2 coord = uv - center;
        float radius = length(coord);
        float theta = atan(coord.y, coord.x);
        
        float spiral = radius * amount;
        theta += spiral * angle;
        
        return vec2(cos(theta) * radius, sin(theta) * radius) + center;
      }

      // Kaleidoscope effect
      vec2 kaleidoscope(vec2 uv, float segments, float slice) {
        if (segments <= 0.0) return uv;
        
        vec2 center = vec2(0.5);
        vec2 coord = uv - center;
        
        float radius = length(coord);
        float angle = atan(coord.y, coord.x);
        
        float segmentAngle = TWO_PI / segments;
        angle = mod(angle + slice, segmentAngle);
        angle = min(angle, segmentAngle - angle);
        
        return vec2(cos(angle) * radius, sin(angle) * radius) + center;
      }

      // Shear transformation
      vec2 shear(vec2 uv, vec4 matrix) {
        vec2 center = vec2(0.5);
        vec2 coord = uv - center;
        
        float x = matrix.x * coord.x + matrix.y * coord.y;
        float y = matrix.z * coord.x + matrix.w * coord.y;
        
        return vec2(x, y) + center;
      }

      // RGB to HSV conversion
      vec3 rgb2hsv(vec3 c) {
        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
        
        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
      }

      // HSV to RGB conversion
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      // Color quantization
      float quantize(float value, float levels) {
        return floor(value * levels) / levels;
      }

      // Hue shaper
      float hueShaper(float hue, float shaper) {
        return fract(abs(hue + shaper * sin(hue * 0.3184713)));
      }

      // Pixelation effect
      vec2 pixelate(vec2 uv, float scale) {
        vec2 pixelUV = floor(uv * scale) / scale;
        return pixelUV;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 center = vec2(0.5);
        float time = u_time;
        
        // Apply LFOs to various parameters
        float lfo1 = lfo(u_lfo1Rate, u_lfo1Amp, time);
        float lfo2 = lfo(u_lfo2Rate, u_lfo2Amp, time);
        float lfo3 = lfo(u_lfo3Rate, u_lfo3Amp, time);
        
        // Channel 1 processing
        vec2 ch1UV = uv;
        
        // Apply mirroring
        if (u_ch1HMirror) {
          if (ch1UV.x > 0.5) ch1UV.x = 1.0 - ch1UV.x;
        }
        if (u_ch1VMirror) {
          if (ch1UV.y > 0.5) ch1UV.y = 1.0 - ch1UV.y;
        }
        
        // Apply scaling
        ch1UV = (ch1UV - center) * u_ch1Scale + center;
        
        // Apply geometric transformations
        ch1UV = kaleidoscope(ch1UV, u_kaleidoscopeSegments + lfo1 * 5.0, u_kaleidoscopeSlice + lfo2);
        ch1UV = fisheye(ch1UV, u_fisheyeAmount + lfo3 * 0.1, u_fisheyeCenter);
        ch1UV = spiralize(ch1UV, u_spiralAmount + lfo1 * 0.2, u_spiralAngle + lfo2, u_spiralCenter);
        ch1UV = rotate(ch1UV - center, u_rotate + lfo3) + center;
        ch1UV = shear(ch1UV, u_shearMatrix);
        
        // Sample video texture or generate noise pattern
        vec3 color;
        float finalPattern;
        
        if (u_ch1VideoEnabled) {
          // Use video texture as Channel 1 source
          color = texture2D(u_ch1Video, ch1UV).rgb;
          finalPattern = 1.0; // Set to 1.0 for video texture
        } else {
          // Fallback to noise pattern
          float n1 = fractalNoise(ch1UV * 8.0 + time * 0.1);
          float n2 = fractalNoise(ch1UV * 16.0 - time * 0.15);
          float n3 = fractalNoise(ch1UV * 32.0 + time * 0.2);
          
          float pattern = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
          
          // Add radial gradient
          float dist = distance(ch1UV, center);
          float radial = 1.0 - smoothstep(0.0, 0.7, dist);
          
          // Combine patterns
          finalPattern = pattern * 0.7 + radial * 0.3;
          
          // Create base color
          vec3 baseColor = vec3(0.2, 0.4, 0.8);
          color = baseColor * finalPattern;
        }
        
        // Convert to HSV for processing
        vec3 hsv = rgb2hsv(color);
        
        // Apply HSB adjustments
        hsv.x = hueShaper(hsv.x + u_hueOffset + lfo1 * 0.1, u_hueShaper);
        hsv.y = clamp(hsv.y * u_saturationAttenuate + u_saturationOffset + lfo2 * 0.2, 0.0, 1.0);
        hsv.z = clamp(hsv.z * u_brightnessAttenuate + u_brightnessOffset + lfo3 * 0.3, 0.0, 1.0);
        
        // Apply quantization
        if (u_ch1QuantizeSwitch) {
          hsv.x = quantize(hsv.x, u_ch1Quantize);
          hsv.y = quantize(hsv.y, u_ch1Quantize);
          hsv.z = quantize(hsv.z, u_ch1Quantize);
        }
        
        // Apply power mapping
        hsv = pow(hsv, u_powMap);
        
        // Convert back to RGB
        color = hsv2rgb(hsv);
        
        // Apply pixelation
        if (u_pixelSwitch) {
          vec2 pixelUV = pixelate(uv, u_pixelScale);
          color = mix(color, texture2D(u_feedback, pixelUV).rgb, 0.3);
        }
        
        // Mix with feedback
        vec4 feedbackColor = texture2D(u_feedback, uv);
        color = mix(color, feedbackColor.rgb, u_feedbackMix);
        
        // Apply final color adjustments
        color += vec3(sin(time + finalPattern * 3.0) * 0.1);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shader
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    // Create program
    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      
      return program;
    }

    // Create shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      console.error('Failed to create shaders, falling back to gradient');
      return;
    }
    
    const program = createProgram(gl, vertexShader, fragmentShader);

    if (!program) {
      console.error('Failed to create shader program, falling back to gradient');
      return;
    }

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const feedbackLocation = gl.getUniformLocation(program, 'u_feedback');
    const feedbackMixLocation = gl.getUniformLocation(program, 'u_feedbackMix');
    const feedbackDelayLocation = gl.getUniformLocation(program, 'u_feedbackDelay');
    
    // Video texture uniforms
    const ch1VideoLocation = gl.getUniformLocation(program, 'u_ch1Video');
    const ch1VideoEnabledLocation = gl.getUniformLocation(program, 'u_ch1VideoEnabled');
    
    // Channel controls
    const ch1ScaleLocation = gl.getUniformLocation(program, 'u_ch1Scale');
    const ch1HueLocation = gl.getUniformLocation(program, 'u_ch1Hue');
    const ch1SaturationLocation = gl.getUniformLocation(program, 'u_ch1Saturation');
    const ch1BrightnessLocation = gl.getUniformLocation(program, 'u_ch1Brightness');
    const ch1QuantizeLocation = gl.getUniformLocation(program, 'u_ch1Quantize');
    const ch1QuantizeSwitchLocation = gl.getUniformLocation(program, 'u_ch1QuantizeSwitch');
    const ch1HMirrorLocation = gl.getUniformLocation(program, 'u_ch1HMirror');
    const ch1VMirrorLocation = gl.getUniformLocation(program, 'u_ch1VMirror');
    
    // Geometry effects
    const fisheyeAmountLocation = gl.getUniformLocation(program, 'u_fisheyeAmount');
    const fisheyeCenterLocation = gl.getUniformLocation(program, 'u_fisheyeCenter');
    const spiralAmountLocation = gl.getUniformLocation(program, 'u_spiralAmount');
    const spiralAngleLocation = gl.getUniformLocation(program, 'u_spiralAngle');
    const spiralCenterLocation = gl.getUniformLocation(program, 'u_spiralCenter');
    const kaleidoscopeSegmentsLocation = gl.getUniformLocation(program, 'u_kaleidoscopeSegments');
    const kaleidoscopeSliceLocation = gl.getUniformLocation(program, 'u_kaleidoscopeSlice');
    const rotateLocation = gl.getUniformLocation(program, 'u_rotate');
    const shearMatrixLocation = gl.getUniformLocation(program, 'u_shearMatrix');
    
    // Color processing
    const hueOffsetLocation = gl.getUniformLocation(program, 'u_hueOffset');
    const saturationOffsetLocation = gl.getUniformLocation(program, 'u_saturationOffset');
    const brightnessOffsetLocation = gl.getUniformLocation(program, 'u_brightnessOffset');
    const hueAttenuateLocation = gl.getUniformLocation(program, 'u_hueAttenuate');
    const saturationAttenuateLocation = gl.getUniformLocation(program, 'u_saturationAttenuate');
    const brightnessAttenuateLocation = gl.getUniformLocation(program, 'u_brightnessAttenuate');
    const hueShaperLocation = gl.getUniformLocation(program, 'u_hueShaper');
    const powMapLocation = gl.getUniformLocation(program, 'u_powMap');
    
    // LFO system
    const lfo1RateLocation = gl.getUniformLocation(program, 'u_lfo1Rate');
    const lfo1AmpLocation = gl.getUniformLocation(program, 'u_lfo1Amp');
    const lfo2RateLocation = gl.getUniformLocation(program, 'u_lfo2Rate');
    const lfo2AmpLocation = gl.getUniformLocation(program, 'u_lfo2Amp');
    const lfo3RateLocation = gl.getUniformLocation(program, 'u_lfo3Rate');
    const lfo3AmpLocation = gl.getUniformLocation(program, 'u_lfo3Amp');
    
    // Global controls
    const blurAmountLocation = gl.getUniformLocation(program, 'u_blurAmount');
    const sharpenAmountLocation = gl.getUniformLocation(program, 'u_sharpenAmount');
    const pixelScaleLocation = gl.getUniformLocation(program, 'u_pixelScale');
    const pixelSwitchLocation = gl.getUniformLocation(program, 'u_pixelSwitch');

    // Create buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    // Resize canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create feedback framebuffer
    const feedbackFramebuffer = gl.createFramebuffer();
    const feedbackTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, feedbackTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, feedbackFramebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, feedbackTexture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // Shader parameters object - VIDEO_WAAAVES inspired
    const shaderParams = {
      // Video texture controls
      ch1VideoEnabled: false,
      
      // Channel controls
      ch1Scale: 1.0,
      ch1Hue: 0.0,
      ch1Saturation: 0.0,
      ch1Brightness: 0.0,
      ch1Quantize: 8.0,
      ch1QuantizeSwitch: false,
      ch1HMirror: false,
      ch1VMirror: false,
      
      // Geometry effects
      fisheyeAmount: 0.0,
      fisheyeCenter: [0.5, 0.5],
      spiralAmount: 0.0,
      spiralAngle: 0.0,
      spiralCenter: [0.5, 0.5],
      kaleidoscopeSegments: 0.0,
      kaleidoscopeSlice: 0.0,
      rotate: 0.0,
      shearMatrix: [1.0, 0.0, 0.0, 1.0],
      
      // Color processing
      hueOffset: 0.0,
      saturationOffset: 0.0,
      brightnessOffset: 0.0,
      hueAttenuate: 1.0,
      saturationAttenuate: 1.0,
      brightnessAttenuate: 1.0,
      hueShaper: 0.0,
      powMap: [1.0, 1.0, 1.0],
      
      // LFO system
      lfo1Rate: 0.5,
      lfo1Amp: 0.1,
      lfo2Rate: 0.3,
      lfo2Amp: 0.1,
      lfo3Rate: 0.7,
      lfo3Amp: 0.1,
      
      // Global controls
      blurAmount: 0.0,
      sharpenAmount: 0.0,
      pixelScale: 64.0,
      pixelSwitch: false,
      feedbackMix: 0.1,
      feedbackDelay: 0.0
    };

    // Create video texture for Channel 1
    const ch1VideoTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, ch1VideoTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    
    // Create video element for driving gif
    const ch1Video = document.createElement('video');
    ch1Video.crossOrigin = 'anonymous';
    ch1Video.loop = true;
    ch1Video.muted = true;
    ch1Video.autoplay = true;
    ch1Video.style.display = 'none';
    document.body.appendChild(ch1Video);
    
    // Load driving gif and set up video texture
    console.log("Starting to load driving gif for shader...");
    loadDrivingGif().then(gifUrl => {
      console.log("loadDrivingGif promise resolved with:", gifUrl);
      if (gifUrl) {
        console.log("Loading driving gif for shader:", gifUrl);
        ch1Video.src = gifUrl;
        ch1Video.load();
        
        ch1Video.addEventListener('loadstart', () => {
          console.log("Video load started");
        });
        
        ch1Video.addEventListener('loadeddata', () => {
          console.log("Driving gif loaded successfully, enabling video texture");
          shaderParams.ch1VideoEnabled = true;
        });
        
        ch1Video.addEventListener('canplay', () => {
          console.log("Video can play, ready state:", ch1Video.readyState);
        });
        
        ch1Video.addEventListener('error', (e) => {
          console.log("Error loading driving gif, falling back to noise pattern:", e);
          console.log("Video error details:", ch1Video.error);
          shaderParams.ch1VideoEnabled = false;
        });
        
        // Set a timeout to prevent hanging if video never loads
        setTimeout(() => {
          if (ch1Video.readyState < 2) {
            console.log("Driving gif loading timeout, falling back to noise pattern");
            console.log("Video ready state:", ch1Video.readyState);
            shaderParams.ch1VideoEnabled = false;
          }
        }, 10000); // 10 second timeout
      } else {
        console.log("No driving gif available, using noise pattern");
        shaderParams.ch1VideoEnabled = false;
      }
    }).catch(error => {
      console.log("Error in driving gif loading process:", error);
      shaderParams.ch1VideoEnabled = false;
    });

    // Mouse tracking
    let mouseX = 0.5;
    let mouseY = 0.5;
    
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX / canvas.width;
      mouseY = e.clientY / canvas.height;
    });

    // Animation loop
    let startTime = Date.now();
    
    function animate() {
      const currentTime = (Date.now() - startTime) / 1000.0;
      
      // Update canvas size
      resizeCanvas();
      
      // Update feedback texture size if needed
      gl.bindTexture(gl.TEXTURE_2D, feedbackTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      
      // Render to feedback buffer first
      gl.bindFramebuffer(gl.FRAMEBUFFER, feedbackFramebuffer);
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      // Use program
      gl.useProgram(program);
      
      // Set basic uniforms
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mouseX, mouseY);
      
      // Set feedback texture
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, feedbackTexture);
      gl.uniform1i(feedbackLocation, 0);
      
      // Set video texture for Channel 1
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, ch1VideoTexture);
      gl.uniform1i(ch1VideoLocation, 1);
      
      // Update video texture if video is ready
      if (ch1Video.readyState >= 2) { // HAVE_CURRENT_DATA
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ch1Video);
      }
      
      // Set all VIDEO_WAAAVES-inspired parameters
      gl.uniform1f(feedbackMixLocation, shaderParams.feedbackMix);
      gl.uniform1f(feedbackDelayLocation, shaderParams.feedbackDelay);
      
      // Set video texture parameters
      gl.uniform1i(ch1VideoEnabledLocation, shaderParams.ch1VideoEnabled ? 1 : 0);
      
      // Channel controls
      gl.uniform1f(ch1ScaleLocation, shaderParams.ch1Scale);
      gl.uniform1f(ch1HueLocation, shaderParams.ch1Hue);
      gl.uniform1f(ch1SaturationLocation, shaderParams.ch1Saturation);
      gl.uniform1f(ch1BrightnessLocation, shaderParams.ch1Brightness);
      gl.uniform1f(ch1QuantizeLocation, shaderParams.ch1Quantize);
      gl.uniform1i(ch1QuantizeSwitchLocation, shaderParams.ch1QuantizeSwitch ? 1 : 0);
      gl.uniform1i(ch1HMirrorLocation, shaderParams.ch1HMirror ? 1 : 0);
      gl.uniform1i(ch1VMirrorLocation, shaderParams.ch1VMirror ? 1 : 0);
      
      // Geometry effects
      gl.uniform1f(fisheyeAmountLocation, shaderParams.fisheyeAmount);
      gl.uniform2fv(fisheyeCenterLocation, shaderParams.fisheyeCenter);
      gl.uniform1f(spiralAmountLocation, shaderParams.spiralAmount);
      gl.uniform1f(spiralAngleLocation, shaderParams.spiralAngle);
      gl.uniform2fv(spiralCenterLocation, shaderParams.spiralCenter);
      gl.uniform1f(kaleidoscopeSegmentsLocation, shaderParams.kaleidoscopeSegments);
      gl.uniform1f(kaleidoscopeSliceLocation, shaderParams.kaleidoscopeSlice);
      gl.uniform1f(rotateLocation, shaderParams.rotate);
      gl.uniform4fv(shearMatrixLocation, shaderParams.shearMatrix);
      
      // Color processing
      gl.uniform1f(hueOffsetLocation, shaderParams.hueOffset);
      gl.uniform1f(saturationOffsetLocation, shaderParams.saturationOffset);
      gl.uniform1f(brightnessOffsetLocation, shaderParams.brightnessOffset);
      gl.uniform1f(hueAttenuateLocation, shaderParams.hueAttenuate);
      gl.uniform1f(saturationAttenuateLocation, shaderParams.saturationAttenuate);
      gl.uniform1f(brightnessAttenuateLocation, shaderParams.brightnessAttenuate);
      gl.uniform1f(hueShaperLocation, shaderParams.hueShaper);
      gl.uniform3fv(powMapLocation, shaderParams.powMap);
      
      // LFO system
      gl.uniform1f(lfo1RateLocation, shaderParams.lfo1Rate);
      gl.uniform1f(lfo1AmpLocation, shaderParams.lfo1Amp);
      gl.uniform1f(lfo2RateLocation, shaderParams.lfo2Rate);
      gl.uniform1f(lfo2AmpLocation, shaderParams.lfo2Amp);
      gl.uniform1f(lfo3RateLocation, shaderParams.lfo3Rate);
      gl.uniform1f(lfo3AmpLocation, shaderParams.lfo3Amp);
      
      // Global controls
      gl.uniform1f(blurAmountLocation, shaderParams.blurAmount);
      gl.uniform1f(sharpenAmountLocation, shaderParams.sharpenAmount);
      gl.uniform1f(pixelScaleLocation, shaderParams.pixelScale);
      gl.uniform1i(pixelSwitchLocation, shaderParams.pixelSwitch ? 1 : 0);
      
      // Set position attribute
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      // Draw to feedback buffer
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      // Now render to screen
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      // Draw again to screen (this creates the feedback effect)
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      requestAnimationFrame(animate);
    }

    animate();
    console.log('VIDEO_WAAAVES-inspired GLSL shader system initialized');

    // Make shaderParams globally accessible for controls
    window.shaderParams = shaderParams;
    
    // Add keyboard controls for real-time parameter adjustment
    document.addEventListener('keydown', (e) => {
      const step = 0.1;
      const bigStep = 0.5;
      
      switch(e.key.toLowerCase()) {
        // Geometry effects
        case 'f':
          shaderParams.fisheyeAmount = Math.max(0, Math.min(1, shaderParams.fisheyeAmount + step));
          console.log('Fisheye:', shaderParams.fisheyeAmount);
          break;
        case 'g':
          shaderParams.fisheyeAmount = Math.max(0, Math.min(1, shaderParams.fisheyeAmount - step));
          break;
        case 's':
          shaderParams.spiralAmount = Math.max(0, Math.min(2, shaderParams.spiralAmount + step));
          console.log('Spiral:', shaderParams.spiralAmount);
          break;
        case 'd':
          shaderParams.spiralAmount = Math.max(0, Math.min(2, shaderParams.spiralAmount - step));
          break;
        case 'k':
          shaderParams.kaleidoscopeSegments = Math.max(0, Math.min(20, shaderParams.kaleidoscopeSegments + 1));
          console.log('Kaleidoscope segments:', shaderParams.kaleidoscopeSegments);
          break;
        case 'j':
          shaderParams.kaleidoscopeSegments = Math.max(0, Math.min(20, shaderParams.kaleidoscopeSegments - 1));
          break;
        case 'r':
          shaderParams.rotate += 0.1;
          break;
        case 'e':
          shaderParams.rotate -= 0.1;
          break;
          
        // Color processing
        case 'h':
          shaderParams.hueOffset = (shaderParams.hueOffset + step) % 1.0;
          console.log('Hue offset:', shaderParams.hueOffset);
          break;
        case 'n':
          shaderParams.hueOffset = (shaderParams.hueOffset - step + 1.0) % 1.0;
          break;
        case 'u':
          shaderParams.saturationOffset = Math.max(-1, Math.min(1, shaderParams.saturationOffset + step));
          break;
        case 'i':
          shaderParams.saturationOffset = Math.max(-1, Math.min(1, shaderParams.saturationOffset - step));
          break;
        case 'b':
          shaderParams.brightnessOffset = Math.max(-1, Math.min(1, shaderParams.brightnessOffset + step));
          break;
        case 'v':
          shaderParams.brightnessOffset = Math.max(-1, Math.min(1, shaderParams.brightnessOffset - step));
          break;
          
        // LFO controls
        case '1':
          shaderParams.lfo1Rate = Math.max(0, Math.min(5, shaderParams.lfo1Rate + step));
          console.log('LFO1 Rate:', shaderParams.lfo1Rate);
          break;
        case '2':
          shaderParams.lfo1Rate = Math.max(0, Math.min(5, shaderParams.lfo1Rate - step));
          break;
        case '3':
          shaderParams.lfo1Amp = Math.max(0, Math.min(1, shaderParams.lfo1Amp + step));
          console.log('LFO1 Amp:', shaderParams.lfo1Amp);
          break;
        case '4':
          shaderParams.lfo1Amp = Math.max(0, Math.min(1, shaderParams.lfo1Amp - step));
          break;
          
        // Global controls
        case 'p':
          shaderParams.pixelSwitch = !shaderParams.pixelSwitch;
          console.log('Pixelation:', shaderParams.pixelSwitch);
          break;
        case 'm':
          shaderParams.ch1HMirror = !shaderParams.ch1HMirror;
          console.log('H Mirror:', shaderParams.ch1HMirror);
          break;
        case 'l':
          shaderParams.ch1VMirror = !shaderParams.ch1VMirror;
          console.log('V Mirror:', shaderParams.ch1VMirror);
          break;
        case 'q':
          shaderParams.ch1QuantizeSwitch = !shaderParams.ch1QuantizeSwitch;
          console.log('Quantize:', shaderParams.ch1QuantizeSwitch);
          break;
        case 'v':
          shaderParams.ch1VideoEnabled = !shaderParams.ch1VideoEnabled;
          console.log('Video Texture:', shaderParams.ch1VideoEnabled ? 'ON' : 'OFF');
          break;
        case 'f':
          shaderParams.feedbackMix = Math.max(0, Math.min(1, shaderParams.feedbackMix + step));
          console.log('Feedback Mix:', shaderParams.feedbackMix);
          break;
        case 'g':
          shaderParams.feedbackMix = Math.max(0, Math.min(1, shaderParams.feedbackMix - step));
          break;
          
        // Reset
        case ' ':
          // Reset all parameters
          Object.keys(shaderParams).forEach(key => {
            if (typeof shaderParams[key] === 'number') {
              if (key.includes('Rate')) shaderParams[key] = 0.5;
              else if (key.includes('Amp')) shaderParams[key] = 0.1;
              else if (key.includes('Scale')) shaderParams[key] = 1.0;
              else if (key.includes('Quantize')) shaderParams[key] = 8.0;
              else if (key.includes('PixelScale')) shaderParams[key] = 64.0;
              else if (key.includes('Center')) shaderParams[key] = [0.5, 0.5];
              else if (key.includes('Matrix')) shaderParams[key] = [1.0, 0.0, 0.0, 1.0];
              else if (key.includes('PowMap')) shaderParams[key] = [1.0, 1.0, 1.0];
              else shaderParams[key] = 0.0;
            } else if (typeof shaderParams[key] === 'boolean') {
              shaderParams[key] = false;
            }
          });
          console.log('Reset all parameters');
          break;
      }
    });
    
    // Add instructions
    console.log(`
VIDEO_WAAAVES-inspired Shader Controls:
Geometry: F/G (fisheye), S/D (spiral), K/J (kaleidoscope), R/E (rotate)
Color: H/N (hue), U/I (saturation), B/V (brightness)
LFO: 1/2 (LFO1 rate), 3/4 (LFO1 amplitude)
Global: P (pixelation), M (H mirror), L (V mirror), Q (quantize), V (video texture), F/G (feedback)
Reset: SPACE (reset all)
    `);
    window.shaderParams = shaderParams;
  }

  // Initialize shader system after page load
  setTimeout(initShaderSystem, 100);

  // VIDEO_WAAAVES Style Shader Control Panel Functionality
  function initShaderControls() {
    // Modal functionality
    $('.button--shaderControl').click(function() {
      $('.modalContainer--shaderControl').fadeIn();
    });

    $('.modalContainer--shaderControl .modalClose').click(function() {
      $('.modalContainer--shaderControl').fadeOut();
    });

    // All VIDEO_WAAAVES-style controls
    const controls = [
      // Channel 1 Controls
      'ch1Scale', 'ch1Hue', 'ch1Saturation', 'ch1Brightness', 'ch1Quantize',
      // Geometry Effects
      'fisheyeAmount', 'spiralAmount', 'spiralAngle', 'kaleidoscopeSegments', 
      'kaleidoscopeSlice', 'rotate',
      // Color Processing
      'hueOffset', 'saturationOffset', 'brightnessOffset', 'hueAttenuate',
      'saturationAttenuate', 'brightnessAttenuate', 'hueShaper',
      // LFO System
      'lfo1Rate', 'lfo1Amp', 'lfo2Rate', 'lfo2Amp', 'lfo3Rate', 'lfo3Amp',
      // Global Controls
      'pixelScale', 'feedbackMix', 'blurAmount', 'sharpenAmount'
    ];

    // Initialize all sliders
    controls.forEach(controlId => {
      const slider = document.getElementById(controlId);
      const valueDisplay = document.getElementById(controlId + 'Value');
      
      if (slider && valueDisplay) {
        // Update display on change
        slider.addEventListener('input', function() {
          const value = parseFloat(this.value);
          const decimals = controlId.includes('Rate') || controlId.includes('Amp') || 
                          controlId.includes('Offset') || controlId.includes('Attenuate') ||
                          controlId.includes('Shaper') || controlId.includes('Amount') ||
                          controlId.includes('Mix') ? 2 : 
                          controlId.includes('Angle') || controlId.includes('Slice') ? 1 : 0;
          
          valueDisplay.textContent = value.toFixed(decimals);
          
          // Update shader parameters if available
          if (window.shaderParams) {
            window.shaderParams[controlId] = value;
          }
        });
      }
    });

    // Initialize toggle switches
    const toggles = [
      'ch1QuantizeSwitch', 'ch1HMirror', 'ch1VMirror', 'ch1VideoEnabled', 'pixelSwitch'
    ];

    toggles.forEach(toggleId => {
      const toggle = document.getElementById(toggleId);
      if (toggle) {
        toggle.addEventListener('change', function() {
          if (window.shaderParams) {
            window.shaderParams[toggleId] = this.checked;
          }
        });
      }
    });

    // VIDEO_WAAAVES-style presets
    const presets = {
      default: {
        ch1Scale: 1.0, ch1Hue: 0.0, ch1Saturation: 0.0, ch1Brightness: 0.0, ch1Quantize: 8,
        fisheyeAmount: 0.0, spiralAmount: 0.0, spiralAngle: 0.0, kaleidoscopeSegments: 0,
        kaleidoscopeSlice: 0.0, rotate: 0.0,
        hueOffset: 0.0, saturationOffset: 0.0, brightnessOffset: 0.0,
        hueAttenuate: 1.0, saturationAttenuate: 1.0, brightnessAttenuate: 1.0, hueShaper: 0.0,
        lfo1Rate: 0.5, lfo1Amp: 0.1, lfo2Rate: 0.3, lfo2Amp: 0.1, lfo3Rate: 0.7, lfo3Amp: 0.1,
        pixelScale: 64, feedbackMix: 0.1, blurAmount: 0.0, sharpenAmount: 0.0
      },
      geometric: {
        ch1Scale: 1.2, ch1Hue: 0.3, ch1Saturation: 0.2, ch1Brightness: 0.1, ch1Quantize: 16,
        fisheyeAmount: 0.3, spiralAmount: 0.5, spiralAngle: 1.57, kaleidoscopeSegments: 6,
        kaleidoscopeSlice: 0.5, rotate: 0.2,
        hueOffset: 0.1, saturationOffset: 0.2, brightnessOffset: 0.0,
        hueAttenuate: 1.5, saturationAttenuate: 1.2, brightnessAttenuate: 1.0, hueShaper: 0.3,
        lfo1Rate: 0.8, lfo1Amp: 0.2, lfo2Rate: 0.4, lfo2Amp: 0.15, lfo3Rate: 1.2, lfo3Amp: 0.1,
        pixelScale: 32, feedbackMix: 0.2, blurAmount: 0.1, sharpenAmount: 0.0
      },
      colorful: {
        ch1Scale: 0.8, ch1Hue: 0.5, ch1Saturation: 0.8, ch1Brightness: 0.3, ch1Quantize: 4,
        fisheyeAmount: 0.1, spiralAmount: 0.2, spiralAngle: 0.0, kaleidoscopeSegments: 8,
        kaleidoscopeSlice: 0.0, rotate: 0.0,
        hueOffset: 0.3, saturationOffset: 0.5, brightnessOffset: 0.2,
        hueAttenuate: 2.0, saturationAttenuate: 2.5, brightnessAttenuate: 1.5, hueShaper: 0.8,
        lfo1Rate: 1.5, lfo1Amp: 0.3, lfo2Rate: 0.6, lfo2Amp: 0.25, lfo3Rate: 2.0, lfo3Amp: 0.2,
        pixelScale: 128, feedbackMix: 0.3, blurAmount: 0.0, sharpenAmount: 0.2
      },
      chaotic: {
        ch1Scale: 1.5, ch1Hue: 0.8, ch1Saturation: 1.0, ch1Brightness: 0.5, ch1Quantize: 2,
        fisheyeAmount: 0.8, spiralAmount: 1.5, spiralAngle: 3.14, kaleidoscopeSegments: 12,
        kaleidoscopeSlice: 1.0, rotate: 0.5,
        hueOffset: 0.6, saturationOffset: 0.8, brightnessOffset: 0.4,
        hueAttenuate: 3.0, saturationAttenuate: 4.0, brightnessAttenuate: 2.5, hueShaper: 1.5,
        lfo1Rate: 3.0, lfo1Amp: 0.6, lfo2Rate: 1.5, lfo2Amp: 0.4, lfo3Rate: 4.0, lfo3Amp: 0.5,
        pixelScale: 16, feedbackMix: 0.7, blurAmount: 0.3, sharpenAmount: 0.4
      },
      minimal: {
        ch1Scale: 0.5, ch1Hue: 0.0, ch1Saturation: -0.3, ch1Brightness: -0.2, ch1Quantize: 32,
        fisheyeAmount: 0.0, spiralAmount: 0.0, spiralAngle: 0.0, kaleidoscopeSegments: 0,
        kaleidoscopeSlice: 0.0, rotate: 0.0,
        hueOffset: 0.0, saturationOffset: -0.2, brightnessOffset: -0.1,
        hueAttenuate: 0.5, saturationAttenuate: 0.3, brightnessAttenuate: 0.7, hueShaper: 0.0,
        lfo1Rate: 0.2, lfo1Amp: 0.05, lfo2Rate: 0.1, lfo2Amp: 0.03, lfo3Rate: 0.15, lfo3Amp: 0.02,
        pixelScale: 200, feedbackMix: 0.0, blurAmount: 0.0, sharpenAmount: 0.0
      },
      feedback: {
        ch1Scale: 1.0, ch1Hue: 0.2, ch1Saturation: 0.3, ch1Brightness: 0.1, ch1Quantize: 8,
        fisheyeAmount: 0.2, spiralAmount: 0.3, spiralAngle: 0.5, kaleidoscopeSegments: 4,
        kaleidoscopeSlice: 0.2, rotate: 0.1,
        hueOffset: 0.1, saturationOffset: 0.2, brightnessOffset: 0.0,
        hueAttenuate: 1.2, saturationAttenuate: 1.1, brightnessAttenuate: 1.0, hueShaper: 0.2,
        lfo1Rate: 0.6, lfo1Amp: 0.15, lfo2Rate: 0.3, lfo2Amp: 0.1, lfo3Rate: 0.9, lfo3Amp: 0.12,
        pixelScale: 64, feedbackMix: 0.8, blurAmount: 0.2, sharpenAmount: 0.1
      }
    };

    // Preset buttons
    $('.presetBtn').click(function() {
      const presetName = $(this).data('preset');
      
      if (presetName === 'reset') {
        // Reset all controls to default values
        Object.keys(presets.default).forEach(key => {
          const slider = document.getElementById(key);
          const valueDisplay = document.getElementById(key + 'Value');
          
          if (slider && valueDisplay) {
            slider.value = presets.default[key];
            const decimals = key.includes('Rate') || key.includes('Amp') || 
                            key.includes('Offset') || key.includes('Attenuate') ||
                            key.includes('Shaper') || key.includes('Amount') ||
                            key.includes('Mix') ? 2 : 
                            key.includes('Angle') || key.includes('Slice') ? 1 : 0;
            valueDisplay.textContent = presets.default[key].toFixed(decimals);
          }
        });
        
        // Reset toggles
        toggles.forEach(toggleId => {
          const toggle = document.getElementById(toggleId);
          if (toggle) {
            toggle.checked = false;
          }
        });
        
        // Update shader parameters
        if (window.shaderParams) {
          Object.assign(window.shaderParams, presets.default);
          toggles.forEach(toggleId => {
            window.shaderParams[toggleId] = false;
          });
        }
      } else {
        const preset = presets[presetName];
        
        if (preset) {
          Object.keys(preset).forEach(key => {
            const slider = document.getElementById(key);
            const valueDisplay = document.getElementById(key + 'Value');
            
            if (slider && valueDisplay) {
              slider.value = preset[key];
              const decimals = key.includes('Rate') || key.includes('Amp') || 
                              key.includes('Offset') || key.includes('Attenuate') ||
                              key.includes('Shaper') || key.includes('Amount') ||
                              key.includes('Mix') ? 2 : 
                              key.includes('Angle') || key.includes('Slice') ? 1 : 0;
              valueDisplay.textContent = preset[key].toFixed(decimals);
            }
          });
          
          // Update shader parameters
          if (window.shaderParams) {
            Object.assign(window.shaderParams, preset);
          }
        }
      }
    });
  }

  // Initialize shader controls after page load
  setTimeout(initShaderControls, 200);

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

  // Driving GIF scraper for shader Channel 1 video source
  function loadDrivingGif() {
    return new Promise((resolve, reject) => {
      console.log("loadDrivingGif function called");
      
      // List of driving-related GIF APIs and sources
      var drivingGifApis = [
        // Tenor API with driving-related queries
        'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=driving',
        'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=car',
        'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=dashboard',
        'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=rally',
        'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=racing',
        'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=road',
        'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=highway',
        'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=speed',
        'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=motorway',
        'https://api.tenor.com/v1/random?key=LIVDSRZULELA&limit=1&q=autobahn',
        
        // Alternative sources for driving content
        'https://source.unsplash.com/640x480/?car,driving,road&sig=' + Math.random(),
        'https://source.unsplash.com/640x480/?dashboard,steering&sig=' + Math.random(),
        'https://source.unsplash.com/640x480/?racing,speed&sig=' + Math.random()
      ];

      console.log("Available driving GIF APIs:", drivingGifApis.length);

      // Try multiple APIs in sequence
      var currentApiIndex = 0;
      
      function tryNextApi() {
        console.log("tryNextApi called, currentApiIndex:", currentApiIndex);
        if (currentApiIndex >= drivingGifApis.length) {
          // All APIs failed, use fallback
          console.log("All driving GIF APIs failed, using fallback noise pattern");
          resolve(null);
          return;
        }
        
        var currentApi = drivingGifApis[currentApiIndex];
        console.log("Trying driving GIF API:", currentApi);
        
        if (currentApi.includes('api.tenor.com')) {
          // Handle Tenor API response
          console.log("Making fetch request to Tenor API...");
          fetch(currentApi)
            .then(response => {
              console.log("Tenor API response status:", response.status);
              return response.json();
            })
            .then(data => {
              console.log("Tenor API response data:", data);
              if (data.results && data.results[0] && data.results[0].media[0]) {
                var gifUrl = data.results[0].media[0].gif.url;
                console.log("Successfully loaded driving GIF from Tenor:", gifUrl);
                resolve(gifUrl);
              } else {
                throw new Error("No driving GIF found in Tenor response");
              }
            })
            .catch(error => {
              console.log("Tenor API failed for driving GIF, trying next API:", error);
              currentApiIndex++;
              tryNextApi();
            });
        } else {
          // Direct image URL (Unsplash)
          console.log("Testing Unsplash image URL...");
          var testImg = new Image();
          testImg.crossOrigin = 'anonymous';
          testImg.onload = function() {
            console.log("Successfully loaded driving image from Unsplash:", currentApi);
            resolve(currentApi);
          };
          testImg.onerror = function() {
            console.log("Unsplash API failed for driving image, trying next API");
            currentApiIndex++;
            tryNextApi();
          };
          testImg.src = currentApi;
        }
      }
      
      tryNextApi();
    });
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
    $(".modalContainer--references").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--linguistics").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--movementAnalysis").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--machineLearning").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--musicEngine").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--symbolicLanguage").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--materialStudies").css("box-shadow", "0px 0px 32px" + c2);
    //$(".modalContainer--hausaufgabe").css("box-shadow", "0px 0px 32px" + c2);
    $(".landbuoyProjects").css("background", "linear-gradient(to right, transparent, " + c2 );

    
    
        //$(".landBuoyInnerContainer").css("border", "5px" + c2);
    $(".aquaButton--info").css("background", c2);
    $(".aquaButton--resume").css("background", c2);
    $(".aquaButton--uploadIThought").css("background", c2);
    $(".aquaButton--uploadIIThoughts").css("background", c2);
    $(".aquaButton--references").css("background", c2);
    $(".aquaButton--linguistics").css("background", c2);
    $(".aquaButton--movementAnalysis").css("background", c2);
    $(".aquaButton--machineLearning").css("background", c2);
    $(".aquaButton--musicEngine").css("background", c2);
    $(".aquaButton--symbolicLanguage").css("background", c2);
    $(".aquaButton--materialStudies").css("background", c2);

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
