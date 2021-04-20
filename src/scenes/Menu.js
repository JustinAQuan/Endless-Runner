class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
    }

    create() {
        this.Player = new Rectangle(this, game.config.width/2, game.config.height/2, 50, 50, 0x666666).setOrigin(0, 0);
    }

    update() {

    }
}