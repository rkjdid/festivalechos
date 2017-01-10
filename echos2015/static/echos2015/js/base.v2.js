if (typeof(wait) === 'undefined')
  var wait = true;

$(window).on("load", function () {
  if (typeof(preload) === 'function')
    preload();

  $('.screen').animate({opacity: 0}, 150, function () {
    $('.screen').css({'display': 'none'});
  });

  wait = false;
});

$(document).ready(function () {
  if ($('html').hasClass('iebad')) {
    var href = window.location.href.replace("http://", '').replace('/', '');

    if (window.location.host != href) {
      window.location.replace('http://' + window.location.host);
    }
  }
});

function preload() {
  $(window).resize(function () {
    vertAlign();
  });

  vertAlign();
}


function vertAlign() {
  if ($('html').hasClass('iebad'))
    return;

  var pg = $('#page'),
     b = $('body');

  b.css({
    'width': '100%',
    'height': '100%',
    'position': 'absolute'
  });

  if (b.height() > pg.height())
    pg.css({
      'margin-top': (b.height() - pg.height()) / 2
    });
  else
    pg.css({
      'margin-top': 0
    })
}
