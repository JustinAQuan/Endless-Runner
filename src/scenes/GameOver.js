class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    init(data) {
        this.score = data.score;
        this.highscore = data.highscore;
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 3, 'GAME OVER').setOrigin(0.5, 0);

        // displays score for this round 
        this.add.text(game.config.width / 2, game.config.height / 2 - 50, 'Score: ' + this.score + 'm').setOrigin(0.5, 0);

        if(this.score > this.highscore){
            this.highscore = this.score;

            this.add.text(game.config.width / 2, game.config.height / 2, 'New Highscore: ' + this.highscore + 'm').setOrigin(0.5);
        }
        else{
            this.add.text(game.config.width / 2, game.config.height / 2, 'Highscore: ' + this.highscore + 'm').setOrigin(0.5);
        }

        this.time.delayedCall(1000, () => {
            this.add.text(game.config.width / 2, game.config.height / 1.5, 'Press any key to restart').setOrigin(0.5);
            this.input.keyboard.on('keydown', () => {
                this.scene.start('playScene', {highscore: this.highscore});
            }, this)
        }, null, this);

        // resets score
        p1Score = 0;
        scoreMulti = 1;
    }
}