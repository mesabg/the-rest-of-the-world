/**
 * Global dependencies
 */
window.$ = require('jquery');
const fs = require('fs');

$(document).ready(function($){
    //-- Bind icons
    $('#mouse > img')
        .attr('src', require('file-loader!./assets/images/mouse.gif'))
        .attr('alt', 'Mouse');

    $('#timer > img')
        .attr('src', 'file-loader!./assets/images/timer.gif')
        .attr('alt', 'Timer');

    //-- Start render process
    require('./render')($);    
});