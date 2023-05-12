class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
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
        this.add.text(game.config.width/2, game.config.height/2 - 200, 'Game Over!', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '30px';
        this.add.text(game.config.width/2, game.config.height/2, 'Press → to restart', menuConfig).setOrigin(0.5);

        // define keys
        cursors = this.input.keyboard.createCursorKeys();

        console.log(" death scene finished")        
    }

    update() {
        console.log("update started");
        if ((cursors.right.isDown)) {          
          this.scene.start('playScene');
        }

        console.log("update finished");
    }

}

