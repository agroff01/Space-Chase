class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    create() {

        let textConfig = {
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
        this.add.text(game.config.width/2, game.config.height/2 - 200, 'Game Over!', textConfig).setOrigin(0.5);
        textConfig.fontSize = '30px';
        this.add.text(game.config.width/2, game.config.height/2, 'Your Highscore is: ' + highScore, textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press UP to restart', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press DOWN for Credits', textConfig).setOrigin(0.5);

        // define keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (cursors.up.isDown) {     
            this.sound.play('confirm', { volume: 0.7 });     
            this.scene.start('playScene');
        }
        if (cursors.down.isDown) {
            this.sound.play('confirm', { volume: 0.7 });     
            this.scene.start('credits');
        }

    }

}

