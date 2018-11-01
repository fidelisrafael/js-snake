class Food {
  constructor(positionX, positionY, color = 'green', text = '') {
    this.positionX = positionX
    this.positionY = positionY
    this.color = color
    this.text = text
    this.textColor = 'black'
  }
  
  get positions() {
    return { x: this.positionX, y: this.positionY }
  }

  get positionsArray() {
    return [this.positionX, this.positionY] 
  }
}

module.exports = Food