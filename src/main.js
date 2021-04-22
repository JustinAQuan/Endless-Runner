/********************************************************************
Collaborator Names: 
    Justin Quan
    Michelle Lytle
    Thea Knasiak
s;kfljanflas;dk
Game Title:
    Untitled

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
    width: 1200,
    height: 600,
    scale: {
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Menu, Cutscene, Play, GameOver]
};

let game = new Phaser.Game(config);