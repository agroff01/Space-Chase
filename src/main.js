let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Load, Menu, Play, GameOver]
}

let game = new Phaser.Game(config);

// keyboard variables
let keyUP, keyDOWN, key1, key2;
let cursors = null;
let highScore = 0;