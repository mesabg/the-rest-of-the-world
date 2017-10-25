/**
 * Description
 */
require('jquery.transit');
require('tilt.js');

/**
 * Rendering and events process
 */
module.exports = function($){

    let scroll = 0;
    let blur = 0;
    let factor = 0.5;
    let blurFactor = 1.8;
    let whileScroll = false;
    let time = null;
    let final;

    //-- Start parallax
    $('.page').tilt({
        perspective: 1800,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        maxTilt: 20,
        speed: 2500,
        transition: true
    });

    window.addEventListener('wheel', function(e){
        if (e.deltaY < 0) {
            scroll += factor; 
            blur -= blurFactor;
            final = '-=0.5';
        }

        if (e.deltaY > 0) {
            scroll -= factor; 
            blur += blurFactor;
            final = '+=0.5';
        }

        //console.log(time);

        //if (whileScroll && new Date().getMilliseconds() <= time){
        //    console.log("Hier");
       // 
       // }
    
        if (scroll === -12){
            //-- Break step

        }
        
        if (scroll > 0){
            //-- Prevent default
            scroll = 0;
            blur = 0;
        }else if (scroll < 0){

            if (scroll >= -0.5)
                whileScroll = true;

            if (whileScroll){
                whileScroll = false;
                setTimeout(function(){
                    if (scroll == -0.5){
                        //-- 1 mov
                        console.log("1 m");
                    }else if (scroll == -1){
                        //-- 1 mov
                        console.log("2 m");
                    }else{

                        console.log("mas de 2");
                    }


                }, 300);
            }
            //time = new Date().getMilliseconds();
        }

        $('#definition').css({
            transform: `
                perspective(50px),
                translate3d(0px, 0px, ${scroll}px)
            ` 
        }).find('div > span').css({
            color: 'transparent',
            textShadow: `0 0 ${blur}px white`
        });
    });

   

    window.addEventListener('mousemove', function(event){
        let coords = {
            x: event.clientX,
            y: event.clientY
        };


        //console.log('Mouse is moving :: ', coords);
    });
}