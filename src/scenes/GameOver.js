class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 3, 'GAME OVER').setOrigin(0.5, 0);

        // print message
        this.add.text(game.config.width / 2, game.config.height / 2, 'Press any key to restart').setOrigin(0.5);

        // monitor *any* key down...
        this.input.keyboard.on('keydown', () => {
            this.scene.start('playScene');   // ...and switch scenes
        }, this);   // <-- note `this` allows you to pass current context to the event
    }
}