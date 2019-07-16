//water and land samples represent the scenario where for every toss of a globe someone records either water or land, depending on what their index finger touches.

let water_sample = 0
let land_sample = 0
let x0 = 0
let x1 = 0
let y0 = 0
let y1 = 0

//the faded bars are normalized prior densities. The solid ones are normalized likelihoods.
function setup() {
  createCanvas(500, 500);
  background(0)
  strokeWeight(width / 100)
  x1 = width
  y0 = height / 2
  y1 = height / 2
  displace = 0
  button_W = createButton('Water');
  button_W.position(20, 65 + displace);
  button_W.mousePressed(count_W);

  button_L = createButton('Land');
  button_L.position(90, 65 + displace);
  button_L.mousePressed(count_L);

  button_R = createButton('Reset');
  button_R.position(160, 65 + displace);
  button_R.mousePressed(reset);
}

function draw() {
  background(0, 20);
  // noLoop();

  noStroke()
  fill(255)
  text(String(water_sample) + ": water sample" + "   " + String(land_sample) + ": land sample", 20, 50 + displace)
  N = water_sample + land_sample
  text("N: " + String(N), 20, 30 + displace)

  stroke(255, 50)
  fidelity = 40
  p_grid = seq(0, 1, fidelity)
  prior = Array(fidelity).fill(5)
  binom = seq(0, 1, fidelity)
  for (i = 0; i < p_grid.length; i++) {
    binom[i] = choose(N, water_sample) * (p_grid[i] ** water_sample) * (1 - p_grid[i]) ** (N - water_sample);
  }
  unstd = []
  for (i = 0; i < fidelity; i++) {
    unstd.push(binom[i] * prior[i])
  }


  const add = (a, b) =>
    a + b
  const sum = unstd.reduce(add)
  posterior = []
  for (i = 0; i < fidelity; i++) {
    posterior.push(unstd[i] / sum)
  }

  console.log(p_grid, posterior)
  // p_grid = X;posterior = Y
  for (var i = 0; i < fidelity; i++) {
    line(map(p_grid[i], 0, 1, width * (1 / 4), width * (3 / 4)), height * (3 / 4), map(p_grid[i], 0, 1, width * (1 / 4), width * (3 / 4)), map(posterior[i], 0, 1, height * (3 / 4), -height * 4))
  }
}

function choose(val1, val2) {
  return (factorial(val1) / (factorial(val2) * (factorial(val1 - val2))))
}

function seq(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}



function factorial(n) {
  var f = [];
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n - 1) * n;
}

function count_W() {
  water_sample += 1
}

function count_L() {
  land_sample += 1
}

function reset() {
  water_sample = 0
  land_sample = 0
}