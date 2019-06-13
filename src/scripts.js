$(document).ready(function() {
setTimeout(function(){
    $( ".item" ).each(function() {
       $('.featuredImgWrapper').hover(function(){
        $(this).find('.overlay').addClass('visible');
        console.log('addClass');
       });
       $('.featuredImgWrapper').mouseleave(function(){
        $(this).find('.overlay').removeClass('visible');
        console.log('removeClass');
       });
    });
},1000);
});