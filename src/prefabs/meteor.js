class Meteor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed = 10) {
        super(scene, x, y, texture, frame);


    }

    update(){
        if (this.y < this.width) this.destroy();
    }
}