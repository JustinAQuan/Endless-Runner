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

        // load squirrel
        this.load.image('squirrel', './assets/Squirrel_final.png');
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

         // adds Earth floor
         scene.floor = scene.add.tileSprite(
            0,
            game.config.height - game.config.height / 5,
            game.config.width,
            game.config.height / 5,
            'earth_floor'
        ).setOrigin(0, 0);

        scene.squirrel = scene.physics.add.sprite(
            game.config.width / 2,
            game.config.height - game.config.height / 5,
            'squirrel'
        ).setOrigin(0.5, 1);

        this.time.delayedCall(2000, () => {
            scene.squirrel.setVelocityX(200);
        }, null, this);

        this.time.delayedCall(50, () => {
            this.add.text(game.config.width / 2, game.config.height / 1.5, 'Press any key to start').setOrigin(0.5);
            this.input.keyboard.on('keydown', () => {
                this.scene.start('playScene', {highscore: 0});
            }, this)
        }, null, this);
    }
}