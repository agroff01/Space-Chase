class Menu extends Phaser.Scene {
    constructor() {
        super("mainMenu");
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
        cursors = this.input.keyboard.createCursorKeys();

        
        this.sound.play('music', { 
            mute: false,
            volume: .4,
            rate: 1,
            loop: true 
        });        
                
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {    
            this.sound.play('confirm', { volume: 0.5 });
            this.scene.start('playScene');    
        }
        if (cursors.down.isDown) {
            this.sound.play('confirm', { volume: 0.7 });     
            this.scene.start('credits');
        }
    }

}

