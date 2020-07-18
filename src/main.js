//Student Name: John Payne(1724413)

//Points Breakdown: 
//Track a high score that persists across scenes and display it in the UI (10)

//Add your own (copyright-free) background music to the Play scene (10)
//https://freemusicarchive.org/search?adv=1&quicksearch=space&&

//


"use strict"
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// reserve some keyboard bindings
let keyF, keyLEFT, keyRIGHT;

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
}
