class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2, 'GAME MENU').setOrigin(0.5, 0);

        this.time.delayedCall(1000, () => {
            this.scene.start('playScene', {highscore: 0});
        }, null, this);
    }
}