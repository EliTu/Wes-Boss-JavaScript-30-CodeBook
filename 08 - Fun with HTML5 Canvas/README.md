# Project # 8 - Fun With HTML5 Canvas

### _By Eliad Touksher_

## New things learned in this project

- Everything that has to do with HTML5 Canvas, first time puting it to use :)
- The concept of `canvas` and the `context` of the canvas.
- Working with boolean flags to set up different modes and manipulate functions.
- Better understanding and practical implementation of mouse events.
- Setting positions with `offsetX` and `offsetY`.
- Implementing `hsl()` in JavaScript.

## Intro

In this challenge we will be playing around with the HTML5 `<canvas>` feature. We will be building and configuring a canvas page which we could draw on, and it will have some cool alternating features that will make the drawing a bit more exciting.

## User Stories

Whenever I press on the mouse button on the page, I immediately start to draw on the page. As I hold the mouse, the drawing continues throughout the page and stops only when I realease the mouse click. Whenever I draw, the width of the "brush" changes its size, and the colors change as well.

## Solution map

First we will have to Initialize the `canvas` in our code and set its `context` for that file. We will have to configure drawing configurations, width, height, set variables to check X position, Y position, boolean flags, and set event listeners for mouse click, drag and release.

## Wes` Solution

### Setting up the `canvas` element and variables

In our HTML file we have our `<canvas>` element, which sets up the canvas feature on which we will draw on our page, with our preset `width` and `height` properties.

```html
<canvas id="draw" width="800" height="800"></canvas>
```

We will go to our JavaScript file and first grab the `<canvas>` element and set it to a variable. Next up, we will need the `context`, which is what actually allows us to do the drawing on. We get the `context` by using the `getContext` method on the `canvas` variable, and set its argument to '2d', indicating we want to do 2D drawings (Potentially, 3D drawing is possible as well).

```js
// Grab the canvas:
const canvas = document.querySelector("#draw");

// Grab the context:
const ctx = canvas.getContext("2d");
```

### Setting up the `width` and `height`, and draw settings

Next up we need to set up the values of our `width` and `height` for the canvas field. We already set default values in our HTML element, but potentially we want to set the `width` and the `height` to be that of the `window` object. We do this by set the values of the `width` and `height` to that of the `innerWidth` and `innerHeight` of the `window` object.

```js
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

Now we will set up some variables that will hold some base settings values for our drawings. We will set up the base color with `ctx.strokeStyle`, the shape of the end of the line with `ctx.lineCap` and the setting for when 2 lines meet with `ctx.lineJoin`. We will set the color to a random one, and the other 2 variables both set to `round`, this will allow us to have a round shape to our drawings.

```js
ctx.strokeStyle = "#e32223";
ctx.lineJoin = "round";
ctx.lineCap = "round";
```

### Setting up boolean flag and the X and Y

First we will want to set up a variable that will hold a boolean value that will indicate to us if we're drawing, and we will set a default value of a `false`, and set it to true only when we press on the mouse. When we will set it up with the event listeners, this will prevent us from drawing on the canvas without pressing on the mouse first.

```js
let isDrawing = false; // Drawing boolean flag
```

Next up we will set default values for the X and Y, for the start and the stop of the lines we will draw. So we will have `lastX` and `lastY` variables that will hold the last position of the mouse press, and so it will hold the initial and the last position of the drawings.

```js
let lastX = 0;
let lastY = 0;
```

### The `draw()` function and event listeners

In this function we will set up all of the drawing functionality and mutate our base variables for effects. This function takes the `event` argument and will be called whenever we move our mouse on the canvas.

```js
function draw(e) {
  console.log(e);
}
```

Now we will set up a few event listeners that will listen to a few mouse evenets. First, we will set up an event listener that will listen to `mousemove` event, and call the `draw()` function.

```js
canvas.addEventListener("mousemove", draw);
```

Because we set the `console.log` for the `event` in the `draw()` function, whenever we move the mouse upon the canvas the console logs a mouse move event. If we look into these events, we can see that they hold position properties, like `offsetX` and `offsetY` that we could use. Again, we don't want the `draw()` function to run all the time, but only when the mouse button is pressed down. So first we will go back to the `draw()` function and create an `if` statement using our boolean flag, we will check if the `isDrawing` variable is set to `false`, then we want the function to `return`, meaning it won't be executed beyond this poitnt.

```js
function draw(e) {
  if (!isDrawing) return;
}
```

Next we will add another event listener that listens to `mousedown` event, meaning that only when the mouse button is pressed and its down, and whenever its pressed we will mutate the `isDrawing` value to `true` and thus allow drawing on the canvas.

```js
canvas.addEventListener("mousedown", e => (isDrawing = true));
```

Now we will want to default the `isDrawing` value back to false whenever the mouse is back up with `mouseup` event or when you move the mouse out of the canvas area with `mouseout` event.

```js
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
```

### Setting up the drawing features

We will go back to the `draw()` function and set up the draw functionality for the canvas, using the `context` property of the `canvas`. First we will need to set up the `beginPath` method. Next we will set the directions of the drawings with the `moveTo` method, and we will set it up first for our `lastX` and `lastY` properties, and then use `lineTo` method to set the `e.offsetXX` and `e.offsetY` which are the properties of the event. Finally, we call the `stroke` method to actually enable the drawing.

```js
function draw(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  // Start from:
  ctx.moveTo(lastX, lastY);
  // Go to:
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}
```

Now upon a click of the mouse on the canvas we draw many lines all coming from (0, 0) position, which is our start position of `lastX` and `lastY`, which we set to 0 initially, and end up at the tip of our mouse pointer which is set to the `.offsetX` and `e.offsetY`, which are based on the position of our mouse upon rhe canvas. So we would like to update the `lastX` and `lastY` variables to match where we were last with our mouse. We can set these up using ES6 array destructuring.

```js
[lastX, lastY] = [e.offsetX, e.offsetY];
```

Now the drawing is a bit smoother and we can draw a bit more freely but there are still few problems. First, when we initially click down,our first drawing is still starting from (0, 0) because we haven't changed the initial values of `lastX` and `lastY`, also when we continue to draw, the drawing starts from our last position, and so it just draws a staright line from that position to the pointer, basically making us draw one big line. To fix this, we will go back to the event listener that holds the `mousedown` event, and instead of having a one line function, we will pass the `event` as an argument, open curly braces and also add in the earlier set updated `lastX` and `lastY` values to the event. This in turn will update the drawing position to the pointer upon clicking on the mouse button.

```js
canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
```

### Playing with the drawing tool

We will start by going back to the drawing configurations and setting up the width of the line using the `lineWidth` property, we will give it a default value of 50. This will make the line that is being drawn thicker.

```js
ctx.lineWidth = 50;
```

Now let's set a color swap for the line dynamically upon drawing. We will be able to achieve this by updating our `strokeStyle` property with a custom hsl value. Seeing the spectrum of the hsl colors, the hue value of 0 sets us to red, while the value of 360 sets us purple, and so we can go over the numbers between 0 to 360 and it will give us multiple sets of colors. We will set a `hue` variable and give it an initial value of 0.

```js
let hue = 0;
```

Now back in the `draw()` function, we will mutate the value of the `strokeStyle` property to be an `hsl()` function, and the `hue` variable to be set as the hue, then give it 100% saturation and 50% lightness values. This will change the color of the drawing to red, but to make it more dynamic we will increment `hue` by one upon the drawing, which in turn will rapidly change the color of the drawing as the value of `hue` changes. Also we would like to specify that whenever the value of `hue` surpasses 360, it will simply 'reset' back to 0 again, so it'll start over.

```js
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
hue++;
if (hue >= 360) hue = 0;
```

Another thing we would like to set up is the width of the drawing, and we would like to change it with the drawing as we do with the color. One thing we could do is to set the the `lineWidth` property to the value of `hue`, but we would like to make it cooler by setting up a separate variable for that called `direction`, and set the initial value to `true`.

```js
let direction = true;
```

Back in the `draw()` function, we'll want to increment the `lineWidth`. Upon this logic we will write an `if` statement that says that if the value of the `lineWidth` is greater or equal to 100 OR its value is less or equal to 1, we will flip the value of `direction`, and then we will write another `if` statement that checks the value of `direction`, if the value is `true` we put the `lineWidth` increment in that block, `else` we will decrement it.

```js
if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction;

if (direction) {
  ctx.lineWidth++;
} else {
  ctx.lineWidth--;
}
```

This way we can control the width of the draw by dynamically mutating the `lineWidth`: We start with the initial value of 50 that we set, adn since `direction` is set initially to `true` it will increment the width to up to 100, making it gradually bigger. Upon reaching 100, the `direction` value will be switched to `false` and then we will start to decrement the width upon drawing, making the draw smaller.

### Full code

```js
// Grab the canvas:
const canvas = document.querySelector("#draw");

// Grab the context:
const ctx = canvas.getContext("2d");

// Set the width and the height of the canvas on the page:
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Drawing configurations:
ctx.strokeStyle = "#e32223";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 50;

// Variables:
let isDrawing = false; // Drawing boolean flag
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

// Draw function:
function draw(e) {
  // If there is no mouse down, stop the function
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();
  // Start from:
  ctx.moveTo(lastX, lastY);
  // Go to:
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  // Update X and Y positions:
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // Hue settings:
  hue++;
  if (hue >= 360) hue = 0;

  // Set directions to the changing line width:
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction;

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}
// Draw function event:
canvas.addEventListener("mousemove", draw);

// Mouse events:
canvas.addEventListener("mousedown", e => {
  isDrawing = true; // If mousedown, boolean draw flag is set
  [lastX, lastY] = [e.offsetX, e.offsetY]; // Set the offset mouse pointer to the position of the click
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
```
