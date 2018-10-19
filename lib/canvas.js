const TILE_BACKGROUND_COLOR = 'white'
const RANDOM_FOOD_COLORS = ['yellow', 'red', 'green', 'purple']

class GameCanvas {
    constructor(canvasElement, rows = 12, lines = 12, tileSize = 48, debugMode = false) {
        this.board = new Board(rows, lines)
        this.snake = new Snake(this.board)
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
        this.setCanvasDimensions()
        this.setRandomCurrentFood()
    }

    draw() {
        this.clear()
        this.drawTiles()
        this.drawFood()
        this.drawSnake()
    }

    drawSnake() {
        const snake = this.snake

        snake.bodySegments.forEach((segment, index) => {
            this.drawObjectAtTile(segment)
        })
    }

    drawObjectAtTile(object) {
        const boardX = object.positionX * this.tileSize
        const boardY = object.positionY * this.tileSize

        this.context.fillStyle = object.color
        
        this.context.fillRect(boardX, boardY, this.tileSize, this.tileSize)

        if(this.debugMode && object.text) {
            this.context.fillStyle = object.textColor || 'white'
            this.context.fillText(object.text, boardX, boardY + this.tileSize/2)
        }
    }

    drawFood() {
        this.drawObjectAtTile(this.currentFood)
    }

    drawTiles() {
        for (let rowIndex = 0; rowIndex < this.board.maxRows; rowIndex++) {
            for (let lineIndex = 0; lineIndex < this.board.maxLines; lineIndex++) {
                const color = this.debugMode ? ((lineIndex + rowIndex) % 2 == 0 ? 'red' : 'green') : TILE_BACKGROUND_COLOR

                this.drawTile(rowIndex, lineIndex, color)
            }
        }
    }

    drawTile(row, column, color) {
        const y = row * this.tileSize
        const x = column * this.tileSize
       
        this.context.fillStyle = color
        this.context.fillRect(x, y, this.tileSize, this.tileSize)
        this.context.fillText (column, x + this.tileSize / 2, y - this.tileSize / 2)
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width , this.canvas.width)
    }

    setCanvasDimensions() {
        this.canvas.width = this.tileSize * this.board.maxRows 
        this.canvas.height = this.tileSize * this.board.maxRows 
    }


    setRandomCurrentFood() {
        // TODO: This must check ALL segments of Snake
        const randomX = this.randomPositionWithNoObstructions(this.snake.positionX)
        const randomY = this.randomPositionWithNoObstructions(this.snake.positionY)
        const foodColor = RANDOM_FOOD_COLORS[Math.floor([Math.random() * RANDOM_FOOD_COLORS.length - 1])]
        const text = `Food #${this.snake.length}`

        this.currentFood = this.createFood(randomX, randomY, (this.debugMode ? 'white' : foodColor), text)
    }

    createFood(positionX, positionY, color, text = '') {
        return new Food(positionX, positionY, color, text)
    }

    randomPositionWithNoObstructions(obstruction) {
        do {
            var random = Math.floor((Math.random() * this.board.maxRows))
        } while (random == obstruction)

        return random
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = GameCanvas
else
    window.GameCanvas = GameCanvas