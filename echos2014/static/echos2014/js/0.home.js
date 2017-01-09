$(document).ready(function(){
    $(window).resize(function () {
    });

    if ($('html').hasClass('iebad')) {
        $("#page").replaceWith(function() { return this.innerHTML; });

        $('#photo').addClass('ieDeny');
        $('header').addClass('ieDeny');
        $('#presents').addClass('ieDeny');
        $('#fai').addClass('ieDeny');

        $('h1#echos').addClass('ieTune');

        var date = $('h2#date');
        $(date).addClass('ieTune').
            append('<a style="margin-left: 15px;" href="https://www.facebook.com/events/138736152969388"><img src="/static/img/layout/fb.png" /></a>' +
            '<p id="denied" class="ieTune small"><a href="http://www.mozilla.org/fr/firefox/new/">,  time to go wild</a> ' +
            '<span style="font-size: 75%"> (IE9+ supported)</span></p>' +
            '<a href="http://www.google.com/chrome"><img class="ieTune" src="../static/img/misc/ie_denied.png"/></a>');
    } else {
        $("#page").click (function () {
            window.location.href = "/echos/presentation";
        });
    }
});
