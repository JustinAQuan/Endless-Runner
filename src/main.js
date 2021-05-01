/********************************************************************
Collaborator Names: 
    Justin Quan
    Michelle Lytle
    Thea Knasiak
    Divyansh Khare

Game Title:
    Corgi Game Something

Date Completed:
    TBD

Creative Tilt Justification:
1)  do something technically interesting?
    Are you particularly proud of a programming technique you implemented?
    Did you look beyond the class examples and learn how to do something new? (5)

2)  ...have a great visual style?
    Does it use music or art that you're particularly proud of?
    Are you trying something new or clever with the endless runner form? (5)
********************************************************************/

let config = {
    type: Phaser.AUTO,

    // width and height of canvas
    width: 960,
    height: 540,

    // makes sure canvas is in the center of the screen
    scale: {
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    // set scenes
    scene: [Menu, Cutscene, Play, GameOver],

    // adds physics
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
};

let game = new Phaser.Game(config);

// global game options
let gameOptions = {
    obstacleSpeed: 350,
    spawnRange: [500, 600],
    playerGravity: 900,
    jumpForce: 400,
    jumps: 2
}
// parallax speeds 
let back_speed = 1;
let mid_speed = 2;
let fore_speed = 3;
let ground_speed = 4;

// if current scene is earth or space 
let isEarth = false;

// initialize score
let p1Score = 0;
let scoreMulti = 1;
