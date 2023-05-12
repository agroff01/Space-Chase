class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, game.config.height/2, game.config.width * value, 10);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        //load images
        this.load.image('starfield', 'starfield.png');
        this.load.image('blueB', 'blueBackground.png');
        this.load.image('starfieldParalax1', 'starfield2.png');
        this.load.image('starfieldParalax2', 'starfield3.png');
        this.load.image('starSpeeder', 'starSpeeder.png');
        this.load.image('meteor1', 'Meteor1.png');
        this.load.image('meteor2', 'Meteor2.png');
        this.load.image('meteor3', 'Meteor3.png');
        this.load.image('meteor4', 'Meteor4.png');

        // load font
        //this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml');
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}