// Name: Alex Groff
// Game: Space Chase
// Approx Hours: 16 hours
// Creative Tilt:
//         -Technical: To show that the player has been hit and is temporarily invulrable, I have the sprite's alpha value rapidly fluctuate on every game update. Simple, but effective! 
//                     I also made the metors randomly choose their own sprite and color from an array every time one was spawned.
//         -Visual Style: Im particularly proud of the animations for the police cruzers and their lazer shots at the player. Animation is something I've never really tried to do before.

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
    scene: [Load, Menu, Play, GameOver, Credits]
}

let game = new Phaser.Game(config);

// keyboard variables
let keyUP, keyDOWN, key1, key2;
let cursors = null;
let highScore = 0;