class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }

    create() {

        //background
        this.starfield = this.add.tileSprite(0,0, game.config.width, game.config.height, 'blueB').setOrigin(0, 0);
        this.starfield.tilePositionY += 10;
        this.starfield.alpha = .7;
        this.starfieldParalax1 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'starfieldParalax1').setOrigin(0, 0);
        this.starfieldParalax1.tilePositionY += 100;
        this.starfieldParalax2 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'starfieldParalax2').setOrigin(0, 0);
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
        this.shipDamaged = false;
        this.SHIP_VELOCITY = 50;

        this.shipLife = 1;

        // Asteroid belt objects
        this.rockGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });


        //rock spawner
        this.rockSpawnDelay = this.time.addEvent({ delay: 1000, callback: () => {this.addMeteor();}, callbackScope: this, loop: true });


       
        this.timeAlive = 0;
        this.gameSpeed = 0;
        this.difficulty = 1;
        this.speedRamp = .3;
        this.delayedRamp = this.time.delayedCall(2000, () => {
            this.speedRamp = 0;
        }, null, this);

        // Player Input
        cursors = this.input.keyboard.createCursorKeys();

        // Distance Text
        let textUIConfig = {
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
        this.distanceText = this.add.text(game.config.width/2, game.config.height/2 - 200, this.timeAlive, textUIConfig).setOrigin(0.5);

        this.livesLeft = this.add.text(50, 20, "Lives Left: " + this.shipLife, textUIConfig).setOrigin(0);
    }

    update() {
        this.timeAlive += .1;
        this.distanceText.text = Phaser.Math.FloorTo(this.timeAlive);
        this.pShip.update();
        this.gameSpeed += .005 + this.speedRamp;
        if (this.timeAlive > 250) this.rockSpawnDelay.timeScale = this.timeAlive / 250;

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

        // Check for Failure
        if (this.shipLife < 0){
            this.distanceText.destroy();
            this.livesLeft.destroy();
            
            // start next scene
            this.scene.start('gameOver');
        }

        // if ship is hit
        if (this.shipDamaged) this.pShip.alpha = this.shipInvulnerable.elapsed % 1;
        this.physics.add.collider(this.pShip, this.rockGroup, null, this.shipCollision, this);

        
        
    }

    shipCollision(object1, object2) { 
        
        if (!this.shipDamaged){
            object1.x -= 30;
            this.shipLife--;
            this.livesLeft.text = "Lives Left: " + this.shipLife;
            this.shipDamaged = true;
            this.shipInvulnerable = this.time.delayedCall(3000, () => {
                this.shipDamaged = false;
                object1.alpha = 1;
            }, null, this);
        }
        object2.destroy()        
    }

    addMeteor(){
        console.log("created");
        let tempMeteor = new Meteor(this, 40);
        this.rockGroup.add(tempMeteor);
        tempMeteor.setAccelerationX(-50 * Math.log(10+ this.timeAlive/100) * (.5 + (Math.random()*1.5)));
    }
}

