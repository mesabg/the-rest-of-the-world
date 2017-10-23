/**
 * Global dependencies
 */
const $ = require('jquery');
const Mustache = require('mustache');
const tilt = require('tilt.js');

$(document).ready(function($){
    //-- Render
    let template = require('./views/prelanding.html');
    let data = require('./views/prelanding.json');
    let rendered = Mustache.render(template, data);
    $('app').html(rendered);

    //-- Start render process
    require('./render')($);    
});