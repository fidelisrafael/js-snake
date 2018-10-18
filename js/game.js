class Game {
    constructor(canvasElement) {
        this.updateInterval = 100;
        this.board = new BoardCanvas(canvasElement)
        this.redraw = false

        this.inputMapping = {
            'up': ['KeyW', 'ArrowUp'],
            'left': ['KeyA', 'ArrowLeft'],
            'right': ['KeyD', 'ArrowRight'],
            'down': ['KeyS', 'ArrowDown'],
        }
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

        this.detectFoodColision()
    }

    detectFoodColision() {
        const { snake, currentFood } = this.board

        if (this.isInSameTile(snake, currentFood)) {
            snake.eatFood(currentFood)

            this.spawnRandomFood()
        } 
    }

    isInSameTile(snake, food) {
        return (snake.positionX == food.positionX) && (snake.positionY == food.positionY)
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