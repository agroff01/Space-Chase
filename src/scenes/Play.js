class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }

    create() {

        //background
        this.starfield = this.add.tileSprite(0,0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield.tilePositionY += 10;
        this.starfieldParalax1 = this.add.tileSprite(0,0, 640, 480, 'starfieldParalax1').setOrigin(0, 0);
        this.starfieldParalax1.tilePositionY += 100;
        this.starfieldParalax2 = this.add.tileSprite(0,0, 640, 480, 'starfieldParalax2').setOrigin(0, 0);
        this.starfieldParalax2.tilePositionY += 400;
        this.starfieldParalax2.alpha = .3;
       
        //player ship setup
        this.pShip = this.physics.add.sprite(game.config.width/3, game.config.height/2, 'starSpeeder').setOrigin(0.5, 0.5);
        this.pShip.body.onCollide = true;      // must be set for collision event to work
        this.pShip.body.onWorldBounds = true;  // ditto for worldbounds
        this.pShip.body.onOverlap = true;      // ditto for overlap
        this.pShip.setDebugBodyColor(0xFFFF00);
        this.pShip.setCollideWorldBounds(true);
        this.pShip.setMaxVelocity(250, 430);
        this.pShip.setDepth(10);
        this.pShip.setBounceY(.55);
        this.pShip.setDrag(500);
        this.SHIP_VELOCITY = 50;

        // Asteroid belt objects
        this.rockGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.rockObject = this.physics.add.sprite(game.config.width, game.config.height/2, "meteor3").setOrigin(.5);
        this.rockObject2 = this.physics.add.sprite(game.config.width, game.config.height/2, "meteor3").setOrigin(.5);

        this.rockGroup.add(this.rockObject);
        this.rockGroup.add(this.rockObject2);
        let meteorColors = [0xCC3367, 0xB3CC33, 0x33CC98, 0x4C33CC];
        this.rockObject.tint = meteorColors[Math.floor(Math.random()* meteorColors.length)];
        this.rockObject.setAccelerationX(-50);
        this.rockObject2.setAccelerationX(-20);


       
        this.timeAlive = 0;
        this.gameSpeed = 0;
        this.difficulty = 1;
        this.speedRamp = .3;
        // this.delayedRamp = this.time.delayedCall(2000, () => {
        //     this.speedRamp = 0;
        // }, null, this);

        // Player Input
        cursors = this.input.keyboard.createCursorKeys();

        // Distance Text
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFF',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.distanceText = this.add.text(game.config.width/2, game.config.height/2 - 200, this.timeAlive, menuConfig).setOrigin(0.5);
    }

    update() {
        this.timeAlive += .1;
        this.distanceText.text = Phaser.Math.FloorTo(this.timeAlive);
        this.pShip.update();
        this.gameSpeed += .005 + this.speedRamp;

        this.starfield.tilePositionX += this.gameSpeed *.1;
        this.starfieldParalax1.tilePositionX += this.gameSpeed + 1;
        this.starfieldParalax2.tilePositionX += this.gameSpeed/2 + 4;
        this.starfieldParalax2.tilePositionY = Math.random() * this.game.config.height;
        this.starfieldParalax2.alpha = .03;


        // player input
        this.direction = new Phaser.Math.Vector2(0);
        if(cursors.up.isDown) {
            this.pShip.body.velocity.y -= (this.SHIP_VELOCITY);
        } else if(cursors.down.isDown) {
            this.pShip.body.velocity.y += (this.SHIP_VELOCITY);
        }
        if(cursors.left.isDown) {
            this.pShip.body.velocity.x -= (this.SHIP_VELOCITY);
        } else if(cursors.right.isDown) {
            this.pShip.body.velocity.x += (this.SHIP_VELOCITY);
        }
        if (this.pShip.x > this.game.config.width/2) this.pShip.x = game.config.width/2;
        if (this.pShip.x < this.game.config.width/4) this.pShip.x = game.config.width/4;
        this.direction.normalize();

        if (!this.shipDamaged) this.physics.add.collider(this.pShip, this.rockGroup, null, this.shipCollision, this);

        if (this.shipDamaged)  this.pShip.alpha = this.shipInvulnerable.elapsed % 1;

    }

    shipCollision(object1, object2) { 
        object1.x -= 100;
        this.shipDamaged = true;
        this.shipInvulnerable = this.time.delayedCall(3000, () => {
            this.shipDamaged = false;
            object1.alpha = 1;
        }, null, this);

        object2.destroy()
        console.log("Ship is object 1");
    }
}

