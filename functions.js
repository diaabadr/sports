// initialize variables
const g = 9.81; // acceleration due to gravity (m/s^2)


export let vars = {
  velocity: 70,
  angle: 75,
  distanceToGoal: 30,
};

// Print out the results
let maxHeight = calculateMaxHeight(velocity, angle);
console.log(`Maximum height: ${maxHeight} m`);

let distanceToMaxHeight = calculateDistanceToMaxHeight(velocity, angle);
console.log(`Distance to maximum height: ${distanceToMaxHeight} m`);

let timeToGoal = calculateTimeToGoal(vars.distanceToGoal, vars.velocity, vars.angle);
console.log(`Time to reach goal: ${timeToGoal} s`);

let finalHeight = calculateFinalHeight(vars.distanceToGoal, vars.velocity, vars.angle);
console.log(`Height of ball at time of goal: ${finalHeight} m`);
// End print out the results

// Prefunctions for the soccer ball problem
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
function verticalVelocity(velocity, angle) {
  return velocity * Math.sin(toRadians(angle));
}
function horizontalVelocity(velocity, angle) {
  return velocity * Math.cos(toRadians(angle));
}
// End prefunctions

// Start functions

// Vy = Vo * sin(angle(rad))
// Vy * Vy = Vo * Vo - 2 * g * H ---> Vy = 0
// H = (Vy * Vy) / (2 * g)
function calculateMaxHeight(velocity, angle) {
  let Vy = verticalVelocity(velocity, angle); // vertical component of velocity
  let maxHeight = (Vy * Vy) / (2 * g); // calculate maximum height
  return maxHeight.toFixed(2); // return maximum height
}

// Vy = Voy - g * t ---> Vy = 0
// t = Voy / g  and  Vx = Vo * cos(angle(rad))
// dx = Vx * t
function calculateDistanceToMaxHeight(velocity, angle) {
  let radians = toRadians(angle); // convert angle to radians
  let Vy = verticalVelocity(velocity, angle); // vertical component of velocity
  let timeToMaxHeight = Vy / g; // time to reach maximum height
  let Vx = horizontalVelocity(velocity, angle); // horizontal component of velocity
  let dx = Vx * timeToMaxHeight; // horizontal distance traveled during time to reach max height
  return dx.toFixed(2); // round to 2 decimal places
}

// Vx = Vo * cos(angle(rad))
// t = dx / Vx
function calculateTimeToGoal(distance, velocity, angle) {
  let dx = distance; // horizontal distance to goal
  let Vx = horizontalVelocity(velocity, angle); // horizontal component of velocity
  let timeToGoal = dx / Vx; // time to reach goal
  return timeToGoal.toFixed(2); // round to 2 decimal places
}

// t = TimeToGoal
// Vy = Voy - g * t
// H = Voy * t - 0.5 * g * t * t
function calculateFinalHeight(distance, velocity, angle) {
  let timeToGoal = calculateTimeToGoal(distance, velocity, angle); // time to reach goal
  let Voy = verticalVelocity(velocity, angle); // vertical component of velocity at start
  let Vy = Voy - g * timeToGoal; // vertical component of velocity at time of goal
  let finalHeight = Vy * timeToGoal - 0.5 * g * timeToGoal * timeToGoal; // height of ball at time of goal
  return finalHeight.toFixed(2); // round to 2 decimal places
}
