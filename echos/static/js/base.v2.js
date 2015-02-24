var ratio = 1.3558776167;

if (typeof(wait) === 'undefined')
    var wait = true;

window.onload = function () {
    $('.screen').animate({opacity:0}, 150, function() {
        $('.screen').css({'display':'none'});
    });

    wait = false;
};

$(document).ready (function () {
    if ($('html').hasClass('iebad')) {
        var href = window.location.href.replace("http://", '').replace('/', '');

        if (window.location.host != href) {
            window.location.replace('http://' + window.location.host);
        }
    }

    $(window).resize(function() {
        vertAlign();
    });

    vertAlign();
});



function vertAlign (){
    if ($('html').hasClass('iebad'))
        return;

    var pg = $('#page'),
        b = $('body');

    $(b).css({
        'width': '100%',
        'height': '100%',
        'position': 'absolute'
    });

    $(pg).css({
        'height': $(pg).width() / ratio
    });

    if ($(b).height() > $(pg).height())
        $(pg).css({
            'marginTop': ($(b).height() - $(pg).height()) / 2.5
        });
    else
        $(pg).css({
            'marginTop' : 0
        })
}