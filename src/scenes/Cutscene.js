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

        // texture atlas
        this.load.atlas('squirrel_anims', './assets/squirrel_anims.png', './assets/squirrel_anims.json');
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

        this.anims.create({
            key: 'squirrel running',
            frames: this.anims.generateFrameNames('squirrel_anims', {prefix: 's_run', end: 1, zeroPad: 2}),
            repeat: -1,
            frameRate: 12
        });

        this.anims.create({
            key: 'squirrel sit',
            frames: this.anims.generateFrameNames('squirrel_anims', {prefix: 's_sit', end: 0, zeroPad: 2} ),
            repeat: -1,
            frameRate: 1
        });

        scene.squirrel = scene.physics.add.sprite(
            game.config.width / 2,
            game.config.height - game.config.height / 5,
            'squirrel sit'
        ).setOrigin(0.5, 1);

        scene.squirrel.play('squirrel sit');

        this.time.delayedCall(2000, () => {
            scene.squirrel.setVelocityX(200);
            scene.squirrel.play('squirrel running');
        }, null, this);

        // config for menu text 
        let textConfig = {
            fontSize: '28px',
            backgroundColor: '#CDBD7F',
            color: '#3E3328',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0 
        }

        // adds text explaining controls 
        this.add.text(
            game.config.width / 2,
            game.config.height / 2,
            'Press ↑ to Jump\nPress ↓ to Slide\nWhen you are on Earth, you have one jump.\nWhen you are in Space, you have two!\nPress → to Teleport when you see a Monolith',
            textConfig
        ).setOrigin(0.5); 

        this.time.delayedCall(5000, () => {
            this.add.text(game.config.width / 2, game.config.height / 1.5, 'Press any key to start').setOrigin(0.5);
            this.input.keyboard.on('keydown', () => {
                this.scene.start('playScene', {highscore: 0, monolithHighScore: 0});
            }, this)
        }, null, this);
    }
}