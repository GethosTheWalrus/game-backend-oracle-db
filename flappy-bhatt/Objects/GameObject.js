class GameObject {

    constructor(game, texture, x, y) {

        this.game = game
        this.sprite = this.game.physics.add.sprite(x, y, texture);

    }

    addCollider(objectToCollideWith) {

        this.game.physics.add.collider(this.sprite, objectToCollideWith);

    }

    addOverlap(objectToOverlap, callback, context = this) {

        this.game.physics.add.overlap(this.sprite, objectToOverlap, callback, null, context);

    }

    update() {

        

    }

}