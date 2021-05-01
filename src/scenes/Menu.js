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

        // menu select sound effect
        this.load.audio(
            'menu_sfx', 
            './assets/menu_sfx.wav'
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
                volume: 0.3,
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

        // starts after pressing any key 
        this.input.keyboard.on('keydown', () => {
            this.menu_bgm.stop();
            this.sound.play('menu_sfx'); // plays menu sfx
            // skips cutscene for testing
            this.scene.start('playScene'); 
            //this.scene.start('playCutscene'); // starts game 
        }, this);
    }
}