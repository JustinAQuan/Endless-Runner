class Cutscene extends Phaser.Scene {
    constructor() {
        super('playCutscene');
    }

    preload() {
        // preload background
        this.load.image('earth_floor', './assets/earth_bg4.png');
        this.load.image('earth_bg1', './assets/earth_bg1.png');
        this.load.image('earth_bg2', './assets/earth_bg2.png');
        this.load.image('earth_bg3', './assets/earth_bg3.png');
    }

    create() {
        let scene = this;

        // adds earth background 
        scene.earth_bg3 = scene.add.tileSprite(
            0, 
            0, 
            960,
            540,
            'earth_bg3'
        ).setOrigin(0, 0);

        scene.earth_bg2 = scene.add.tileSprite(
            0, 
            0, 
            960,
            540,
            'earth_bg2'
        ).setOrigin(0, 0);

        scene.earth_bg1 = scene.add.tileSprite(
            0, 
            0, 
            960,
            540,
            'earth_bg1'
        ).setOrigin(0, 0);

         // adds space floor
         scene.floor = scene.add.tileSprite(
            0,
            game.config.height - game.config.height / 5,
            game.config.width, game.config.height / 5,
            'earth_floor'
        ).setOrigin(0, 0);

        // this.time.delayedCall(10000, () => {
        //     this.scene.start('playScene', {highscore: 0});
        // }, null, this);
    }
}