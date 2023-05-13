class Police extends Phaser.Physics.Arcade.Sprite {
   
    constructor(scene, x, y) {

        let idleFrameList = scene.anims.generateFrameNames('police', {
            prefix: 'Police Cruzer',
            start: 1,
            end: 21
        })

        // create animations
        scene.anims.create({
            key: 'idle',
            frames: idleFrameList,
            repeat: -1,
            frameRate: 8
        });
        scene.anims.create({
            key: 'lazer',
            frames: scene.anims.generateFrameNames('police', {
                prefix: 'PoliceCruzerFire',
                start: 1,
                end: 19
            }),
            frameRate: 15
        });

        // call Phaser Physics Sprite constructor
        super(scene, x, y, 'police', 'Police Cruzer1'); 
        this.play('idle', true);

        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setImmovable();
        
    }

    update() {

        this.angle += this.rotateSpeed;

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < 30) {
            this.destroy();
        }
    }
}