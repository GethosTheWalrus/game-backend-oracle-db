// Create our main state that will contain the game
class Main extends Phaser.Scene {
    preload() { 
        // This function will be executed at the beginning     
        // That's where we load the images and sounds 

        this.load.image('hole', 'assets/blank.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('ground', 'assets/ground.png');

        score = 0;
    }

    create() { 
        // console.log("started main scene");
        this.cycles = 0;
        
        this.background = this.add.tileSprite(0, 0, 400, 490, 'background');
        this.background.setOrigin(0, 0);

        this.ground = this.physics.add.sprite(0, 460, 'ground');
        this.ground.displayWidth = 400;
        this.ground.displayHeight = 100;
        this.ground.setOrigin(0, 0);
        this.ground.body.immovable = true;

        this.bird = new Bird(this, 'bird', 100, 245);

        // Create an empty group
        // this.pipes = this.physics.add.group(); 
        // this.holes = this.physics.add.group();
        
        this.pipes = new Pipe(this, 'pipe', 'hole');

        // Add pipes every 15 seconds
        this.pipeSpawnTimer = this.time.addEvent({ delay: 1500, callback: this.pipes.addRowOfPipes, callbackScope: this.pipes, loop: 1});

        // score and label for the score
        score = 0;
        this.labelScore = this.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" }); 

        this.bird.addOverlap(this.pipes.objects, this.bird.hitPipe);
        this.bird.addOverlap(this.pipes.holes, this.bird.passThroughHole);
        this.bird.addOverlap(this.ground, this.bird.hitPipe);

        this.menuInit = false;
    }

    update() {
        this.cycles++;

        // background scrolling
        if(this.bird.alive)
            this.background.tilePositionX += .5;

        // console.log(this.bird.alive)
        this.bird.update();
    }

    // Restart the game
    restartGame() {
        // Start the 'main' state, which restarts the game
        this.game.scene.start('Main');
    }

    // Go back to the menu
    goToMenu() {
        this.scene.start('Menu');
    }

    gameOver() {
        // Set the alive property of the bird to false
        this.bird.alive = false;

        // stop pies from moving
        this.pipes.stop();

        if (!this.menuInit) {
            this.menuInit = true;

            self = this;
            setTimeout(function() {

                self.goToMenu(); 

            }, 2000);
        }
    }
};