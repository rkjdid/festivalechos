var _gotit = false;

$(document).ready (function () {
    var scont = $('#sideImg');
    var simg = $(scont).find('img');

    drag(simg);

    $(scont).find('p').click(function () {
        gogo(simg);
    });
});

function gogo (simg) {
    if (_gotit) return;
    _gotit = true;

    var gabumeu= '<input placeholder="your@mail.com" class="freebie plus" id="freebie" type="text" name="mail" />';
    var zomeuga= '<input placeholder="Prénom & Nom" class="freebie plus" id="freebieNom" type="text" name="nom" />';

    var cred = $('#credits');

    $(cred).prepend(gabumeu);
    var inMail = $("input#freebie");

    $(cred).find('p').animate({
        'margin-left': '31%'
    });

    setTimeout(function() {$(inMail).focus().animate({
        'top': "3px"
    })}, 500);

    setTimeout(function() {drag(simg, true);}, 600);

    $(inMail).keypress(function(e) {
        $(this).removeClass('bad');
        if(e.which == '13')
            $(this).submit();
    });

    $(inMail).submit(function () {
        var m = getMail($(this).val());

        if (m == '') {
            $(this).addClass('bad');
            return;
        }

        $(cred).prepend(zomeuga);
        var inName = $("input#freebieNom");

        $(inMail).animate({
            'opacity': 0
        },200, "swing", function(){
            $(inMail).css({'display' : 'none'});
            $(inName).focus().animate({
                'top': "3px"
            });
        });

        $(inName).keypress(function(e) {
            if(e.which == '13') {
                $(this).submit();
            }
        });

        $(inName).submit(function() {
            if ($(this).val() == '')
                return;

            var out = "<p id='out' class='noop plus'></p>";

            $(cred).prepend(out);
            var outP = $('#out');

            jaxIt(this, outP, m, $(this).val());
        });

    });
}

function jaxIt (elem, label, m, n) {
    $.ajax({
        type:"GET",
        url:"/grandseigneur/",
        data: {
           'mail': m,
           'name': n
        },
        success: function(data){
            var msg = data.message;

            if (data.result == "added") {
                $(label).removeClass('fail').addClass('ok');
            } else if (data.result == "exists" || data.result == 'unknown') {
                $(label).removeClass('ok').addClass('fail');
            }

            // Display result
            $(label).empty().append(msg);
            $(elem).animate({'opacity':0}, 200, 'swing', function() {
                $(elem).css({'display':'none'});
                $(label).animate({'opacity': 1}, 200, 'swing', function () {$(this).removeClass('noop');});
            });

            reset();
        }
    });
}

function reset () {
    setTimeout(function () {
        $('.plus').animate({'left': '-250px'}, 200, 'swing', function () {
            $(this).animate({'left': '-1000px'}, 300, 'swing', function (){
                $(this).remove();
            });
        });
        $('#credits').find('p').not('.plus').animate({'margin-left': '0'}, 200);
    },2500);
}

function getMail(m){
    if (!valid(m)) {
        m = '';
    }

    return m;
}


function drag (elem, remove) {
    remove = typeof remove !== 'undefined' ? remove: false;


    if (remove){
      $(elem).draggable("destroy");
      $(elem).animate({'top': 0});
      return;
    }

    $(elem).draggable({
        axis: "y",
        revert: true,
        containment: '#dummy',

        drag: function(event, ui) {
            if (ui.position.top < -120) {
                $(this).draggable("option", "revert", false);
            }
            if(ui.position.top>0)
            {
            }
        },

        stop: function(event, ui) {
            if (ui.position.top < -120) {
                setTimeout(function() {
                    $(elem).draggable("option", "revert", true);
                    $(elem).animate({top: 0});
                }, 700);
            }
        }
    });
}

function valid(m) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(m);
}