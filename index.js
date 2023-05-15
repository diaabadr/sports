import { vars } from "./functions.js";
import { calculateMaxHeight } from "./functions.js";
import { calculateDistanceToMaxHeight } from "./functions.js";
import { calculateFinalHeight } from "./functions.js";

// Get a reference to the image element
let img = document.querySelector("img");

let form = document.querySelector("form");

// Set the initial position of the image
let x = 1250;
let y = 90;

img.style.left = x + "px";
img.style.bottom = y + "px";

// Set the target position of the image
let targetX = 150;
let targetY = 0;
let distanceX = targetX - x;
let distanceY = targetY - y;
let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
let speed = 10;
// Set the duration of the animation in milliseconds
let duration = (distance / speed) * 1000;

// Get the start time of the animation
let startTime = null;
let finalHeight;
let finalx = 1250;

form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the form from submitting

  vars.distanceToGoal = document.querySelector("#distance")?.value;
  vars.angle = document.querySelector("#angle").value;
  vars.velocity = document.querySelector("#velocity").value;
  console.log(vars);

  x = (1-vars.distanceToGoal/50) * 1250
  y = 90;
  targetY = calculateMaxHeight(vars.velocity, vars.angle);
  console.log(`target Y: ${targetY} m`);
  targetY =  (targetY/2.44) * 450 - 120;
  console.log(`ball Maximum height: ${targetY} m`);
  targetX = calculateDistanceToMaxHeight(vars.velocity, vars.angle);
  let restOfDistance = vars.distanceToGoal - targetX;
  targetX = (1-targetX/50) * 1250;
  finalHeight = calculateFinalHeight(restOfDistance, vars.velocity, vars.angle);
  console.log(`final height: ${finalHeight} m`);
  console.log(`target X: ${targetX} m`);
  distanceX = targetX - x;
  distanceY = targetY - y;
  distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  speed = vars.velocity;
  duration = (distance / speed) * 1000;
  startTime = performance.now(); // initialize the start time to the current time

  // Start the animation
  requestAnimationFrame(animate);
});

// Define the animation function
function animate(currentTime) {
  let elapsedTime = currentTime - startTime;
  let progress = Math.min(elapsedTime / duration, 1);
  x = interpolate(x, targetX, progress);
  y = interpolate(y, targetY, progress);
  if(x == targetX){
    targetX = finalx;
    targetY = finalHeight;
    console.log("second phase is working");
  }
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
