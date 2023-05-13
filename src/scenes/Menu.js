class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }


        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - 150, 'Space Chase', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '30px';
        this.add.text(game.config.width/2, game.config.height/2, 'Use arrow keys to move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, 'Press UP to Begin', menuConfig).setOrigin(0.5);

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // set up audio
        this.music = this.sound.add('music', { 
            mute: false,
            volume: .4,
            rate: 1,
            loop: true 
        });
        this.music.play();
        
                
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {    
            this.sound.play('confirm', { volume: 0.5 });
            this.scene.start('playScene');    
        }
    }

}

