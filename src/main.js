/********************************************************************
Collaborator Names: 
    Justin Quan
    Michelle Lytle
    Thea Knasiak
    Divyansh Khare

Game Title:
    Cute Corgi Chase

Date Completed:
    5/3/21 

Creative Tilt Justification:
    1)  We added a teleportation mechanic to the game, where the player switches between Earth and space. 
        We had to figure out how to switch things like the art, obstacles, and physics between the two locations. 
        The player teleports by pressing the right arrow key when they are near a monolith. 
        This code is in Play.js around line 428, and other code involved uses the Boolean values isEarth and canTeleport. 

    2)  We challenged ourselves to work on parts of the game that we don't have a lot of experience in, 
        such as with the player animation and the background music and sound effects. 

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
    slowObstacleSpeed: 240,
    spawnRange: [500, 600],
    playerGravityEarth: 1500,
    playerGravitySpace: 900,
    jumpForce: 400,
    jumpsEarth: 1,
    jumpsSPace: 2
}
// parallax speeds 
let back_speed = 1;
let mid_speed = 2;
let fore_speed = 3;
let ground_speed = 4;

// if current scene is earth or space 
let isEarth = true;

// initialize score
let p1Score = 0;
let scoreMulti = 1;
let p1MonolithScore = 0;
