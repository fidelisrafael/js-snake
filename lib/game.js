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
        this.currentDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]

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

        this.canvas = new GameCanvas(canvas, this.rows, this.lines, this.tileSize, this.debugMode)
    }

    setup() {
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
        this.moveSnake(this.currentDirection)
    }

    update() {
        this.autoMoveSnake()

        if(this.redraw) {
            this.draw()
            this.redraw = false
        }
    }

    moveSnake(direction) {
        if(!this.canMoveSnake) return

        this.redraw = true
        this.canMoveSnake = false

        const snake = this.canvas.snake
        this.currentDirection = direction

        switch (direction) {
            case 'up':
                snake.moveUp()
                break
            case 'left':
                snake.moveLeft()
                break
            case 'right':
                snake.moveRight()
                break
            case 'down':
                snake.moveDown()
                break
        }

        this.canMoveSnake = true
        this.detectBodySegmentColision()
        this.detectFoodColision()
    }

    detectBodySegmentColision() {
        const { snake } = this.canvas

        snake.bodySegments.forEach((segment) => {
            if (!segment.isHead && snake.head.samePositions(segment)) {
                this.gameOver()
            }
        })
    }

    gameOver() {
        console.log('%c You just lose', 'color: red; font-weight: bold; background: black; padding: 10px;');
        this.resetCanvas()
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