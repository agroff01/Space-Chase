class Police extends Phaser.Physics.Arcade.Sprite {
   
    constructor(scene, x, y, randomNumber = Math.random()) {

        

        // call Phaser Physics Sprite constructor
        super(scene, x, y, 'police', 'Police Cruzer1'); 

        // reference for current scene
        this.myScene = scene;

        // randomize idle swaying
        
        this.playAfterDelay('idle', Math.floor(randomNumber * 6000));
        

        

        // set up physics sprite
        this.myScene.add.existing(this);    // add to existing this.myScene, displayList, updateList
        this.myScene.physics.add.existing(this);    // add to physics system
        this.setImmovable();
        this.body.onOverlap = true;

        this.isFiring = false;

        
    }


    fireLazer(){
        this.play('fire', true);

        this.myScene.time.delayedCall(650, () => {
            this.isFiring = true;
        }, null, this);

        this.myScene.time.delayedCall(1000, () => {
            this.isFiring = false;
        }, null, this);

        this.myScene.time.delayedCall(2000 + (Math.random() * 5000), () => {
            this.play('idle', true);
        }, null, this);
    }
}