$(window).on("load", function() {
  $("#preloader").fadeOut();

  var divYear = $("#year"),
    year = new Date().getFullYear().toString();
  if (year != "2021") divYear.text("2021-".concat(year));
  else divYear.text(year);

  var body = $("body");
  var anchors = $("a");
  var navbar = $("nav");
  var navbarImage = $(".navbar-brand img");
  var navSearch = $(".navbar-nav .nav-item:nth-child(2) .btn");
  var tabs = $(".nav .nav-link");
  var tabCards = $(".tab-content > .tab-pane > .card");
  var tables = $("table.table");
  var tableDropleft = $(
    "table.table > tbody > tr > td > .dropleft > .dropdown-menu"
  );
  var footerImage = $("footer img");
  var blogSidebarCards = $(".blog-sidebar .card");
  var blogSidebarInputs = $(".blog-sidebar input.form-control");
  var formControls = $("input.form-control:not(#offer)");
  var customSelect = $(".custom-select");
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
      tableDropleft.removeClass("bg-light");
      tableDropleft.removeClass("text-dark");
      tableDropleft.addClass("bg-dark");
      tableDropleft.addClass("text-light");
      formControls.removeClass("text-secondary");
      formControls.addClass("text-light");
      customSelect.removeClass("text-secondary");
      customSelect.addClass("text-light");
      navSearch.removeClass("text-dark");
      navSearch.addClass("text-light");
      tabs.removeClass("bg-light");
      tabs.addClass("bg-dark");
      blogSidebarCards.removeClass("bg-light");
      blogSidebarCards.addClass("bg-dark");
      blogSidebarInputs.removeClass("bg-light");
      blogSidebarInputs.addClass("bg-dark");
      tabCards.removeClass("bg-light");
      tabCards.addClass("bg-dark");
      tables.addClass("table-dark");
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
      tableDropleft.removeClass("bg-dark");
      tableDropleft.removeClass("text-light");
      tableDropleft.addClass("bg-light");
      tableDropleft.addClass("text-dark");
      formControls.removeClass("text-light");
      formControls.addClass("text-secondary");
      customSelect.removeClass("text-light");
      customSelect.addClass("text-secondary");
      navSearch.addClass("text-dark");
      navSearch.removeClass("text-light");
      tabs.removeClass("bg-dark");
      tabs.addClass("bg-light");
      tabCards.removeClass("bg-dark");
      tabCards.addClass("bg-light");
      blogSidebarCards.removeClass("bg-dark");
      blogSidebarCards.addClass("bg-light");
      blogSidebarInputs.removeClass("bg-dark");
      blogSidebarInputs.addClass("bg-light");
      tables.removeClass("table-dark");
    }
  }

  manageTheme();

  $("#dark-toggler,#dark-toggler-mobile").click(function() {
    isDarkTheme = !isDarkTheme;
    manageTheme();
  });

  if (
    location.pathname.match(
      /^\/dashboard\/student\/(?:index.(?:(?:php)|(?:html)))?$/gm
    ) &&
    location.hash.startsWith("#t-")
  ) {
    $("#invoice-nav").on("click", function() {
      $('#tabs a[href="#t-invoice"]').tab("show");
    });
    $(
      String('#tabs a[href="')
        .concat(location.hash)
        .concat('"]')
    ).tab("show");
  }
});
