class Meteor extends Phaser.Physics.Arcade.Sprite {
    // constructor(scene, x, y, texture, frame, speed = 10) {
    //     super(scene, x, y, texture, frame);


    // }

    // update(){
    //     if (this.y < this.width) this.destroy();
    // }

    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + 40, Phaser.Math.Between(50/2, game.config.height - 50/2), 'meteor2'); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();
        let meteorColors = [0xCC3367, 0xB3CC33, 0x33CC98, 0x4C33CC];
        this.tint = meteorColors[Math.floor(Math.random()* meteorColors.length)];
    }

    update() {

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < 30) {
            this.destroy();
        }
    }
}