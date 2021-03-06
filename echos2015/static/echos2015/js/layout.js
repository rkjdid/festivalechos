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
  disableMapScroll();

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
}

function disableMapScroll() {
  // Disable scroll zooming and bind back the click event
  var onMapMouseleaveHandler = function (e) {
    var that = $(this);

    that.on('click', onMapClickHandler);
    that.off('mouseleave', onMapMouseleaveHandler);
    that.find('iframe').css("pointer-events", "none");
  };

  var onMapClickHandler = function (e) {
    var that = $(this);

    // Disable the click handler until the user leaves the map area
    that.off('click', onMapClickHandler);

    // Enable scrolling zoom
    that.find('iframe').css("pointer-events", "auto");

    // Handle the mouse leave event
    that.on('mouseleave', onMapMouseleaveHandler);
  };

  // Enable map zooming with mouse scroll when the user clicks the map
  $('.embedmap').on('click', onMapClickHandler);
}
