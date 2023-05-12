class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
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
        this.add.text(game.config.width/2, game.config.height/2 - 200, 'Space Chase', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use arrow keys to move', menuConfig).setOrigin(0.5);

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
                
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {          
          this.scene.start('playScene');    
        }
    }

}

