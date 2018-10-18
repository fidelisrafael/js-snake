'use strict';

class Snake {
    constructor(board) {
        this.board = board
        this.color = 'blue'
        this.textColor = 'white'
        this.text = 'Snake'
        this.positionX = 0
        this.positionY = 0
        this.foods = []
        this.body = []
    }

    length() {
        return this.foods.length + 1
    }

    eatFood(food) {
        this.foods.push(food)
        this.text = `Snake #${this.length()}`

        return this.body
    }

    moveLeft() {
        this.move(this.positionX - 1, this.positionY, 'left')
    }

    moveRight() {
        this.move(this.positionX + 1, this.positionY, 'right')
    }

    moveUp() {
        this.move(this.positionX, this.positionY - 1, 'up')
    }

    moveDown() {
        this.move(this.positionX, this.positionY + 1, 'down')
    }

    move(x, y, direction) {
        console.log(`Moving snake in ${direction} ===> x=${x}, y=${y}`)

        var tiles = this.board.tiles
        const maxPosition = tiles[0].length - 1
    
        this.positionX = this.calculateX(x, maxPosition)
        this.positionY = this.calculateY(y, maxPosition)
    }

    calculateX(positionX, maxPosition) {
        return this.calculatePosition(positionX, maxPosition)
    }

    calculateY(positionY, maxPosition) {
        return this.calculatePosition(positionY, maxPosition)
    }

    calculatePosition(position, maxPosition) {
        if (position < 0) {
            position = maxPosition
        } else if (position > maxPosition) {
            position = 0
        }

        return position
    }
}
