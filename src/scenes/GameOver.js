class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER').setOrigin(0.5, 0);
    }
}