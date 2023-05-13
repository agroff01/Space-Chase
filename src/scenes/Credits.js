class Credits extends Phaser.Scene {
    constructor() {
        super("credits");
    }

    create() {

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            color: '#F3C363',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }


        // show menu text
        this.add.text(game.config.width/2, 110, 'All art assets are self made.', menuConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, 110 + 80, 'Audio:', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '16px';
        this.add.text(game.config.width/2, 110 + 130, '\'UI Confirmation\' by InspectorJ: https://freesound.org/people/InspectorJ/sounds/403014/', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 110 + 160, '\'lazer 01\' by nomiqbomi: https://freesound.org/people/nomiqbomi/sounds/651023/', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 110 + 190, '\'boom - deep & long\' by Joshua Chivers: https://uppbeat.io/browse/sfx/booms', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 110 + 220, '\'boom futuristic sci-fi glitch\' by Tomas Herudek: https://uppbeat.io/browse/sfx/booms', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 110 + 250, '\'Labyrinth\' by Sky Toes: https://uppbeat.io/t/sky-toes/labyrinth', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height - 40, 'Press Up To Return To The Main Menu', menuConfig).setOrigin(0.5);



        // define keys
        cursors = this.input.keyboard.createCursorKeys();
        
                
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {    
            this.sound.play('confirm', { volume: 0.5 });
            this.scene.start('mainMenu');    
        }
    }

}

