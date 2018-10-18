'use strict';

class GameCanvas {
    constructor(canvasElement, rows = 12, lines = 12, tileSize = 48) {
        this.board = new Board(rows, lines)
        this.snake = new Snake(this)
        this.tileSize = tileSize
        this.canvas = document.querySelector(canvasElement)
        this.context = this.canvas.getContext('2d');

        // Bootstrap things
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
            this.drawObjectInTyle(segment)
        })
    }

    drawObjectInTyle(object) {
        const boardX = object.positionX * this.tileSize
        const boardY = object.positionY * this.tileSize

        this.context.fillStyle = object.color
        
        this.context.fillRect(boardX, boardY, this.tileSize, this.tileSize)

        if(object.text) {
            this.context.fillStyle = object.textColor || 'white'
            this.context.fillText(object.text, boardX, boardY + this.tileSize/2)
        }
    }

    drawFood() {
        this.drawObjectInTyle(this.currentFood)
    }

    drawTiles() {
        this.board.tiles.forEach((row, rowIndex) => {
            row.forEach((line, lineIndex)  => {
                const color = (lineIndex + rowIndex) % 2 == 0 ? 'red' : 'green'

                this.drawTile(rowIndex, lineIndex, color)
            })
        })
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

        this.currentFood = new Food(randomX, randomY, this.snake.length)
    }

    randomPositionWithNoObstructions(obstruction) {
        do {
            var random = Math.floor((Math.random() * this.board.maxRows))
        } while (random == obstruction)

        return random
    }
}


module.exports = GameCanvas