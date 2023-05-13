// initialize variables
const g = 9.81; // acceleration due to gravity (m/s^2)
const velocity = 70; // m/s
const angle = 75; // degrees
const distanceToGoal = 30; // meters




// Print out the results
const maxHeight = calculateMaxHeight(velocity, angle);
console.log(`Maximum height: ${maxHeight} m`);

const distanceToMaxHeight = calculateDistanceToMaxHeight(velocity, angle);
console.log(`Distance to maximum height: ${distanceToMaxHeight} m`);

const timeToGoal = calculateTimeToGoal(distanceToGoal, velocity, angle);
console.log(`Time to reach goal: ${timeToGoal} s`);

const finalHeight = calculateFinalHeight(distanceToGoal, velocity, angle);
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
  const Vy = verticalVelocity(velocity, angle); // vertical component of velocity
  const maxHeight = (Vy * Vy) / (2 * g); // calculate maximum height
  return maxHeight.toFixed(2); // return maximum height
}


// Vy = Voy - g * t ---> Vy = 0
// t = Voy / g  and  Vx = Vo * cos(angle(rad))
// dx = Vx * t
function calculateDistanceToMaxHeight(velocity, angle) {
  const radians = toRadians(angle);  // convert angle to radians
  const Vy = verticalVelocity(velocity, angle); // vertical component of velocity
  const timeToMaxHeight = Vy / g; // time to reach maximum height
  const Vx = horizontalVelocity(velocity, angle); // horizontal component of velocity
  const dx = Vx * timeToMaxHeight; // horizontal distance traveled during time to reach max height
  return dx.toFixed(2); // round to 2 decimal places
}

// Vx = Vo * cos(angle(rad))
// t = dx / Vx
function calculateTimeToGoal(distance, velocity, angle) {
  const dx = distance; // horizontal distance to goal
  const Vx = horizontalVelocity(velocity, angle); // horizontal component of velocity
  const timeToGoal = dx / Vx; // time to reach goal
  return timeToGoal.toFixed(2); // round to 2 decimal places
}


// t = TimeToGoal
// Vy = Voy - g * t 
// H = Voy * t - 0.5 * g * t * t
function calculateFinalHeight(distance, velocity, angle) {
  const timeToGoal = calculateTimeToGoal(distance, velocity, angle); // time to reach goal
  const Voy = verticalVelocity(velocity, angle); // vertical component of velocity at start
  const Vy = Voy - g * timeToGoal; // vertical component of velocity at time of goal
  const finalHeight = Vy * timeToGoal - 0.5 * g * timeToGoal * timeToGoal; // height of ball at time of goal
  return finalHeight.toFixed(2); // round to 2 decimal places
}
