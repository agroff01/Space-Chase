let config = {
    type: Phaser,
    width: 800,
    height: 500,
    scene: [Load, Play]
}

let game = new Phaser.Game(config);

// keyboard variables
let keyUP, keyDown;