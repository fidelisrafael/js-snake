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

    get positionsArray() {
        return [this.positionX, this.positionY] 
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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = SnakeSegment
else
    window.SnakeSegment = SnakeSegment