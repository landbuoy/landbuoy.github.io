  // General layout functionality

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
  $(".glyph--dancingTriangle").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--dancingTriangle").fadeToggle().css("zIndex", "9999");
  });
  $(".glyph--marchComp3-6").click(function () {
    $(".modalContainer").css("zIndex", "0");
    $(".modalContainer--marchComp3-6").fadeToggle().css("zIndex", "9999");
  });
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
    $(".modalContainer--dancingTriangle").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--mossComposite").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--marchComp3-6").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--marchComp3-8").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--marchComp3-18").css("box-shadow", "0px 0px 32px" + c2);
    $(".modalContainer--marchComp3-31").css("box-shadow", "0px 0px 32px" + c2);
    $(".bandcampLinks").css("background", "linear-gradient(to right, transparent, " + c2 );
    $(".mossComposites").css("background", "linear-gradient(to right, transparent, " + c2 );
   // $(".landBuoyInnerContainer").css("border", "5px" + c2);
    $(".aquaButton--info").css("background", c2);
    $(".aquaButton--resume").css("background", c2);
    $(".aquaButton--uploadIThought").css("background", c2);
    $(".aquaButton--uploadIIThoughts").css("background", c2);

    //DIV BOX STUFF
    var navBoxHeight = document.querySelector('.nav').offsetHeight;
    $(".landBuoyContainer1").css("top", navBoxHeight + 32 +"px");
    
});
