class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }

    preload(){
        

        this.timeAlive = 0;
    }

    create() {
        //background
        this.starfield = this.add.tileSprite(0,0, 640, 480, 'starfield').setOrigin(0, 0);

        this.starfieldParalax1 = this.add.tileSprite(0,0, 640, 480, 'starfieldParalax1').setOrigin(0, 0);
        this.starfieldParalax1.tilePositionY += 100;

        this.starfieldParalax2 = this.add.tileSprite(0,0, 640, 480, 'starfieldParalax2').setOrigin(0, 0);
        this.starfieldParalax2.tilePositionY += 400;
        this.starfieldParalax2.alpha = .3;
       

        this.pShip = new PlayerShip(this, game.config.width/3, game.config.height/2, 'starSpeeder').setOrigin(0.5, 0.5);

        
    }

    update() {
        this.timeAlive += .0001;
        this.pShip.update();

        this.starfieldParalax1.tilePositionX += this.timeAlive + 30;
        this.starfieldParalax2.tilePositionX += this.timeAlive + 40;
        this.starfieldParalax2.alpha = this.timeAlive*.003;
    }
}