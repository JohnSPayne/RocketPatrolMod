"use strict"
class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield2.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', 
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // music
        this.music = this.sound.add('sfx_anotherWorld');
        this.music.loop = true;
        this.music.play();

        // place tile sprite bg
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 
            'rocket', 0).setScale(0.5, 0.5).setOrigin(0, 0);

        // add spaceships (x3) + random direction
        if(Phaser.Math.Between(0, 1) == 0){
            this.ship01 = new Spaceship(this, game.config.width + 192, 132, 
                'spaceship', 0, 30).setOrigin(0, 0);
        }else{
            this.ship01 = new Spaceship2(this, 0 - 192 - 63, 132, 
            'spaceship', 0, 30).setOrigin(0, 0).setFlipX(180);
        }
        if(Phaser.Math.Between(2, 3) == 3){
            this.ship02 = new Spaceship(this, game.config.width + 96, 196, 
                'spaceship', 0, 20).setOrigin(0, 0);
        }else{
            this.ship02 = new Spaceship2(this, 0 - 96 - 63, 196, 
                'spaceship', 0, 20).setOrigin(0, 0).setFlipX(180);
        }
        if(Phaser.Math.Between(4, 5) == 4){
            this.ship03 = new Spaceship(this, game.config.width, 260, 
                'spaceship', 0, 10).setOrigin(0, 0);
        }else{
            this.ship03 = new Spaceship2(this, 0-63, 260, 
                'spaceship', 0, 10).setOrigin(0, 0).setFlipX(180);
        }

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, 
            end: 9, first: 0}),
            frameRate: 30
        });

        // score
        this.p1Score = 0;

        // score display
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            fontStyle: '',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        if(this.highScore > 0){
            this.highScore = this.highScore;
        }
        else {this.highScore = 0;}

        this.scoreLeft = this.add.text(69, 54, this.p1Score, this.scoreConfig);
        this.add.text(330, 54, 'High Score:', this.scoreConfig);
        this.add.text(530, 54, this.highScore, this.scoreConfig);
        this.FIRE = this.add.text(250, 54, 'FIRE', this.scoreConfig);

        // speed up halfway gametime
        this.timedEvent2 = this.time.delayedCall(game.settings.gameTimer/2, 
            onEvent2, [], this);
        function onEvent2 ()
        {
            game.settings.spaceshipSpeed *= 2;
        }

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        this.scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 
                'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 
                '(F)ire to Restart or ↓ for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    
        // time remaining, source and credit: https://phaser.discourse.group/t/countdown-timer/2471/4
        this.timeLeft = game.settings.gameTimer / 1000;
        this.scoreConfig.color = 'red';
        this.scoreConfig.backgroundColor = '';
        this.scoreConfig.fontStyle = 'bold';
        this.scoreConfig.fontSize = '38px',
        this.timeLeft2 = this.add.text(140, 50, this.timeLeft, this.scoreConfig);
        this.scoreConfig.fontSize = '28px',
        this.scoreConfig.fontStyle = '';
        this.scoreConfig.backgroundColor = '#F3B141';
        this.scoreConfig.color = '#843605';
        
        //this.text = this.add.text(62, 62, formatTime(this.timeLeft));
        this.timedEvent = this.time.addEvent({ 
            delay: 1000, 
            callback: onEvent, 
            callbackScope: this, 
            loop: true, 
        });
        /*function formatTime(seconds){
            // Minutes
            var minutes = Math.floor(seconds/60);
            // Seconds
            var partInSeconds = seconds%60;
            // Adds left zeros to seconds
            partInSeconds = partInSeconds.toString().padStart(2,'0');
            // Returns formated time
            return `${minutes}:${partInSeconds}`;
        }*/
        function onEvent ()
        {
            if(!this.gameOver){
                this.timeLeft -= 1; // One second
            }
            this.timeLeft2.setText(this.timeLeft);
        }
    }

    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            game.settings.spaceshipSpeed /= 2;
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("menuScene", {highScore: this.highScore});
            this.music.stop();
        }
        
        // scroll tile sprite
        this.starfield.tilePositionY -= 2;

        if (!this.gameOver) {
        // update rocket
        this.p1Rocket.update();
        // update spaceships (x3)
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            }else {
                return false;
            }
    }

    shipExplode(ship) {
        // FIRE Blink: Source: https://labs.phaser.io/edit.html?src=src/time\timer%20event.js
        this.FIRE.visible = !this.FIRE.visible; 
        this.timedEvent = this.time.delayedCall(100, onEvent, [], this);
        function onEvent ()
        {
            this.FIRE.visible = !this.FIRE.visible;
        }
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        })
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        switch(Phaser.Math.Between(1, 5)){
            case 1:
                this.sound.play('sfx_explosion');
                break;
            case 2:
                this.sound.play('sfx_explosion2');
                break;
            case 3:
                this.sound.play('sfx_explosion3');
                break;
            case 4:
                this.sound.play('sfx_explosion4');
                break;
            case 5:
                this.sound.play('sfx_explosion5');
                break;
        }
        if (this.highScore < this.p1Score){
            this.highScore = this.p1Score;
            this.add.text(530, 54, this.highScore, this.scoreConfig);
        }
    }
}