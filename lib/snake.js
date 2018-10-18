'use strict';

const VALID_SEGMENTS_TYPES = ['head', 'segment']

const validPosition = (position) => (
    typeof(position) === 'number' && position >= 0
)

class SnakeSegment {
    constructor(positionX, positionY, type, color = 'blue', textColor = 'white') {
        this.positionX = this.lastPositionX = parseInt(positionX)
        this.positionY = this.lastPositionY = parseInt(positionY)
        this.type = type
        this.color = color
        this.textColor = textColor
        this.text = type

        this.validate()
    }

    get isHead() {
        return this.type == 'head'
    }

    validate() {
        if(!VALID_SEGMENTS_TYPES.includes(this.type)) {
            throw TypeError(`The provided type: '${this.type}' is not valid as a SnakeSegment`)
        }

        if(!validPosition(this.positionX)) {
            throw TypeError('The parameter `positionX` must be a positive integer number')
        }

        if(!validPosition(this.positionY)) {
            throw TypeError('The parameter `positionY` must be a positive integer number')
        }
    }
}

class Snake {
    constructor(board) {
        this.canvasBoard = board
        this.foods = []
        this.bodySegments = [
            new SnakeSegment(0, 0, 'head')
        ]
    }

    get length() {
        return this.bodySegments.length
    }

    get head() {
        // The head is always the last segment
        return this.bodySegments[this.bodySegments.length - 1]
    }

    eatFood(food) {
        this.foods.push(food)
        this.addSegment()
    }

    addSegment() {
        const firstSegment =  this.bodySegments[0]
        const newSegment = new SnakeSegment(firstSegment.positionX - 1, firstSegment.positionY, `segment ${this.bodySegments.length}` , 'black')

        // Append a new part to the beginning of the segments
        this.bodySegments.unshift(newSegment)

        return this.bodySegments
    }


    moveLeft() {
        this.move(this.head.positionX - 1, this.head.positionY, 'left')
    }

    moveRight() {
        this.move(this.head.positionX + 1, this.head.positionY, 'right')
    }

    moveUp() {
        this.move(this.head.positionX, this.head.positionY - 1, 'up')
    }

    moveDown() {
        this.move(this.head.positionX, this.head.positionY + 1, 'down')
    }

    moveSegment(segment, x, y, direction) {
        segment.lastPositionX = segment.positionX
        segment.lastPositionY = segment.positionY
        segment.positionX = x
        segment.positionY = y

        return segment
    }

    move(x, y, direction) {
        var maxPosition = this.canvasBoard.board.tiles[0].length - 1

        const nextX = this.calculateX(x, maxPosition)
        const nextY = this.calculateY(y, maxPosition)

        const head = this.moveSegment(this.head, nextX, nextY, direction)

        // Clone the original array
        const segments = this.bodySegments.slice(0).reverse()

        console.log(`Moving snake in ${direction} ===> x=${nextX}, y=${nextY}`)

        segments.forEach((segment, index) => {
            // We already moved the head, so we need to skip it and just move the body segments
            if(!segment.isHead) {
                const targetSegment = segments[index - 1]

                this.moveSegment(segment, targetSegment.lastPositionX, targetSegment.lastPositionY, direction)
            }
        })

        // Should move all pieces of the body
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

module.exports = { Snake, SnakeSegment }