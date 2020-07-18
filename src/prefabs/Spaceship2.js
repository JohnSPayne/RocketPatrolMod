// Spaceship2 prefab
class Spaceship2 extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);

        // store pointValue
        this.points = pointValue;
    }

    update() {
        // move spaceship2 right
        this.x += game.settings.spaceshipSpeed;
        // wraparound from right to left edge
        if(this.x >= game.config.width){
            this.x = 0-63;
        }
    }

    reset() {
        this.x = 0-63;
    }
        
}