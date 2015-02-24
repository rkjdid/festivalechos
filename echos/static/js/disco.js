/** Clear onload, disco .screen needed **/
window.onload = function() {};

$(document).ready(function(){
    // Waiting . . .
    function waiting() {
        var delta = 225;
        var rdm;

        $('.dot').each(function (i) {
            var dot = $(this);

            setTimeout(function(){
                $(dot).animate({
                    'opacity': 1
                }, delta, function () {
                    $(dot).delay(delta).animate ({
                        'opacity' : 0
                    }, delta);
                });
            }, i * delta)
        });

        if(wait)
            setTimeout(function(){waiting();}, 5*delta)
    }

    if (wait)
        setTimeout(function(){waiting()}, 800);
});
