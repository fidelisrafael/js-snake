const NOT_ALLOWED_DIRECTIONS_TO_TURN = {
    'up': ['down'],
    'down': ['up'],
    'left': ['right'],
    'right': ['left']
}

class Snake {
    constructor(board) {
        this.board = board
        this.currentDirection = this.lastDirection = null
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
        const positions = this.calculateSegmentPositionFromReference(reference, this.lastDirection)

        return new SnakeSegment(this.calculateX(positions.x, this.board.maxLines), this.calculateY(positions.y, this.board.maxRows), type, text, color)
    }

    calculateSegmentPositionFromReference(reference, lastDirection) {
        let positionX = this.calculatePositionFromDirection(reference.positionX, lastDirection, { 'left': 1, 'right': -1 })
        let positionY = this.calculatePositionFromDirection(reference.positionY, lastDirection, { 'up': 1  , 'down':  -1 })
        
        return { x: positionX, y: positionY }
    }

    calculatePositionFromDirection(position, lastDirection, factors = {}) {
        return position + (factors[lastDirection] || 0)
    }
        

    segmentExists(segment) {
        return this.bodySegments.some((snakeSegment) => (
            snakeSegment.samePositions(segment)
        ))
    }

    addSegment(segment) {
        //if (this.segmentExists(segment)) {
        //    throw Error('One segment already exists in this position')
        //}

        // Append a new part to the beginning of the segments
        this.bodySegments.unshift(segment)

        return this.bodySegments
    }

    canTurnTowardsDirection(currentDirection, desiredDirection) {
        if(this.length == 1) return true

        return !NOT_ALLOWED_DIRECTIONS_TO_TURN[currentDirection].includes(desiredDirection)
    }

    moveToDirection(direction) {
        if (!this.canTurnTowardsDirection(this.currentDirection, direction)) return false

        switch (direction) {
            case 'up':
                this.moveUp()
                break
            case 'left':
                this.moveLeft()
                break
            case 'right':
                this.moveRight()
                break
            case 'down':
                this.moveDown()
                break
        }

        // Move with success
        return true
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
        this.lastDirection = this.currentDirection
        this.currentDirection = direction

        this.moveHead(x, y, direction)
        this.moveBodySegmentsTowardsHead(direction)
    }

    calculateX(positionX, maxPosition) {
        return this.calculateValidPosition(positionX, maxPosition)
    }

    calculateY(positionY, maxPosition) {
        return this.calculateValidPosition(positionY, maxPosition)
    }

    calculateValidPosition(position, maxPosition, minPosition = 0) {
        let newPosition = position

        if (position < minPosition) {
            newPosition = maxPosition
        } else if (position >= maxPosition) {
            newPosition = minPosition
        }

        return newPosition
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Snake
else
    window.Snake = Snake