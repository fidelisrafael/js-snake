const SnakeSegment = require('./../lib/snake_segment')

const HEAD_TYPE = 'head'
const SEGMENT_TYPE = 'segment'

describe('SnakeSegment', () => {
    test('it should initialize', () => {
        expect(() => (new SnakeSegment(0, 0, HEAD_TYPE))).not.toThrow()
    })

    describe('=> valid', () => {
        describe('segment.positionX', () => {
            test('it must accepts a valid Number', () => {
                expect(() => (new SnakeSegment(10, 0, HEAD_TYPE))).not.toThrow()
            })

            test('it must accepts a valid String as a Number', () => {
                expect(() => (new SnakeSegment('10', 0, HEAD_TYPE))).not.toThrow()
            })

            test('it must accepts a Float and convert it to a Integer', () => {
                const segment = new SnakeSegment(10.5, 10, SEGMENT_TYPE)

                expect(segment.positionX).toEqual(10)
            })
        })

        describe('segment.positionY', () => {
            test('it must accepts a valid Number', () => {
                expect(() => (new SnakeSegment(0, 10, HEAD_TYPE))).not.toThrow()
            })

            test('it must accepts a valid String as a Number', () => {
                expect(() => (new SnakeSegment(0, '10', HEAD_TYPE))).not.toThrow()
            })

            test('it must accepts a Float and convert it to a Integer', () => {
                const segment = new SnakeSegment(10, 20.2, SEGMENT_TYPE)

                expect(segment.positionY).toEqual(20)
            })
        })
        
        describe('segment.type', () => {
            test("it must accepts 'head' as a valid", () => {
                expect(() => (new SnakeSegment(0, 10, 'head'))).not.toThrow()
            })
            
            test("it must accepts 'segment' as a valid", () => {
                expect(() => (new SnakeSegment(0, 10, 'segment'))).not.toThrow()
            })

            test('it must allow to determine if one segment is the main head', () => {
                const segment = new SnakeSegment(0, 10, HEAD_TYPE)

                expect(segment.isHead).toBeTruthy()
            })
            
            test('it must not flag a common segment as a the main head', () => {
                const segment = new SnakeSegment(0, 10, SEGMENT_TYPE)

                expect(segment.isHead).toBeFalsy()
            })
        })

        describe('segment.color', () => {
            test('it must be black by default', () => {
                const segment = new SnakeSegment(0, 10, SEGMENT_TYPE)

                expect(segment.color).toEqual('black')
            })

            test('it must allow to overwrite it', () => {
                const segment = new SnakeSegment(0, 10, SEGMENT_TYPE, 'red')

                expect(segment.color).toEqual('red')
            })
        })

        describe('segment.textColor', () => {
            test('it must be white by default', () => {
                const segment = new SnakeSegment(0, 10, SEGMENT_TYPE)

                expect(segment.textColor).toEqual('white')
            })

            test('it must allow to overwrite it', () => {
                const segment = new SnakeSegment(0, 10, SEGMENT_TYPE, 'red', 'blue')

                expect(segment.textColor).toEqual('blue')
            })
        })

        describe('segment.text', () => {
            test("it must inherits the value from `type`", () => {
                const segment = new SnakeSegment(0, 10, SEGMENT_TYPE)

                expect(segment.text).toEqual(SEGMENT_TYPE)
            })
        })        
    })

    describe('=> invalid', () => {
        describe('segment.positionX', () => {
            const expectedError = new TypeError('The parameter `positionX` must be a positive integer number')

            test('it must not accepts a negative number', () => {
                expect(() => (new SnakeSegment(-10, 0, HEAD_TYPE))).toThrow(expectedError)
            })

            test('it must not accepts a negative number as String', () => {
                expect(() => (new SnakeSegment('-10', 0, HEAD_TYPE))).toThrow(expectedError)
            })

            test('it must not accepts `undefined`', () => {
                expect(() => (new SnakeSegment(undefined, 0, HEAD_TYPE))).toThrow(expectedError)
            })

            test('it must not accepts `null`', () => {
                expect(() => (new SnakeSegment(null, 0, HEAD_TYPE))).toThrow(expectedError)
            })

            test('it must not accepts an invalid String as a Number', () => {
                expect(() => (new SnakeSegment('test', 0, HEAD_TYPE))).toThrow(expectedError)
            })
        })

        describe('segment.positionY', () => {
            const expectedError = new TypeError('The parameter `positionY` must be a positive integer number')

            test('it must not accepts a negative number', () => {
                expect(() => (new SnakeSegment(0, -10, HEAD_TYPE))).toThrow(expectedError)
            })

            test('it must not accepts a negative number as String', () => {
                expect(() => (new SnakeSegment(0, '-10', HEAD_TYPE))).toThrow(expectedError)
            })

            test('it must not accepts `undefined`', () => {
                expect(() => (new SnakeSegment(0, undefined, HEAD_TYPE))).toThrow(expectedError)
            })

            test('it must not accepts `null`', () => {
                expect(() => (new SnakeSegment(0, null, HEAD_TYPE))).toThrow(expectedError)
            })

            test('it must not accepts an invalid String as a Number', () => {
                expect(() => (new SnakeSegment(0, 'test', HEAD_TYPE))).toThrow(expectedError)
            })
        })

        describe('segment.type', () => {
            test("it must not accepts an empty type", () => {
                expect(() => (new SnakeSegment(0, 10, ''))).toThrow("The provided type: '' is not valid as a SnakeSegment")
            })

            test("it must not accepts an invalid type", () => {
                expect(() => (new SnakeSegment(0, 10, 'invalid'))).toThrow("The provided type: 'invalid' is not valid as a SnakeSegment")
            })

            test("it must not accepts `undefined`", () => {
                expect(() => (new SnakeSegment(0, 10, undefined))).toThrow("The provided type: 'undefined' is not valid as a SnakeSegment")
            })

            test("it must not accepts `null`", () => {
                expect(() => (new SnakeSegment(0, 10, null))).toThrow("The provided type: 'null' is not valid as a SnakeSegment")
            })
        })
    })
})