const INPUT_MAPPING = {
    'up':    ['KeyW', 'ArrowUp'],
    'left':  ['KeyA', 'ArrowLeft'],
    'right': ['KeyD', 'ArrowRight'],
    'down':  ['KeyS', 'ArrowDown'],
}

class Game {
    constructor(canvasElement, rows = 12, lines = 12) {
        this.updateInterval = 100
        this.rows = rows
        this.lines = lines
        this.canvasElement = canvasElement
        this.redraw = false

        this.reset()
    }

    reset() {
        this.canvas = new GameCanvas(this.canvasElement, this.rows, this.lines)
    }

    init() {
        this.draw()
        this.inputSetup()

        setInterval(this.update.bind(this), this.updateInterval)
    }

    draw() {
        this.canvas.draw()
    }

    update() {
        if(this.redraw) {
            this.draw()
            this.redraw = false
        }
    }

    moveSnake(direction) {
        const snake = this.canvas.snake

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

        this.detectBodySegmentColision()
        this.detectFoodColision()
    }

    detectBodySegmentColision() {
        const { snake } = this.canvas

        snake.bodySegments.forEach((segment) => {
            if (this.isInSameTile(snake.head, segment)) {
                this.gameOver()
            }
        })
    }

    gameOver() {
        this.reset()
    }

    detectFoodColision() {
        const { snake, currentFood } = this.canvas

        if (this.isInSameTile(snake.head, currentFood)) {
            snake.eatFood(currentFood)

            this.spawnRandomFood()
        } 
    }

    isInSameTile(object, otherObject) {
        return (object.positionX == otherObject.positionX) && (object.positionY == otherObject.positionY)
    }

    spawnRandomFood() {
        this.canvas.setRandomCurrentFood()
    }

    inputSetup() {
        document.addEventListener('keypress', (event) => {

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
module.exports = INPUT_MAPPING