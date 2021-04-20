class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
    }

    create() {
        this.add.rectangle(0, 0, 50, 50, 0x666666).setOrigin(0, 0);
    }

    update() {

    }
}