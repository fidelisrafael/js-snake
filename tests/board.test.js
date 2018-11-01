const Board = require('./../lib/board')

describe('Board', () => {
    test('it should initialize', () => {
        expect(() => (new Board(10, 10))).not.toThrow()
    })

    describe('`rows` parameter', () => {
        const expectedError = new TypeError('`rows` must be a positive number greather than 0')
        
        describe('=> valid', () => {
            test('it must accepts a `String` as a `Number`', () => {
                expect(() => (new Board('10', 10))).not.toThrow(expectedError)
            })

            test('it must accepts a positive `Number`', () => {
                expect(() => (new Board(20, 10))).not.toThrow(expectedError)
            })

            test('it should allow to calculate `maxRows`', () => {
                const board = new Board(20, 10)

                expect(board.maxRows).toEqual(20)
            })
        })

        describe('=> invalid', () => {
            test('it must not accept `null`', () => {
                expect(() => (new Board(null, 10))).toThrow(expectedError)
            })
    
            test('it must not accept a negative number', () => {
                expect(() => (new Board(-1, 10))).toThrow(expectedError)
            })
   
            test('it must not accepts a invalid Number as String', () => {
                expect(() => (new Board('test', 10))).toThrow(expectedError)
            })
    
            test('it must not accepts `undefined`', () => {
                expect(() => (new Board(undefined, 10))).toThrow(expectedError)
            })

            test('it must not accept `0`', () => {
                expect(() => (new Board(0, 10))).toThrow(expectedError)
            })
        })
    })

    describe('`lines` parameter', () => {
        const expectedError = new TypeError('`lines` must be a positive number greather than 0')
        
        describe('=> valid', () => {
            test('it must accepts a `String` as a `Number`', () => {
                expect(() => (new Board(10, '10'))).not.toThrow(expectedError)
            })

            test('it must accepts a positive `Number`', () => {
                expect(() => (new Board(10, 20))).not.toThrow(expectedError)
            })

            test('it should allow to calculate `maxLines`', () => {
                const board = new Board(20, 10)

                expect(board.maxLines).toEqual(10)
            })
        })

        describe('=> invalid', () => {
            test('it must not accept `null`', () => {
                expect(() => (new Board(10, null))).toThrow(expectedError)
            })
    
            test('it must not accept a negative number', () => {
                expect(() => (new Board(10, -1))).toThrow(expectedError)
            })
   
            test('it must not accepts a invalid Number as String', () => {
                expect(() => (new Board(10, 'test'))).toThrow(expectedError)
            })
    
            test('it must not accepts `undefined`', () => {
                expect(() => (new Board(10, undefined))).toThrow(expectedError)
            })

            test('it must not accept `0`', () => {
                expect(() => (new Board(10, 0))).toThrow(expectedError)
            })
        })
    })
})