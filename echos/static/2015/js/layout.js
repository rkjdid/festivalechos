function preload() {
  $(".content").mCustomScrollbar({
    theme: "dark",
    updateOnContentResize: true,
    scrollButtons: {
      enable: false
    }
  });

  vertAlign();
  menuHAlign();

  $(window).resize(function () {
    vertAlign();
    menuHAlign();
  });

  // Call fancybox plugin on ".gallery" elements if available
  if (typeof($.fancybox) !== 'undefined')
    $(".gallery").find('a').fancybox({
      prevEffect	: 'none',
      nextEffect	: 'none',
      closeBtn    : false,
      loop        : false,
      title : function(ce) {return (ce.element.data('boxtitle'));},
      helpers	: {
        title	: {
          type: 'inside'
        },
        thumbs	: {
          width	: 50,
          height	: 50
        }
      }
    });

}

function menuHAlign() {
  var menu = $('#mainList');
  var targets = $(menu).children('li');

  var totalW = $(menu).width();
  var compressedW = 0;
  var nbTabs = $(targets).length;

  $(targets).each(function (i) {
    var headWidth = $(this).find('.header').width();
    compressedW += headWidth;

    var listWidth = $(this).find('ul').width();

    var offset = 0;

    if (headWidth < listWidth)
      offset = headWidth - listWidth;

    $(this).css('marginRight', offset + 'px');
  });

  if (totalW > compressedW) {
    var oxygene = (totalW - compressedW) / nbTabs;
    var length = $(targets).length;
    $(targets).each(function (i) {
      if (length != i + 1)
        $(this).css({
          'marginRight': parseFloat($(this).css('marginRight')) + oxygene
        });
    });

  }
}

function vertAlign() {
  var pg = $('#page'),
     b = $('body');

  b.css({
    'width': '100%',
    'height': '100%',
    'position': 'absolute'
  });

  var margin_top = 0;

  if (b.height() > pg.height()) {
    margin_top = (b.height() - pg.height()) / 2.5;
    pg.css({
      'marginTop': margin_top
    });
  }
  else {
    pg.css({
      'marginTop': margin_top
    });
  }

  // Dirty hack for firefox, don't remember what it's about
  setTimeout(function() {backgroundAlign(margin_top);}, 0);
}

function backgroundAlign(margin_top) {
  var center_x = 565;
  var center_y = 330;

  var logo = $('#logo'),
     pg = $('#page'),
     b = $('body');

  var body_w = Math.max(pg.outerWidth(), b.width());
  var offset_x = (body_w - pg.width()) / 2;
  offset_x += logo.width() * 0.69; // 69% = y offset of O center in ECHOS logo

  var logo_y = $("nav").height() - logo.find("img").height();
  logo_y = Math.max(0, logo_y);
  var offset_y = margin_top + logo_y + logo.height() * 0.51; // 51% = y offset of O center in ECHOS logo

  b.css("background-position", Math.round((offset_x - center_x)) + "px " + Math.round((offset_y - center_y)) + "px");

}