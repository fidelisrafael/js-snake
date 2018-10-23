const Snake = require('./../lib/snake')
const Food = require('./../lib/food')
const Board = require('./../lib/board')

describe('Snake', () => {
    const CANVAS = new Board(10, 10)

    it('must initialize', () => {
        expect(() => { new Snake(CANVAS) }).not.toThrow()
    })
    
    it('must initialize with one head as bodySegment', () => {
        const snake = new Snake(CANVAS)

        expect(snake.bodySegments).toHaveLength(1)
        expect(snake.bodySegments[0].isHead).toBeTruthy()
    })

    it('must initialize in the first tile', () => {
        const snake = new Snake(CANVAS)

        expect(snake.positions).toEqual({ x: 0, y: 0 })
    })

    it('must initialize with empty ate foods Array', () => {
        const snake = new Snake(CANVAS)

        expect(snake.foods).toHaveLength(0)
    })

    it('must populate `food`  with the food that was eat', () => {
        const snake = new Snake(CANVAS)
        const food = new Food(1, 0, 1)

        snake.moveLeft()     // To proper pass validations
        snake.eatFood(food)

        expect(snake.foods).toHaveLength(1)
        expect(snake.foods[0]).toEqual(food)
    })

    it('must add a new SnakeSegment every time that one food is eat', () => {
        const snake = new Snake(CANVAS)

        snake.moveLeft()     // To proper pass validations
        snake.eatFood(new Food(1, 0, 1))

        expect(snake.bodySegments).toHaveLength(2)
        expect(snake.bodySegments[0].type).toEqual('segment')
    })

    it('must allow to add segments', () => {
        const snake = new Snake(CANVAS)

        snake.addSegment('New segment')
    })
})