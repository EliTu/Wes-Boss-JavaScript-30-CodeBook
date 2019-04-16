// Grab the canvas:
const canvas = document.querySelector('#draw');

// Grab the context:
const ctx = canvas.getContext('2d');

// Set the width and the height of the canvas on the page:
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Drawing configurations:
ctx.strokeStyle = '#e32223';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
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
canvas.addEventListener('mousemove', draw);

// Mouse events:
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true; // If mousedown, boolean draw flag is set
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Set the offset mouse pointer to the position of the click
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);