class Meteor extends Phaser.Physics.Arcade.Sprite {
    // constructor(scene, x, y, texture, frame, speed = 10) {
    //     super(scene, x, y, texture, frame);


    // }

    // update(){
    //     if (this.y < this.width) this.destroy();
    // }

    constructor(scene, velocity) {

        let meteorAssets = ['meteor1', 'meteor2', 'meteor3', 'meteor4'];
        let meteorName = meteorAssets[Math.floor(Math.random()* meteorAssets.length)];
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + 40, Phaser.Math.Between(0, game.config.height), meteorName); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();
        let meteorColors = [0xCCCC67, 0xB3CCCC, 0xCCCC98, 0x4CCCCC, 0xFFFFFF];
        this.tint = meteorColors[Math.floor(Math.random()* meteorColors.length)];
        this.angle = Math.random() * 360;
        this.rotateSpeed = (Math.random() * 4) - 2;
    }

    update() {

        this.angle += this.rotateSpeed;

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < 30) {
            this.destroy();
        }
    }
}