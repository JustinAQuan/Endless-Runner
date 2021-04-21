class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2, 'GAME MENU');
    }

    update() {
        this.scene.start('playScene');
    }
}