# js-snake

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)

---

A very simple Snake game built with `JS(ES6)` and `HTML5 <canvas>`.

![Game preview](./screenshots/jssnake-development.png)

---

## How to run & Development setup

1 - Clone this repository:

```bash
$ git clone https://github.com/fidelisrafael/js-snake.git
```

2 - Enter in the directory and install the dependencies:

```
$ npm install # or yarn install
$ npm install -g browserify # to bundle files
```

Currently the only dependencies are:
- `jest` for testing.
- `browserify` for bundling ES6 scripts to Browser

3 - Run the tests to make sure everything is working as expected:

```
$ npm test # or yarn test

> jest tests/

# Test Suites: 3 passed, 3 total
# Tests:       54 passed, 54 total
```

4 - This application uses [`Browserify`](https://github.com/browserify/browserify) to bundle a valid JS code for Browsers from the ES6 code at `./lib` folder. To check if the build is properly working, just run:

```
$ npm run build && npm run build_dev

> File "public/bundle.js" generated.
> File "public/bundle.dev.js" generated.
```

5 - If you receive the output above that means that everything is working just as expected, that's great! Now, you can just run the development server (this will open a new browser window):

```
$ npm run dev # or yarn run dev
```

OBS: We use [`Budo`](https://github.com/mattdesl/budo) as the development server with live-reload support.

6 - Enjoy it ;)

---

### Debug Mode

You can run this application in debug mode to help you to understand what's going on the details. Just pass the `#debug` hash-fragment on URL when you open `index.html` on the browser, eg:

```
http://localhost:9966/#debug
```

![Snake JS - Debug Mode](./screenshots/jssnake-debug.png)

As you can see, each fragment of the Snake will have their identification and the same happens with the food as well. The "tiles"(red and green) are the tilesets of the "map/board" where the Snake will be abble to moviment through, and where the food will appear when needed. ß
Note that each tile is basically disposed in a X/Y coordinates in a Coordinate(Cartesian) Plane. For example, the tileset number `3` is on `X = 3 | Y = 0`, the tileset `12` is on `X = 2 | Y = 5`

---


## :calendar: Roadmap <a name="roadmap"></a>

- :white_medium_small_square: Finish writing tests.
- :white_medium_small_square: Make a online demo available on Github Pages.
- :white_medium_small_square: Added window(HUD) with current points(`snake.length`).
- :white_medium_small_square: Try to render it in different sizes to detected rendering errors.
- :white_medium_small_square: Update this Roadmap with more plans.

---

## :thumbsup: Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/fidelisrafael/js-snake. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.

---

## :memo: License

The project is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

