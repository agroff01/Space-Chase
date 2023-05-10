let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Load, Menu, Play]
}

let game = new Phaser.Game(config);

// keyboard variables
let keyUP, keyDOWN, key1, key2;
let cursors = null;