'use strict';

class Food {
    constructor(positionX, positionY, id) {
        this.color = 'yellow'
        this.textColor = 'black'
        this.text = `Food #${id}`
        this.id = id
        this.positionX = positionX
        this.positionY = positionY
    }

    move(x, y) {
        console.log(`Moving food to x=${x}, y=${y}`)

        this.positionX = x
        this.positionY = y
    }
}
