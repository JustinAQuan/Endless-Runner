class Cutscene extends Phaser.Scene {
    constructor() {
        super('playCutscene');
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2, 'Cutscene').setOrigin(0.5, 0);

        this.time.delayedCall(5000, () => {
            this.scene.start('playScene');
        }, null, this);
    }
}