class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init(data) {
        this.highscore = data.highscore;
        this.monolithHighScore = data.monolithHighScore;
    }

    preload() {
        // player images
        this.load.image('Sliding', './assets/player_slide.png');

        // texture atlas
        this.load.atlas('corgi_anims', './assets/corgi_anims.png', './assets/corgi_anims.json');
        this.load.atlas('meteor', './assets/meteor.png', './assets/meteor.json');

        // earth backgrounds
        this.load.image('earth_floor', './assets/earth_bg4.png');
        this.load.image('earth_bg1', './assets/earth_bg1.png');
        this.load.image('earth_bg2', './assets/earth_bg2.png');
        this.load.image('earth_bg3', './assets/earth_bg3.png');

        // space backgrounds 
        this.load.image('space_bg1', './assets/space_bg1.png');
        this.load.image('space_bg2', './assets/space_bg2.png');
        this.load.image('space_bg3', './assets/space_bg3.png');
        this.load.image('space_bg4', './assets/space_bg4.png');

        // obstacles
        this.load.image('astroid', './assets/astroid.png');
        this.load.image('bat', './assets/bat_frame1.png');
        this.load.image('cat1', './assets/cat1.png');
        this.load.image('cat2', './assets/cat2.png');
        this.load.image('monolith_earth', './assets/monolith_earth.png');
        this.load.image('space_puppy', './assets/space_puppy_frame1.png');
        this.load.image('monolith_space', './assets/monolith_space.png');

        // earth background music
        this.load.audio('earth_bgm', './assets/earth_bgm.wav');

        // space background music
        this.load.audio('space_bgm', './assets/space_bgm.wav');

        // jump sfx
        this.load.audio('jump_sfx', './assets/jump_sfx.wav');

        this.load.audio('slide_sfx', './assets/slide_sfx.wav');

        this.load.audio('monolith_appear_sfx', './assets/monolith_appear_sfx.wav');

        // game over sfx
        this.load.audio('game_over_sfx', './assets/game_over_sfx.wav');

        // teleport to earth sfx
        this.load.audio('teleport_earth_sfx','./assets/teleport_earth_sfx.wav');

        // teleport to space sfx
        this.load.audio('teleport_space_sfx','./assets/teleport_space_sfx.wav');
    }

    create() {
        // useful for some functions
        let scene = this;

        if (isEarth) {
           // adds earth bgm
            scene.earth_bgm = scene.sound.add(
                'earth_bgm', 
                {
                    volume: 0.35,
                    loop: true
                }
            );
            // plays earth bgm
            scene.earth_bgm.play(); 
        } 
        else {
            // adds space bgm
            scene.space_bgm = scene.sound.add(
                'space_bgm', 
                {
                    volume: 1,
                    loop: true
                }
            );
            // plays space bgm
            scene.space_bgm.play();
        }

        if (isEarth) {
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
        }
        else {
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

            // adds space floor
            scene.spaceFloor = scene.add.tileSprite(
                0,
                game.config.height - game.config.height / 5,
                game.config.width,
                game.config.height / 5,
                'space_bg4'
            ).setOrigin(0, 0);
        }

        if (isEarth) {
            // adds earth floor physics
            scene.physics.add.existing(scene.earthFloor);
            scene.earthFloor.body.setImmovable(true);
        }
        else {
            // adds space floor physics 
            scene.physics.add.existing(scene.spaceFloor);
            scene.spaceFloor.body.setImmovable(true);
        }
        
        this.canTeleport = false; // whether player can teleport

        // creates meteor animation 
        // *** animation isn't playing, only uses first frame ***
        this.anims.create({
            key: 'meteor',
            frames: ['meteor_frame1.png', 'meteor_frame2.png', 'meteor_frame3.png'],
            repeat: -1,
            frameRate: 12
        });

        // *** change collision for obstacles (body.setCircle(25);) ***
        // *** change canvas placement of obstacles *** 

        // adds astroid group
        scene.astroidGroup = scene.physics.add.group();
        
        scene.makeAstroidFunc = function makeAstroid(x, y){
            scene.astroid = scene.add.sprite(x, y, 'meteor');
            scene.astroidGroup.add(scene.astroid);
            scene.astroid.body.setImmovable();
            scene.astroid.body.setCircle(25);
            scene.astroidGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
        }
        
        // adds bats
        scene.batGroup = scene.physics.add.group();

        scene.makeBatFunc = function makeBat(x, y){
            scene.bat = scene.add.sprite(x, y, 'bat');
            scene.batGroup.add(scene.bat);
            scene.bat.body.setImmovable();
            scene.bat.body.setCircle(25);
            scene.batGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
        }

        // adds cats 
        scene.catGroup = scene.physics.add.group();

        scene.makeCatFunc = function makeCat(x){
            let catVal = Phaser.Math.Between(0, 1);
            if (catVal == 0) {
                scene.cat = scene.add.sprite(x, game.config.height - game.config.height / 4.5, 'cat1');
            } else {
                scene.cat = scene.add.sprite(x, game.config.height - game.config.height / 4.5, 'cat2');
            }
            scene.catGroup.add(scene.cat);
            scene.cat.body.setImmovable();
            scene.cat.body.setCircle(25);
            scene.catGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
        }
    
        // adds earth monolith
        scene.earthMonolithGroup = scene.physics.add.group();

        scene.makeEarthMonolithFunc = function makeEarthMonolith(x){
            scene.earthMonolith = scene.add.sprite(x, game.config.height / 3 + 104, 'monolith_earth');
            scene.earthMonolithGroup.add(scene.earthMonolith);
            scene.earthMonolith.body.setImmovable();
            scene.earthMonolith.body.setSize(75, 300);
            scene.earthMonolithGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
        }

        // adds space puppy 
        scene.spacePuppyGroup = scene.physics.add.group();

        scene.makeSpacePuppyFunc = function makeSpacePuppy(x){
            scene.spacePuppy = scene.add.sprite(x, 399, 'space_puppy');
            scene.spacePuppyGroup.add(scene.spacePuppy);
            scene.spacePuppy.body.setImmovable();
            scene.spacePuppy.body.setCircle(25);
            scene.spacePuppyGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
        }

        // adds space monolith
        scene.spaceMonolithGroup = scene.physics.add.group();

        scene.makeSpaceMonolithFunc = function makeSpaceMonolith(x){
            scene.spaceMonolith = scene.add.sprite(x, game.config.height / 3 + 104, 'monolith_space');
            scene.spaceMonolithGroup.add(scene.spaceMonolith);
            scene.spaceMonolith.body.setImmovable();
            scene.spaceMonolith.body.setSize(75, 300);
            scene.spaceMonolithGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
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
        scene.Player.setSize(89, 77);
       
        // creates different gravity for earth and space
        if (isEarth) {
            scene.Player.body.setGravityY(gameOptions.playerGravityEarth);
            // allows the player to "walk" on the floor
            scene.physics.add.collider(scene.Player, scene.earthFloor);
        }
        else {
            scene.Player.body.setGravityY(gameOptions.playerGravitySpace);
            // allows the player to "walk" on the floor
            scene.physics.add.collider(scene.Player, scene.spaceFloor);
        }

        // setting up cursor keys
        scene.cursors = scene.input.keyboard.createCursorKeys();

        scene.isGameOver = false; // initializes game over state 

        // game ends if player collides with an object 
        scene.physics.add.collider(scene.Player, scene.astroidGroup, () => {
            scene.isGameOver = true;
        });
        scene.physics.add.collider(scene.Player, scene.batGroup, () => {
            scene.isGameOver = true;
        });
        scene.physics.add.collider(scene.Player, scene.catGroup, () => {
            scene.isGameOver = true;
        });
        scene.physics.add.collider(scene.Player, scene.earthMonolithGroup, () => {
            scene.isGameOver = true;
        });
        scene.physics.add.collider(scene.Player, scene.spacePuppyGroup, () => {
            scene.isGameOver = true;
        });
        scene.physics.add.collider(scene.Player, scene.spaceMonolithGroup, () => {
            scene.isGameOver = true;
        });

        // adds distance counter
        let scoreConfig = {
            fontFamily: 'Impact, fantasy',
            fontSize: '30px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 100
        }

        let monoScoreConfig = {
            fontFamily: 'Impact, fantasy',
            fontSize: '30px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 300
        }

        // adds score text 
        scene.score = scene.add.text(game.config.width - 150, 100, p1Score + 'm', scoreConfig);
        scene.monolithScore = scene.add.text(game.config.width - 350, 50, 'monolith : ' + p1MonolithScore, monoScoreConfig);

        
        this.createObstacle = function createObstacle() {
            // earth obstacles 
            if (isEarth){
                let randomNum = Phaser.Math.Between(0, 5); // chance of no obstacle

                // creates bats
                if(randomNum <= 2 && this.batGroup.getLength() < 3){
                    this.makeBatFunc(game.config.width + 55, Phaser.Math.Between(150, game.config.height - game.config.height / 3 - 15));
                }

                // creates cats 
                else if(randomNum <= 4 && this.catGroup.getLength() < 5){
                    this.makeCatFunc(game.config.width + 55);
                } 
            }

            // space obstacles 
            else{
                let randomNum = Phaser.Math.Between(0, 3); // chance of no obstacle 

                // create astroids every 15 meters
                if(randomNum == 0 && this.astroidGroup.getLength() < 5){
                    this.makeAstroidFunc(game.config.width + 55, Phaser.Math.Between(150, game.config.height / 2));
                }
                if(randomNum == 1 && this.astroidGroup.getLength() < 4){
                    this.makeAstroidFunc(game.config.width + 55/ 2, Phaser.Math.Between(game.config.height / 2, game.config.height - game.config.height / 5));
                }

                // creates space puppies 
                if(randomNum == 2 && this.spacePuppyGroup.getLength() < 5){
                    this.makeSpacePuppyFunc(game.config.width + 55);
                }
            }
        }

        // calls function to create obstacle after a certain amount of time 
        this.makeObstacleEvent = this.time.addEvent({
            delay: 850,  // time between creating obstacles 
            callback: this.createObstacle, // function that creates obstacles 
            callbackScope: this,
            loop: true
        });
    }

    update() {
        p1Score += scoreMulti;
        this.score.text = Number((p1Score / 10).toFixed(0)) + 'm';

        if (isEarth) {
            // earth parallax 
            this.earth_bg1.tilePositionX += back_speed;
            this.earth_bg2.tilePositionX += mid_speed;
            this.earth_bg3.tilePositionX += fore_speed;
            this.earthFloor.tilePositionX += ground_speed * 1.45;
        }
        else {
            // space parallax 
            this.space_bg1.tilePositionX += back_speed;
            this.space_bg2.tilePositionX += mid_speed;
            this.space_bg3.tilePositionX += fore_speed;
            this.spaceFloor.tilePositionX += ground_speed;
        }

        if((p1Score / 15) % 250 == 0){
            if(fore_speed < 6){
                back_speed += 0.75;
                mid_speed += 0.75;
                fore_speed += 0.5;
                ground_speed += 0.5;
            }

            scoreMulti += 0.5;

            gameOptions.obstacleSpeed += 100;

            // sets velocity for obstacles 
            this.astroidGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
            this.batGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
            this.catGroup.setVelocityX(gameOptions.obstacleSpeed * 2 * -1);
            this.earthMonolithGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
            this.spacePuppyGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
            this.spaceMonolithGroup.setVelocityX(gameOptions.obstacleSpeed * -1);
        }

        this.playerGrounded = this.Player.body.touching.down;

        if(this.playerGrounded){
            this.jumping = false;
            // creates different number of jumps for earth and space 
            if (isEarth){
                this.numJumps = gameOptions.jumpsEarth;
            }
            else {
                this.numJumps = gameOptions.jumpsSPace;
            }
        }

        // press right key to change from earth to space or from space to earth 
        if(Phaser.Input.Keyboard.JustDown(this.cursors.right) && this.canTeleport){
            p1MonolithScore += 1;
            if (isEarth){
                this.earth_bgm.stop(); // stops bgm
                this.sound.play("teleport_space_sfx");
            }
            else {
                this.space_bgm.stop(); // stops bgm 
                this.sound.play("teleport_earth_sfx");
            }
            isEarth = !isEarth; // switches between earth and space 
            this.scene.restart(); // resets scene 
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.numJumps > 0){
            this.sound.play('jump_sfx');
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

        // plays sliding sound effect once 
        if(Phaser.Input.Keyboard.JustDown(this.cursors.down) && this.playerGrounded){
            this.sound.play('slide_sfx');
        }

        if(this.cursors.down.isDown && this.playerGrounded){
            this.Player.stop();
            this.Player.setTexture('Sliding');
            this.Player.setSize(89, 55);
        }
        else if(this.cursors.down.isDown && !this.playerGrounded){
            if (isEarth) {
                this.Player.body.setGravityY(gameOptions.playerGravityEarth * 3);
            }
            else {
                this.Player.body.setGravityY(gameOptions.playerGravitySpace * 3);
            }
        }
        else if(this.cursors.up.isUp && this.playerGrounded && !this.Player.anims.isPlaying){
            this.Player.play('player');
            this.Player.setSize(89, 77);
            if (isEarth) {
                this.Player.body.setGravityY(gameOptions.playerGravityEarth);
            }
            else {
                this.Player.body.setGravityY(gameOptions.playerGravitySpace);
            }
        }

        if(this.isGameOver){
            this.game.sound.stopAll(); // stops all audio 
            this.sound.play("game_over_sfx");
            this.scene.start('gameOverScene', {score: Number((p1Score / 10).toFixed(0)), highscore: this.highscore, monolithHighScore: this.monolithHighScore});

            // resets variables on game over 
            back_speed = 1;
            mid_speed = 2;
            fore_speed = 3;
            ground_speed = 4;

            gameOptions.obstacleSpeed = 350;

            isEarth = true; 
        }

        if (isEarth) {
            // creates earth monolith
            if((p1Score / 30) % 25 == 0 && this.earthMonolithGroup.getLength() < 4){
                this.makeEarthMonolithFunc(game.config.width + 55);
                this.canTeleport = true; // can teleport when monolith appears
                this.sound.play("monolith_appear_sfx");
            }
        }
        else {
            // creates space monolith 
            if((p1Score / 30) % 25 == 0 && this.spaceMonolithGroup.getLength() < 4){
                this.makeSpaceMonolithFunc(game.config.width + 55);
                this.canTeleport = true; // can teleport when monolith appears 
                this.sound.play("monolith_appear_sfx");
            }
        }

        // destroys obstacles when they are offscreen 
        this.astroidGroup.getChildren().forEach(function(astroid){
            if(astroid.x < - astroid.displayWidth / 2){
                this.astroidGroup.killAndHide(astroid);
                this.astroidGroup.remove(astroid);
            }
        }, this);

        this.batGroup.getChildren().forEach(function(bat){
            if(bat.x < - bat.displayWidth / 2){
                this.batGroup.killAndHide(bat);
                this.batGroup.remove(bat);
            }
        }, this);

        this.catGroup.getChildren().forEach(function(cat){
            if(cat.x < - cat.displayWidth / 2){
                this.catGroup.killAndHide(cat);
                this.catGroup.remove(cat);
            }
        }, this);

        this.earthMonolithGroup.getChildren().forEach(function(earthMonolith){
            if(earthMonolith.x < - earthMonolith.displayWidth / 2){
                this.earthMonolithGroup.killAndHide(earthMonolith);
                this.earthMonolithGroup.remove(earthMonolith);
            }
        }, this);

        this.spacePuppyGroup.getChildren().forEach(function(spacePuppy){
            if(spacePuppy.x < - spacePuppy.displayWidth / 2){
                this.spacePuppyGroup.killAndHide(spacePuppy);
                this.spacePuppyGroup.remove(spacePuppy);
            }
        }, this);

        this.spaceMonolithGroup.getChildren().forEach(function(spaceMonolith){
            if(spaceMonolith.x < - spaceMonolith.displayWidth / 2){
                this.spaceMonolithGroup.killAndHide(spaceMonolith);
                this.spaceMonolithGroup.remove(spaceMonolith);
            }
        }, this);
    }
}