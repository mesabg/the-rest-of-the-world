/**
 * Dependencies
 */
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;
const origin = 'dist/index.html';
const destiny = 'dist/index.php';

//-- Create index.php
fs.readFile(`${__dirname}/${origin}`, function(error, data) {
    if (error) return console.log(error);

    //-- Replace html string
    var decoder = new StringDecoder('utf8');
    var html = decoder.write(data).replace('</head>', '<base href="<?php echo plugin_dir_url(__FILE__); ?>"></head>');
    fs.writeFile(`${__dirname}/${destiny}`, html, function(error) {
        if(error) return console.log(error);
        console.log("index.php was created");
    }); 
});