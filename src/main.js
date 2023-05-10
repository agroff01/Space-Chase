let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 800,
    scene: [Load, Menu, Play]
}

let game = new Phaser.Game(config);

// keyboard variables
let keyUP, keyDOWN, key1, key2;