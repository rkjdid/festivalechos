$(document).ready(function(){
  if (typeof($.fancybox) === 'undefined')
    return;

  var default_state = {title: document.title, url: document.location.pathname };
  var loading = false;      // determine if we're loading a new anchor next
  var from_state = false;   // determine if next action is coming from browser navigation

  $(".lineup1").find('a').fancybox ({
      prevEffect	: 'none',
      nextEffect	: 'none',
      closeBtn    : false,
      loop        : false,
      title : function(ce) {return (ce.element.data('boxtitle'));},
      helpers: {
        title : {
          type: 'outside',
          extrashift: 300
        },
        thumbs : {
          width: 35,
          height: 35
        }
      },
      beforeClose: function() {
        // do not call this handler if a new load is coming
        if (loading || from_state)
          return;

        History.pushState(default_state.data, default_state.title, default_state.url);
      },
      beforeLoad: function() {
        loading = true;
        if (from_state)
          return;

        History.pushState(null, $(this.element).html().trim(), "?" + $(this.element).data('anchor'));
        loading = false;
      },
      afterLoad: function() {
        // reinit tracking bools
        loading = false;
        from_state = false;
      },
      afterClose: function () {
        // reinit tracking bools
        loading = false;
        from_state = false;
      }
  });

  $(".lineup2").find('a').fancybox({
    prevEffect: 'none',
    nextEffect: 'none',
    closeBtn: false,
    loop: false,
    title: function (ce) {
      return (ce.element.data('boxtitle'));
    },
    helpers: {
      title: {
        type: 'outside',
        extrashift: 300
      },
      thumbs: {
        width: 35,
        height: 35
      }
    },
    beforeClose: function () {
      // do not call this handler if a new load is coming
      if (loading || from_state)
        return;

      History.pushState(default_state.data, default_state.title, default_state.url);
    },
    beforeLoad: function () {
      loading = true;
      if (from_state)
        return;

      History.pushState(null, $(this.element).html().trim(), "?" + $(this.element).data('anchor'));
      loading = false;
    },
    afterLoad: function () {
      // reinit tracking bools
      loading = false;
      from_state = false;
    },
    afterClose: function () {
      // reinit tracking bools
      loading = false;
      from_state = false;
    }
  });

  // Store available anchors
  var anchors = {};
  $(".lineup1").find('a').each(function() {
    anchors[$(this).data('anchor')] = $(this);
  });

  $(".lineup2").find('a').each(function () {
    anchors[$(this).data('anchor')] = $(this);
  });

  // onload handler, load current state and bind statechange event
  $(window).load(function() {
    loadState(true);

    History.Adapter.bind(window,'statechange', function() {
        loadState(false);
    });
  });

  function loadState(onload) {
    // hack to avoid infinite loops
    setTimeout(function() {
      var init_state = History.getState();
      var hash = init_state.hash.substr(document.location.pathname.length + 1);

      // Remove weird "&_suid" string
      if (hash.indexOf("&_suid") > -1)
        hash = hash.substr(0, hash.indexOf("&_suid"));

      if (hash in anchors) {
        if (onload) {
          var $a = $(anchors[hash]);
          document.title = $a.html().trim();
        }

        from_state = true;
        $(anchors[hash]).click();
      } else if (hash === "" && ! onload) {
        from_state = true;
        $.fancybox.close();
      } else if (hash !== "") {
        History.replaceState(default_state.data, default_state.title, default_state.url);
      }
    }, 0);
  }
});

