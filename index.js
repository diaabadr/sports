import {velocity} from './functions.js';
import {angle} from './functions.js';
import {distanceToGoal} from './functions.js';


// Get a reference to the image element
let img = document.querySelector("img");

let form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the form from submitting
    
    // get the values of the input fields
    distanceToGoal = document.querySelector('#distance')?.value;
    angle = document.querySelector('#angle').value;
    velocity = document.querySelector('#velocity').value;
    console.log(distanceToGoal);
    
    // Start the animation
    requestAnimationFrame(animate);
});

// Set the initial position of the image
let x = 0;
let y = 90;
img.style.left = x + "px";
img.style.bottom = y + "px";

// Set the target position of the image
let targetX = window.innerWidth - img.offsetWidth-50;
let targetY = 0;
let distanceX = targetX - x;
let distanceY = targetY - y;
let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
let speed = 10;
// Set the duration of the animation in milliseconds
let duration = distance / speed * 1000;

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

