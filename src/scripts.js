$(document).ready(function() {
setTimeout(function(){
    $( ".item" ).each(function() {
       $('.featuredImgWrapper').hover(function(){
        $(this).find('.overlay').addClass('visible');
       });
       $('.featuredImgWrapper').mouseleave(function(){
        $(this).find('.overlay').removeClass('visible');
       });
    });
},1000);
});