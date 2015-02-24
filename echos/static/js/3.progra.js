$(document).ready(function(){
    $('#dateflow').find('a').click(function() {
       var artistId = $(this).attr('class');
       $('.content').mCustomScrollbar("scrollTo", "#" + artistId);
    });
});