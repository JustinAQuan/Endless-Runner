class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Player images
        this.load.image('Player', './assets/player.png');
        this.load.image('Sliding', './assets/player_slide.png');


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
            0, 
            0, 
            960,
            540,
            'space_bg1'
        ).setOrigin(0, 0);

        scene.space_bg2 = scene.add.tileSprite(
            0, 
            0, 
            960,
            540,
            'space_bg2'
        ).setOrigin(0, 0);

        scene.space_bg3 = scene.add.tileSprite(
            0, 
            0, 
            960,
            540,
            'space_bg3'
        ).setOrigin(0, 0);


        // adds astroid group
        let astroidGroup = scene.physics.add.group();
        
        function makeAstroid(x, y){
            let astroid = scene.add.sprite(x, y, 'astroid');
            astroidGroup.add(astroid);
            astroid.body.setImmovable();
        }

        astroidGroup.setVelocityX(gameOptions.obstacleSpeed * -1);

        
        // adds space floor
        this.floor = this.add.tileSprite(0, game.config.height - game.config.height / 5, game.config.width, game.config.height / 5, 'space_bg4').setOrigin(0, 0);
        this.physics.add.existing(this.floor);
        this.floor.body.setImmovable(true);
    
        
        // adds player sprite
        this.Player = this.physics.add.sprite(game.config.width / 5, game.config.height - game.config.height / 3, 'Player').setOrigin(0.5, 1);
        this.Player.body.setGravityY(gameOptions.playerGravity);
        this.Player.setSize(74, 74);

        // setting up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // allows the player to "walk" on the floor
        this.physics.add.collider(this.Player, this.floor);

        this.isGameOver = false;
        this.physics.add.collider(this.Player, this.bushGroup, () => {
            this.isGameOver = true;
        });


        // initialize score
        this.p1Score = 0;

        // adds distance counter
        let scoreConfig = {
            fontFamily: 'Impact, fantasy',
            fontSize: '30px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 100
        }

        this.score = this.add.text(game.config.width - 150, 50, this.p1Score, scoreConfig);
    }

    update() {
        this.p1Score++;
        this.score.text = Number((this.p1Score / 10).toFixed(0));

        // space parallax 
        this.space_bg1.tilePositionX += back_speed;
        this.space_bg2.tilePositionX += mid_speed;
        this.space_bg3.tilePositionX += fore_speed;
        this.floor.tilePositionX += ground_speed;

        this.playerGrounded = this.Player.body.touching.down;

        if(this.playerGrounded){
            this.jumping = false;
            this.numJumps = gameOptions.jumps;
        }

        if(this.playerGrounded && Phaser.Input.Keyboard.DownDuration(this.cursors.up)){
            this.sound.play("jump_sfx");
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
            this.Player.setTexture('Sliding');
            this.Player.setSize(95, 51);
        }
        else if(this.cursors.down.isDown && !this.playerGrounded){
            this.Player.setTexture('Player');
            this.Player.setSize(74, 74);
            this.Player.body.setGravityY(gameOptions.playerGravity * 3);
        }
        else{
            this.Player.setTexture('Player');
            this.Player.setSize(74, 74);
        }

        if(this.isGameOver){
            this.space_bgm.stop();
            this.sound.play("game_over_sfx");
            this.scene.start('gameOverScene');
        }

        
    }
}