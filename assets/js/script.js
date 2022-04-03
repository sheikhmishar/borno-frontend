$(window).on("load", function() {
  $("#preloader").fadeOut();

  var divYear = $("#year"),
    year = new Date().getFullYear().toString();
  if (year != "2021") divYear.text("2021-".concat(year));
  else divYear.text(year);

  $("#dark-toggler,#dark-toggler-mobile").click(function() {
    $("body").toggleClass("theme-pink");
  });
});
