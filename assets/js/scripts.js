  // General layout functionality

$(document).ready(function () {

  // Marquee text
  $(".marqueeContainer").marquee({
    duration: 25000,
    gap: 0,
    delayBeforeStart: 0,
    direction: "right",
    duplicated: true,
    startVisible: true
  });
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
    $(".marqueeText").css("color", c2);
    $(".logoContainer").css("color", c2);
    $(".modalContainer--info").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--resume").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--uploadIThought").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--uploadIIThoughts").css("box-shadow", "0px 0px 32px" + c2);
   // $(".landBuoyInnerContainer").css("border", "5px" + c2);
    $(".aquaButton--info").css("background", c2);
    $(".aquaButton--resume").css("background", c2);
    $(".aquaButton--uploadIThought").css("background", c2);
    $(".aquaButton--uploadIIThoughts").css("background", c2);

    //DIV BOX STUFF
    var navBoxHeight = document.querySelector('.nav').offsetHeight;
    $(".landBuoyContainer1").css("top", navBoxHeight + 32 +"px");
    
});
// new graphic
var musicNewGraphicLeft = [
  "assets/audio/newGraphic001/birdland.mp3",
  "assets/audio/newGraphic001/semimelodic.mp3",
  "assets/audio/newGraphic001/semimelodic2.mp3",
  "assets/audio/newGraphic001/keys.mp3",
];

var musicNewGraphicRight = [
  "assets/audio/newGraphic001/fax.mp3",
  "assets/audio/newGraphic001/fax2.mp3",
  "assets/audio/newGraphic001/percussive.mp3",
  "assets/audio/newGraphic001/shrillambient.mp3",
];

shuffleL(musicNewGraphicLeft);
shuffleR(musicNewGraphicRight);

initMusicNewGraphic();

function initMusicNewGraphic() {
  currentL = 0;
  currentR = 0;
  audioL = $("#audioPlayerNewGraphicLeft");
  audioR = $("#audioPlayerNewGraphicRight");
  audioL[0].volume = 0.8;
  audioR[0].volume = 0.8;
  lenL = musicNewGraphicLeft.length;
  lenR = musicNewGraphicRight.length;

  runL(musicNewGraphicLeft[currentL], audioL[0]);
  runR(musicNewGraphicRight[currentR], audioR[0]);
  

  audioL[0].addEventListener("ended", function (e) {
    currentL++;
    if (currentL == lenL) {
      currentL = 0;
    }
    runL(musicNewGraphicLeft[currentL], audioL[0]);
  });

  audioR[0].addEventListener("ended", function (e) {
    currentR++;
    if (currentR == lenR) {
      currentR = 0;
    }
    runR(musicNewGraphicRight[currentR], audioR[0]);
  });

  audioL[0].pause();
  audioR[0].pause();

  //play audio on opening modal, pause on close
  $(".glyph--newGraphic").click(function () {
    if (audioL[0].paused == false) {
      audioL[0].pause();
      audioR[0].pause();
      //$(".mainLogo").removeClass("mainLogo--active");
    } else {
      audioL[0].play();
      audioR[0].play();
      //$(".mainLogo").addClass("mainLogo--active");
    }
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--newGraphic").fadeToggle().css("zIndex", "9999");
    /*if (audio2[0].paused == false) {
      audio2[0].pause();
    } else {
      // Do nothing
    }*/
  });

//stop channel, switch to next track on resume. what happens on imagemap click? different graphic every time too. replace element function?



}

function runL(link, $audio) {
  audioL[0].src = link;
  audioL[0].load();
}
function runR(link, $audio) {
  audioR[0].src = link;
  audioR[0].load();
}

function shuffleL(array) {
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

function shuffleR(array) {
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

// teapot
/*const canvas = document.getElementById('teapot');
      const ctx = canvas.getContext('2d');
      
      const teapot = {
var vertices = [
  [-0.5, 0, 0.5],    // 0
  [-0.5, -0.5, 0.5], // 1
  [0.5, -0.5, 0.5],  // 2
  [0.5, 0, 0.5],     // 3
  [-0.5, 0, -0.5],   // 4
  [-0.5, -0.5, -0.5],// 5
  [0.5, -0.5, -0.5], // 6
  [0.5, 0, -0.5],    // 7
  [-0.25, 0.25, 0],  // 8
  [-0.25, 0.25, 0],  // 9
  [-0.25, -0.25, 0], // 10
  [-0.25, -0.25, 0], // 11
  [-0.25, 0.25, 0.5],// 12
  [-0.25, -0.25, 0.5],// 13
  [0.25, -0.25, 0.5], // 14
  [0.25, 0.25, 0.5],  // 15
  [-0.25, 0.25, -0.5],// 16
  [-0.25, -0.25, -0.5],// 17
  [0.25, -0.25, -0.5], // 18
  [0.25, 0.25, -0.5],  // 19
  [0, 0.35, 0],       // 20
  [0, 0.35, 0],       // 21
  [0, 0.35, 0],       // 22
  [0, 0.35, 0]        // 23
];


          
        var edges = [
  [0,1], [1,2], [2,3], [3,0], // rim
  [4,5], [5,6], [6,7], [7,4], // body
  [0,4], [1,5], [2,6], [3,7], // legs
  [0,8], [1,9], [2,10], [3,11], // handle
  [4,8], [5,9], [6,10], [7,11], // spout
  [12,13], [13,14], [14,15], [15,12], // lid
  [16,17], [17,18], [18,19], [19,16], // base
  [20,21], [21,22], [22,23], [23,20] // comb
];

        
      };

      function drawTeapot() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        for (let i = 0; i < teapot.edges.length; i += 2) {
          const v1 = teapot.vertices[teapot.edges[i]];
          const v2 = teapot.vertices[teapot.edges[i+1]];
          ctx.moveTo(v1[0], v1[1]);
          ctx.lineTo(v2[0], v2[1]);
        }

        ctx.stroke();
      }

      // Call drawTeapot() here to draw the teapot initially
      //drawTeapot();*/

// Player for channel 1

/*shuffle1(musicarr1);

init1();

function init1() {
  current = 0;
  audio1 = $("#audioPlayer1");
  audio1[0].volume = 0.8;
  len = musicarr1.length;

  run1(musicarr1[current], audio1[0]);

  audio1[0].addEventListener("ended", function (e) {
    current++;
    if (current == len) {
      current = 0;
    }
    run1(musicarr1[current], audio1[0]);
  });

  audio1[0].pause();

  // Playing the selected channel
  // and pausing the other channel if it's playing
  $(".button--channelOne").click(function () {
    if (audio1[0].paused == false) {
      audio1[0].pause();
      $(".mainLogo").removeClass("mainLogo--active");
    } else {
      audio1[0].play();
      $(".mainLogo").addClass("mainLogo--active");
    }
    if (audio2[0].paused == false) {
      audio2[0].pause();
    } else {
      // Do nothing
    }
  });
}

function run1(link, $audio) {
  audio1[0].src = link;
  audio1[0].load();
  // audio1[0].play();
  $("#playing1").html("<ul><li><a>" + link + "</a></li></ul>");
}

function shuffle1(array) {
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

// Player for channel 2

var musicarr2 = [
  "assets/audio/ch2/B1.mp3",
  "assets/audio/ch2/B2.mp3",
  "assets/audio/ch2/B3.mp3",
  "assets/audio/ch2/B4.mp3",
  "assets/audio/ch2/B5.mp3",
  "assets/audio/ch2/B6.mp3",
  "assets/audio/ch2/B7-B8.mp3",
  "assets/audio/ch2/B9.mp3",
  "assets/audio/ch2/B10.mp3",
  "assets/audio/ch2/B11.mp3",
  "assets/audio/ch2/B12.mp3",
  "assets/audio/ch2/B13.mp3",
  "assets/audio/ch2/B14.mp3",
  "assets/audio/ch2/B15.mp3",
  "assets/audio/ch2/B16.mp3",
  "assets/audio/ch2/B17.mp3",
  "assets/audio/ch2/B18.mp3",
  "assets/audio/ch2/B19.mp3",
  "assets/audio/ch2/B20.mp3",
  "assets/audio/ch2/B21.mp3",
  "assets/audio/ch2/B22.mp3",
  "assets/audio/ch2/B23.mp3",
  "assets/audio/ch2/B24.mp3",
  "assets/audio/ch2/B25.mp3",
  "assets/audio/ch2/B26.mp3",
  "assets/audio/ch2/B27.mp3",
  "assets/audio/ch2/B28.mp3",
  "assets/audio/ch2/B29.mp3",
  "assets/audio/ch2/B30.mp3",
  "assets/audio/ch2/B31.mp3",
  "assets/audio/ch2/B32.mp3",
  "assets/audio/ch2/B33.mp3",
  ];
shuffle2(musicarr2);

init2();

function init2() {
  current = 0;
  audio2 = $("#audioPlayer2");
  audio2[0].volume = 0.8;
  len = musicarr2.length;

  run2(musicarr2[current], audio2[0]);

  audio2[0].addEventListener("ended", function (e) {
    current++;
    if (current == len) {
      current = 0;
    }
    run2(musicarr2[current], audio2[0]);
  });

  audio2[0].pause();

  // Playing the selected channel
  // and pausing the other channel if it's playing
  $(".button--channelTwo").click(function () {
    if (audio2[0].paused == false) {
      audio2[0].pause();
      $(".mainLogo").removeClass("mainLogo--active");
    } else {
      audio2[0].play();
      $(".mainLogo").addClass("mainLogo--active");
    }
    if (audio1[0].paused == false) {
      audio1[0].pause();
    } else {
      // Do nothing
    }
  });
}

function run2(link, $audio2) {
  audio2[0].src = link;
  audio2[0].load();
  // audio2[0].play();
  $("#playing2").html("<ul><li><a>" + link + "</a></li></ul>");
}

function shuffle2(array) {
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
}*/