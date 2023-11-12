var FlappyBird = window.FlappyBird || {};

// Global variables
var score = 0;
var scored = false;
var closestHole = 3;
var cycles = 0;

const NEURONS = 6;
 
const hiddenLayer = tf.layers.dense({
    units: NEURONS,
    inputShape: [2],
    activation: 'sigmoid',
    kernelInitializer: 'leCunNormal',
    useBias: true,
    biasInitializer: 'randomNormal',
});
 
const outputLayer = tf.layers.dense({
    units: 1,
});


var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 490,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: Menu
};

FlappyBird.game = new Phaser.Game(config);
FlappyBird.game.scene.add('Main', Main, false);
FlappyBird.game.scene.add('Menu', Menu, false);