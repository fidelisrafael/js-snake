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