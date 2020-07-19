//Student Name: John Payne(1724413)

//Points Breakdown: 
//Track a high score that persists across scenes and display it in the UI (10)

//Implement the 'FIRE' UI text from the original game (10)

//Add your own (copyright-free) background music to the Play scene (10)
//https://freemusicarchive.org/search?adv=1&quicksearch=space&&

//Implement the speed increase that happens after 30 seconds in the original game (10)

//Randomize each spaceship's movement direction at the start of each play (10)

//Create a new scrolling tile sprite for the background (10)

//Allow the player to control the Rocket after it's fired (10)

//Create 4 new explosion SFX and randomize which one plays on impact (15)

//Display the time remaining (in seconds) on the screen (15)
"use strict"
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    autoCenter: true,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// reserve some keyboard bindings
let keyF, keyLEFT, keyRIGHT, keyDOWN;

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
}

