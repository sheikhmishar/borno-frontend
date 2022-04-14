$(window).on("load", function() {
  $("#preloader").fadeOut();

  var divYear = $("#year"),
    year = new Date().getFullYear().toString();
  if (year != "2021") divYear.text("2021-".concat(year));
  else divYear.text(year);

  var body = $("body");
  var anchors = $("a");
  var navbar = $("navbar");
  var navbarImage = $(".navbar-brand img");
  var footerImage = $("footer img");
  var bannerImage = $("#banner");
  var getStarted = $("#get-started");
  var isDarkTheme = !body.hasClass("theme-light");

  function manageTheme() {
    if (isDarkTheme) {
      body.addClass("text-light");
      body.removeClass("theme-light");
      navbar.removeClass("navbar-light border-light");
      navbar.addClass("navbar-dark border-dark");
      anchors.each(function(i, elem) {
        $(this).removeClass("text-dark");
        $(this).addClass("text-light");
      });
      navbarImage.prop("src", "/assets/img/logo.png");
      footerImage.prop("src", "/assets/img/logo.png");
      getStarted.prop("src", "/assets/img/get-started.svg");
      bannerImage.prop("src", "/assets/img/banner.svg");
    } else {
      body.removeClass("text-light");
      body.addClass("theme-light");
      navbar.removeClass("navbar-dark border-dark");
      navbar.addClass("navbar-light border-light");
      anchors.each(function(i, elem) {
        $(this).removeClass("text-light");
        $(this).addClass("text-dark");
      });
      navbarImage.prop("src", "/assets/img/logo-dark.png");
      footerImage.prop("src", "/assets/img/logo-dark.png");
      getStarted.prop("src", "/assets/img/get-started-dark.svg");
      bannerImage.prop("src", "/assets/img/banner-dark.svg");
    }
  }

  manageTheme();

  $("#dark-toggler,#dark-toggler-mobile").click(function() {
    isDarkTheme = !isDarkTheme;
    manageTheme();
  });
});
