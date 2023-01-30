class Module {
  constructor(x, y,w,h,deg) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.deg = deg;
  }

}


let f = 0.0;
let num = 20;
let rectangle = [];

function setup() {
createCanvas(750,750);
noStroke();

let index = 0;
for (let i = 0; i < num; i++) 
  {
    rectangle[index++] = new Module(
      10,
      10,
      random(300),
      random(300),
      random(2*PI),
    );
  }


}


function draw() {
  background(10);
  
  strokeCap(SQUARE);

  for (let i = 0; i < num; i++) {
    noStroke();
   // rectangle[i].draw();
    push();
    if(i%2==0){
      fill(100,0,map(noise(i+f*5)*255,0,255,50,255));
    }
    else{
      fill(10,map(noise(i+f*5)*255,0,255,100,255),80);
    }
    
    //translate(30,30);
    rectangle[i].x=50+noise(6*i+f,4*i)*650;
    rectangle[i].y=50+noise(6*i,2*i+f)*650;
    rectangle[i].deg=noise(i+f)*10;
    drawRectline(rectangle[i].x,rectangle[i].y,rectangle[i].w,rectangle[i].h,rectangle[i].deg)
    pop();

  }

  beginShape();
  for (let i = 5; i < num/2; i++) {
    noFill();
    stroke(0,0,255);
    strokeWeight(1);
    let a = sqrt(rectangle[i].w*rectangle[i].w+rectangle[i].h*rectangle[i].h);
    let degCount1 = atan(rectangle[i].w/rectangle[i].h)+rectangle[i].deg;
    let degCount2 = atan(rectangle[i].h/rectangle[i].w)+rectangle[i].deg;
    vertex(rectangle[i].x+a*sin(degCount1)/2, rectangle[i].y-a*cos(degCount1)/2);
    vertex(rectangle[i].x+a*cos(degCount2)/2,rectangle[i].y+a*sin(degCount2)/2);
  }
  endShape();

  beginShape();
  for (let i = int(num/2); i < num; i++) {
    
    stroke(0,255,0);
    if(i%4==0){
    strokeWeight(5);
    }
    else{
      strokeWeight(1);
    }
  
    let a = sqrt(rectangle[i].w*rectangle[i].w+rectangle[i].h*rectangle[i].h);
    let degCount1 = atan(rectangle[i].w/rectangle[i].h)+rectangle[i].deg;
    let degCount2 = atan(rectangle[i].h/rectangle[i].w)+rectangle[i].deg;
    vertex(rectangle[i].x+a*sin(degCount1)/2, rectangle[i].y-a*cos(degCount1)/2);
    vertex(rectangle[i].x+a*cos(degCount2)/2,rectangle[i].y+a*sin(degCount2)/2);
  }
  endShape();

  beginShape();
  for (let i = 15; i < 18; i++) {
    noFill();
    stroke(240);
    strokeWeight(8);
    let a = sqrt(rectangle[i].w*rectangle[i].w+rectangle[i].h*rectangle[i].h);
    let degCount1 = atan(rectangle[i].w/rectangle[i].h)+rectangle[i].deg;
    let degCount2 = atan(rectangle[i].h/rectangle[i].w)+rectangle[i].deg;
    vertex(rectangle[i].x+a*sin(degCount1)/2, rectangle[i].y-a*cos(degCount1)/2);
    vertex(rectangle[i].x+a*cos(degCount2)/2,rectangle[i].y+a*sin(degCount2)/2);
  }
  endShape(CLOSE);
  

  f+= 0.01
}


// Custom method for drawing the object
function drawRectline(x,y,w,h,deg) {
  //fill(255);
  rectMode(CENTER);
  push();
  translate(x,y);
  rotate(deg);
  rect(0,0,w,h);
  pop();
}

function keyPressed(){
  save("img.png");  
}