let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Menu, Play]
    // bla bla bla
};

let game = new Phaser.Game(config);

// aaaaa