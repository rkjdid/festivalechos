(function ($) {
  var width, height, mapw, maph, row1_extraw, menuh, zoom;
  var mapw_natural = 760;
  var ready = false, loaded = false;

  // DOM ready
  $(function() {
    ready = true;
  });

  // onload
  $(window).on("load", function() {
    refresh();
    loaded = true;
  });

  // onresize
  $(window).on("resize", function() {
    if (loaded) {
      refresh();
    }
  });

  // get viewport size
  var getSize = function() {
    width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    if (width === 0) {
      width = $(window).width();
    }
    if (height === 0) {
      height = $(window).height();
    }
  };

  var refresh = function() {
    getSize();
    // copyright height: 25px
    // menu height: 100px
    maph = height - 100 - 25;
    mapw = 0.9452736318 * maph;
    zoom = mapw / mapw_natural;

    $("body").width(width).height(height);
    $("#imap").height(maph).width(mapw);
    $("#map").height(maph).width(mapw);
    $(".item.echos").width(zoom * 205);
    $(".item.acces").width(zoom * 169);
    $(".item.ferme").width(zoom * 181);
    $(".item.infos").width(zoom * 369);
    $(".item.prog").width(zoom * 369);
    $(".item.trompes").width(zoom * 252);
    $("#content").width(width-mapw);
    $("#menu").width(mapw);

    var $row0 = $("#row0"),
        $row1 = $("#row1");
    $row0.find("img").height(zoom * 50);
    $row1.find("a").not(".idash").find("img").height(zoom * 25);
    $row0.css({"margin-bottom": 12});

    // set vertical alignment
    menuh = $row0.height() + 12 + $row1.height();
    $row0.css({"margin-top": (100 - menuh) / 2.5});

    // set horizontal paddings
    row1_extraw = $row1.width();
    $("#row1 img").each(function () {
      row1_extraw -= $(this).width();
    });
    var pad_unit = (row1_extraw-20) / 7;
    $row1.find("a").css({"margin-right": pad_unit})
      .last().css({"margin-right": 0});
    $row1.find(".i0").css({"margin-right": pad_unit * 3});
    $row0.find("a").css({"margin-right": pad_unit * 2.5})
      .last().css({"margin-right": 0});

    // set title position
    console.log(1 * zoom * (width - mapw), zoom, (width - mapw));
    $("#title").css({
      width: 0.7* (width-mapw),
      left:  (132/1036)* (width - mapw),
      top:   (184/974) * (height)});
  };
})(jQuery);
