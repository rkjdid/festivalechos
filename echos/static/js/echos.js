(function ($) {
  var width, height, mapw, maph, ratio;
  var mapw_natural = 760;

  // DOM ready
  $(function() {
    refresh();
  });

  $(window).resize(function() {
    refresh();
  });

  var getSize = function() {
    width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log(width, height);
    if (width === 0) {
      width = $(window).width();
    }
    if (height === 0) {
      height = $(window).height();
    }
    console.log(width, height);
  };

  var refresh = function() {
    getSize();
    // copyright height: 25px
    // menu height: 100px
    maph = height - 100 - 25;
    mapw = 0.9452736318 * maph;
    ratio = mapw / mapw_natural;

    $("body").width(width).height(height);
    $("#imap").height(maph).width(mapw);
    $("#map").height(maph).width(mapw);
    $(".item.echos").width(ratio * 205);
    $(".item.acces").width(ratio * 169);
    $(".item.ferme").width(ratio * 181);
    $(".item.infos").width(ratio * 369);
    $(".item.prog").width(ratio * 369);
    $(".item.trompes").width(ratio * 252);
    $("#content").width(width-mapw);
    $("#menu").width(mapw);
  };
})(jQuery);
