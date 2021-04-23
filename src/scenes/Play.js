class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Player images
        this.load.image('Player', './assets/player.png');
        this.load.image('Sliding', './assets/player_slide.png');

        // Floor
        this.load.image('Floor', './assets/floor.png');

        // Obstacles
        this.load.image('Branch', './assets/branch.png');
        this.load.image('Bush', './assets/bush.png');
    }

    create() {
        // group with all active bushes
        this.bushGroup = this.add.group({
 
            // once a bush is removed, it's added to the pool
            removeCallback: function(bush){
                bush.scene.bushPool.add(bush)
            }
        });
 
        // pool
        this.bushPool = this.add.group({
 
            // once a bush is removed from the pool, it's added to the active bush group
            removeCallback: function(bush){
                bush.scene.bushGroup.add(bush)
            }
        });


        // adds the first bush
        this.addbush(64, game.config.width * 1.5);


        // adds floor
        this.floor = this.add.tileSprite(0, game.config.height - game.config.height / 5, game.config.width, game.config.height / 5, 'Floor').setOrigin(0, 0);
        this.physics.add.existing(this.floor);
        this.floor.body.setImmovable(true);
        
        // adds player sprite
        this.Player = this.physics.add.sprite(game.config.width / 5, game.config.height - game.config.height / 3, 'Player');
        this.Player.body.setGravityY(gameOptions.playerGravity);

        // setting up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // allows the player to "walk" on the floor
        this.physics.add.collider(this.Player, this.floor);

        this.isGameOver = false;
        this.physics.add.collider(this.Player, this.bushGroup, () => {
            this.isGameOver = true;
        });
    }

    // the core of the script: bush are added from the pool or created on the fly
    addbush(bushWidth, posX){
        let bush;
        if(this.bushPool.getLength()){
            bush = this.bushPool.getFirst();
            bush.x = posX;
            bush.active = true;
            bush.visible = true;
            this.bushPool.remove(bush);
        }
        else{
            bush = this.physics.add.sprite(posX, game.config.height * 0.75, 'Bush');
            bush.setImmovable(true);
            bush.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.bushGroup.add(bush);
        }

        bush.displayWidth = bushWidth;
        this.nextbushDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }

    update() {
        this.floor.tilePositionX += 2;

        this.playerGrounded = this.Player.body.touching.down;

        if(this.playerGrounded){
            this.jumping = false;
            this.numJumps = gameOptions.jumps;
        }

        if(Phaser.Input.Keyboard.DownDuration(this.cursors.up, 200) && this.numJumps > 0){
            this.Player.body.setVelocityY(gameOptions.jumpForce * -1);
            this.jumping = true;
        }

        if(this.jumping && Phaser.Input.Keyboard.UpDuration(this.cursors.up)){
            this.numJumps--;
            this.jumping = false;
        }

        if(this.cursors.down.isDown && this.Player.body.touching.down){
            this.Player.setTexture('Sliding');
        }
        else if(this.cursors.down.isDown && !this.Player.body.touching.down){
            this.Player.setTexture('Player');
            this.Player.body.setGravityY(gameOptions.playerGravity*2);
        }
        else{
            this.Player.setTexture('Player');
            this.Player.body.setGravityY(gameOptions.playerGravity);
        }

        if(this.isGameOver){
            this.scene.start('gameOverScene');
        }

        // recycling bush
        let minDistance = game.config.width;
        this.bushGroup.getChildren().forEach(function(bush){
            let bushDistance = game.config.width - bush.x - bush.displayWidth / 2;
            minDistance = Math.min(minDistance, bushDistance);
            if(bush.x < - bush.displayWidth / 2){
                this.bushGroup.killAndHide(bush);
                this.bushGroup.remove(bush);
            }
        }, this);
 
        // adding new bush
        if(minDistance > this.nextbushDistance){
            this.addbush(64, game.config.width + 32);
        }
    }
}