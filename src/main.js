/**
 * Global dependencies
 */
window.$ = require('jquery');
const fs = require('fs');

$(document).ready(function($){
    //let mouse = require('file-loader?name=[name].[hash:20].[ext]!./assets/images/mouse.gif');
    //console.log(mouse);

    //-- Bind icons
    /*$('#mouse > img')
        .attr('src', mouse )
        .attr('alt', 'Mouse');

    $('#timer > img')
        .attr('src', require('file-loader!./assets/images/silent.png'))
        .attr('alt', 'Timer');*/

    //-- Start render process
    require('./render')($);    
});