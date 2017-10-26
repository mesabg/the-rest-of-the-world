/**
 * Description
 */
const $ = require('jquery');
require('jquery.transit');
require('tilt.js');


function parallax(){
    $('.page').tilt({
        perspective: 1800,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        maxTilt: 20,
        speed: 2500,
        transition: true
    });
}


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


(function($){
    $.fn.animation = function (
        x = {
            initial: 0,
            final: 0
        }, 
        y = {
            initial: 0,
            final: 0,
        }, duration ){
        return new Promise((resolve, reject) => {
            let $element = $(this);
            $({ 
                x: x.initial, 
                y: y.initial 
            })
            .stop()
            .animate({
                x: x.final,
                y: y.final 
            }, {
                duration: duration,
                step: function(value, init){
                    if (init.prop == 'x'){ translateZTransition($element, value); }
                    else if (init.prop == 'y'){ blurTransition($element, value); }
                },
                done: function (){
                    console.log("Yo la defined", { x: x, y: y });
                    resolve({ x: x, y: y });
                },
                fail: function(){
                    reject();
                }
            });
        });
    }


    $.fn.animationGoAndBack = function (
        x = {
            initial: 0,
            final: 0
        }, 
        y = {
            initial: 0,
            final: 0,
        }, duration ){

        return new Promise((resolve, reject) => {
            $(this).animation(x, y, duration)
            .then(function (response) {
                return $(this).animation({
                    initial: x.final,
                    final: x.initial
                }, {
                    initial: y.final,
                    final: y.initial
                }, duration);
            })
            .then(function (params) {
                console.log("Here we are ", params);
                resolve({
                    scroll: {
                        initial: params.x.final,
                        final: params.x.initial
                    },
                    blur: {
                        initial: params.y.final,
                        final: params.y.initial
                    }
                });
            })
            .catch(() => {
                reject();
            });
        });
    }
}($));





function wheel(){

    //-- Variables for blur and scroll
    let scroll = 0;
    let scrollFactor = 0.5;
    let blur = 0;
    let blurFactor = 1.8;
    let scrollNumber = 0;

    //-- Pages
    let pages = $('.content').children();
    let actual = 1;
    let whileScroll = true;
    let checkScrollAfter = 100;
    let direction = 'up';
    let savedDirection = 'up';
    let savedStep = 0;
    let steps = 0;
    let onReset = false;
    let animationActive = false;

    window.addEventListener('wheel', function(e){

        //-- Wheel down
        if (e.deltaY < 0) {
            scroll += scrollFactor; 
            blur -= blurFactor;
            scrollNumber--;
            direction = 'down';
        }

        //-- Wheel up
        if (e.deltaY > 0) {
            scroll -= scrollFactor; 
            blur += blurFactor;
            scrollNumber++;
            direction = 'up';
        }

        //-- Prevent default
        if (scroll > 0){
            scroll = 0;
            blur = 0;
            scrollNumber = 0;
            onReset = true;
        }

        //-- Check movement steps 
        if (whileScroll){
            whileScroll = false;
            savedDirection = direction;
            savedStep = scrollNumber;

            setTimeout(function(){
                
                let size = 0;
                if (savedDirection == 'up' && !animationActive){
                    size = abs(savedStep - scrollNumber + 1);
                    animationActive = true;

                    let x = { 
                        inital: scroll,
                        final: scroll - scrollFactor * size 
                    };

                    let y = {
                        initial: blur,
                        final: blur + blurFactor * size 
                    };

                    console.log(x, y);

                    pages.slice(0, actual)
                    .animationGoAndBack(x, y, 500)
                    .then(function (params) {
                        animationActive = false;
                        console.log(params);
                        scroll = params.scroll.initial;
                        blur = params.blur.initial;
                    });

                }else if (savedDirection == 'down' && !animationActive){
                    size = savedStep - scrollNumber + 1;
                    animate(
                        pages.slice(0, actual), 
                        {
                            initial: scroll,
                            final: scroll + scrollFactor * size,
                            factor: scrollFactor
                        },{
                            initial: blur,
                            final: blur - blurFactor * size,
                            factor: blurFactor
                        }, 'down').then((response) => {
                            //-- Animation ended
                            animationActive = false;
                        }).catch((error) => {
                            //-- Show error
                            console.log("An error ocurred :: ", error);
                        });
                }

                whileScroll = true;

            }, checkScrollAfter);
        }

        if (!animationActive)
            transform(pages.slice(0, actual), scroll, blur);
    });
}


/**
 * Rendering and events process
 */
module.exports = function($){
    //-- Start parallax
    parallax();

    //-- Start wheel event
    wheel();
}