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
$(".mossComposites").css("background", "linear-gradient(to right, transparent, " + c2 );

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