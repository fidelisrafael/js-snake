class Game {
    constructor() {
        this.updateInterval = 100;
        this.board = new BoardCanvas('#board')
        this.redraw = false

        this.inputMapping = {
            'up': ['KeyW', 'ArrowUp'],
            'left': ['KeyA', 'ArrowLeft'],
            'right': ['KeyD', 'ArrowRight'],
            'down': ['KeyS', 'ArrowDown'],
        }
    }

    draw() {
        this.board.clear()
        this.board.paint()
    }

    moveSnake(direction) {
        const snake = this.board.snake

        switch (direction) {
            case 'up':
                snake.moveUp()
                break;
            case 'left':
                snake.moveLeft()
                break;
            case 'right':
                snake.moveRight()
                break;
            case 'down':
                snake.moveDown()
                break;
        }

        this.detectFood()
    }

    detectFood() {
        const { snake, currentFood } = this.board

        if ((snake.positionX == currentFood.positionX) && (snake.positionY == currentFood.positionY)) {
            snake.eatFood(currentFood)

            this.spawnRandomFood()
        } 
    }

    spawnRandomFood() {
        this.board.setRandomCurrentFood()
    }

    init() {
        this.draw()
        this.attachInput()
        
        setInterval(this.update.bind(this), this.updateInterval)
    }

    attachInput() {
        document.addEventListener('keyup', (event) => {

            if(this.redraw == true) {
                return
            }

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

    update() {
        if(this.redraw) {
            this.draw()
            this.redraw = false
        }
    }
}