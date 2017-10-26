/**
 * Description
 */
const $ = require('jquery');
require('jquery.transit');
require('tilt.js');




module.exports = {
    parallax: function(){
        $('.page').tilt({
            perspective: 1800,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            maxTilt: 20,
            speed: 2500,
            transition: true
        });
    }
};

function transform($elements, scroll, blur){
    $($elements).css({
        transform: `
            perspective(50px),
            translate3d(0px, 0px, ${scroll}px)
        ` 
    }).find('div > span').css({
        color: 'transparent',
        textShadow: `0 0 ${blur}px white`
    });
}


function translateZTransition($elements, scroll){
    $($elements).css({
        transform: `
            perspective(50px),
            translate3d(0px, 0px, ${scroll}px)
        ` 
    });
}


function blurTransition($elements, blur){
    $($elements).find('div > span').css({
        color: 'transparent',
        textShadow: `0 0 ${blur}px white`
    });
}


function abs(number){
    if (number < 0) return -1*number;
    return number;
}
