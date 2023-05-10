class PlayerShip extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed = 10) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = speed;
        this.setDebugBodyColor(0xFFFF00);
        this.setCollideWorldBounds(true);
        this.setDepth(10);
    }

    update(){
        if (keyUP.isDown) {
            this.y -= this.moveSpeed;
            console.log("moving up");
        }
        if (keyDOWN.isDown) {
            this.y += this.moveSpeed;
            console.log("Moving down");
        } 
    }
}