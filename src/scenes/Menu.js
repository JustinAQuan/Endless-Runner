class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
    }

    create() {
<<<<<<< HEAD
        Player = this.add.rectangle(0, 0, 50, 50, 0x666666).setOrigin(0, 0);
=======
        this.add.rectangle(0, 0, 50, 50, 0x666666).setOrigin(0, 0);
>>>>>>> 731a870cc406cc9792adf0fefd244a1f5ec16f40
    }

    update() {

    }
}