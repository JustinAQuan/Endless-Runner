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

        // game over background 
        this.add.rectangle(
            0, 
            0, 
            game.config.width, 
            game.config.height,
            0x619D8D
        ).setOrigin(0 ,0);

        // game over text config 
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
        // game over
        this.add.text(game.config.width / 2, game.config.height / 4, 'GAME OVER', textConfig).setOrigin(0.5, 0);

        // current score 
        this.add.text(game.config.width / 2, (game.config.height / 4) + 50, 'Score: ' + this.score + 'm', textConfig).setOrigin(0.5, 0);

        if(this.score > this.highscore){
            this.highscore = this.score;

            // new high score 
            this.add.text(game.config.width / 2, (game.config.height / 4) + 100, 'New Highscore: ' + this.highscore + 'm', textConfig).setOrigin(0.5);
        }
        else{
            // high score 
            this.add.text(game.config.width / 2, (game.config.height / 4) + 100, 'Highscore: ' + this.highscore + 'm', textConfig).setOrigin(0.5);
        }

        this.add.text(game.config.width / 2, (game.config.height / 4) + 150, 'Monoliths Reached: ' + p1MonolithScore, textConfig).setOrigin(0.5, 0);

        if(p1MonolithScore > this.monolithHighScore){
            this.monolithHighScore = p1MonolithScore;

            // new high score 
            this.add.text(game.config.width / 2, (game.config.height / 4) + 200, 'New Monolith High Score: ' + this.monolithHighScore, textConfig).setOrigin(0.5);
        }
        else{
            // high score 
            this.add.text(game.config.width / 2, (game.config.height / 4) + 200, 'Monolith High Score: ' + this.monolithHighScore, textConfig).setOrigin(0.5);
        }



        this.time.delayedCall(1000, () => {
            this.add.text(game.config.width / 2, (game.config.height / 4) + 250, 'Press any key to restart', textConfig).setOrigin(0.5);
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