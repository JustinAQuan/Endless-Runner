class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init(data) {
        this.highscore = data.highscore;
    }

    preload() {
        // Player images
        this.load.image('Sliding', './assets/player_slide.png');

        // texture atlas
        this.load.atlas('corgi_anims', './assets/corgi_anims.png', './assets/corgi_anims.json');


        // Background
        this.load.image(
            'space_bg1', 
            './assets/space_bg1.png'
        );
        this.load.image(
            'space_bg2', 
            './assets/space_bg2.png'
        );
        this.load.image(
            'space_bg3', 
            './assets/space_bg3.png'
        );
        this.load.image(
            'space_bg4', 
            './assets/space_bg4.png'
        );

        this.load.image('earth_floor', './assets/earth_bg4.png');
        this.load.image('earth_bg1', './assets/earth_bg1.png');
        this.load.image('earth_bg2', './assets/earth_bg2.png');
        this.load.image('earth_bg3', './assets/earth_bg3.png');


        // Obstacles
        this.load.image('astroid', './assets/astroid.png');


        // Space background music
        this.load.audio(
            'space_bgm', 
            './assets/space_bgm.wav'
        );


        // jump sfx
        this.load.audio(
            'jump_sfx', 
            './assets/jump_sfx.wav'
        );


        // game over sfx
        this.load.audio(
            'game_over_sfx', 
            './assets/game_over_sfx.wav'
        );

    }

    create() {
        // useful for some functions
        let scene = this;

        // adds space background music
        scene.space_bgm = scene.sound.add(
            'space_bgm', 
            {
                volume: 1,
                loop: true
            }
        );

        // plays space background music
        scene.space_bgm.play();
    
        // adds space background 
        scene.space_bg1 = scene.add.tileSprite(
            game.config.width, 
            0, 
            960,
            540,
            'space_bg1'
        ).setOrigin(0, 0);

        scene.space_bg2 = scene.add.tileSprite(
            game.config.width, 
            0, 
            960,
            540,
            'space_bg2'
        ).setOrigin(0, 0);

        scene.space_bg3 = scene.add.tileSprite(
            game.config.width, 
            0, 
            960,
            540,
            'space_bg3'
        ).setOrigin(0, 0);

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

         // adds earth floor
         scene.earthFloor = scene.add.tileSprite(
            0,
            game.config.height - game.config.height / 5,
            game.config.width,
            game.config.height / 5,
            'earth_floor'
        ).setOrigin(0, 0);

        // adds space floor
        scene.spaceFloor = scene.add.tileSprite(
            game.config.width,
            game.config.height - game.config.height / 5,
            game.config.width,
            game.config.height / 5,
            'space_bg4'
        ).setOrigin(0, 0);


        scene.physics.add.existing(scene.earthFloor);
        scene.earthFloor.body.setImmovable(true);
        scene.physics.add.existing(scene.spaceFloor);
        scene.spaceFloor.body.setImmovable(true);



        // adds astroid group
        scene.astroidGroup = scene.physics.add.group();
        
        scene.makeAstroidFunc = function makeAstroid(x, y){
            scene.astroid = scene.add.sprite(x, y, 'astroid');
            scene.astroidGroup.add(scene.astroid);
            scene.astroid.body.setImmovable();
            scene.astroid.body.setCircle(25);
            scene.astroidGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
        }
    
        
        // adds player animation
        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNames('corgi_anims', {prefix: 'corgi', end: 3, zeroPad: 2}),
            repeat: -1,
            frameRate: 12
        });

        // adds player sprite
        scene.Player = scene.physics.add.sprite(game.config.width / 5, game.config.height - game.config.height / 3, 'Player').setOrigin(0.5, 1);
        scene.Player.play('player');
        scene.Player.body.setGravityY(gameOptions.playerGravity);
        scene.Player.setSize(89, 77);

        // setting up cursor keys
        scene.cursors = scene.input.keyboard.createCursorKeys();

        // allows the player to "walk" on the floor
        scene.physics.add.collider(scene.Player, scene.earthFloor);
        scene.physics.add.collider(scene.Player, scene.spaceFloor);

        scene.isGameOver = false;
        scene.physics.add.collider(scene.Player, scene.astroidGroup, () => {
            scene.isGameOver = true;
        });


        // initialize score
        scene.p1Score = 0;
        scene.scoreMulti = 1;

        // adds distance counter
        let scoreConfig = {
            fontFamily: 'Impact, fantasy',
            fontSize: '30px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 100
        }

        scene.score = scene.add.text(game.config.width - 150, 50, scene.p1Score + 'm', scoreConfig);
    }

    update() {
        this.p1Score += this.scoreMulti;
        this.score.text = Number((this.p1Score / 15).toFixed(0)) + 'm';

        // earth parallax 
        this.earth_bg1.tilePositionX += back_speed;
        this.earth_bg2.tilePositionX += mid_speed;
        this.earth_bg3.tilePositionX += fore_speed;
        this.earthFloor.tilePositionX += ground_speed;

        // space parallax 
        this.space_bg1.tilePositionX += back_speed;
        this.space_bg2.tilePositionX += mid_speed;
        this.space_bg3.tilePositionX += fore_speed;
        this.spaceFloor.tilePositionX += ground_speed;

        if((this.p1Score / 15) % 250 == 0){
            if(fore_speed < 6){
                back_speed += 0.75;
                mid_speed += 0.75;
                fore_speed += 0.5;
                ground_speed += 0.5;
            }

            this.scoreMulti += 0.5;

            gameOptions.obstacleSpeed += 100;
            this.astroidGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
        }

        this.playerGrounded = this.Player.body.touching.down;

        if(this.playerGrounded){
            this.jumping = false;
            this.numJumps = gameOptions.jumps;
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.numJumps > 0){
            this.sound.play("jump_sfx");
            this.Player.stop();
            this.Player.setTexture('Sliding');
            this.Player.setSize(89, 55);
        }

        if(Phaser.Input.Keyboard.DownDuration(this.cursors.up, 200) && this.numJumps > 0){
            this.Player.body.setVelocityY(gameOptions.jumpForce * -1);
            this.jumping = true;
        }

        if(this.jumping && Phaser.Input.Keyboard.UpDuration(this.cursors.up)){
            this.numJumps--;
            this.jumping = false;
        }

        if(this.cursors.down.isDown && this.playerGrounded){
            this.Player.stop();
            this.Player.setTexture('Sliding');
            this.Player.setSize(89, 55);
        }
        else if(this.cursors.down.isDown && !this.playerGrounded){
            this.Player.body.setGravityY(gameOptions.playerGravity * 3);
        }
        else if(this.cursors.up.isUp && this.playerGrounded && !this.Player.anims.isPlaying){
            this.Player.play('player');
            this.Player.setSize(89, 77);
            this.Player.body.setGravityY(gameOptions.playerGravity);
        }

        if(this.isGameOver){
            this.space_bgm.stop();
            this.sound.play("game_over_sfx");
            this.scene.start('gameOverScene', {score: Number((this.p1Score / 10).toFixed(0)), highscore: this.highscore});

            back_speed = 1;
            mid_speed = 2;
            fore_speed = 3;
            ground_speed = 4;

            this.scoreMulti = 1;

            gameOptions.obstacleSpeed = 350;
        }

        let randomNum = Phaser.Math.Between(0, 1500);

        // create astroids every 15 meters
        if(randomNum % 157 == 0 && this.astroidGroup.getLength() < 5){
            this.makeAstroidFunc(game.config.width + 55, Phaser.Math.Between(150, game.config.height / 2));
        }
        if(randomNum % 139 == 0 && this.astroidGroup.getLength() < 4){
            this.makeAstroidFunc(game.config.width + 55, Phaser.Math.Between(game.config.height / 2, game.config.height - game.config.height / 5));
        }

        // destroys astroid if offscreen
        this.astroidGroup.getChildren().forEach(function(astroid){
            if(astroid.x < - astroid.displayWidth / 2){
                this.astroidGroup.killAndHide(astroid);
                this.astroidGroup.remove(astroid);
            }
        }, this);
    }
}