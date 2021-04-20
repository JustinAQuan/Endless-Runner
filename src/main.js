let config = {
    type: Phaser.CANVAS,
    scale: {
        parent: 'yourgamediv',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    scene: [Menu, Play]
};

let game = new Phaser.Game(config);