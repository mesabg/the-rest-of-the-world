/**
 * Global dependencies
 */
const PIXI = require('pixi.js');

//-- Start new application
const app = new PIXI.Application({backgroundColor : 0x832925});
document.body.appendChild(app.view);


// Draw a green rectangle
const rect = new PIXI.Graphics()
.beginFill(0x00ff00)
.drawRect(40, 40, 200, 200);

// Add a blur filter
rect.filters = [new PIXI.filters.BlurFilter()];

// Display rectangle
app.stage.addChild(rect);

/*
let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Gilroy-ExtraBold', fontSize: 60, fill : 0xffffff, align : 'center'});
text.x = (app.renderer.width / 2) - text.width/2;
text.y = (app.renderer.height / 2) - text.height/2;

var basicText = new PIXI.Text('Basic text in pixi');
basicText.x = 30;
basicText.y = 90;


let sprite = new PIXI.Sprite(text.texture);
sprite.x = (app.renderer.width / 2) - sprite.width/2;
sprite.y = (app.renderer.height / 2) - sprite.height/2;

app.stage.addChild(sprite);

var style = {
    font : 'bold italic 36px Arial',
    fill : '#F7EDCA',
    stroke : '#4a1850',
    strokeThickness : 5,
    dropShadow : true,
    dropShadowColor : '#000000',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 6,
    wordWrap : true,
    wordWrapWidth : 440
};

var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines',style);
richText.x = 30;
richText.y = 90;

//app.stage.addChild(richText);

// start animating
animate();

function animate() {

    requestAnimationFrame(animate);

    // render the root container
    app.render();
}*/