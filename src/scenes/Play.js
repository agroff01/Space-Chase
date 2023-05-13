class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }

    create() {

        //background
        this.starfieldParalax1 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'starfieldParalax1').setOrigin(0, 0);
        this.starfieldParalax1.tilePositionY += 100;
        this.starfieldParalax2 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'starfieldParalax2').setOrigin(0, 0);
        this.starfieldParalax2.tilePositionY += 400;
        this.starfieldParalax2.alpha = .3;
        this.starfield = this.add.tileSprite(0,0, game.config.width, game.config.height, 'blueB').setOrigin(0, 0);
        this.starfield.tilePositionY += 10;
        this.starfield.alpha = .7;
       
        //player ship setup
        this.pShip = this.physics.add.sprite(game.config.width/3, game.config.height/2, 'starSpeeder').setOrigin(0.5, 0.5);
        this.pShip.body.onCollide = true;      // must be set for collision event to work
        this.pShip.body.onWorldBounds = true;  // ditto for worldbounds
        this.pShip.body.onOverlap = true;      // ditto for overlap
        this.pShip.setDebugBodyColor(0xFFFF00);
        this.pShip.setCollideWorldBounds(true);
        this.pShip.setMaxVelocity(250, 430);
        this.pShip.setDepth(10);
        this.pShip.setBounceY(.3);
        this.pShip.setDrag(900);
        this.shipDamaged = false;
        this.pShip.body.onOverlap = true;
        this.SHIP_VELOCITY = 50;

        this.shipLife = 10;
        

        // create animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('police', {
                prefix: 'Police Cruzer',
                start: 1,
                end: 21
            }),
            repeat: -1,
            frameRate: 8,
            repeatDelay: 3000
        });
        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNames('police', {
                prefix: 'PoliceCruzerFire',
                start: 1,
                end: 19
            }),
            frameRate: 15
        });

        // Police Instances
        this.cruzers = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.cruzers.add(new Police(this, 5, 50).setOrigin(0, .5));
        this.cruzers.add(new Police(this, 5, game.config.height/2 - 100).setOrigin(0, .5));
        this.cruzers.add(new Police(this, 5, game.config.height/2).setOrigin(0, .5));
        this.cruzers.add(new Police(this, 5, game.config.height/2 + 100).setOrigin(0, .5));
        this.cruzers.add(new Police(this, 5, game.config.height - 50).setOrigin(0, .5));


        // Asteroid belt objects
        this.rockGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });


        //rock spawner
        this.rockSpawnDelay = this.time.addEvent(
            {   delay: 1000, 
                callback: () => {this.addMeteor();},
                callbackScope: this,
                loop: true 
            });


       
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
        this.distanceText = this.add.text(game.config.width/2, game.config.height/2 - 200, this.timeAlive + "Lu", textUIConfig).setOrigin(0.5 );

        this.livesLeft = this.add.text(game.config.width - 300, 20, "Lives Left: " + this.shipLife, textUIConfig).setOrigin(0);
    }

    update() {
        this.timeAlive += .1;
        this.distanceText.text = Phaser.Math.FloorTo(this.timeAlive) + " Lu";
        this.pShip.update();
        this.gameSpeed += .005 + this.speedRamp;
        if (this.timeAlive > 250) this.rockSpawnDelay.timeScale = this.timeAlive / 250;

        this.starfield.tilePositionX += this.gameSpeed *.1;
        this.starfieldParalax1.tilePositionX += this.gameSpeed + 1;
        this.starfieldParalax2.tilePositionX += this.gameSpeed/3 + 4;
        this.starfieldParalax2.alpha += this.speedRamp/2;

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
        if (this.pShip.x > 625) this.pShip.x = 625;
        if (this.pShip.x < this.game.config.width/4) this.pShip.x = game.config.width/4;
        this.direction.normalize();

        // Check for Failure
        if (this.shipLife < 0){
            this.distanceText.destroy();
            this.livesLeft.destroy();

            if (Math.floor(this.timeAlive) > highScore){
                highScore = Math.floor(this.timeAlive);
            }
            
            // start next scene
            this.scene.start('gameOver');
        }

        // if ship is hit
        if (this.shipDamaged) this.pShip.alpha = this.shipInvulnerable.elapsed % 1;
        this.physics.add.collider(this.pShip, this.rockGroup, null, this.shipCollision, this);
        this.physics.overlap(this.cruzers, this.pShip, null, this.shipLazerOverlap, this);

        
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
    
    shipLazerOverlap(obj1, obj2){
        if (Math.random() < (.001 * this.timeAlive/20) && obj1.anims.currentAnim.key != 'fire'){
            obj1.fireLazer();
        }
        else if(obj1.isFiring && !this.shipDamaged){

            this.shipLife--;
            this.livesLeft.text = "Lives Left: " + this.shipLife;
            this.shipDamaged = true;
            this.shipInvulnerable = this.time.delayedCall(3000, () => {
                this.shipDamaged = false;
                obj2.alpha = 1;
            }, null, this);
        }
    }

    addMeteor(){
        let tempMeteor = new Meteor(this, 40);
        this.rockGroup.add(tempMeteor);
        tempMeteor.setAccelerationX(-50 * Math.log(10+ this.timeAlive/100) * (.5 + (Math.random()*1.5)));
    }
}

