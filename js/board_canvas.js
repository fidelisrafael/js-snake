'use strict';

class BoardCanvas {
    constructor(canvasElement, size = 48) {
        this.board = new Board()
        this.snake = new Snake(this.board)
        this.size = size
        this.canvas = document.querySelector(canvasElement)
        this.context = this.canvas.getContext('2d');

        this.setRandomCurrentFood()
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width , this.canvas.width)
    }

    setRandomCurrentFood() {
        const randomX = this.randomPositionWithNoObstructions(this.snake.positionX)
        const randomY = this.randomPositionWithNoObstructions(this.snake.positionY)

        this.currentFood = new Food(randomX, randomY, this.snake.length())
    }

    randomPositionWithNoObstructions(obstruction) {
        var random = null

        while (true) {
            random = Math.floor((Math.random() * 11))

            if(random != obstruction) {
                break
            }
        }

        return random
    }

    paint() {
        this.setCanvasDimensions()
        this.paintTiles()
        this.paintFood()
        this.paintSnake()
    }

    paintSnake() {
        this.paintObjectInTyle(this.snake)
    }

    paintObjectInTyle(object) {
        const boardX = object.positionX * this.size
        const boardY = object.positionY * this.size

        this.context.fillStyle = object.color
        
        this.context.fillRect(boardX, boardY, this.size, this.size)

        if(object.text) {
            this.context.fillStyle = object.textColor || 'white'
            this.context.fillText(object.text, boardX, boardY + this.size/2)
        }
    }

    paintFood() {
        this.paintObjectInTyle(this.currentFood)
    }

    paintTiles() {
        this.board.tiles.forEach((row, rowIndex) => {
            row.forEach((line, lineIndex)  => {
                const color = (lineIndex + rowIndex) % 2 == 0 ? 'red' : 'green'

                this.paintTile(rowIndex, lineIndex, color)
            })
        })
    }

    paintTile(row, column, color) {
        const y = row * this.size
        const x = column * this.size
       
        this.context.fillStyle = color
        this.context.fillRect(x, y, this.size, this.size)
        this.context.fillText (column, x + this.size / 2, y - this.size / 2)
    }

    setCanvasDimensions() {
        this.canvas.width = this.size * this.board.tiles[0].length 
        this.canvas.height = this.size * this.board.tiles[0].length 
    }
}
