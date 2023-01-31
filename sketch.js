class Joint {
  // this constructor is called when we define new Creature(...)
  constructor(_x, _y,deg) {
    this.location = new createVector(_x, _y);  // Location of shape
    this.deg=deg;
    this.velocity = new createVector(random(-2,2),random(-2,2));  // Velocity of shape
    this.friction = new createVector(0, 0); 
    this.desired = new createVector(0, 0); 
    this.direction = new createVector(0, 0);;
    this.diameter = random(10,40);
    this.edgeX = random(10,40);
    this.edgeY = random(10,40);
    this.speedLimit = random(10,this.edgeX);
    this.color;
  }

  moveToFood(x, y){

    this.desired.x = x;
    this.desired.y = y;
    this.direction = p5.Vector.sub(this.desired, this.location); // gets vector between these two points

    // mag / magnitude is the length of the distance between the two points
    if (this.direction.mag() < this.diameter/2){
      return true; //stops moving as it returns before adding direction to velocity below
    } 
  
    //only move if they are close to the target x & y locations
    // if(direction.mag() < 200){
    //   direction.normalize(); //normalize gives us the unit vector of length 1 (i.e. just the direction )
    //   this.velocity.add(direction);
    // }

    this.direction.normalize(); //normalize gives us the unit vector of length 1 (i.e. just the direction )
    this.velocity.add(this.direction);

    return false;
  } 

  update(i,f) {

    this.friction.x = this.velocity.x * -1;
    this.friction.y = this.velocity.y * -1;
    this.friction.normalize();
    this.friction.mult(0.01);
    this.velocity.add(this.friction);

    //limit how fast each one can go
    this.velocity.limit(this.speedLimit);
    // Add velocity to the location.
    this.location.add(this.velocity);
    this.location.x+=noise(6*i+f,4*i);
    this.location.y+=noise(6*i,2*i+f);
    

    // Bounce off edges (updated from last term to work better with canvas resize)
    if (this.location.x > width){
      this.location.x = width;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y = this.velocity.y * -1;
    }
    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y = this.velocity.y * -1; 
    }
  
    // Display circle at location vector
    noStroke();
    fill(191, 219, 56);
    circle(this.location.x,this.location.y,this.diameter);
  }

}



let f = 0.0;
let num = 10;
let phasmida = [];

function setup() {
  background(240);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  addGUI();

  

noStroke();


  for(let i = 0; i < num; i++){
    let c = new Joint(random(width/4), random(height/4), random(2*PI));
    phasmida.push(c);
  }


}


function draw() {
  background(0);
  
  strokeCap(SQUARE);

  let eyeSize = slider.value();


  for (let i = 0; i < num; i++) {
    noStroke();
   // phasmida[i].draw();
  
 

    if(i%2==0){
      phasmida[i].color= color(205,252,map(noise(i+f*5),0,1,200,255));
    }
    
    else{
      phasmida[i].color=color(1520,map(noise(i+f*5),0,1,100,200),248);
    }
    

    //phasmida[i].location.x= mouseX+noise(6*i+f,4*i)*200;
    //phasmida[i].location.y=mouseY + noise(6*i,2*i+f)*200;
    phasmida[i].deg=noise(i+f)*10;
    
    phasmida[i].moveToFood(mouseX,mouseY);
    phasmida[i].update(i,f);
    
   drawRectline(phasmida[i].location.x,phasmida[i].location.y,phasmida[i].edgeX,phasmida[i].edgeY,phasmida[i].deg)


  }

  push();
  //translate(width/4,height/4);

  beginShape();
  for (let i = 1; i < 4; i++) {
    //noFill();
   
    fill(phasmida[i].color);
    stroke(242, 247, 161);
    strokeWeight(3);
    let a = sqrt(phasmida[i].edgeX*phasmida[i].edgeX+phasmida[i].edgeY*phasmida[i].edgeY);
    let degCount1 = atan(phasmida[i].edgeX/phasmida[i].edgeY)+phasmida[i].deg;
    let degCount2 = atan(phasmida[i].edgeY/phasmida[i].edgeX)+phasmida[i].deg;
    vertex(phasmida[i].location.x+a*sin(degCount1)/2, phasmida[i].location.y-a*cos(degCount1)/2);
    vertex(phasmida[i].location.x+a*cos(degCount2)/2,phasmida[i].location.y+a*sin(degCount2)/2);
 }
  endShape();

  for (let i = 1; i < 3; i++) {
    let a = sqrt(phasmida[i].edgeX*phasmida[i].edgeX+phasmida[i].edgeY*phasmida[i].edgeY);
    let degCount1 = atan(phasmida[i].edgeX/phasmida[i].edgeY)+phasmida[i].deg;
    
      fill(240);
      ellipse(phasmida[i].location.x+a*sin(degCount1)/2, phasmida[i].location.y-a*cos(degCount1)/2,eyeSize,eyeSize);
      fill(181, 213, 197);
      noStroke();
      ellipse(phasmida[i].location.x+a*sin(degCount1)/2+(eyeSize*0.2)*phasmida[i].direction.x, phasmida[i].location.y-a*cos(degCount1)/2+(eyeSize*0.2)**phasmida[i].direction.y,eyeSize*0.5,eyeSize*0.5);
    
  }



  beginShape();
  for (let i = 4; i < 7; i++) {

    let a = sqrt(phasmida[i].edgeX*phasmida[i].edgeX+phasmida[i].edgeY*phasmida[i].edgeY);
    let degCount1 = atan(phasmida[i].edgeX/phasmida[i].edgeY)+phasmida[i].deg;
    let degCount2 = atan(phasmida[i].edgeY/phasmida[i].edgeX)+phasmida[i].deg;

    fill(phasmida[i].color);
    stroke(242, 247, 161);
    strokeWeight(3);
    vertex(phasmida[i].location.x+a*sin(degCount1)/2, phasmida[i].location.y-a*cos(degCount1)/2);
    vertex(phasmida[i].location.x+a*cos(degCount2)/2,phasmida[i].location.y+a*sin(degCount2)/2);

    
  }
  endShape();

  for (let i = 4; i < 6; i++) {
    let a = sqrt(phasmida[i].edgeX*phasmida[i].edgeX+phasmida[i].edgeY*phasmida[i].edgeY);
    let degCount1 = atan(phasmida[i].edgeX/phasmida[i].edgeY)+phasmida[i].deg;
    
      fill(240);
      ellipse(phasmida[i].location.x+a*sin(degCount1)/2, phasmida[i].location.y-a*cos(degCount1)/2,eyeSize,eyeSize);
      fill(176, 139, 187);
      noStroke();
      ellipse(phasmida[i].location.x+a*sin(degCount1)/2+(eyeSize*0.2)*phasmida[i].direction.x, phasmida[i].location.y-a*cos(degCount1)/2+(eyeSize*0.2)**phasmida[i].direction.y,eyeSize*0.5,eyeSize*0.5);
    
  }



  beginShape();
  for (let i = 7; i < 10; i++) {
    fill(phasmida[i].color);
    stroke(242, 247, 161);
    strokeWeight(1);
    let a = sqrt(phasmida[i].edgeX*phasmida[i].edgeX+phasmida[i].edgeY*phasmida[i].edgeY);
    let degCount1 = atan(phasmida[i].edgeX/phasmida[i].edgeY)+phasmida[i].deg;
    let degCount2 = atan(phasmida[i].edgeY/phasmida[i].edgeX)+phasmida[i].deg;
    vertex(phasmida[i].location.x+a*sin(degCount1)/2, phasmida[i].location.y-a*cos(degCount1)/2);
    vertex(phasmida[i].location.x+a*cos(degCount2)/2,phasmida[i].location.y+a*sin(degCount2)/2);
  }
  endShape(CLOSE);

  pop();

  for (let i = 7; i < 9; i++) {
    let a = sqrt(phasmida[i].edgeX*phasmida[i].edgeX+phasmida[i].edgeY*phasmida[i].edgeY);
    let degCount1 = atan(phasmida[i].edgeX/phasmida[i].edgeY)+phasmida[i].deg;
    
      fill(240);
      ellipse(phasmida[i].location.x+a*sin(degCount1)/2, phasmida[i].location.y-a*cos(degCount1)/2,eyeSize,eyeSize);
      fill(236, 168, 105);
      //fill(0, 66, 90);
      noStroke();
      ellipse(phasmida[i].location.x+a*sin(degCount1)/2+(eyeSize*0.2)*phasmida[i].direction.x, phasmida[i].location.y-a*cos(degCount1)/2+(eyeSize*0.2)**phasmida[i].direction.y,eyeSize*0.5,eyeSize*0.5);
    
  }

  

  f+= 0.01;

  fill(0);
  text('red', slider.x * 2 + slider.width, 400);
}


// Custom method for drawing the object
function drawRectline(x,y,w,h,deg) {
  //fill(255);
  rectMode(CENTER);
  push();
  translate(x,y);
  rotate(deg);
  rect(0,0,w,h);
  //ellipse(w/2,0,20,20);
  //ellipse(w/2,h,20,20);
  pop();
}

function keyPressed(){
  save("img.png");  
}

function addGUI()
{

 

  //add a slider
  slider = createSlider(0, 130, 50);
  slider.addClass("slider");
  //Add the slider to the parent gui HTML element
  slider.parent("gui-container");


}



function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}