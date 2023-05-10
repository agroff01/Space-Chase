class PlayerShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed = 10) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = speed;
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