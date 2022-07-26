//CONTACT MODAL
// 1. when we click the menu, run a function
// 2. inside the function we are going to add/remove the class of open
// 3. make sure our link doesnt jumothe paghe to the top.
//

$(".navLink--contact").on("click", function () {
  $(".contactSection").toggleClass("contactSection--open");
  $(".arrow__icon").toggleClass("arrow__icon--down");
  return false;
});

$("#toggle1").click(function () {
  $("body").css("background-color", "#fff");
  $(".contactSection").css("background-color", "#fff");
  $(".nav").css("background-color", "#fff");
  $(".footer").css("background-color", "#fff");
  $(".toggle").removeClass("toggle--active");
  $(this).addClass("toggle--active");
});

$("#toggle2").click(function () {
  $("body").css("background-color", "#E9D1C3");
  $(".contactSection").css("background-color", "#E9D1C3");
  $(".nav").css("background-color", "#E9D1C3");
  $(".footer").css("background-color", "#E9D1C3");
  $(".toggle").removeClass("toggle--active");
  $(this).addClass("toggle--active");
});

$("#toggle3").click(function () {
  $("body").css("background-color", "#CCFC93");
  $(".contactSection").css("background-color", "#CCFC93");
  $(".nav").css("background-color", "#CCFC93");
  $(".footer").css("background-color", "#CCFC93");
  $(".toggle").removeClass("toggle--active");
  $(this).addClass("toggle--active");
});

$("#toggle4").click(function () {
  $("body").css("background-color", "#E881BB");
  $(".contactSection").css("background-color", "#E881BB");
  $(".nav").css("background-color", "#E881BB");
  $(".footer").css("background-color", "#E881BB");
  $(".toggle").removeClass("toggle--active");
  $(this).addClass("toggle--active");
});

// Make images draggable on devices that support hover
$(document).ready(function () {
  // Toggling visibility of contact modal on page load 
  window.setTimeout(function () {
    $(".contactSection").css("visibility", "visible");
  }, 500);
  // Setting up media query event handler
  // Everything here mirrors values in our CSS
  if (matchMedia) {
    const mediaQuery = window.matchMedia("(hover: hover)");
    mediaQuery.addListener(WidthChange);
    WidthChange(mediaQuery);
  }
  // Listening to media query changes
  function WidthChange(mediaQuery) {
    if (mediaQuery.matches) {
      // If browser supports hover
      $(".projectImage").draggable({ scroll: false });
      $(".navLink--title").on("click", function () {
        $(".contactSection").toggleClass("contactSection--open");
        $(".arrow__icon").toggleClass("arrow__icon--down");
        return false;
      });
      
      $(".navLink--logo").on("click", function () {
        $(".contactSection").toggleClass("contactSection--open");
        $(".arrow__icon").toggleClass("arrow__icon--down");
        return false;
      });
    } else {
      // If browser doesn't support hover
    }
  }
});