var ratio = 1.602564102564103;

$(document).ready (function () {
    $(window).load(function(){
        $(".content").mCustomScrollbar({
            theme:"dark",
            updateOnContentResize:true,
            scrollButtons:{
                enable: true
            }
        });
    });

    $(".scrollTop").click(function(){
        $("._mCS_1").mCustomScrollbar("scrollTo","top");
    });

    $(window).resize(function() {
        vertAlign (ratio);
        menuHAlign();

    });

    vertAlign (ratio);
    menuHAlign();
});

function menuHAlign () {
    var menu = $('#mainList');
    var targets = $(menu).children('li');

    var totalW = $(menu).width();
    var compressedW = 0;
    var nbTabs = $(targets).length;

    $(targets).each (function (i) {
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
        $(targets).each(function(i) {
            if (length != i + 1)
                $(this).css({
                    'marginRight' : parseFloat($(this).css('marginRight')) + oxygene
                });
        });

    }
}

function vertAlign (r){
    var pg = $('#page'),
        b = $('body');

    $(b).css({
        'width': '100%',
        'height': '100%',
        'position': 'absolute'
    });

    $(pg).css({
        'height': $(pg).width() / r
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