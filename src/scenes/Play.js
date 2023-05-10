class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }

    create() {
        this.BALL_VELOCITY = 5000;

        //background
        this.starfield = this.add.tileSprite(0,0, 640, 480, 'starfield').setOrigin(0, 0);

        this.starfieldParalax1 = this.add.tileSprite(0,0, 640, 480, 'starfieldParalax1').setOrigin(0, 0);
        this.starfieldParalax1.tilePositionY += 100;

        this.starfieldParalax2 = this.add.tileSprite(0,0, 640, 480, 'starfieldParalax2').setOrigin(0, 0);
        this.starfieldParalax2.tilePositionY += 400;
        this.starfieldParalax2.alpha = .3;
       

        this.pShip = this.physics.add.sprite(game.config.width/3, game.config.height/2, 'starSpeeder').setOrigin(0.5, 0.5);
        this.pShip.body.onCollide = true;      // must be set for collision event to work
        this.pShip.body.onWorldBounds = true;  // ditto for worldbounds
        this.pShip.body.onOverlap = true;      // ditto for overlap
        this.pShip.setDebugBodyColor(0xFFFF00);
        this.pShip.setCollideWorldBounds(true);
        this.pShip.setMaxVelocity(0,1000);
        this.pShip.setDepth(10);  


        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.timeAlive = 0;

        // Player Input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.timeAlive += .0001;
        this.pShip.update();

        this.starfieldParalax1.tilePositionX += this.timeAlive + 30;
        this.starfieldParalax2.tilePositionX += this.timeAlive + 40;
        this.starfieldParalax2.alpha = this.timeAlive*.003;


        // player input
        this.direction = new Phaser.Math.Vector2(0);
        if(cursors.up.isDown) {
            this.direction.y = -1;
        } else if(cursors.down.isDown) {
            this.direction.y = 1;
        }
        this.direction.normalize();
        this.pShip.setAccelerationY(this.direction.y * this.BALL_VELOCITY);
    }
}