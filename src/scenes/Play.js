class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }

    create() {

        //background
        this.starfield = this.add.tileSprite(0,0, 640, 480, 'starfield').setOrigin(0, 0);
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
        this.pShip.setMaxVelocity(0,1000);
        this.pShip.setDepth(10);
        this.pShip.setBounceY(.55);
        this.pShip.setDragY(500);
        this.SHIP_VELOCITY = 50;

        // Asteroid belt objects



       
        this.timeAlive = 0;
        this.gameSpeed = 20

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
        this.gameSpeed += .001;

        this.starfieldParalax1.tilePositionX += this.gameSpeed + 1;
        this.starfieldParalax2.tilePositionX += this.gameSpeed + 4;
        this.starfieldParalax2.alpha = this.gameSpeed*.03;


        // player input
        this.direction = new Phaser.Math.Vector2(0);
        if(cursors.up.isDown) {
            this.pShip.body.velocity.y -= (this.SHIP_VELOCITY);
        } else if(cursors.down.isDown) {
            this.pShip.body.velocity.y += (this.SHIP_VELOCITY);
        }
        this.direction.normalize();
        
    }
}