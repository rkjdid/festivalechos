function initialize()
{
    geocoder = new google.maps.Geocoder();
    var myOptions = {
       mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("lolz"), myOptions);
}

function showAddress(address, zoom)
{
   if (geocoder)
   {
      geocoder.geocode( { 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setOptions( { zoom: zoom });
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
         }
      });
   }
}

initialize();
showAddress("Le+Fai,+05400+Le+Saix,+France");

map.setOptions( { draggable: false });

var dragFlag = false;
var start = 0, end = 0;

function thisTouchStart(e)
{
    dragFlag = true;
    start = e.touches[0].pageY;
}

function thisTouchEnd()
{
    dragFlag = false;
}

function thisTouchMove(e)
{
    if ( !dragFlag ) return;
    end = e.touches[0].pageY;
    window.scrollBy( 0,( start - end ) );
}

document.getElementById("map_canvas").addEventListener("touchstart", thisTouchStart, true);
document.getElementById("map_canvas").addEventListener("touchend", thisTouchEnd, true);
document.getElementById("map_canvas").addEventListener("touchmove", thisTouchMove, true);