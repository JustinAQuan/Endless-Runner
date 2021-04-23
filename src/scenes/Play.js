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
    }

    create() {
        // adds floor
        this.floor = this.add.tileSprite(0, game.config.height - game.config.height / 5, game.config.width, game.config.height / 5, 'Floor').setOrigin(0, 0);
        this.physics.add.existing(this.floor);
        this.floor.body.setImmovable(true);
        
        // adds player sprite
        this.Player = this.physics.add.existing(new Player(this, game.config.width / 5, game.config.height - game.config.height / 3, 'Player', 0));
        this.Player.body.setGravityY(gameOptions.playerGravity);

        // setting collisions between the player and the platform group
        this.physics.add.collider(this.Player, this.floor);

        // setting up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.floor.tilePositionX += 2;

        if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
            this.Player.body.setVelocityY(gameOptions.jumpForce * -1);
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

    }
}