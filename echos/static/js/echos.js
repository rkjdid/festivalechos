(function ($) {
  var width, height, mapw, maph, row1_extraw, menuh, zoom;
  var mapw_natural = 760;
  var ready = false, loaded = false;
  var handler;
  var textOffset = 0, textDelta = 15, stopOffset;
  var text = "";
  var lang = "fr";
  var current = "";
  var delay_default = 25;
  var $tx = "#text";

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
    $(".lang").find(".idash").css({
      "margin-top": 0.0248756218*maph,
      "margin-bottom": 0.0248756218 * maph,
      "margin-right": "auto",
      "margin-left": "auto"});

    // set horizontal paddings
    row1_extraw = $row1.width();
    $("#row1 img").each(function () {
      row1_extraw -= $(this).width();
    });
    var pad_unit = (row1_extraw-20) / 7;
    $row1.find("a").add($row1.find(".idash")).css({"margin-right": pad_unit})
      .last().css({"margin-right": 0});
    $row1.find(".i0").css({"margin-right": pad_unit * 3});
    $row0.find("a").css({"margin-right": pad_unit * 2.5})
      .last().css({"margin-right": 0});

    // set title position
    $("#title").css({
      width: 0.7* (width-mapw),
      left:  (132/1036)* (width - mapw),
      top:   (184/974) * (height)});

    textDelta = $("#text").height();
    textOffset = $("#content").height() - textDelta;
    $("#text").css({
      'top': textOffset
    });

    urlToPage();
    $(".item.echos").click(function() {
      pageHome();
    });
    $(".item.acces").click(function () {
      pageAcces();
    });
    $(".item.ferme").click(function () {
      pageFerme();
    });
    $(".item.infos").click(function () {
      pageInfos();
    });
    $(".item.prog").click(function () {
      pageProg();
    });
    $(".item.trompes").click(function () {
      pageTrompes();
    });
    $("#options").find("input").on("change", function(e) {
      delay_default = e.target.value;
      if (delay_default === "36") {
        printText("accuracy is key");
      } else if (delay_default < 10) {
        printText("oussavatrévite " + delay_default + "ms");
      } else {
        printText("newpitch: " + e.target.value + "ms");
      }
    });
  };

  var clear = function () {
    $("#submenu").empty();
    $("#encart").empty();
    $(".interactive").removeClass("on");
  };

  var addToMenu = function (title, uri) {
    var $e = $("<li class='interactive'>");
    if (uri !== undefined) {
      var $a = $("<a target='_blank' href='" + uri + "'>");
      $a.html(title);
      $e.append($a);
    } else {
      $e.html(title);
    }
    $("#submenu").append($e);
    return $e;
  };


  // ---------
  // text shit
  // ---------
  var stopText = function () {
    clearInterval(handler);
  };

  var printText = function(text, delay) {
    stopText();
    if (delay === undefined || typeof(delay) !== 'number') {
      delay = delay_default;
    }

    var i = 0;
    handler = setInterval(function() {
      printChar(text[i]);
      i++;
      if (i === text.length) {
        clearInterval(handler);
      }
    }, delay);
  };

  var printChar = function (c) {
    var $e = $($tx);
    var h_cache = $e.height();
    if (c === '\n') {
      $e.append("<br>");
      text = $e.html();
      resizeText(h_cache);
      return;
    }
    text += c;
    $e.html(text);
    resizeText(h_cache);
  };

  var resizeText = function (cache) {
    var $e = $($tx);
    if ($e.height() === cache) {
      return;
    }
    textOffset -= ($e.height() - cache);
    $e.css({
      'top': textOffset
    });
  };

  var urlToPage = function () {
    var uri = window.location.href;
    var uri_lang = uri.split('?');
    if (uri_lang.length > 1) {
      if (uri_lang[1] === "en") {
        lang = "en";
      } else if (uri_lang[1] === "fr") {
        lang = "fr";
      }
      setUri(uri_lang[0]);
    }
    uri = uri.split('/');
    var page = uri[uri.length - 1];

    switch(page) {
      case "acces":
        pageAcces();
        break;
      case "ferme":
        pageFerme();
        break;
      case "infos":
        pageInfos();
        break;
      case "programmation":
        pageProg();
        break;
      case "trompes":
        pageTrompes();
        break;
      case "tickets":
        pageTickets();
        break;
      default:
        pageHome();
        break;
    }
  };

  var setUri = function(uri) {
    window.history.pushState({
      "html": uri,
      "pageTitle": uri
    }, "", uri);
  };

  var pageHome = function() {
    clear();
    setUri("/");
    $("#title").addClass("on");

    var text;
    switch (lang) {
      case "en":
        text = "From July 2 evening to July 3 evening, Faï horns playing continuously. Faï horns playing continuously. One night and one day : Échos festival invites you to a 24h-long concert. You’ll be caught on saturday 5 p.m.  You’ll be set free on monday morning. YOUR ATTENTION PLEASE THIS YEAR PRE-SALE IS REQUIRED TO ACCESS THE FESTIVAL OMG.";
        break;
      default:
        text = "Du 2 juillet soir au 3 juillet soir, trompes du Faï ouvertes en continu. Trompes du Faï ouvertes en continu. Une nuit et un jour : le festival Échos vous invite à un concert longue durée. On vous attrape à 17h le samedi et on vous relâche le lundi matin. VOTRE ATTENTION S’IL VOUS PLAÎT CETTE ANNÉE L’ENTRÉE SE FAIT UNIQUEMENT SUR PRÉVENTE OLALALA.";
        break;
    }
    printText(text);
  };

  var pageAcces = function () {
    clear();
    setUri("/acces");
    $(".item.acces").addClass("on");

    var text;
    switch (lang) {
      case "en":
        text = "To access the festival location, depart from Le Saix village by foot.  To reach the village, the nearest train station is Veynes, 10Km away. Either walk or hitchhik to Le Saix.  If you come by car, please consider carpooling.  When approaching le Saix there is a parking. Well, park here. If you came from the south (Serres, Chabestan) the parking would be on your right, 400m before the village facing a lovely orchard ; if you came from Veynes, turn right just before entering the village - stick to the D49 road – and then again turn slightly on your right. After 300m the Parking you long for would be on your left, still facing the orchard.  Once you're parked from now on you have to go by foot. Yes, that's right, you must walk, no cars are allowed further down the road. A small bus will take care of your belongings and will carry them to Le Faï, at regular intervals. No passengers allowed in this bus, sorry. You just walk, we tell you.  So, you just go straight ahead. You pass the “LE SAIX” signboard, and then the “Ville fleurie” signboard and lo ! you've reach Le Saix village, which you will now cross (notice the road narrow from there), passing by a church on your right hand, and you still moving forward and now the road slightly goes down and then you will see a small bridge and the road goes up again and now you should not be worried for the way is marked you will be safe and shall not be lost.  And then after walking still in the same direction, still straight ahead you'll see the road turning gently (sometimes not so gently) as it enters the valley, and as you move down the road you will witness another signboard which reads : “Attention Route Non Revêtue” which means Beware! Bare Road. You will not beware that much and proceed on your way to the festival.  Now cross the bridge (after the bridge should stand a green mailbox on your right) and after that the road is not a road anymore but shape itself into a sentry as it goes deeper into the canyon – proceed and now you're surrounded by the cliffs and a small stream, its bubbling water should accompany you a bit on your left and now the road is steeper, after that there is two verry narrow turns on the road, and after these the road is steeper still. Maybe you are tired, maybe your legs hurt, probably you're sweating hard, but hey. Anyway after that you will see a turn on the road toward your left hand, well go there. The way is marked and everything will be fine. And now the slope is softening, the way rocky, and maybe you'll be intruduced with stranges animals made of wood but just keep on walking or half-crawling should you be bold enough to try the shortcuts that you may see, another sharp turn, and then 5 minutes more of walking.  And then...  Here you are. Well done, you should see us, waiting for you.";
        addToMenu("Google maps", "https://www.google.com/maps/d/viewer?mid=zKYLbscTxwkE.kziE4Um3htPA&usp=sharing");
        addToMenu("Carpooling forum", "http://echovoiturage.forumouf.com/f1-echos-2016-covoiturage");
        break;
      default:
        text = "L’accès au site se fait à pied à partir du village du Saix. Pour s’y rendre, on peut prendre le train jusqu’à Veynes, à 10km du site, puis on devra marcher ou faire du stop (tenue correcte exigée sur la voie publique). Pour les adeptes de la Twingo décapotable ou de la Golf VR 6, pensez au covoiturage !  En arrivant vers le Saix : d’abord tu te gares sur le parking de la salle des fêtes du Saix. Si tu viens du Sud (Serres, Chabestan) le parking est sur la droite 400m avant l’entrée du village, en face d’un verger. Si tu viens de Veynes, tu prends à droite juste avant d’arriver au village en restant sur la D49, puis encore légèrement à droite. Le parking est à 300m à gauche, en face d’un verger. Ensuite il faut IMPÉRATIVEMENT continuer à pied. Au parking, une navette passe régulièrement pour monter les bagages. Toi tu montes à pied. Tu prends tout droit, tu passes le panneau Le Saix, puis le panneau Ville fleurie, tu continues tout droit jusqu’au village, la route se resserre, tu traverses le village, tu passes l’église à ta droite, tu continues tout droit, ça redescend en sortant du village, t’inquiète pas c’est bien fléché, puis après un petit pont ça remonte, tu continues tout droit, la route remonte dans la vallée, la route prend quelques virages, tu continues jusqu’au panneau Attention route non revêtue, tu passes le pont, juste après le pont il y a une boîte aux lettres verte à droite, t’inquiète pas c’est bien fléché, la route devient une piste qui s’enfonce dans les gorges, tu passes entre les falaises avec un torrent sur la gauche, la route devient pentue, tu arrives à deux épingles serrées, puis c’est très raide, tu galères un peu, tu transpires jusqu’au prochain virage à gauche, t’inquiète pas c’est bien fléché, là la pente se radoucit, la piste devient caillouteuse, tu verras peut-être des sculptures d’animaux en branches de bois, tu continues sur la piste (il y a des raccourcis plus raides parfois, tu peux les prendre mais tu peux aussi continuer sur la piste), il y a encore une épingle, puis encore 5 minutes de marche et tu es arrivé, bravo, un stand d’accueil t’attend en haut.";
        addToMenu("Google maps", "https://www.google.com/maps/d/viewer?mid=zKYLbscTxwkE.kziE4Um3htPA&usp=sharing");
        addToMenu("Forum covoit", "http://echovoiturage.forumouf.com/f1-echos-2016-covoiturage");
        break;
    }
    $("#submenu").addClass("on");
    printText(text);
  };

  var pageInfos = function() {
    clear();
    setUri("/infos");
    $(".interactive").removeClass("on");
    $(".item.infos").addClass("on");

    var text;
    var encart;

    switch (lang) {
      case "en":
        text = "SLEEPING ? FOR REAL ? The valley is a huge and wild environment where you can freely set your camp (make sure to bring tents, sleeping bags and warm outfits). This freedom requires some kind of independence, we cannot guarantee access to showers for instance. However the river is just downhill, available for a welcoming fresh up with “green” soap. Ferme du Faï offers accommodation within the limits of available places. Booking only by phone at +33 492580707.\n" +
          "FOOD and DRINKS ? Feel free to bring your own rations. Apart from that, you will find food at eating hours and if you’re thirsty the bar will serve beer, wine and soft throughout the festival.";
        encart = "Credit cards are not accepted : the entrance and the rest are to be paid with cash only.<br />" +
          "The site is in the mountain : make sure to bring suitable clothes for cold and rainy weather as well as flashlights.<br />" +
          "The festival and Le Faï farm will close on monday at noon.";
        break;
      default:
        text = "QUOI DORMIR ? La vallée est un grand espace sauvage où vous pourrez installer votre campement librement (prévoir tentes, sacs de couchages et vêtements chauds). Cette liberté suppose une certaine autonomie : nous ne pouvons garantir l’accès aux douches. Un brin de toilette avec du savon bio dans la rivière remplacera aisément votre douche italienne. La Ferme du Faï propose des nuits en auberge dans la limite des places disponibles. Réservation obligatoire au 0492580707.\n" +
          "OÙ MANGER ? Chacun-e est libre d’amener ses propres vivres. Nous vous proposerons à manger aux horaires de repas et le bar servira de la bière, du vin, des softs et du café pendant toute la durée du festival.";
        encart = "Pas de carte bleue sur place : prévoyez du liquide pour l’entrée et tout le reste.<br />" +
          "C'est la montagne : prenez des vêtements chauds et de pluie et des lampes-torches.<br />" +
          "À partir du lundi 12 heures, le festival et la Ferme du Faï fermeront leurs portes.";
        break;
    }
    $("#encart").append(encart).addClass("on");
    printText(text);
  };

  var pageFerme = function() {

  };

  var pageTrompes = function() {

  };
  var pageProg = function () {

  };
  var pageTickets = function () {

  };
  // static pdf
  var pageDome = function () {

  };
  // url facebook
  // url 2013/2014/2015

})(jQuery);
