const INPUT_MAPPING = {
    'up':    ['KeyW', 'ArrowUp'],
    'left':  ['KeyA', 'ArrowLeft'],
    'right': ['KeyD', 'ArrowRight'],
    'down':  ['KeyS', 'ArrowDown'],
}

const DIRECTIONS = Object.keys(INPUT_MAPPING)

class Game {
    constructor(canvasElement, rows = 12, lines = 12, tileSize = 32, debugMode = false) {
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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Game
else
    window.Game = Game