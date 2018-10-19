class Food {
    constructor(positionX, positionY, color = 'yellow', text = '') {
        this.positionX = positionX
        this.positionY = positionY
        this.color = color
        this.text = text
        this.textColor = 'black'
    }
    
    get positions() {
        return { x: this.positionX, y: this.positionY }
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Food
else
    window.Food = Food