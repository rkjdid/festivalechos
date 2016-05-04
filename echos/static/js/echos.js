(function ($) {
  var width, height, mapw, maph, row1_extraw, menuh, zoom;
  var mapw_natural = 760;
  var ready = false, loaded = false;
  var handler;
  var textOffset = 0, textDelta = 15, stopOffset;
  var text = "";
  var lang = "fr";
  var current = "home"; //todo
  var delay_default = 30;
  var $tx = "#text";

  // DOM ready
  $(function() {
    ready = true;
  });

  // onload
  $(window).on("load", function() {
    refresh();
    loaded = true;
    setTimeout(function() {
      var $c = $("#curtain");
      $c.find(".loading").addClass("out")
        .delay(300)
        .animate({left: "110%"}, 750, function() {
          $("#curtain").hide();
          $("body").removeClass("loading");
        });
    }, 500);
  });

  // onresize
  $(window).on("resize", function() {
    if (loaded) {
      refresh();
    }
  });

  // get viewport size
  var getSize = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    if (width === 0) {
      width = $(window).width();
    }
    if (height === 0) {
      height = $(window).height();
    }
  };

  var refresh = function() {
    getSize();
    // copyright height: 2.5%
    // map height: 82%
    // menu height: 15.5%

    maph = height*0.82;
    mapw = 0.9452736318 * maph;
    zoom = mapw / mapw_natural;

    $("body").width(width).height(height);
    $("#imap").height(maph).width(mapw);
    $("#map").height(maph).width(mapw);
    $("#content").width(width-mapw);
    $("#menu").width(mapw);

    // set title position
    //$("#title").css({
    //  width: 0.7* (width-mapw),
    //  left:  (132/1036)* (width - mapw),
    //  top:   (184/974) * (height)});

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
    $(".book").click(function () {
      pageTickets();
    });
    $(".dome").click(function () {
      pageDome();
    });
    $("#lang_en").click(function() {
      if ("en" === lang) {
        return;
      }
      lang = "en";
      createCookie("lang", lang, 120);
      refresh();
    });
    $("#lang_fr").click(function () {
      if ("fr" === lang) {
        return;
      }
      lang = "fr";
      createCookie("lang", lang, 120);
      refresh();
    });

    // debug pitch
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

  var setLang = function(lng) {
    switch (lng) {
      case "en":
        lang = "en";
        $(".fr").removeClass("active");
        $(".en").addClass("active");
        break;
      default:
        lang = "fr";
        $(".en").removeClass("active");
        $(".fr").addClass("active");
        break;
    }
  };

  var clear = function () {
    $("#submenu").empty();
    $("#encart").empty();
    $("ul.links").empty();
    $(".interactive").removeClass("on");
    clearInterval(diapoFerme);
  };

  var addToMenu = function (title, uri, onclick, css) {
    var $e = $("<li class='interactive'>");
    var $a;
    if (uri !== undefined) {
      if (onclick !== undefined) {
        $a = $("<a>");
        $a.click(function () {
          setUri(uri);
          urlToPage();
        });
      } else {
        $a = $("<a target='_blank' href='" + uri + "'>");
      }
      $a.html(title);
      $e.append($a);
    } else {
      $e.addClass("fix");
      $e.html(title);
    }
    if (css !== undefined) {
      $e.addClass(css);
    }
    $("#submenu").append($e);
    return $e;
  };

  var addProgLink = function (title, uri) {
    var $e = $("<li>");
    var $a = $("<a target='_blank' href='" + uri + "'>");
    $a.html(title);
    $a.attr('title', uri);
    $e.append($a);
    $("ul.links").append($e);
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

  // ---------------
  // navigation shit
  // ---------------
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
      uri = window.location.href;
      createCookie("lang", lang, 120);
    } else {
      lang = readCookie("lang");
    }
    setLang(lang);
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
      case "dome":
        pageDome();
        break;
      case "DuoAsisVazquez":
        pageProgDAV();
        break;
      case "BearBonesLayLow":
        pageProgBBLL();
        break;
      case "ThomasTilly":
        pageProgTT();
        break;
      case "JoaquimBrissaud":
        pageProgJB();
        break;
      case "JeanBender":
        pageProgJBender();
        break;
      case "PiotrKurek":
        pageProgPK();
        break;
      case "Homnimal":
        pageProgH();
        break;
      case "DuoMaurelDesailly":
        pageProgDMD();
        break;
      case "PomBouvierB":
        pageProgPBB();
        break;
      case "GolemMecanique":
        pageProgGM();
        break;
      case "Sourdure":
        pageProgS();
        break;
      case "StephenOMalley":
        pageProgSOM();
        break;
      default:
        pageHome();
        break;
    }
  };

  var setUri = function(uri) {
    window.history.replaceState({
      "html": uri,
      "pageTitle": uri
    }, "", uri);
  };

  var pageHome = function() {
    clear();
    setUri("/");
    var $title;
    var text;

    switch (lang) {
      case "en":
        text = "From July 2 evening to July 3 evening, Faï horns playing continuously. Faï horns playing continuously. One night and one day : Échos festival invites you to a 24h-long concert. You’ll be caught on saturday 5 p.m.  You’ll be set free on monday morning. YOUR ATTENTION PLEASE THIS YEAR PRE-SALE IS REQUIRED TO ACCESS THE FESTIVAL OMG.";
        $title = $(".title.en");
        break;
      default:
        text = "Du 2 juillet soir au 3 juillet soir, trompes du Faï ouvertes en continu. Trompes du Faï ouvertes en continu. Une nuit et un jour : le festival Échos vous invite à un concert longue durée. On vous attrape à 17h le samedi et on vous relâche le lundi matin. VOTRE ATTENTION S’IL VOUS PLAÎT CETTE ANNÉE L’ENTRÉE SE FAIT UNIQUEMENT SUR PRÉVENTE OLALALA.";
        $title = $(".title.fr");
        break;
    }
    $title.addClass("on");
    printText(text);
  };

  var pageAcces = function () {
    clear();
    setUri("/acces");
    $(".item.acces").addClass("on");
    $("#content .acces").addClass("on");

    var text;
    switch (lang) {
      case "en":
        text = "To access the festival location, depart from Le Saix village by foot.  To reach the village, the nearest train station is Veynes, 10Km away. Either walk or hitchhik to Le Saix.  If you come by car, please consider carpooling.  When approaching le Saix there is a parking. Well, park here. If you came from the south (Serres, Chabestan) the parking would be on your right, 400m before the village facing a lovely orchard ; if you came from Veynes, turn right just before entering the village - stick to the D49 road – and then again turn slightly on your right. After 300m the Parking you long for would be on your left, still facing the orchard.  Once you're parked from now on you have to go by foot. Yes, that's right, you must walk, no cars are allowed further down the road. A small bus will take care of your belongings and will carry them to Le Faï, at regular intervals. No passengers allowed in this bus, sorry. You just walk, we tell you.  So, you just go straight ahead. You pass the “LE SAIX” signboard, and then the “Ville fleurie” signboard and lo ! you've reach Le Saix village, which you will now cross (notice the road narrow from there), passing by a church on your right hand, and you still moving forward and now the road slightly goes down and then you will see a small bridge and the road goes up again and now you should not be worried for the way is marked you will be safe and shall not be lost.  And then after walking still in the same direction, still straight ahead you'll see the road turning gently (sometimes not so gently) as it enters the valley, and as you move down the road you will witness another signboard which reads : “Attention Route Non Revêtue” which means Beware! Bare Road. You will not beware that much and proceed on your way to the festival.  Now cross the bridge (after the bridge should stand a green mailbox on your right) and after that the road is not a road anymore but shape itself into a sentry as it goes deeper into the canyon – proceed and now you're surrounded by the cliffs and a small stream, its bubbling water should accompany you a bit on your left and now the road is steeper, after that there is two verry narrow turns on the road, and after these the road is steeper still. Maybe you are tired, maybe your legs hurt, probably you're sweating hard, but hey. Anyway after that you will see a turn on the road toward your left hand, well go there. The way is marked and everything will be fine. And now the slope is softening, the way rocky, and maybe you'll be intruduced with stranges animals made of wood but just keep on walking or half-crawling should you be bold enough to try the shortcuts that you may see, another sharp turn, and then 5 minutes more of walking.  And then...  Here you are. Well done, you should see us, waiting for you. ";
        addToMenu("Google maps", "https://www.google.com/maps/d/viewer?mid=zKYLbscTxwkE.kziE4Um3htPA&usp=sharing");
        addToMenu("Carpooling forum", "http://echovoiturage.forumouf.com/f1-echos-2016-covoiturage");
        break;
      default:
        text = "L’accès au site se fait à pied à partir du village du Saix. Pour s’y rendre, on peut prendre le train jusqu’à Veynes, à 10km du site, puis on devra marcher ou faire du stop (tenue correcte exigée sur la voie publique). Pour les adeptes de la Twingo décapotable ou de la Golf VR 6, pensez au covoiturage !  En arrivant vers le Saix : d’abord tu te gares sur le parking de la salle des fêtes du Saix. Si tu viens du Sud (Serres, Chabestan) le parking est sur la droite 400m avant l’entrée du village, en face d’un verger. Si tu viens de Veynes, tu prends à droite juste avant d’arriver au village en restant sur la D49, puis encore légèrement à droite. Le parking est à 300m à gauche, en face d’un verger. Ensuite il faut IMPÉRATIVEMENT continuer à pied. Au parking, une navette passe régulièrement pour monter les bagages. Toi tu montes à pied. Tu prends tout droit, tu passes le panneau Le Saix, puis le panneau Ville fleurie, tu continues tout droit jusqu’au village, la route se resserre, tu traverses le village, tu passes l’église à ta droite, tu continues tout droit, ça redescend en sortant du village, t’inquiète pas c’est bien fléché, puis après un petit pont ça remonte, tu continues tout droit, la route remonte dans la vallée, la route prend quelques virages, tu continues jusqu’au panneau Attention route non revêtue, tu passes le pont, juste après le pont il y a une boîte aux lettres verte à droite, t’inquiète pas c’est bien fléché, la route devient une piste qui s’enfonce dans les gorges, tu passes entre les falaises avec un torrent sur la gauche, la route devient pentue, tu arrives à deux épingles serrées, puis c’est très raide, tu galères un peu, tu transpires jusqu’au prochain virage à gauche, t’inquiète pas c’est bien fléché, là la pente se radoucit, la piste devient caillouteuse, tu verras peut-être des sculptures d’animaux en branches de bois, tu continues sur la piste (il y a des raccourcis plus raides parfois, tu peux les prendre mais tu peux aussi continuer sur la piste), il y a encore une épingle, puis encore 5 minutes de marche et tu es arrivé, bravo, un stand d’accueil t’attend en haut. ";
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
    $(".item.infos").addClass("on");

    var text;
    var encart;

    switch (lang) {
      case "en":
        text = "SLEEPING ? FOR REAL ? The valley is a huge and wild environment where you can freely set your camp (make sure to bring tents, sleeping bags and warm outfits). This freedom requires some kind of independence, we cannot guarantee access to showers for instance. However the river is just downhill, available for a welcoming fresh up with “green” soap. Ferme du Faï offers accommodation within the limits of available places. Booking only by phone at +33 492580707. " +
          "FOOD and DRINKS ? Feel free to bring your own rations. Apart from that, you will find food at eating hours and if you’re thirsty the bar will serve beer, wine and soft throughout the festival. ";
        encart = "Credit cards are not accepted : the entrance and the rest are to be paid with cash only.<br />" +
          "The site is in the mountain : make sure to bring suitable clothes for cold and rainy weather as well as flashlights.<br />" +
          "The festival and Le Faï farm will close on monday at noon. ";
        break;
      default:
        text = "QUOI DORMIR ? La vallée est un grand espace sauvage où vous pourrez installer votre campement librement (prévoir tentes, sacs de couchages et vêtements chauds). Cette liberté suppose une certaine autonomie : nous ne pouvons garantir l’accès aux douches. Un brin de toilette avec du savon bio dans la rivière remplacera aisément votre douche italienne. La Ferme du Faï propose des nuits en auberge dans la limite des places disponibles. Réservation obligatoire au 0492580707. " +
          "OÙ MANGER ? Chacun-e est libre d’amener ses propres vivres. Nous vous proposerons à manger aux horaires de repas et le bar servira de la bière, du vin, des softs et du café pendant toute la durée du festival. ";
        encart = "Pas de carte bleue sur place : prévoyez du liquide pour l’entrée et tout le reste.<br />" +
          "C'est la montagne : prenez des vêtements chauds et de pluie et des lampes-torches.<br />" +
          "À partir du lundi 12 heures, le festival et la Ferme du Faï fermeront leurs portes. ";
        break;
    }
    $("#encart").append(encart).addClass("on");
    printText(text);
  };

  var diapoFerme = 0;
  var pageFerme = function() {
    clear();
    setUri("/ferme");
    $(".ferme").addClass("on");
    $(".ferme .i0").addClass("on");
    var current = 0;
    diapoFerme = setInterval(function() {
      $(".ferme .i" + current).removeClass("on");
      if (current == 4)
        current = 0;
      else
        current++;
      $(".ferme .i" + current).addClass("on");
    }, 7000);

    var text;
    switch (lang) {
      case "en":
        text = "Échos takes place at the Ferme du Faï, which is also home for the association Villages des Jeunes. It is an alternative and dynamic hosting place, ponctuated with workshops at the initiative of young volunteers and people currently  in rehabilitation, and aiming at renovating the local patrimony. All year long, there are several cultural events happening at the Faï ; we are very grateful to be hosted in this unique place for a whole week of residency and the two days festival ! It’s a completely open site, at over 1000 meters of altitude : it offers large listening opportunities that you’re invited to test freely. ";
        break;
      default:
        text = "Échos se déroule autour de la ferme-gîte du Faï, où réside l’association Villages des Jeunes. C’est un lieu d’accueil alternatif et dynamique, rythmé par les chantiers de jeunes volontaires internationaux et les chantiers d’insertion, qui entretiennent et rénovent le patrimoine local. Comme pour d’autres évènements culturels, le Faï nous accueille pendant la semaine de résidence et le week-end du festival, et nous les en remercions ! À plus de 1000 mètres d’altitude, le site est totalement ouvert : il offre de multiples situations d’écoute que vous pourrez tester librement. ";
        break;
    }
    addToMenu("Village des Jeunes", "http://www.villagesdesjeunes.org/");
    addToMenu("Le Saix", "http://www.le-saix-village.fr/");
    $("#submenu").addClass("on");
    printText(text);
  };

  var pageTrompes = function() {
    clear();
    setUri("/trompes");
    $(".item.trompes").addClass("on");
    $(".trompe3d").addClass("on");

    var text;
    switch (lang) {
      case "en":
        text = "Échos means : You don't listen to live shows. You don't attend concerts. But the echoes of these. Three giants horns as speakers facing a cliff spreading the sound across the valley. Through the peculiar topography and the settings of the horns the perception of the echoes is ever-changing. For this event the artists are granted a week-long residency in order to imagine improvisations that are specific to the place : the tone of the horns as the echo ask for something unique spacewise, soundwise, storywise. History. 1994 : based on designs by Michel Stievenart, a fellowship of acousticians set the medium & treble horns (wooden, red) on a mobile platform, thus allowing to change their orientation.1997 : a truly gigantic horn (steel, concrete) designed for low frequency and created by Jacques Châtaignier is installed with the help of the association “Village des Jeunes”. Tech : Mid & High horns : orientation through hydrolic device / Dim. mid horn : length. 4m, opening 2,4m x 2,4m, 4 speakers / Dim. High horn : length. 4m, opening 1,2m x 1,2m, 4 speakers / Amplification : 2 linear 2-channel amps, 2 power amp 2 x 1250 W / Frequency range : mid horn 180-800 Hz, high horn 800-15000 Hz (a bit less as a matter of fact) // Dim. Low horn : Ø 7,5m, length. 12m, weight 12 tons, 12 38cms-speakers / Amplification : from 1 to 4 amplifiers, max. power 9600 W / frequency range : 16-180 Hz. ";
        break;
      default:
        text = "Échos, ça signifie qu’à Échos on n’écoute pas des concerts, mais des échos de concerts. Trois trompes géantes (basse, médium, aiguë) servent de haut-parleurs. En face, une falaise concave répercute le son dans la vallée. Grâce à la topographie et à la disposition des trompes, on perçoit différemment l’écho : amplitude, réverbération… Pour le festival, les musiciens disposent d’une semaine de résidence pour construire des improvisations spécifiques au lieu : le timbre des trompes et l’écho du site invitent à une autre narration, une autre spatialisation du son. Histoire. 1994 : après plusieurs tests et selon les plans de Michel Stievenart, un groupe d’acousticiens installe les trompes médium et aiguë (bois, rouge) sur un support mobile, permettant de modifier la direction du son. 1997 : le système est complété par une gigantesque trompe basse (acier, béton voilé) créée par Jacques Châtaignier, et montée avec les bénévoles de Villages de Jeunes. Technique. Trompes médium et aiguë : orientation à l’aide d’une commande hydraulique / Dim. trompe médium : long. 4m, grand pavillon 2,4m x 2,4m, 4 HP / Dim. trompe aiguë : long. 4m, grand pavillon 1,2m x 1,2m, 4 HP / Amplification : 2 amplificateurs bicanaux de type linéaire, 2 voix de puissance 2 x 1250 W / Fréquences couvertes : trompe médium 180-800 Hz, trompe aiguë 800-15000 Hz (mais en vrai un peu moins) // Dim. trompe basse : Ø à l’embouchure 7,5m, long. 12m, Poids 12 tonnes, 12 HP de 38cm / Amplification : de 1 à 4 amplificateurs, puissance totale admissible 9600 W / Fréquences couvertes : 16-180 Hz. ";
        break;
    }
    printText(text);
  };

  var commonProg = function() {
    clear();
    $(".item.prog").addClass("on");
    addToMenu("Duo de Asís - Vazquez", "/DuoAsisVazquez", true, "iDDAV");
    addToMenu("Bear Bones, Lay Low", "/BearBonesLayLow", true, "iBBLL");
    addToMenu("Golem Mécanique", "/GolemMecanique", true, "iGM");
    addToMenu("Homnimal", "/Homnimal", true, "iH");
    addToMenu("Jean Bender", "/JeanBender", true, "iJBender");
    addToMenu("Joaquim Brissaud", "/JoaquimBrissaud", true, "iJB");
    addToMenu("Duo Maurel - Desailly", "/DuoMaurelDesailly", true, "iDMD");
    addToMenu("Piotr Kurek", "/PiotrKurek", true, "iPK");
    addToMenu("Pôm Bouvier B", "/PomBouvierB", true, "iPBB");
    addToMenu("Sourdure", "/Sourdure", true, "iS");
    addToMenu("Stephen O'Malley", "/StephenOMalley", true, "iSOM");
    addToMenu("Thomas Tilly", "/ThomasTilly", true, "iTT");
    $("#submenu").addClass("on");
  };

  var pageProg = function () {
    setUri("/programmation");
    commonProg();

    var text;
    switch (lang) {
      case "en":
        text = "Gates open Saturday 2nd july 5pm. Gigs start 9pm. Gigs ends Sunday 3rd july at night. Gates close Monday 4th july 12am. The horns are continually roaring. Between every concert, a mantra, semi-repetitive patterns feinting a punctual recurrence of the same instant. ";
        break;
      default:
        text = "Ouverture des portes samedi 2 juillet 17h. Début des concerts 21h. Fin des concerts dimanche 3 juillet au soir. Fermeture des portes lundi 4 juillet 12h. Les trompes sonnent en continu. Entre les concerts, un mantra, des motifs mi-répétitifs qui feintent un retour ponctuel du même instant. ";
        break;
    }
    printText(text);
  };

  var pageProgDMD = function() {
    setUri("/DuoMaurelDesailly");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iDMD").addClass("on");
    addProgLink("cargocollective.com", "http://cargocollective.com/juliendesailly/Duo-Desailly-Maurel");
    addProgLink("violonaroue.fr", "http://violonaroue.fr/");

    var text;
    switch (lang) {
      case "en":
        text = "DUO MAUREL DESAILLY - Uilleann pipes, motorized hurdy-gurdy, bodhran... These instruments produce unusual and peculiar-sounding drones which complete and merge. This duet also plays with microtonality; the different pitches slightly vary over time thus creating new dynamics. From harmonic frictions rise rhythm, loops are created, in the fashion of american minimalism. And so, rhythm and melody live and die in the drone. ";
        break;
      default:
        text = "DUO MAUREL DESAILLY - Cornemuse irlandaise, harmonium, vielles à roue motorisées, bodhran… Des instruments à bourdons, aux timbres très typés et inhabituels, qui se complètent, et parfois se confondent. Ce duo opère aussi dans le domaine de la microtonalité : les intervalles de hauteurs varient légèrement et peuvent ainsi faire basculer les dynamiques musicales. Des battements harmoniques naissent une rythmique, des boucles s’installent, faisant penser aux musiques répétitives américaines. Ainsi, tant la mélodie, tant le rythme, naissent et meurent dans le son continu. ";
        break;
    }
    printText(text);
  };

  var pageProgPBB = function () {
    setUri("/PomBouvierB");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iPBB").addClass("on");
    addProgLink("pombouvierb.blogspot.com", "http://pombouvierb.blogspot.com");
    addProgLink("soundcloud.com", "https://soundcloud.com/pom2b");

    var text;
    switch (lang) {
      case "en":
        text = "PÔM BOUVIER B - Les Mondes : Accumulation - cycles - stretching process - matter displayed in sonic layers - improvisation upon loupspeakers vibrations - feedback - motion - errand. Matching the sonic material with the place. Working with the spreading of sound into the open space. Working with the mark the gesture leaves in the landscape. ";
        break;
      default:
        text = "PÔM BOUVIER B - Les Mondes : Travail d'accumulation, de cycles longs. Processus d'étirement et de glissements de la matière dans un déploiement des plans sonores. Improvisation sur des processus qui vont du fragmentaire, du rebond, de la vibration issue de la membrane du haut-parleur en feedback pour déployer dans le frotté des cordes, un geste comme un souffle, une course. Pour le festival Échos, elle aimerait travailler l'idée de la projection et du déploiement dans la profondeur ici réelle. Adapter la matière sonore à celle du paysage, travailler la trace, la trace du geste dans le paysage. Pôm Bouvier B. explore depuis de nombreuses années divers champs de la scène artistique. Sa pratique, bien que centrée sur la musique depuis dix ans se nourrit des arts plastiques, du cinéma, de la littérature, des sciences, de la philosophie. Elle compose des pièces de musique électro-acoustique, y mêlant parfois des instrumentistes ou la lumière au même titre. Son travail sur l'improvisation en musique expérimentale est une recherche vibratoire et corporelle. La musique est ici un moyen pour créer des espaces perceptifs où le sujet serait en chaque auditeur. Ses collaborations sont nombreuses et sont des recherches partagées sur le Temps et l'Espace. ";
        break;
    }
    printText(text);
  };

  var pageProgJB = function () {
    setUri("/JoaquimBrissaud");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iJB").addClass("on");
    addProgLink("joaquimbrissaud.com", "http://joaquimbrissaud.com/");

    var text;
    switch (lang) {
      case "en":
        text = "Resonant Valley by Joaquim Brissaud: Ambiance, recorded sounds, acoustic feedback system, temporal loops. ";
        break;
      default:
        text = "Resonant Valley par Joaquim Brissaud : Ambiance, sons enregistrés, système de feedback acoustique, boucles temporelles. ";
        break;
    }
    printText(text);
  };

  var pageProgDAV = function () {
    setUri("/DuoAsisVazquez");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iDDAV").addClass("on");
    addProgLink("lauralisavazquez.com", "http://www.lauralisavazquez.com/");
    addProgLink("claradeasis.com", "http://claradeasis.com/");

    var text;
    switch (lang) {
      case "en":
        text = "DUO DE ASIS VAZQUEZ - Words on prepared guitar, sound poetry. Clara de Asìs is an electroacoustic composer and experimental guitar player. Through improvisation on prepared guitar she sets up listening and sonic-generating processes, allowing her to develop experimentations around gesture, material, variations, unperdictabilty. Laura Vazquez, a poet from Marseille, writes, gives performance-readings, and runs the journal “Muscle”. ";
        break;
      default:
        text = "DUO DE ASIS VAZQUEZ - Mots sur guitare préparée, poésie sonore. Clara de Asís est compositrice de musique électroacoustique et guitariste expérimentale. Née en 1988 en Espagne, elle vit à Marseille depuis 2012. En improvisation, à travers l’utilisation de la guitare préparée, elle met en œuvre des processus d’écoute et de génération sonore qui lui permettent de développer une expérimentation directe du geste et du matériau, des variations, des accidents. Elle accorde un soin tout particulier à l’écoute et à la mise en espace des sonorités de son instrument, ce qui lui permet de maintenir une épure dans la forme et une cohésion dans l’exploitation des matières. De manière concrète, elle fait émerger les divers timbres que lui offre l’instrument en utilisant différents objets et matériaux, qui sont tout autant instruments à disposition dans l’acte performatif. Laura Vazquez, poète marseillaise, écrit, donne des lectures performées et anime la revue Muscle. ";
        break;
    }
    printText(text);
  };

  var pageProgBBLL = function () {
    setUri("/BearBonesLayLow");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iBBLL").addClass("on");
    addProgLink("bearboneslaylow.wordpress.com", "https://bearboneslaylow.wordpress.com");
    addProgLink("soundcloud.com", "https://soundcloud.com/bearboneslaylow");

    var text;
    switch (lang) {
      case "en":
        text = "BEAR BONES, LAY LOW - Hailing from Venezuela and based in Belgium since 2003, Bear Bones, Lay Low is the moniker Ernesto González uses to explore shifting psychedelic moods in electronic sound. Active since a teenager in the Belgian noise underground, González’s music has evolved from spontaneous bedroom noise/drone jams to colorful synthesizer tunes where library-esque vibes meet entrancing rhythms, dubby use of effects and plenty of freak outs. He has also been part of psychedelic jam band Silvester Anfang / Sylvester Anfang II since 2006 and is involved in numerous projects including Tav Exotic, a beat driven electronic duo with fellow synth tripper Weird Dust. Having released music in various formats and labels such as Sloow Tapes, Troglosound, Full Of Nothing and KRAAK, Bear Bones, Lay Low takes you on an energetic trip through the most warped zones of the cartoon world hidden in your mind! ";
        break;
      default:
        text = "BEAR BONES, LAY LOW - Originaire du Venezuela et installé en Belgique depuis 2003, Bear Bones, Lay Low est le pseudonyme qu’utilise Ernesto Gonzàlez pour travailler sur les ambiances psyché en musique électronique. Actif depuis l’adolescence dans l’underground belge, Gonzàlez est passé d’impros noise home-made à des morceaux bigarés au synthétiseur, morceaux pleins de rythmes endiablés, d’abus de pédales d’effets et d’heureux accidents. À partir de 2006 il joue dans les groupes psychédéliques Silvester Anfang / Sylvester Anfang II, et participe à de nombreux autres projets dont Tav Exotic, un duo de musique électronique avec son camarade Weird Dust. ";
        break;
    }
    printText(text);
  };
  var pageProgGM = function () {
    setUri("/GolemMecanique");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iGM").addClass("on");
    addProgLink("golemecanik.tumblr.com", "http://golemecanik.tumblr.com/");
    addProgLink("golemecanique.bandcamp.com", "http://golemecanique.bandcamp.com/");

    var text;
    switch (lang) {
      case "en":
        text = "GOLEM MÉCANIQUE will work around Dante (Chant IV), will make use of the landscape, the cliff, the horns, the acoustic setting to recreate the trip of Virgil and Dante. Mixing recorded voices on tapes, electro-accoustic devices, and the live use of his voice, this work constantly evolves depending on where it’s performed. The morphing of voice and sound is at the core of the Golem Mécanique project; what is given to hear comes from his personnal synthesis of various myths, recordings, natural sounds, feedback, fragmented voice, electroacoustic devices or string instruments. Recently this project focuses on a more minimalist setting as to prompt the playing to be precise, the voice essential, the sound a celebration of mystical beliefs. ";
        break;
      default:
        text = "GOLEM MÉCANIQUE - La manipulation du son et de la voix est au coeur du projet Golem Mécanique. Les propositions sonores puisent leurs formes dans la synthèse personnelle de différents mythes et paysages intimes, enregistrements manipulés, sons concrets, larsens, voix chantée et fragmentée, dispositifs électro-acoustique étudiés, instruments de lutherie. Oscillant entre poésie sonore et pièces monolithes issues d’un empilement de sons, le projet se consacre depuis peu sur des dispositifs épurés pour inciter le geste à être précis, la voix primordiale, le son exaltation d’une mystique invisible. Pour Échos, elle proposera un travail récent autour de Dante : Chant IV. Se servir du paysage, de la roche, du dispositif  sonore et des trompes afin de recréer la déambulation de Virgile et Dante. Mêlant voix enregistrée sur bandes et cassettes et voix/chant live et dispositif électro-acoustique, c'est un travail qu’elle amorcé depuis peu et qu’elle ne cesse de faire évoluer selon l'endroit et l'espace, en se réappropriant une topographie pour en redessiner les dimensions symboliques. ";
        break;
    }
    printText(text);
  };
  var pageProgTT = function () {
    setUri("/ThomasTilly");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iTT").addClass("on");
    addProgLink("thomas.tilly.free.fr", "http://thomas.tilly.free.fr/tohome.html");
    addProgLink("thomastilly.bandcamp.com", "https://thomastilly.bandcamp.com/");

    var text;
    switch (lang) {
      case "en":
        text = "THOMAS TILLY uses mainly microphone and loudspeaker as instruments. His work is focused on the study — musical or scientific — of sonic environment. The act of listening prevails over all forms and kinds of representation, the research on the sound over the aesthetics; the displaying of the sonic wave is the key. The commitment on the physical field is a crucial part of this process which involves different stages : listening, observation, and then recording; from this perspective, the relationship to space, architecture, urbanism becomes essential, and it often goes beyond the mere recording of sounds. ";
        break;
      default:
        text = "THOMAS TILLY est un musicien utilisant le microphone et le haut- parleur comme principaux instruments de création. Centré sur l’étude de l’environnement sonore et sa confrontation avec l’espace dans lequel il existe, son travail emprunte autant à la recherche musicale expérimentale que scientifique. Dans sa démarche, l’écoute reste centrale au détriment de toutes formes de représentations. Ce qui se passe sur le terrain doit être interprété puis transmis à l’auditeur dans des conditions d’immersion totale, la subjectivité de cette restitution résidant dans le sensible plutôt que dans une mise en oeuvre technique complexe. Toujours connectées à l’idée d’un autre «possible musical», ses pièces sonores, diffusions, ou installations, sont les fruits d’études où la recherche tente de supplanter l’esthétique. C’est l’exposition de l’onde sonore qui est importante. L’implication sur le terrain reste une part importante du processus nécessitant des phases d’écoute, d’observation, puis d’enregistrement. En ce sens, la relation aux espaces naturels, à l’architecture (dont le rôle est prédominant dans le sonore), ou encore à l’urbanisme, deviennent des axes de recherches privilégiés et leur appréhension dépasse souvent la seule pratique de l’enregistrement du son. Chez Thomas Tilly, la rapport entre nature et technologie, primitivité et modernité reste un angle d’approche privilégié, souvent abordé par le traitement des modes de communication. La nécessité d’écouter et d’observer le lieu comme postulat à toute création, est nourrie par l’idée que l’environnement sonore est infiniment complexe et que son appréhension par le public ne peut se faire dans un rapport superficiel. Dans les travaux de Thomas Tilly, tout les outils de captation du son sont utilisés comme des moyens d’écriture, des révélateurs. Captations ultrasoniques, sismiques, hydrophoniques ou aériennes, la méthode employée n’est jamais prétexte au spectaculaire, mais le vecteur d’une appréhension singulière du monde. LE FIELD RECORDING POUR Thomas Tilly : Il ne s'agit pas que de capter le son, mais de placer le microphone au même rang que l'instrument de musique et d'envisager la situation de cet instrument dans l'espace comme une méthode de composition, il s'agit de détourner son rôle d'outil de communication pour appréhender l'onde sonore autrement. S'attaquer à un immatériel croisant tout ce qui constitue et conditionne le matériel, s'attacher à parler et user du bruit comme quelque chose de précieux et unique, et confronter ce bruit à ce que l'on appelle musique. ";
        break;
    }
    printText(text);
  };
  var pageProgS = function () {
    setUri("/Sourdure");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iS").addClass("on");
    addProgLink("ernestbergez.com", "http://www.ernestbergez.com/");
    addProgLink("sourdure.bandcamp.com", "https://sourdure.bandcamp.com/");

    var text;
    switch (lang) {
      case "en":
        text = "SOURDURE = Ernest Bergez = one half of Kaumwald. Ernest Bergez plays a kind of electronic live music combinig the manners of musique concrète with the techniques of jamaican dub and the onslaughts of noise music. The raw electronic tones play alongside sound from the everyday, songs unborn or music not composed, as to link music to daily life. The recorded sounds act as a distorting mirror, a gate to the complexity of human emotions. ";
        break;
      default:
        text = "SOURDURE = Ernest Bergez = moitié de Kaumwald. Ernest Bergez pratique une forme bricolée et spontanée de live électronique qui combine les manipulations de la musique concrète avec les techniques du dub jamaïcain et les assauts de la noise music. Les sonorités brutes de l’électronique côtoient des sons collectés au quotidien : motifs rustiques de violon, ébauches de chansonnettes, conversations chapardées à la volée, fragments de musiques anonymes. Derrière cette pratique en conglomérat, il y a le vœu de rapprocher le musical de la vie et d’ancrer l’écriture dans le vécu immédiat. La présence fantomatique et surréelle des sons « fixés » est utilisée comme un miroir, mais un miroir déformant et hasardeux qui ouvre un espace potentiel à la complexité des émotions humaines. SOURDURE = Ernest Bergez = moitié de Kaumwald. Ernest Bergez pratique une forme bricolée et spontanée de live électronique qui combine les manipulations de la musique concrète avec les techniques du dub jamaïcain et les assauts de la noise music. Les sonorités brutes de l’électronique côtoient des sons collectés au quotidien : motifs rustiques de violon, ébauches de chansonnettes, conversations chapardées à la volée, fragments de musiques anonymes. Derrière cette pratique en conglomérat, il y a le vœu de rapprocher le musical de la vie et d’ancrer l’écriture dans le vécu immédiat. La présence fantomatique et surréelle des sons « fixés » est utilisée comme un miroir, mais un miroir déformant et hasardeux qui ouvre un espace potentiel à la complexité des émotions humaines. ";
        break;
    }
    printText(text);
  };
  var pageProgSOM = function () {
    setUri("/StephenOMalley");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iSOM").addClass("on");
    addProgLink("ideologic.org", "http://www.ideologic.org/");
    addProgLink("soundcloud.com", "https://soundcloud.com/stephen-omalley");

    var text;
    switch (lang) {
      case "en":
        text = "STEPHEN O’MALLEY is widely considered as the father of drone doom, a subgenre of doom metal. He created or had a role in many drone doom or experimental music bands. He plays in Sun O))), Ginnungagap, KTL, Lotus Eaters, Khanate, Burning Witch..His huge sonic structures, full of distortions and interferences, are made with a taste for dreadfull and restless ambiances. ";
        break;
      default:
        text = "STEPHEN O’MALLEY est souvent considéré comme le créateur du genre drone doom (nommé d'après la technique musicale du bourdon), sous-genre du doom metal. Il a fondé ou a participé à la fondation de divers groupes de drone doom ou de musique expérimentale. Il joue dans les groupes Sun O))), Ginnungagap, KTL, Lotus Eaters, Khanate, Burning Witch... Il bâtit des cathédrales sonores emplies de saturations et de parasitages. Et assume son bon goût pour les longs climats effrayants et les sources de malaises ambiants. ";
        break;
    }
    printText(text);
  };
  var pageProgPK = function () {
    setUri("/PiotrKurek");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iPK").addClass("on");
    addProgLink("piotrkurek.bandcamp.com", "https://piotrkurek.bandcamp.com/");

    var text;
    switch (lang) {
      case "en":
        text = "PIOTR KUREK comes from Warsaw. The music he plays is synthetic, mysterious, populated by catchy melodies, eerie, often harmonic, rhythmic — and loud. ";
        break;
      default:
        text = "PIOTR KUREK vient de Varsovie. Il crée des morceaux synthétiques et mystérieux remplis de mélodies prenantes, qu'il agrémente parfois de voix. Sa musique est étrange, souvent harmonique, rythmique et à fort volume. ";
        break;
    }
    printText(text);
  };
  var pageProgH = function () {
    setUri("/Homnimal");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iH").addClass("on");
    addProgLink("homnimal.com", "http://homnimal.com/");
    addProgLink("soundcloud.com", "https://soundcloud.com/homnimal");

    var text;
    switch (lang) {
      case "en":
        text = "Frédéric Bernier aka HOMNIMAL works within the field of vocal techniques, from bel canto to growling, gathering them inside installations, rites or scenic mash-ups. Live, his music is a trip inside a soundscape where intimacy & fragility go hand to hand with raw, dirty materials. ";
        break;
      default:
        text = "Frédéric Bernier aka HOMNIMAL travaille notamment sur les différentes techniques vocales et leur valeur d’usage, allant du chant lyrique au grognement pour les rassembler formellement dans des hybridations scéniques, des rites ou des installations. Ses concerts donnent à voir et à entendre une déambulation dans un paysage sonore où fragilité et intime côtoient une matière brute et terreuse. ";
        break;
    }
    printText(text);
  };
  var pageProgJBender = function () {
    setUri("/JeanBender");
    commonProg();
    $(".interactive.prog").addClass("on");
    $(".iJBender").addClass("on");
    addProgLink("jeanbender.blogspot.fr", "http://jeanbender.blogspot.fr/");

    var text;
    switch (lang) {
      case "en":
        text = "JEAN BENDER experiments with DIY and misused instruments. His work is directed toward noise, space and its dynamics. Music is approached through repetitions, sonic layers and the work on frequencies thus creating soundscapes that are raw albeit full of details. Self-taught, he discovered experimental music in 2009, being part of the HAK lofi RECORD collective. He also worked on a device based around the abuse of CMOS chips as well as incertainty, which is a constant thematic inside his work. ";
        break;
      default:
        text = "Jean Bender est un expérimentateur sonore utilisant et mésutilisant des instruments de musiques ayant en commun le détournement et la fabrication DIY. Son approche musicale est tournée vers le bruit, et une recherche autour de l'espace sonore et sa dynamique. L'approche de la musique se fait par la répétition, l'ajout de couches sonores et le travail des fréquences, créant ainsi des fresques sonores à priori dures mais révélant une multitude de détails. Autodidacte, Jean Bender a découvert la musique expérimentale en intégrant le collectif HAK lofi RECORD en 2009. Très vite, il a ainsi pu travailler le jeu en groupe lors de performances collectives. L'entrée dans ce collectif lui a permis de rencontrer AxDelbor avec qui il développe la création d'instruments de musique dédiés à la recherche sonore et l'improvisation. Il a également pu participer à la résidence VARIABLE(S), à Aubagne en 2011, qui lui a permis de travailler un dispositif basé sur le détournement de composants CMOS et l'erreur, qui reste une constante dans son travail. ";
        break;
    }
    printText(text);
  };

  var pageTickets = function () {
    clear();
    setUri("/tickets");

    var text;
    var encart;
    switch (lang) {
      case "en":
        text = "The team is fully made of volunteers. As a rule of thumb, we do everything without public/corporate money (no Red Bull cultural philantropy here) : everlasting meetings, express setup of green toilets, breakfast coffee without coffee pot and so on. But this festival is mostly made with you; the best way to support the team is by coming to the festival with all the fervor you can bring. And if you’re the kind of die-hard DIY enthousiast, we sell special support pre-sale tickets which we exchange for wholly hand-made goodies (almost). ";
        encart = "Because of the limited space available, you can only access the festival through booking. There will be no ticket sale on the festival.<br>For booking, we’ll be throwing three support event (Lyon, Paris, Marseille, follow on Facebook or by mail) with ticket sale, or please come back on this very page in May!";
        break;
      default:
        text = "L’équipe est entièrement bénévole et nous mettons un point d’honneur à tout faire sans subventions ni mécénat Red Bull : réunions interminables, montage express de toilettes sèches, café sans cafetière pour votre petit déjeuner. Mais le festival se construit aussi et surtout avec vous. Pour nous soutenir, on vous invite à venir au festival avec un enthousiasme titanesque. Et si vous voulez sacrifier au DIY éternel, nous proposons également des tarifs de soutien que nous échangeons contre des goodies totalement faits main (ou presque). ";
        encart = "À cause du nombre de places limité, le festival est uniquement accessible sur réservation. Il n’y aura pas de vente à l’entrée.<br>Pour réserver, RDV dans nos soirées de soutien (Lyon, Paris et Marseille, infos via Facebook ou mail) ou sur cette page à partir de mi mai !";
        break;
    }
    $("#encart").append(encart).addClass("on");
    printText(text);
  };

  var pageDome = function () {
    clear();
    setUri("/dome");

    var text;
    var encart;
    switch (lang) {
      case "en":
        text = "7 sec. 3-D The Sound of Space The well-Tempered sound Open surrounded experiments Forgot the music. Death to Musicians There is no musicians 7 sec 3-D There is no concert The sound of space The place is the event The well-tempered space It is not a venue it is a concertground Open surrounded experiments Winged-horns are the only still Forget your music Dont wanna know where the noise is going to Death to musicians Moving eardruns There is no concert Crawling-tripping The event is the place Spend time walking It is not a venue it is a concertground Put your ass down the river Winged-horns are the only still Feedback in the bass horn Dont wanna know where the noise is going to Dont stare at the musicians No stage People improvising Mobile eardrums Move away from the stage Crawling-tripping Listening no matter what Spend time walking Hear that last gig ? Put your ass down the river Go to sleep Feedback in the bass horn Some RrrrRRrr is well worth a Boom Dont stare at the musicians With the wind its changing People improvising Move away from the stage Listening no matter what Hear that last gig ? Go to sleep Some RrrrRRrr is well worth a Boom With the wind its changing. ";
        break;
      default:
        text = "Sept secondes en trois dimensions Le son de l'espace Le temps bien tempéré Expérimentation ouverte encerclée Oublier sa musique Mort aux musiciens Il n'y a pas de musicien Sept secondes en trois dimensions Il n'y a pas de concert Le son de l'espace L'environnement c'est le festival Le temps bien tempéré C'est pas une salle c'est un terrain de concert Expérimentation ouverte encerclée Les trompes ailées c'est la seule chose qui bouge pas Oublier sa musique On veut pas savoir où le bruit s'en va Mort aux musiciens Pas de scène Il n'y a pas de musicien Tympans mobiles Il n'y a pas de concert Crapahuter arpenter L’environnement c'est le festival Faire passer le temps en marchant C'est pas une salle c'est un terrain de concert Pose ton cul dans la rivière Les trompes ailées c'est la seule chose qui bouge pas Larsens dans la trompe basse On veut pas savoir où le bruit s'en va Ne regardez pas les musiciens Pas de scène Le public improvise Tympans mobiles Écartez-vous de la scène Crapahuter arpenter De toute façon tu écoutes Faire passer le temps en marchant T'as entendu la dernière impro ? Pose ton cul dans la rivière Va dormir Larsens dans la trompe basse Un grr vaut bien une boom Ne regardez pas les musiciens Si y'a du vent c'est différent Le public improvise Écartez-vous de la scène De toute façon tu écoutes T'as entendu la dernière impro ? Va dormir Un grr vaut bien une boom Si y'a du vent c'est différent. ";
        break;
    }
    encart = "<a href='mailto:contact@festivalechos.fr'>contact@festivalechos.fr</a><br>" +
        "+33(0)659608493<br>" +
        "Association Dôme / 12 Avenue Paul Krüger / 69100 Villeurbanne<br>" +
        "<a href='https://facebook.com/association.dome' target='_blank'>Facebook</a><br>" +
        "Webdesign : <a href='http://hugosaugier.tumblr.com/' target='_blank'>Hugo</a> & " +
                    "<a href='https://igormyrtille.wordpress.com/' target='_blank'>Igor</a>";
    $("#encart").append(encart).addClass("on");
    printText(text);
  };

  // cookies shit
  var createCookie = function(name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    else expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  };

  var readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  var eraseCookie = function(name) {
    createCookie(name, "", -1);
  };
})(jQuery);
