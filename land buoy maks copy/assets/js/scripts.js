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
  $(".globeButton--resume").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--resume").fadeIn().css("zIndex", "9999");
  });
  $(".aquaButton--resume").click(function () {
    $(".modalContainer--resume").fadeOut();
  });
  // Info modal
  $(".globeButton--info").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--info").fadeIn().css("zIndex", "9999");
  });
  $(".aquaButton--info").click(function () {
    $(".modalContainer--info").fadeOut();
  });
    // LANDBUOY A1
  $(".landBuoy--A1").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--landBuoyA1").fadeIn().css("zIndex", "9999");
  });
  $(".aquaButton--landBuoyA1").click(function () {
    $(".modalContainer--landBuoyA1").fadeOut();
  });
    // LANDBUOY B1
  $(".landBuoy--B1").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--landBuoyB1").fadeIn().css("zIndex", "9999");
  });
  $(".aquaButton--landBuoyB1").click(function () {
    $(".modalContainer--landBuoyB1").fadeOut();
  });  
  // color stuff
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

    $(".mainContainer").css("background-color", c1);
    $(".marqueeText").css("color", c2);
    $(".modalContainer--info").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--resume").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--landBuoyA1").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--landBuoyB1").css("box-shadow", "0px 0px 32px" + c2);
   // $(".landBuoyInnerContainer").css("border", "5px" + c2);
    $(".aquaButton--info").css("background", c2);
    $(".aquaButton--resume").css("background", c2);
    $(".aquaButton--landBuoyA1").css("background", c2);
    $(".aquaButton--landBuoyB1").css("background", c2);

    //DIV BOX STUFF
    var navBoxHeight = document.querySelector('.nav').offsetHeight;
    $(".landBuoyContainer1").css("top", navBoxHeight + 32 +"px");
    
});

// Player for channel 1

var musicarr1 = [
  "assets/audio/ch1/rainy 2021 - 2.wav"
];

shuffle1(musicarr1);

init1();

function init1() {
  current = 0;
  audio1 = $("#audioPlayer1");
  audio1[0].volume = 0.6;
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
  $(".globeButton--channelOne").click(function () {
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
  "assets/audio/ch2/february twenty fourth 2022 - A3.wav"
  ];
shuffle2(musicarr2);

init2();

function init2() {
  current = 0;
  audio2 = $("#audioPlayer2");
  audio2[0].volume = 0.4;
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
  $(".globeButton--channelTwo").click(function () {
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
}
