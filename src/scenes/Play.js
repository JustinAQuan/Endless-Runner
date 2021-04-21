class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('Player', './assets/player.png');
        this.load.image('Floor', './assets/floor.png');
    }

    create() {
        // adds floor
        this.floor = this.add.tileSprite(0, game.config.height - game.config.height / 5, game.config.width, game.config.height / 5, 'Floor').setOrigin(0, 0);
        
        // adds player sprite
        this.Player = new Player(this, game.config.width / 5, game.config.height - game.config.height / 5, 'Player', 0);
    }

    update() {
        this.floor.tilePositionX += 2;
    }
}