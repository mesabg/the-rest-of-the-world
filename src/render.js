/**
 * Description
 */
window.$ = require('jquery');
const d3 = require('d3-interpolate');
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
    $.fn.swipe = function( callback ) {
        var touchDown = false,
          originalPosition = null,
          $el = $( this );
      
        function swipeInfo( event ) {
          if ('undefined' !== typeof event.originalEvent.pageX) {
            var x = event.originalEvent.pageX,
                y = event.originalEvent.pageY,
                dx, dy;
          }else{
            var x = event.originalEvent.touches[0].pageX,
                y = event.originalEvent.touches[0].pageY,
                dx, dy;
          }
      
          dx = ( x > originalPosition.x ) ? "right" : "left";
          dy = ( y > originalPosition.y ) ? "down" : "up";
      
          return {
            direction: {
              x: dx,
              y: dy
            },
            offset: {
              x: x - originalPosition.x,
              y: originalPosition.y - y
            }
          };
        }
      
        $el.on( "touchstart mousedown", function ( event ) {
          touchDown = true;
          if ('undefined' !== typeof event.originalEvent.pageX) {
            originalPosition = {
              x: event.originalEvent.pageX,
              y: event.originalEvent.pageY
            };
          }else{
            originalPosition = {
              x: event.originalEvent.touches[0].pageX,
              y: event.originalEvent.touches[0].pageY
            };
          }
        } );
      
        $el.on( "touchend mouseup", function () {
          touchDown = false;
          originalPosition = null;
        } );
      
        $el.on( "touchmove mousemove", function ( event ) {
          if ( !touchDown ) { return;}
          var info = swipeInfo( event );
          callback( info.direction, info.offset );
        } );
      
        return true;
    };


    $.fn.customAnimation = function (values = {
        initial: 0, /* Initial value of interpotaltion */
        final: 0 /* Final value after interpolation */
    }, options = {
        start: function(){ /*Animation start*/ },
        step: function(value) { /*Interpolation value*/ },
        easing: 'linear', /*Interpolation function*/
        end: function(){ /*Animation ends*/ },
        duration: 400 /*Duration time ms*/ 
    }){

        values = {
            initial: values.initial === undefined || values.initial === null ? 0 : values.initial,
            final: values.final === undefined || values.final === null ? 0 : values.final
        };

        options = {
            start: options.start === undefined || options.start === null ? function(){} : options.start,
            step: options.step === undefined || options.step === null ? function(){} : options.step,
            easing: options.easing === undefined || options.easing === null ? 'linear' : options.easing,
            end: options.end === undefined || options.end === null ? function(){} : options.end,
            duration: options.duration === undefined || options.duration === null ? 400 : options.duration
        };

        //-- Integrity Check
        Object.keys(options).forEach(function(key, index){
            console.log(key);
            switch(key){
                case 'start':
                    if ( !( typeof options.start === 'function' ) )
                        throw new Error('Property "start" is not a valid function');
                    break;
                case 'step':
                    if ( !( typeof options.step === 'function' ) )
                        throw new Error('Property "step" is not a valid function');
                    break; 
                case 'easing':
                    if ( !( typeof options.easing === 'string' ) )
                        throw new Error('Property "easing" is not a valid string');
                    if ( !(options.easing === 'linear') && 
                            !(options.easing === 'ease-in') &&
                            !(options.easing === 'ease-in-out') )
                        throw new Error('Property "easing" is not valid');
                    break; 
                case 'end':
                    if ( !( typeof options.end === 'function' ) )
                        throw new Error('Property "end" is not a valid function');
                    break; 
                case 'duration':
                    if ( !( typeof options.duration === 'number') )
                        throw new Error('Property "duration" is not a valid number');
                    break; 
                default:
                    throw new Error(`Property "${key}" is not expected`);
            };
        });


        //-- Easing functions
        const linear = function(t) { return t; }
        const easeIn = function(t) { return t * t; }
        const easeInOut = function(t) { return t * t * t * t; }

        const easing = function (type, t){
            switch(type){
                case 'linear': return linear(t);
                case 'ease-in': return easeIn(t);
                case 'ease-in-out': return easeInOut(t);
            }
        }


        //-- Start animation process
        let startTime, time;
        let duration = options.duration;
        let startX = values.initial, endX = values.final;
        
        const run = function() {
            time = new Date().getTime() - startTime;
            time = time / duration;
            if(time <1) requestAnimationFrame(run);
            time = easing(options.easing, time);
            options.step(time);
        }
        
        startTime = new Date().getTime();
        options.start();
        run();
    }


    $.fn.customTransform = function(scroll, blur){
        $(this).css({
            transform: `
                perspective(50px),
                translate3d(0px, 0px, ${scroll}px)
            ` 
        }).find('div > span').css({
            color: 'transparent',
            textShadow: `0 0 ${blur}px white`
        });
    }

    $.fn.specialAnimation = function (
        scroll = {
            from: 0,
            to: 0
        },
        blur = {
            from: 0,
            to: 0
        }
    ){

        return new Promise((resolve, reject) => {
            let scrollInter = d3.interpolateNumber(scroll.from, scroll.to);
            let blurInter = d3.interpolateNumber(blur.from, blur.to);
    
            //-- Start animation process
            let startTime, time;
            let duration = 700;
            let startX = 0, endX = 2000;
            let $self = $(this);
            
            const run = function() {
                time = new Date().getTime() - startTime;
                time = time / duration;
                if(time <1) requestAnimationFrame(run);
                else if (time > 1) time = 1.0;
                time = time;
                
                //-- Animation
                $self.customTransform(scrollInter(time), blurInter(time));
                if (time == 1){
                    resolve();
                }
            }
            
            startTime = new Date().getTime();
            run();
        });
    }


    /*$.fn.animation = function (
        scroll = {
            initial: 0,
            final: 0
        }, 
        blur = {
            initial: 0,
            final: 0,
        }, 
        duration = 500,
        easing = 'swing' ){
        return new Promise((resolve, reject) => {
            //console.log("In animation :: ", { scroll: scroll, blur: blur });
            let $element = $(this);
            $({ 
                x: scroll.initial, 
                y: blur.initial 
            })
            .stop()
            .animate({
                x: scroll.final,
                y: blur.final 
            }, {
                duration: duration,
                easing: easing,
                step: function(value, init){
                    console.log("Step :: ", init.prop, value);
                    if (init.prop == 'x'){ translateZTransition($element, 0); }
                    else if (init.prop == 'y'){ blurTransition($element, 0); }
                },
                done: function (){
                    resolve({ scroll: scroll, blur: blur });
                },
                fail: function(){
                    reject();
                }
            });
        });
    }*/


    $.fn.animationGoAndBack = function (
        scroll = {
            initial: 0,
            middle: 0,
            final: 0
        }, 
        blur = {
            initial: 0,
            middle: 0,
            final: 0
        }, 
        duration = 500,
        easing = 'swing' ){

        return new Promise((resolve, reject) => {
            //-- From initial to middle
            /*$(this).animation(
            {
                inital: scroll.initial,
                final: scroll.middle
            },
            {
                inital: blur.initial,
                final: blur.middle
            }, duration, easing)
            .then(function (params) {
                return $(this).animation({
                    initial: scroll.middle,
                    final: scroll.final
                }, {
                    initial: blur.middle,
                    final: blur.final
                }, duration, easing);
            })
            .then(function (params) {
                resolve({
                    scroll: {
                        initial: scroll.initial,
                        final: scroll.final
                    },
                    blur: {
                        initial: blur.initial,
                        final: blur.final
                    }
                });
            })
            .catch(() => {
                reject();
            });*/


            $(this).specialAnimation(
                {
                    from: scroll.initial,
                    to: scroll.middle
                },
                {
                    from: blur.initial,
                    to: blur.middle
                })
                .then(function (params) {
                    return $(this).animation({
                        from: scroll.middle,
                        to: scroll.final
                    }, {
                        from: blur.middle,
                        to: blur.final
                    });
                })
                .then(function (params) {
                    resolve({
                        scroll: {
                            initial: scroll.initial,
                            final: scroll.final
                        },
                        blur: {
                            initial: blur.initial,
                            final: blur.final
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
    let scrollFactor = 0.65;
    let blur = 0;
    let blurFactor = 0.9;
    let scrollNumber = 0;
    let scrollNumberDown = 0;
    let color = ['#832925', '#BC684F', '#9A615D', '#E2AAA5', '#E2A882', '#3A1D15'];

    //-- Pages
    let pages = $('[page-no-mobile] > .content').children('[slice]');
    let pagesMobile = $('[page-mobile] > .content').children('[slice]');
    let actual = 1;
    let whileScroll = true;
    let checkScrollAfter = 150;
    let direction = 'up';
    let savedDirection = 'up';
    let savedStep = 0;
    let steps = 0;
    let onReset = false;
    let animationActive = false;
    let jumpFactor = 1.5; //-- Times middle animation is triggered
    let topScroll = 0; //-- Base case
    let topBlur = 0; //-- Base case
    let pageScrollFactor = 30;
    let pageBlurFactor = 30;

    let swipeActive = 0;

    let optionSelected = undefined;


    //-- resize ICON Check
    $('[icon]').animate({ opacity: 0 }, 350);
    if (actual === 1 || actual === 2){
        if ( window.innerWidth < 768 ){
            $('[icon]#finger').animate({ opacity: 1 }, 350);
            $('[icon]#mouse').animate({ opacity: 0 }, 350);
        }else{
            $('[icon]#mouse').animate({ opacity: 1 }, 350);
            $('[icon]#finger').animate({ opacity: 0 }, 350);
        }
    }

    $(pages.slice(0, actual).get(actual-1)).find('div > span').css({
        color: 'white',
        textShadow: `0px 2px 3px rgba(0, 0, 0, 0.5)`
    });

    $(window).on('resize', function(){
        //-- Change icon if applies
        $('[icon]').animate({ opacity: 0 }, 350);
        if (actual === 1 || actual === 2){
            if ( window.innerWidth < 768 ){
                $('[icon]#finger').animate({ opacity: 1 }, 350);
                $('[icon]#mouse').animate({ opacity: 0 }, 350);
            }else{
                $('[icon]#mouse').animate({ opacity: 1 }, 350);
                $('[icon]#finger').animate({ opacity: 0 }, 350);
            }
        }
    });


    //-- Change page 
    function changePage(){
        if (!animationActive){

            animationActive = true;
            
            let scrollAnimationStates = { 
                initial: scroll,
                final: topScroll
            };

            let blurAnimationStates = {
                initial: blur,
                final: topBlur
            };


            //-- New page arrive animation
            let prev = actual;
            actual++;
            actual = actual === 4 && optionSelected === undefined ? 3 : actual;
            actual = actual === 5 ? 4 : actual;

            //-- Sanity
            if (actual === 4)
                pages.slice(0, actual - 1).stop().animate({opacity: 0}, 500, 'swing', function(){
                    $(this).css('display', 'none');
                    setTimeout(function(){
                        window.location.replace('http://restoftheworld.agency/');
                    }, 4000);
                });

            //-- Jump to the next page
            topScroll = -(scrollFactor * pageScrollFactor * (actual -1));
            topBlur = blurFactor * pageBlurFactor * (actual - 1);
            scrollAnimationStates.final = topScroll;
            blurAnimationStates.final = topBlur;
            

            //-- Change page (Desktop)
            $(pages.get(actual - 1)).find('div > span').css({
                color: 'white',
                textShadow: `0px 2px 3px rgba(1, 1, 1, 0.0)`
            }).closest('[slice]').stop().animate({ opacity: 1 }, 700);
            if (actual != prev)
                pages.slice(0, actual - 1).animate( { opacity: '-=0.3' }, 700);

            //-- Change page mobile
            pagesMobile.animate({ opacity: 0 }, 350);
            $(pagesMobile.get(actual - 1))
                .css({color: 'white'})
                .animate({ opacity: 1 }, 350);


            //-- Change BG color
            $('body').attr('class', '');
            $('body').addClass(`color-${actual}`);

            //-- Change BG Color on hover if applies
            if (actual === 3){
                $('.answer-1').on('mouseenter', function(){
                    $('body').attr('class', '');
                    $('body').addClass(`color-e-1`);
                }).on('mouseleave', function(){
                    $('body').attr('class', '');
                    $('body').addClass(`color-3`);
                });

                $('.answer-2').on('mouseenter', function(){
                    $('body').attr('class', '');
                    $('body').addClass(`color-e-2`);
                }).on('mouseleave', function(){
                    $('body').attr('class', '');
                    $('body').addClass(`color-3`);
                });
            }else{
                $('.answer-1')
                    .unbind('mouseenter')
                    .unbind('mouseleave');

                $('.answer-2')
                    .unbind('mouseenter')
                    .unbind('mouseleave');
            }

            //-- Change icon if applies
            $('[icon]').animate({ opacity: 0 }, 350);
            if (actual === 1 || actual === 2){
                if ( window.innerWidth < 768 ){
                    $('[icon]#finger').animate({ opacity: 1 }, 350);
                    $('[icon]#mouse').animate({ opacity: 0 }, 350);
                }else{
                    $('[icon]#mouse').animate({ opacity: 1 }, 350);
                    $('[icon]#finger').animate({ opacity: 0 }, 350);
                }
            }else if (actual === 3)
                $('[icon]#pick').animate({ opacity: 1 }, 350);
            else if (actual === 4)
                $('[icon]#timer').animate({ opacity: 1 }, 350);
            

            let animationPromises = [];
            animationPromises = Array.from(pages.slice(0, actual)).map((value, index) => {
                return $(value).specialAnimation({
                    from: scroll + (scrollFactor * pageScrollFactor * index),
                    to: scrollAnimationStates.final + (scrollFactor * pageScrollFactor * index)
                },{
                    from: blurAnimationStates.initial - (blurFactor * pageBlurFactor * index),
                    to: blurAnimationStates.final - (blurFactor * pageBlurFactor * index)
                });
            });

            //-- Sync all the animations
            Promise.all(animationPromises).then(function (params) {
                //-- Enable wheel movement again and positions righly set to the last step
                animationActive = false;
                whileScroll = true;
                scrollNumber = 0;
                scroll = topScroll;
                blur = topBlur;
                swipeActive = false;

                
                $(pages.slice(0, actual).get(actual-1)).find('div > span').css({
                    color: 'white',
                    textShadow: `0px 2px 3px rgba(0, 0, 0, 0.5)`
                });
            });
        }
    }


    function disposePage(){
        if (!animationActive){

            animationActive = true;
            
            let scrollAnimationStates = { 
                initial: scroll,
                final: topScroll
            };

            let blurAnimationStates = {
                initial: blur,
                final: topBlur
            };

            //-- New page goes animation
            let prev = actual;
            actual--;
            actual = actual === 4 ? 3 : actual;
            actual = actual === 0 ? 1 : actual;

            //-- Jump to the next page
            topScroll = -(scrollFactor * pageScrollFactor * (actual -1));
            topBlur = +(blurFactor * pageBlurFactor * (actual - 1));
            scrollAnimationStates.final = topScroll;
            blurAnimationStates.final = topBlur;

            //-- Change page (Desktop)
            $(pages.get(actual)).find('div > span').css({
                color: 'white',
                textShadow: `0px 2px 3px rgba(1, 1, 1, 0.0)`
            }).closest('[slice]').stop().animate({ opacity: 0 }, 700);
            if (actual != prev)
                pages.slice(0, actual).animate( { opacity: '+=0.3' }, 700);

            //-- Change page mobile
            pagesMobile.animate({ opacity: 0 }, 350);
            $(pagesMobile.get(actual - 1))
                .css({color: 'white'})
                .animate({ opacity: 1 }, 350);


            //-- Change BG color
            $('body').attr('class', '');
            $('body').addClass(`color-${actual}`);

            //-- Change BG Color on hover if applies
            if (actual === 3){
                $('.answer-1').on('mouseenter', function(){
                    $('body').attr('class', '');
                    $('body').addClass(`color-e-1`);
                }).on('mouseleave', function(){
                    $('body').attr('class', '');
                    $('body').addClass(`color-3`);
                });

                $('.answer-2').on('mouseenter', function(){
                    $('body').attr('class', '');
                    $('body').addClass(`color-e-2`);
                }).on('mouseleave', function(){
                    $('body').attr('class', '');
                    $('body').addClass(`color-3`);
                });
            }else{
                $('.answer-1')
                    .unbind('mouseenter')
                    .unbind('mouseleave');

                $('.answer-2')
                    .unbind('mouseenter')
                    .unbind('mouseleave');
            }

            //-- Change icon if applies
            $('[icon]').animate({ opacity: 0 }, 350);
            if (actual === 1 || actual === 2){
                if ( window.innerWidth < 768 ){
                    $('[icon]#finger').animate({ opacity: 1 }, 350);
                    $('[icon]#mouse').animate({ opacity: 0 }, 350);
                }else{
                    $('[icon]#mouse').animate({ opacity: 1 }, 350);
                    $('[icon]#finger').animate({ opacity: 0 }, 350);
                }
            }else if (actual === 3)
                $('[icon]#pick').animate({ opacity: 1 }, 350);
            else if (actual === 4)
                $('[icon]#timer').animate({ opacity: 1 }, 350);
            

            let animationPromises = [];
            animationPromises = Array.from(pages.slice(0, actual)).map((value, index) => {
                return $(value).specialAnimation({
                    from: scroll + (scrollFactor * pageScrollFactor * index),
                    to: scrollAnimationStates.final + (scrollFactor * pageScrollFactor * index)
                },{
                    from: blurAnimationStates.initial - (blurFactor * pageBlurFactor * index),
                    to: blurAnimationStates.final - (blurFactor * pageBlurFactor * index)
                });
            });

            //-- Sync all the animations
            Promise.all(animationPromises).then(function (params) {
                //-- Enable wheel movement again and positions righly set to the last step
                animationActive = false;
                whileScroll = true;
                scrollNumber = 0;
                scroll = topScroll;
                blur = topBlur;
                swipeActive = false;

                
                $(pages.slice(0, actual).get(actual-1)).find('div > span').css({
                    color: 'white',
                    textShadow: `0px 2px 3px rgba(0, 0, 0, 0.5)`
                });
            });
        }
    }


    //-- Hear options movement
    $('[response-1]').on('click', function(){
        optionSelected = $(this).children().get(0).innerText;
        //-- Send text throung ajax
        changePage();
    });

    $('[response-2]').on('click', function(){
        optionSelected = $(this).children().get(0).innerText;
        //-- Send text throung ajax
        changePage();
    });


    //-- Dispose event
    $('[dispose-icon]').on('click', function(){
        window.location.replace('http://restoftheworld.agency/');
    });


    //-- For mobile
    $(window).swipe(function( direction, offset ) {
        if (direction.y === 'up' && !swipeActive ){
            swipeActive = true;
            changePage();
        }else if (direction.y === 'down'){
            //-- Go to the previous page mobile and desktop
            disposePage();
        }
    });


    window.addEventListener("keyup", function(e){
        if (e.key == "ArrowDown")
            changePage();
        else if (e.key === 'ArrowUp')
            disposePage();
    });


    window.addEventListener('wheel', function(e){

        //-- Wheel down
        if (e.deltaY < 0) {
            scroll += scrollFactor; 
            blur -= blurFactor;
            scrollNumber = 0;
            scrollNumberDown++;
            direction = 'down';
        }

        //-- Wheel up
        if (e.deltaY > 0) {
            scroll -= scrollFactor; 
            blur += blurFactor;
            scrollNumber++;
            scrollNumberDown = 0;
            direction = 'up';
        }

        //-- Prevent default
        if (scroll > 0){
            scroll = 0;
            blur = 0;
            scrollNumber = 0;
            scrollNumberDown = 0;
            onReset = true;
        }

        //-- Transition if it is possible
        if (!animationActive){
            $(pages.get(actual - 1)).find('div > span').css({
                color: 'white',
                textShadow: `0px 2px 3px rgba(1, 1, 1, 0.0)`
            });
            Array.from(pages.slice(0, actual)).forEach((value, index) => {
                $(value).customTransform(scroll + (scrollFactor * pageScrollFactor * index), blur - (blurFactor * pageBlurFactor * index));
            });
            animationActive = false;
        }

        //-- Check movement steps 
        if (whileScroll){
            whileScroll = false;

            setTimeout(function(lastDirection){

                //-- Up direction
                if (lastDirection == 'up' && !animationActive){
                    if ( scrollNumber >= 3 ){ 
                        changePage();
                        return;
                    } else {
                        //-- Move just a little bit
                        animationActive = true;
                        
                        let scrollAnimationStates = { 
                            initial: scroll,
                            final: topScroll
                        };
    
                        let blurAnimationStates = {
                            initial: blur,
                            final: topBlur
                        };

                        let animationPromises = [];
                        animationPromises = Array.from(pages.slice(0, actual)).map((value, index) => {
                            return $(value).specialAnimation({
                                from: scroll + (scrollFactor * pageScrollFactor * index),
                                to: scrollAnimationStates.final + (scrollFactor * pageScrollFactor * index)
                            },{
                                from: blurAnimationStates.initial - (blurFactor * pageBlurFactor * index),
                                to: blurAnimationStates.final - (blurFactor * pageBlurFactor * index)
                            });
                        });
    
                        //-- Sync all the animations
                        Promise.all(animationPromises).then(function (params) {
                            //-- Enable wheel movement again and positions righly set to the last step
                            animationActive = false;
                            whileScroll = true;
                            scrollNumber = 0;
                            scroll = topScroll;
                            blur = topBlur;
    
                            $(pages.slice(0, actual).get(actual-1)).find('div > span').css({
                                color: 'white',
                                textShadow: `0px 2px 3px rgba(0, 0, 0, 0.5)`
                            });
    
                            console.log("Animation ends");
                        });
                    }
                    /*animationActive = true;

                    let scrollAnimationStates = { 
                        initial: scroll,
                        final: topScroll
                    };

                    let blurAnimationStates = {
                        initial: blur,
                        final: topBlur
                    };

                    //-- Page change
                    if ( scrollNumber >= 3 ){
                        
                        //-- New page arrive animation
                        actual++;
                        actual = actual === 4 && optionSelected === undefined ? 3 : actual;
                        actual = actual === 5 ? 4 : actual;

                        //-- Jump to the next page
                        topScroll = -(scrollFactor * pageScrollFactor * (actual -1));
                        topBlur = blurFactor * pageBlurFactor * (actual - 1);
                        scrollAnimationStates.final = topScroll;
                        blurAnimationStates.final = topBlur;
                        
                        //-- Change page mobile
                        pagesMobile.animate({ opacity: 0 }, 350);
                        $(pagesMobile.get(actual - 1)).animate({ opacity: 1 }, 350);

                        //-- Change page
                        $(pages.get(actual - 1)).animate({ opacity: 1}, 700);
                        pages.slice(0, actual - 1).animate( { opacity: '-=0.3' }, 700);

                        //-- Change BG color
                        $('body').attr('class', '');
                        $('body').addClass(`color-${actual}`);

                        //-- Change BG Color on hover if applies
                        if (actual === 3){
                            $('.answer-1').on('mouseenter', function(){
                                $('body').attr('class', '');
                                $('body').addClass(`color-e-1`);
                            }).on('mouseleave', function(){
                                $('body').attr('class', '');
                                $('body').addClass(`color-3`);
                            });

                            $('.answer-2').on('mouseenter', function(){
                                $('body').attr('class', '');
                                $('body').addClass(`color-e-2`);
                            }).on('mouseleave', function(){
                                $('body').attr('class', '');
                                $('body').addClass(`color-3`);
                            });
                        }

                        //-- Change icon if applies
                        $('[icon]').animate({ opacity: 0 }, 350);
                        if (actual === 1 || actual === 2)
                            if ( window.innerWidth < 768 ){
                                $('[icon]#finger').animate({ opacity: 1 }, 350);
                                $('[icon]#mouse').animate({ opacity: 0 }, 350);
                            }else{
                                $('[icon]#mouse').animate({ opacity: 1 }, 350);
                                $('[icon]#finger').animate({ opacity: 0 }, 350);
                            }
                        else if (actual === 3)
                            $('[icon]#pick').animate({ opacity: 1 }, 350);
                        else if (actual === 4)
                            $('[icon]#timer').animate({ opacity: 1 }, 350);
                    }

                    let animationPromises = [];
                    animationPromises = Array.from(pages.slice(0, actual)).map((value, index) => {
                        return $(value).specialAnimation({
                            from: scroll + (scrollFactor * pageScrollFactor * index),
                            to: scrollAnimationStates.final + (scrollFactor * pageScrollFactor * index)
                        },{
                            from: blurAnimationStates.initial - (blurFactor * pageBlurFactor * index),
                            to: blurAnimationStates.final - (blurFactor * pageBlurFactor * index)
                        });
                    });

                    //-- Sync all the animations
                    Promise.all(animationPromises).then(function (params) {
                        //-- Enable wheel movement again and positions righly set to the last step
                        animationActive = false;
                        whileScroll = true;
                        scrollNumber = 0;
                        scroll = topScroll;
                        blur = topBlur;

                        $(pages.slice(0, actual).get(actual-1)).find('div > span').css({
                            color: 'white',
                            textShadow: `0px 2px 3px rgba(0, 0, 0, 0.5)`
                        });

                        console.log("Animation ends");
                    });*/

                }else if (lastDirection == 'down' && !animationActive){
                    disposePage();
                    /*animationActive = true;
                    
                    let scrollAnimationStates = { 
                        initial: scroll,
                        final: topScroll
                    };

                    let blurAnimationStates = {
                        initial: blur,
                        final: topBlur
                    };

                    //-- Page change
                    if ( scrollNumberDown >= 3 ){
                        //-- New page goes animation
                        actual--;
                        actual = actual === 4 ? 3 : actual;
                        actual = actual === 0 ? 1 : actual;

                        //-- Jump to the next page
                        topScroll = -(scrollFactor * pageScrollFactor * (actual -1));
                        topBlur = +(blurFactor * pageBlurFactor * (actual - 1));
                        scrollAnimationStates.final = topScroll;
                        blurAnimationStates.final = topBlur;
                        
                        //-- Change page
                        console.log($(pages.get(actual)));
                        $(pages.get(actual)).animate({ opacity: 0}, 700);

                        //-- Change BG color
                        $('body').attr('class', '');
                        $('body').addClass(`color-${actual}`);

                        //-- Change BG Color on hover if applies
                        if (actual === 3){
                            $('.answer-1').on('mouseenter', function(){
                                $('body').attr('class', '');
                                $('body').addClass(`color-e-1`);
                            }).on('mouseleave', function(){
                                $('body').attr('class', '');
                                $('body').addClass(`color-3`);
                            });

                            $('.answer-2').on('mouseenter', function(){
                                $('body').attr('class', '');
                                $('body').addClass(`color-e-2`);
                            }).on('mouseleave', function(){
                                $('body').attr('class', '');
                                $('body').addClass(`color-3`);
                            });
                        }

                        //-- Change icon if applies
                        $('[icon]').animate({ opacity: 0 }, 350);
                        if (actual === 1 || actual === 2)
                            if ( window.innerWidth < 768 ){
                                $('[icon]#finger').animate({ opacity: 1 }, 350);
                                $('[icon]#mouse').animate({ opacity: 0 }, 350);
                            }else{
                                $('[icon]#mouse').animate({ opacity: 1 }, 350);
                                $('[icon]#finger').animate({ opacity: 0 }, 350);
                            }
                        else if (actual === 3)
                            $('[icon]#pick').animate({ opacity: 1 }, 350);
                        else if (actual === 4)
                            $('[icon]#timer').animate({ opacity: 1 }, 350);
                    }

                    let animationPromises = [];
                    animationPromises = Array.from(pages.slice(0, actual)).map((value, index) => {
                        return $(value).specialAnimation({
                            from: scroll - (scrollFactor * pageScrollFactor * index),
                            to: scrollAnimationStates.final - (scrollFactor * pageScrollFactor * index)
                        },{
                            from: blurAnimationStates.initial + (blurFactor * pageBlurFactor * index),
                            to: blurAnimationStates.final + (blurFactor * pageBlurFactor * index)
                        });
                    });

                    //-- Sync all the animations
                    Promise.all(animationPromises).then(function (params) {
                        //-- Enable wheel movement again and positions righly set to the last step
                        animationActive = false;
                        whileScroll = true;
                        scrollNumber = 0;
                        scroll = topScroll;
                        blur = topBlur;
                        scrollNumberDown = 0;

                        console.log("Animation ends");
                    });*/
                }
            }, checkScrollAfter, direction);
        }

        
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

    //-- Show everything
    $('body').css('display', 'block');
}