let config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [Load, Menu, Play, GameOver]
}

let game = new Phaser.Game(config);

// keyboard variables
let keyUP, keyDOWN, key1, key2;
let cursors = null;
let highScore = 0;