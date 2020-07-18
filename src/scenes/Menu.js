"use strict"
class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    init(data) {
        //score
        if(data.highScore > 0){
          this.highScore = data.highScore;
        }
        else{this.highScore = 0;}
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_anotherWorld', './assets/Another_World.mp3');
    }

    create(){
        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
        
        this.add.text(320, 65, 'High Score: ' + this.highScore, 
        menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '38px';
        this.add.text(centerX, centerY - textSpacer - 10, 'ROCKET PATROL', 
        menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '28px';
        this.add.text(centerX, centerY, 'Use ←→ arrows to move & (F) to Fire', 
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard',
        menuConfig).setOrigin(0.5);
        
        // display menu text
        //this.add.text(20, 20, "Rocket Patrol Menu");

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 25000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 20000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}
