# js-snake

---

A very simple Snake style game made with JS and HTML5 &lt;canvas>

![Game preview](./screenshots/jssnake-development.png)

---

## How to run

1 - Clone this repository:

```bash
$ git clone https://github.com/fidelisrafael/js-snake.git
```

2 - Enter in the directory and install the dependencies:

Currently the only depencies is `jest` for testing.


```
$ npm install # or yarn install
```

3 - Run the tests to make sure everything is working as expected:

```
$ npm tests # yarn tests
```

4 - Just open the `snake.html` file in your browser, on mac you can use: `open snake.html` or on some Linux distros you can try: `see snake.html`.

5 - Enjoy it ;)

### Debug Mode

You can run this application in debug mode to help you to understand what's going on the details. Just pass the `#debug` hash-fragment on URL when you open `snake.html` on the browser, eg:

```
file:///(...)/jssnake/snake.html#debug
```

![Snake JS - Debug Mode](./screenshots/jssnake-debug.png)

As you can see, each fragment of the Snake will have their identification and the same happens with the food as well. The "tiles"(red and green) are the tilesets of the "map/board" where the Snake will be abble to moviment through, and where the food will appear when needed. ß
Note that each tile is basically disposed in a X/Y coordinates in a Coordinate(Cartesian) Plane. For example, the tileset number `3` is on `X = 3 | Y = 0`, the tileset `12` is on `X = 2 | Y = 5`