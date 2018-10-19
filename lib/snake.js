const VALID_SEGMENTS_TYPES = ['head', 'segment']

const validPosition = (position) => (
    typeof(position) === 'number' && position >= 0
)

class SnakeSegment {
    constructor(positionX, positionY, type, text = '', color = 'black', textColor = 'white') {
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
    
    get positions() {
        return { x: this.positionX, y: this.positionY }
    }

    samePositions(anotherSegment) {
        return (this.positionX === anotherSegment.positionX && this.positionY === anotherSegment.positionY)
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
        this.board = board
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

    get positionX() {
        return this.head.positionX
    }

    get positionY() {
        return this.head.positionX
    }

    get headPositions() {
        return this.head.positions
    }

    eatFood(food) {
        if(typeof(food) != 'object') {
            throw TypeError('Invalid food')
        }

        const segment = this.createSegment(this.bodySegments[0], `Segment #${this.bodySegments.length}`)

        this.foods.push(food)
        this.addSegment(segment)
    }

    createSegment(reference, text = '', type = 'segment', color = 'black') {
        return new SnakeSegment(reference.positionX - 1, reference.positionY, type, text, color)
    }

    segmentExists(segment) {
        return this.bodySegments.some((snakeSegment) => (
            snakeSegment.samePositions(segment)
        ))
    }

    addSegment(segment) {
        if (this.segmentExists(segment)) {
            throw Error('One segment already exists in this position')
        }

        // Append a new part to the beginning of the segments
        this.bodySegments.unshift(segment)

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

    moveHead(x, y, direction) {
        const nextX = this.calculateX(x, this.board.maxLines)
        const nextY = this.calculateY(y, this.board.maxRows)

        return this.moveSegment(this.head, nextX, nextY, direction)
    }

    moveBodySegmentsTowardsHead(direction) {
        // Clone the original array
        const segments = this.bodySegments.slice(0).reverse()

        segments.forEach((segment, index) => {
            // We already moved the head, so we need to skip it and just move the body segments
            if(!segment.isHead) {
                const targetSegment = segments[index - 1]

                this.moveSegment(segment, targetSegment.lastPositionX, targetSegment.lastPositionY, direction)
            }
        })
    }

    move(x, y, direction) {
        this.moveHead(x, y, direction)
        this.moveBodySegmentsTowardsHead(direction)
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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = { SnakeSegment, Snake }
else
    window.Snake = Snake
    window.SnakeSegment = SnakeSegment