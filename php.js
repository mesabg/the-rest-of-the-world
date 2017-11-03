/**
 * Dependencies
 */
const fs = require('fs');

//-- Create index.php
fs.readFile('/dist/index.html', function(error, data) {
    if (error) {
        console.log(error);
        return;
    }

    console.log("Data :: ", data);
    /*var obj = JSON.parse(data);
    for(var p in yourObject) {
        fs.rename('/path/to/' + obj[p] + '.png', '/path/to/' + p + '.png', function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });
    }*/
});