// Get a reference to the image element
const image = document.querySelector("img");

const form = document.querySelector("form");

const initialX = 1250;
const initialY = 90;
setBallPosition(initialX, initialY);

function setBallPosition(x, y) {
  image.style.left = x + "px";
  image.style.bottom = y + "px";
}

const maxAndFinalHeight = document.createElement("p");
form.appendChild(maxAndFinalHeight);

form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the form from submitting

  const distanceFromGoal = +document.querySelector("#distance")?.value;
  const angle = +document.querySelector("#angle").value;
  const velocity = +document.querySelector("#velocity").value;
  // this is based on the stadium ground is 50m long
  animateImage(initialX - distanceFromGoal * 32, initialY, 700);
  setTimeout(() => {
    const timeToMaxHeight = calculateTimeToMaxHeight(velocity, angle);
    animateImage(
      initialX - +calculateDistanceToMaxHeight(velocity, angle) * 32,
      initialY + +calculateMaxHeight(velocity, angle) * 64,
      +timeToMaxHeight * 1000
    );
    setTimeout(() => {
      const timeRemaining = +calcTimeFromMaxHeightToGoal(
        distanceFromGoal,
        velocity,
        angle
      );
      const finalHeight = +calcFinalHeight(distanceFromGoal, velocity, angle);

      animateImage(initialX, initialY + finalHeight*64, timeRemaining * 1000);
      maxAndFinalHeight.innerText = `Maximum height: ${calculateMaxHeight(velocity, angle)}, Final height: ${finalHeight}`;
    }, +timeToMaxHeight * 1000);
  }, 1500);
});

const g = 9.81;

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
function verticalVelocity(velocity, angle) {
  return velocity * Math.sin(toRadians(angle));
}
function horizontalVelocity(velocity, angle) {
  return velocity * Math.cos(toRadians(angle));
}

function calculateTimeToMaxHeight(velocity, angle) {
  return (verticalVelocity(velocity, angle) / g).toFixed(5);
}

function calculateMaxHeight(velocity, angle) {
  timeToMaxHeight = calculateTimeToMaxHeight(velocity, angle);
  let maxHeight =
    verticalVelocity(velocity, angle) * timeToMaxHeight -
    0.5 * g * timeToMaxHeight * timeToMaxHeight;
  return maxHeight.toFixed(5);
}

function calculateDistanceToMaxHeight(velocity, angle) {
  return (
    horizontalVelocity(velocity, angle) *
    calculateTimeToMaxHeight(velocity, angle)
  ).toFixed(5);
}

function calcFinalHeight(distance, velocity, angle) {
  const timeRemaining = calcTimeFromMaxHeightToGoal(distance, velocity, angle);
  return (
    calculateMaxHeight(velocity, angle) -
    0.5 * g * timeRemaining * timeRemaining
  ).toFixed(5);
}

function calcTimeFromMaxHeightToGoal(distance, velocity, angle) {
  const remainingDistance =
    distance - calculateDistanceToMaxHeight(velocity, angle);
  let timeRemaining = remainingDistance / horizontalVelocity(velocity, angle);

  return timeRemaining.toFixed(5);
}

function animateImage(endLeft, endBottom, duration) {
  const startLeft = parseFloat(getComputedStyle(image).left);
  const startBottom = parseFloat(getComputedStyle(image).bottom);
  const deltaX = endLeft - startLeft;
  const deltaY = endBottom - startBottom;
  const startTime = performance.now();

  function step(currentTime) {
    const timeDiff = currentTime - startTime;
    const progress = Math.min(timeDiff / duration, 1);
    const xPos = startLeft + deltaX * progress;
    const yPos = startBottom + deltaY * progress;
    image.style.left = xPos + "px";
    image.style.bottom = yPos + "px";
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// animateImage(x, y, 100, 100, 10000);
// setTimeout(() => {
//   animateImage(100, 100, x, y, 10000);
// }, 10000);
