class Game {
    constructor(canvasElement) {
        this.updateInterval = 100;
        this.canvasElement = canvasElement
        this.redraw = false

        this.inputMapping = {
            'up': ['KeyW', 'ArrowUp'],
            'left': ['KeyA', 'ArrowLeft'],
            'right': ['KeyD', 'ArrowRight'],
            'down': ['KeyS', 'ArrowDown'],
        }

        this.reset()
    }

    reset() {
        this.board = new BoardCanvas(this.canvasElement)
    }

    init() {
        this.draw()
        this.inputSetup()

        setInterval(this.update.bind(this), this.updateInterval)
    }

    draw() {
        this.board.draw()
    }

    update() {
        if(this.redraw) {
            this.draw()
            this.redraw = false
        }
    }

    moveSnake(direction) {
        const snake = this.board.snake

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
        const { snake } = this.board

        snake.bodySegments.forEach((segment) => {
            if (segment.type != 'head') {
                if (this.isInSameTile(snake.head, segment)) {
                    this.gameOver()
                }
            }
        })
    }

    gameOver() {
        this.reset()
    }

    detectFoodColision() {
        const { snake, currentFood } = this.board

        if (this.isInSameTile(snake.head, currentFood)) {
            snake.eatFood(currentFood)

            this.spawnRandomFood()
        } 
    }

    isInSameTile(object, otherObject) {
        return (object.positionX == otherObject.positionX) && (object.positionY == otherObject.positionY)
    }

    spawnRandomFood() {
        this.board.setRandomCurrentFood()
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

    detectKeyFromCode(keyCode) {
        var keyData = { direction: null , key: null }

        Object.keys(this.inputMapping).forEach((keyList) => {
            if(this.inputMapping[keyList].includes(keyCode) && keyData.direction == null) {
                keyData = { direction: keyList, key: keyCode }
            }
        })

        return keyData
    }
    
}