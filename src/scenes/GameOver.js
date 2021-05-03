class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    init(data) {
        this.score = data.score;
        this.highscore = data.highscore;
        this.monolithHighScore = data.monolithHighScore;
    }

    create() {
        // game over
        this.add.text(game.config.width / 2, game.config.height / 3, 'GAME OVER').setOrigin(0.5, 0);

        // current score 
        this.add.text(game.config.width / 2, (game.config.height / 3) + 25, 'Score: ' + this.score + 'm').setOrigin(0.5, 0);

        if(this.score > this.highscore){
            this.highscore = this.score;

            // new high score 
            this.add.text(game.config.width / 2, (game.config.height / 3) + 50, 'New Highscore: ' + this.highscore + 'm').setOrigin(0.5);
        }
        else{
            // high score 
            this.add.text(game.config.width / 2, (game.config.height / 3) + 50, 'Highscore: ' + this.highscore + 'm').setOrigin(0.5);
        }

        this.add.text(game.config.width / 2, (game.config.height / 3) + 75, 'Monoliths Reached: ' + p1MonolithScore).setOrigin(0.5, 0);

        if(p1MonolithScore > this.monolithHighScore){
            this.monolithHighScore = p1MonolithScore;

            // new high score 
            this.add.text(game.config.width / 2, (game.config.height / 3) + 100, 'New Monolith High Score: ' + this.monolithHighScore).setOrigin(0.5);
        }
        else{
            // high score 
            this.add.text(game.config.width / 2, (game.config.height / 3) + 100, 'Monolith High Score: ' + this.monolithHighScore).setOrigin(0.5);
        }



        this.time.delayedCall(1000, () => {
            this.add.text(game.config.width / 2, game.config.height / 1.5, 'Press any key to restart').setOrigin(0.5);
            this.input.keyboard.on('keydown', () => {
                this.scene.start('playScene', {highscore: this.highscore, monolithHighScore: this.monolithHighScore});
            }, this)
        }, null, this);

        // resets score
        p1Score = 0;
        scoreMulti = 1;
        p1MonolithScore = 0;
    }
}