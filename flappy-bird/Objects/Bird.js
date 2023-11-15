class Bird extends GameObject {

    constructor(game, texture, x, y) {
        super(game, texture, x, y);

        // sprite properties
        this.sprite.setOrigin(-0.2, 0.5);
        this.sprite.body.setCircle(28);

        // object properties
        this.alive = true;

        // add default gravity
        this.sprite.body.gravity.y = 1000;
        this.sprite.displayWidth = 70;
        this.sprite.displayHeight = 55
        this.sprite.body.setSize(55, 70);
        // this.sprite.body.setCircle(400, 300, 60);
        this.sprite.body.setCircle(28);

        this.spaceKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        game.input.on('pointerdown', function (pointer) { this.jump(); }, this);
    }

    // inherited functions
    addCollider(objectToCollideWith) {
        super.addCollider(objectToCollideWith);
    }

    addOverlap(objectToOverlap, callback, context = this) {
        super.addOverlap(objectToOverlap, callback, context);
    }

    update() {
        super.update();

        // Call the 'jump' function when the spacekey is hit
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey))
            this.jump();

        // bounds checking
        if (this.sprite.y < 0 || this.sprite.y > 490)
            this.sprite.alive = false;

        // bob effect
        if (this.sprite.angle < 20)
            this.sprite.angle += 1;
    }

    // custom functions
    hitPipe() {
        // If the bird has already hit a pipe, do nothing
        // It means the bird is already falling off the screen
        if (this.alive == false)
            return;

        this.alive = false;

        // stop pipes from spawning
        this.game.time.removeAllEvents;

        let scoreDatabaseEntry = [
            {
                "value": score
            }
        ];

        let selectedPlayer = document.querySelector('select[id="playerSelector"]').value;
        fetch('http://localhost:3000/users/'+selectedPlayer+'/scores', {
            method: 'POST',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(scoreDatabaseEntry)
        }).then( () => {
            console.log('submitted score');
        }).catch( (e) => {
            console.log(e);
        });

        this.game.gameOver();
    }

    passThroughHole() {
        if(scored){
            return;
        };

        scored = true;

        if(this.alive == true) {
            this.game.labelScore.setText(++score);
        }
        
        setTimeout(function() {
            scored = false;
        }, 1000);
    }

    // Make the bird jump 
    jump() {
        if (this.alive == false)
            return;  

        // Add a vertical velocity to the bird
        this.sprite.body.velocity.y = -350;

        // this.add.tween(this.bird).to({angle: -20}, 100).start(); 
        let tween = this.game.tweens.add({
            targets: this.sprite,
            duration: 100,
            delay: 0,
            alpha: 1,
            repeat: 0,
            angle: -20
        });
    }
}