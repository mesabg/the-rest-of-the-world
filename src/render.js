/**
 * Description
 */
require('jquery.transit');


/**
 * Rendering and events process
 */
module.exports = function($){
    console.log($);

    $(window).on('wheel', function(){
        console.log($('#definition'));
        $('#definition').transition({
            z: 100
        });
    });
}