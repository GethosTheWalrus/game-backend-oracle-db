class Pipe extends GameGroup{

    constructor(game, texture, holeTexture) {

        super(game, texture);
        this.holeTexture = holeTexture;
        this.holes = this.game.physics.add.group();
        this.hit = false;

    }

    // inherited functions
    render() {

        super.render();

    }

    update() {

        super.update();

    }

    // custom functions
    stop() {

        this.objects.setVelocityX(0);
        this.holes.setVelocityX(0);
        this.hit = true;

    }

    addOnePipe(x, y) {
        // Create a pipe at the position x and y
        // var pipe = this.game.add.sprite(x, y, 'pipe');
        var pipe = this.game.physics.add.sprite(x, y, this.texture);
    
        // Add the pipe to our previously created group
        this.objects.add(pipe);
    
        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200; 
    
        // Automatically kill the pipe when it's no longer visible 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }

    addOneHole(x, y) {
        // Create a pipe at the position x and y
        var hole = this.game.physics.add.sprite(x, y, this.holeTexture);
    
        // Add the pipe to our previously created group
        this.holes.add(hole);
    
        // Enable physics on the pipe 
        // this.game.physics.arcade.enable(hole);
    
        // Add velocity to the pipe to make it move left
        hole.body.velocity.x = -200; 
    
        // Automatically kill the pipe when it's no longer visible 
        hole.checkWorldBounds = true;
        hole.outOfBoundsKill = true;
    }

    addRowOfPipes() {

        if(this.hit == true) {

            return;

        }

        // Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 5) + 1;
        closestHole = hole;
    
        // Add the 6 pipes 
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1) 
                this.addOnePipe(400, i * 60 + 35);   
            else
                this.addOneHole(400, i * 60 + 35);
    }

}