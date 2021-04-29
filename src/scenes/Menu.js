class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // menu background music 
        this.load.audio(
            'menu_bgm', 
            './assets/menu_bgm.wav'
        );

        // menu image 
        this.load.image(
            'corgiMenuArt', 
            './assets/corgiMenuArt.png'
        );
        
    }

    create() {
        this.menu_bgm = this.sound.add(
            'menu_bgm', 
            {
                volume: 1,
                loop: true
            }
        );

        // plays space background music
        this.menu_bgm.play();

        this.corgiMenuArt = this.add.image(
            0, 
            0, 
            'corgiMenuArt'
        ).setOrigin(0, 0);

        this.add.text(game.config.width / 2, game.config.height / 2, 'GAME MENU').setOrigin(0.5, 0);

        this.time.delayedCall(1000, () => {
            this.scene.start('playCutscene');
        }, null, this);
    }
}