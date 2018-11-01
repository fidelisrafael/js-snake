(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(() => {
    'use strict'

    console.log('Game is available through window.Game.')

    // export game as global object
    window.Game = require('./index.js')
})()
},{"./index.js":2}],2:[function(require,module,exports){
'use strict'

const Game = require('./lib/game.js')

module.exports = Game
},{"./lib/game.js":6}],3:[function(require,module,exports){
const isNumberValid = (number) => (
    typeof(number) === 'number' && number > 0
)

class Board {
    constructor(rows, lines) {
        this.rows = parseInt(rows)
        this.lines = parseInt(lines)

        if(!isNumberValid(this.rows))  { throw new TypeError('`rows` must be a positive number greather than 0')}
        if(!isNumberValid(this.lines)) { throw new TypeError('`lines` must be a positive number greather than 0')}
    }

    get maxRows() {
        return this.rows
    }

    get maxLines() {
        return this.lines
    }
}

module.exports = Board

},{}],4:[function(require,module,exports){
const Food = require('./food')

const TILE_BACKGROUND_COLOR = 'white'
const RANDOM_FOOD_COLORS = ['red', 'blue', 'purple']

class GameCanvas {
    constructor(canvasElement, snake, board, tileSize = 48, debugMode = false) {
        this.board = board
        this.snake = snake
        this.tileSize = tileSize
        this.debugMode = debugMode
        
        this.setupHTMLCanvas(canvasElement)
        this.setup()
    }

    setupHTMLCanvas(canvasElement) {
        if (!(canvasElement instanceof HTMLCanvasElement)) {
            throw new TypeError(`The HTML5 canvas provided: "${this.canvasElement}" must be a HTMLCanvasElement`)
        }

        this.canvas = canvasElement
        this.context = this.canvas.getContext('2d');        
    }

    setup() {
        this.clear()
        this.setCanvasDimensions()
        this.setRandomCurrentFood()
    }

    draw() {
        this.drawTiles()
        this.drawCurrentFood()
        this.drawSnake()
    }

    drawSnake() {
        const snake = this.snake

        snake.bodySegments.forEach((segment, _index) => {
            this.drawObjectAtTile(segment)
        })
    }

    drawObjectAtTile(object) {
        const boardX = object.positionX * this.tileSize
        const boardY = object.positionY * this.tileSize

        this.context.fillStyle = object.color
        
        this.context.fillRect(boardX, boardY, this.tileSize, this.tileSize)

        if (this.debugMode && object.text) {
            this.context.fillStyle = object.textColor || 'white'
            this.context.fillText(object.text, boardX, boardY + this.tileSize/2)
        }
    }

    drawCurrentFood() {
        this.drawObjectAtTile(this.currentFood)
    }

    drawTiles() {
        for (let rowIndex = 0; rowIndex <= this.board.maxRows; rowIndex++) {
            for (let lineIndex = 0; lineIndex <= this.board.maxLines; lineIndex++) {
                const color = this.debugMode ? ((lineIndex + rowIndex) % 2 == 0 ? 'red' : 'green') : TILE_BACKGROUND_COLOR

                this.drawTile(rowIndex, lineIndex, color)
            }
        }
    }

    drawTile(row, column, color) {
        const y = row * this.tileSize
        const x = column * this.tileSize
        const tileText = ((column + row) + row) - 2 // We remove 2 so the index starts at `0` 
       
        this.context.fillStyle = color
        this.context.fillRect(x, y, this.tileSize, this.tileSize)
        this.context.fillText(tileText , x + this.tileSize / 2, y - this.tileSize / 2)
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width , this.canvas.width)
    }

    setCanvasDimensions() {
        this.canvas.width = this.tileSize * this.board.maxRows 
        this.canvas.height = this.tileSize * this.board.maxRows 
    }

    setRandomCurrentFood() {
        // Get all tiles where one SnakeFragment already exists, eg: [[0,0], [1,2]]
        const invalidPositions = this.snake.bodySegments.map((segment) => (segment.positionsArray))

        // If there were already one food in the board, do not allow the new food to appear in the same position
        if(this.currentFood) { invalidPositions.push(this.currentFood.positionsArray) }

        const positions = this.randomPositionsWithNoObstructions(invalidPositions, this.board.maxLines, this.board.maxRows)

        const foodColor = RANDOM_FOOD_COLORS[Math.floor([Math.random() * RANDOM_FOOD_COLORS.length])]
        const text = `Food #${this.snake.length}`

        this.currentFood = this.createFood(positions[0], positions[1], (this.debugMode == true? 'white' : foodColor), text)
    }

    createFood(positionX, positionY, color,  text = '') {
        return new Food(positionX, positionY, color, text)
    }

    randomPositionsWithNoObstructions(invalidPositions, maxLines, maxRows) {
        do {
            var positionX = Math.floor((Math.random() * maxLines))
            var positionY = Math.floor((Math.random() * maxRows))
        } while (invalidPositions.includes([positionX, positionY]))

        return [positionX, positionY]
    }
}

module.exports = GameCanvas
},{"./food":5}],5:[function(require,module,exports){
class Food {
    constructor(positionX, positionY, color = 'green', text = '') {
        this.positionX = positionX
        this.positionY = positionY
        this.color = color
        this.text = text
        this.textColor = 'black'
    }
    
    get positions() {
        return { x: this.positionX, y: this.positionY }
    }

    get positionsArray() {
        return [this.positionX, this.positionY] 
    }
}

module.exports = Food
},{}],6:[function(require,module,exports){
const Board = require('./board')
const GameCanvas = require('./canvas')
const Snake = require('./snake')

const INPUT_MAPPING = {
    'up':    ['KeyW', 'ArrowUp'],
    'left':  ['KeyA', 'ArrowLeft'],
    'right': ['KeyD', 'ArrowRight'],
    'down':  ['KeyS', 'ArrowDown'],
}

const DIRECTIONS = Object.keys(INPUT_MAPPING)

class Game {
    constructor(canvasElement, rows = 12, lines = 12, tileSize = 48, debugMode = false) {
        this.canvasElement = canvasElement
        this.updateInterval = 100
        this.rows = rows
        this.lines = lines
        this.tileSize = tileSize
        this.debugMode = debugMode
        this.redraw = false
        this.canMoveSnake = true

        this.setup()
    }

    resetCanvas() {
        const canvas = document.querySelector(this.canvasElement)
        const wrapper = canvas.parentElement

    if(wrapper) {
            wrapper.style.width = `${canvas.width}px`
            wrapper.style.height = `${canvas.height}px`
            wrapper.style.margin = '0 auto'
        }

        this.canvas = new GameCanvas(canvas, this.snake, this.board, this.tileSize, this.debugMode)
    }

    setup() {
        this.board = new Board(this.rows, this.lines)
        this.snake = new Snake(this.board)
        this.snake.currentDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]

        this.resetCanvas()
        this.inputSetup()
        this.draw()
    }

    init() {
        this.setup()

        setInterval(this.update.bind(this), this.updateInterval)
    }

    draw() {
        this.canvas.draw()
    }

    autoMoveSnake() {
        this.moveSnake(this.snake.currentDirection)
    }

    update() {
        this.autoMoveSnake()

        if(this.redraw) {
            this.draw()
            this.redraw = false
        }
    }

    moveSnake(direction) {
        // Snake is already moving or animating
        if(!this.canMoveSnake) return

        this.canMoveSnake = false
        this.redraw = true

        if (this.snake.moveToDirection(direction)) {
            this.detectBodySegmentColision()
            this.detectFoodColision()
        }

        this.canMoveSnake = true
    }

    detectBodySegmentColision() {
        const { snake } = this

        snake.bodySegments.forEach((segment) => {
            if (!segment.isHead && snake.head.samePositions(segment)) {
                this.gameOver()
            }
        })
    }

    gameOver(reload = true) {
        console.log('%c You just lose', 'color: red; font-weight: bold; background: black; padding: 10px;');

        this.setup()
    }

    detectFoodColision() {
        const { snake, currentFood } = this.canvas

        if (snake.head.samePositions(currentFood)) {
            snake.eatFood(currentFood)

            this.spawnRandomFood()
            this.draw()
        } 
    }

    spawnRandomFood() {
        this.canvas.setRandomCurrentFood()
    }

    inputSetup() {
        document.addEventListener('keyup', (event) => {
            // Don't allow to move when is the Snake is already moving
            if(this.redraw == true) return 

            const keyData = this.detectKeyFromCode(event.code)

            if(keyData.direction) {
                this.moveSnake(keyData.direction)
                this.redraw = true
            }
        })
    }

    detectKeyFromCode(keyCode, inputKeys = INPUT_MAPPING) {
        var keyData = { direction: null , key: null }

        Object.keys(inputKeys).forEach((keyList) => {
            if(inputKeys[keyList].includes(keyCode) && keyData.direction == null) {
                keyData = { direction: keyList, key: keyCode }
            }
        })

        return keyData
    }   
}

module.exports = Game
},{"./board":3,"./canvas":4,"./snake":7}],7:[function(require,module,exports){
const NOT_ALLOWED_DIRECTIONS_TO_TURN = {
    'up': ['down'],
    'down': ['up'],
    'left': ['right'],
    'right': ['left']
}

const SnakeSegment = require('./snake_segment')

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

        return new SnakeSegment(this.calculateX(positions.x, this.board.maxLines), this.calculateY(positions.y, this.board.maxRows), type, color, text)
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
},{"./snake_segment":8}],8:[function(require,module,exports){
const VALID_SEGMENTS_TYPES = ['head', 'segment']
const validPosition = (position) => (
    typeof(position) === 'number' && position >= 0
)


class SnakeSegment {
    constructor(positionX, positionY, type, color = 'black', textColor = 'white') {
        this.positionX = this.lastPositionX = parseInt(positionX)
        this.positionY = this.lastPositionY = parseInt(positionY)
        this.type = type
        this.text = type
        this.color = color
        this.textColor = textColor

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

module.exports = SnakeSegment
},{}]},{},[1])
//# sourceMappingURL=bundle.dev.js.map
