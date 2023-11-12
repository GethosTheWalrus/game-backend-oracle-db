// Create the menu state that will exist before the menu
class Menu extends Phaser.Scene {
    async preload() {
        let self = this;
        this.selectedPlayer = null;
        this.highScore = null;
        this.players = [];
        this.load.image('bhatt', 'assets/bhatt.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('ground', 'assets/ground.png');

        // get players from the server
        let playerSelector = document.getElementById('playerSelector');
        let playersPromise = await fetch('http://localhost:3000/users');
        playerSelector.innerHTML = '';
        playersPromise.json().then( (data) => {
            self.players = data;
            data.forEach( (item) => {
                let playerLabel = document.createElement('label');
                playerLabel.innerHTML = item.username
                let playerRadio = document.createElement('input');
                playerRadio.setAttribute('type', 'radio');
                playerRadio.setAttribute('name', 'players');
                playerRadio.setAttribute('value', item.id);
                playerSelector.appendChild(playerLabel);
                playerSelector.appendChild(playerRadio);
            });
            if (self.selectedPlayer) {
                document.querySelector('input[name="players"][value="'+self.selectedPlayer+'"]').setAttribute('checked', 'true');
            }
        });
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 400, 490, 'background');
        this.background.setOrigin(0, 0);

        this.ground = this.add.sprite(0, 460, 'ground');
        this.ground.displayWidth = 400;
        this.ground.displayHeight = 100;
        this.ground.setOrigin(0, 0);

        // Display the bird at the position x=100 and y=245
        this.bird = this.physics.add.sprite(100, 245, 'bhatt');
        this.bird.setOrigin(-0.2, 0.5);
        this.bird.alive = true;
        this.bird.body.setCircle(28);

        var style = { font: "bold 32px Arial", fill: "#fff", align: "center" };
        var text = "Press 'space'\nor tap screen to\nstart flapping";
        this.labelMenu = this.add.text(75, 50, text, style);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.on('pointerdown', function (pointer) {

            if (this.selectedPlayer) {
                this.startGame();
            } else {
                console.log('Must select a player');
            }
    
        }, this);

        this.trillBird();
    }

    update() {
        this.background.tilePositionX += .5;

        if (document.querySelector('input[name="players"]:checked')) {
            this.selectedPlayer = document.querySelector('input[name="players"]:checked').value;
        }

        if( score > 0 && this.labelMenu.text == '' ) {

            var text = "Your score was\n" + score + "\nPress 'space'\n or tap screen\nto try again";
            this.labelMenu.setText(text);

        }

        // show the high score
        if (!this.highScore) {
            this.players.forEach( (player) => {
                player.scores.forEach( (score) => {
                    this.highScore = Math.max(score.value, this.highScore);
                });
            });
            if (this.highScore) {
                let style = { font: "bold 32px Arial", fill: "#fff", align: "center" };
                let text = "High Score: " + this.highScore;
                this.labelMenu = this.add.text(75, 385, text, style);
            }
        }

        var spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (Phaser.Input.Keyboard.JustDown(spacebar)) {

            this.startGame();

        }
    }

    trillBird() {
        this.tweens.add({
            targets: this.bird,
            val: 1,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
            y: 260
            // callbackScope: this,
            // onUpdate: function(tween, target){
            //     var position = this.bezierCurve.getPoint(target.val);
            //     this.movingPoint.x = position.x;
            //     this.movingPoint.y = position.y;
            // }
        });
    }

    startGame() {
        this.scene.start('Main')
    }
}