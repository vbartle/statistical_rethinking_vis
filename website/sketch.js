let water_sample;
let land_sample;
let p_grid;
let posterior;
let fidelity;
var water_data;
var calcs_data;
//the faded bars are normalized prior densities. The solid ones are normalized likelihoods.
function setup() {
  createCanvas(windowWidth/2, windowHeight/1.5);
  setInterval(askData, 200);
  strokeWeight(3)

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

function askData(){
  loadJSON('/water', gotData)
  loadJSON('/calcs', gotData_calcs)
  console.log('loaded')
}

function gotData(data) {
  water_data = data;
}
function gotData_calcs(data) {
  calcs_data = data;
  p_grid = calcs_data['x']
  posterior = calcs_data['y']
  fidelity = calcs_data['y'].length
  console.log( p_grid, posterior)
}

function draw() {
  background(0, 20);
  // noLoop();


  if(calcs_data, water_data){
    fill(random(255))
    water_sample = water_data['water']
    land_sample = water_data['land']
    total = water_data['total']
    noStroke()
    fill(255)
    text(String(water_sample) + ": water sample" + "   " + String(land_sample) + ": land sample", 20, 50 + displace)
    //js alive checker via flickering:
    fill(random(100,160))
    text("N: " + String(total), 20, 30 + displace)

    stroke(255, 50)
  for (var i = 0; i < fidelity; i++) {
    line(
      map(p_grid[i], 0, 1, width * (1 / 4), width * (3 / 4)),
      height * (3 / 4),
      map(p_grid[i], 0, 1, width * (1 / 4), width * (3 / 4)),
      map(posterior[i], 0, 1, height * (3 / 4), -height * 3)
      )
  }
}
}

function count_W() {
  loadJSON('add/water/', finished)
  function finished(data){
    console.log(data)
  }
}

function count_L() {
  loadJSON('add/land/', finished)
  function finished(data) {
    console.log(data)
  }
}

function reset() {
  loadJSON('add/reset/', finished)
  function finished(data) {
    console.log(data)
  }
}