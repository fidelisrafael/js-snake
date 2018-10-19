const isNumberValid = (number) => (
    typeof(number) === 'number' && number > 0
)

class Board {
    constructor(rows, lines) {
        this.rows = parseInt(rows)
        this.lines = parseInt(lines)

        if(!isNumberValid(this.rows))  { throw new TypeError('`rows` must be a positive number greather than 0')}
        if(!isNumberValid(this.lines)) { throw new TypeError('`lines` must be a positive number greather than 0')}
    }

    get maxRows() {
        return this.rows
    }

    get maxLines() {
        return this.lines
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Board
else
    window.Board = Board