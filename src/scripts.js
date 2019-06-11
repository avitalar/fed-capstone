$(document).ready(function() {
setTimeout(function(){
    $( ".featuredImgWrapper" ).each(function() {
       $('.featuredImgWrapper').hover(function(){
        $(this).find('.overlay').toggleClass('visible');
        console.log('toggle');
    });
    });
},1000);
});