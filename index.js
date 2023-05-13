// Get a reference to the image element
let img = document.querySelector("img");

// Set the initial position of the image
let x = 0;
let y = 90;
img.style.left = x + "px";
img.style.bottom = y + "px";

// Set the target position of the image
let targetX = window.innerWidth - img.offsetWidth-50;
let targetY = 0;

// Set the duration of the animation in milliseconds
let duration = 1000;

// Get the start time of the animation
let startTime = null;

// Define the animation function
function animate(currentTime) {
  if (!startTime) {
    startTime = currentTime;
  }
  let elapsedTime = currentTime - startTime;
  let progress = Math.min(elapsedTime / duration, 1);
  x = interpolate(x, targetX, progress);
  y = interpolate(y, targetY, progress);
  img.style.left = x + "px";
  img.style.bottom = y + "px";
  if (progress < 1) {
    requestAnimationFrame(animate);
  }
}

// Define the interpolation function
function interpolate(start, end, progress) {
  return start + (end - start) * progress;
}

// Start the animation
// requestAnimationFrame(animate);