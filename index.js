let grid = [];
let charges = [];
let ticker = 0;
let textOn = true;

function setup(){
  createCanvas(windowWidth-4, windowHeight-4);
  frameRate(60)
  

  //print every vector in the grid
  for (let element of document.getElementsByClassName("p5Canvas")) {
		element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
}

function draw(){
  background(200);
  for(let i = 13; i < width; i += 25){
    grid[i] = [];
    for(let j = 13; j < height; j += 25){
      grid[i][j]=createVector(i, j)
      drawVector(grid[i][j])
    }
  }
  drawCharge();

  if(mouseIsPressed===true){
    noStroke();
    fill(color(198,120,221))
    ellipse(mouseX, mouseY, 20*(0.9 + ticker / 30.0), 20*(0.9 + ticker / 30.0));
    ticker+=3;
  }
}

function drawVector(v){
  push();
  let k = 50000;

  let i = 0;
  let j = 0;

  //loop through all charges
  for(let q of charges){
    i += k*q.q*Math.pow((Math.pow(v.x-q.x,2)+Math.pow(v.y-q.y,2)),-1.5)*(v.x-q.x);
    j += k*q.q*Math.pow((Math.pow(v.x-q.x, 2) + Math.pow(v.y-q.y, 2)), -1.5) * (v.y-q.y);
  }

  //i = k*Math.pow((Math.pow(v.x-mouseX,2)+Math.pow(v.y-mouseY,2)),-1.5)*(v.x-mouseX);
  //j = k*Math.pow((Math.pow(v.x-mouseX, 2) + Math.pow(v.y-mouseY, 2)), -1.5) * (v.y-mouseY);

  if(abs(i)>21 || abs(j)>21){
    strokeWeight(0);
    fill(200);
  }else{
    strokeWeight(4);
  }


  
  fill(50);
  stroke(2)
  line(v.x,v.y,v.x+i,v.y+j);

  noStroke();

  if (abs(i) > 21 || abs(j) > 21) {
		fill(200);
  } else {
		fill(255);
    noStroke();
	  ellipse(v.x + i, v.y + j, 5, 5);
  }
  
  pop();
}

function charge(x,y,q){

  this.x=x;
  this.y=y;
  this.q=q;
}

function drawCharge(){
  //loop through all charges
  let pos = color(189, 84, 117);
  let neg = color(98, 84, 211);
  noStroke();
  for (let charge of charges) {
    if (charge.q > 0) {
		  fill(pos);
	  } else {
	  	fill(neg);
	  }
    ellipse(charge.x,charge.y,20*charge.q,20 *charge.q);
    fill(255)
    if(textOn){
      text(charge.q, charge.x - 7, charge.y + 5);
    }
  }
}
	
  
	
	

function mousePressed(event){
  
}

function mouseReleased(event){
  if (event.button === 2) {
		// Right click
		q = new charge(mouseX, mouseY, (-(.9+(ticker/30.0))).toFixed(1));
  } else {
		q = new charge(mouseX, mouseY, (.9+(ticker /30.0)).toFixed(1));
  }

  charges.push(q);
  print(charges);
  ticker = 0;
  return false;
}

function keyPressed(){

  if(keyCode===13){
    charges = [];

  }
  if(keyCode===84){
    textOn = !textOn;
  }
}