// Get canvas and set up context
const canvas = document.getElementById("rainbowCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fit the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Array to store rainbow arcs
let rainbows = [];

// Function to create a rainbow arc at clicked position
function createRainbow(x, y) {
    rainbows.push({ x, y });

    if (rainbows.length > 10) {
        rainbows.shift(); // Limit to 10 rainbows to optimize performance
    }
}

// Function to draw rainbow arcs
function drawRainbows() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rainbows.forEach(({ x, y }) => {
        const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"];
        const arcSize = 120; // Outer radius of the rainbow
        const arcWidth = 12; // Thickness of each arc

        colors.forEach((color, index) => {
            ctx.beginPath();
            ctx.arc(x, y, arcSize - index * arcWidth, Math.PI, 2 * Math.PI, false);
            ctx.lineWidth = arcWidth;
            ctx.strokeStyle = color;
            ctx.stroke();
        });
    });

    requestAnimationFrame(drawRainbows);
}

// Listen for clicks to create a rainbow
canvas.addEventListener("click", (event) => {
    createRainbow(event.clientX, event.clientY);
});

// Start animation loop
drawRainbows();