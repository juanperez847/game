
let button;
let button2;
let screen = 0;

//let screen = 2;

//let playGame = 1
let button_width = 200;
let button_height = 100;
let score = 0;
var s;
var scl = 25;
var food;
let img;
let img2;
let img3;
let img6;
var pSound;
var wSound;
//let loadSound;

function preload(){
  pSound = loadSound("point.mp3");
  wSound = loadSound("wrong.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10); 
   s = new Snake();

	pickLocation(); 
 
  
  
  button = createButton('Play');
  button.size(button_width, button_height);
  button.position(800, 320);
  button.mousePressed(() => {screen = 1;button.hide()});
  
      button2 = createButton('Replay');
  button2.size(button_width, button_height);
  button2.position(755, windowHeight / 3);
  button2.mousePressed(() => {screen = 0;
                            button2.hide()});
  button2.hide();
  
img3 = loadImage('watermelon.png');
  img6 = loadImage('snake ca.jpg')
img = loadImage('snake.png');
img2 = loadImage('snake-face.webp');
	}


function pickLocation() {
  var cols = floor(1000/scl);
	var rows = floor(800/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));//this ensure the food is in the grid aligned with snake
	food.mult(scl);//to expand it back out
}
 
function draw() {
  

  if (screen === 0) {
 showMenu();
  }
  else if (screen === 1){
    showGame();
  }
  else if (screen === 2) {
    showEnd();
    
  }

}
 
function showMenu() {
  clear()
  background(51);
  fill('red');
  textSize(90);
  textFont('Helvetica');
  text('SNAKE GAME', windowWidth / 3, 100);//3500
  textSize(30) 
  text("use the keyboard arrows", 800, 600);
   image(img,280,240, img.width / 4, img.height / 4);
  image(img2,1330,240, img2.width / 4, img2.height / 4);
 button.show();
  score = 0
  
}



function showGame(){
createCanvas(1000,800);
background(51);
  
  
    if (s.eat(food)) {
  pSound.play();
  pickLocation();
  }
textSize(35)
    textAlign(CENTER);
  text('Score = ', 90,35)
    text(score,165,35);
  if (s.death()) {
    wSound.play();
   screen = 2
  } 
  s.update();
  s.show();
	
  //drawing snake food
  image(img3,food.x, food.y, scl, scl);
  
  
  

}

function showEnd(){
  clear()
  createCanvas(windowWidth, windowHeight);
       background(255,10,50);
  button2.show();
    fill(0);
    textSize(100);
    text('Game Over', 1000, 150);
    textSize(40);
    text('Your Score was: ' + score, 1000, 250);
  
    fill(0);
   image(img,280,240, img.width / 3, img.height / 3);
  image(img2,1330,240, img2.width / 3, img2.height / 3);
    
      
 }
  



function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1); //moves 0 along x and -1 (up) along y axis
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
  

  }





  function Snake() {
   
      this.x = 0;
      this.y = 0;
      this.xspeed = 2;
      this.yspeed = 0;
    	this.total = 0;
    
    //to track the lenght of snake. If the snakes eat the food, total should go up to 1. total++
    	this.tail = [];//an array object for the tail
    
  
  	this.eat = function(pos) {
      var d = dist(this.x, this.y, pos.x, pos.y);
      //tells me wheter or not the snake reaches the food
      if (d < 1) {
        this.total++;//if snake eats the food, total goes up to one
        this.score++;
        //text(this.score, 70, 625);
         
        score+= 1
     
        	return true;
  
      } else {
       	return false;
      }
    }
    
     
    
   //directions function receives two values x and y  
    this.dir = function(x, y) {
    	this.xspeed = x;
      this.yspeed= y;
    }
    
    //function to kill the snake when it touches its own body
    this.death = function() {
      
    	for (var i = 0; i < this.tail.length; i++) {//loop throught every spot in the tail (not inc. head)
      	var pos = this.tail[i];
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
        	this.total = 0;
         // score -= 
          this.tail= [];
          return true;
        }

        // check if snake hits wall, then return true
        
      }
      return false;
  
    
         
    }
    
    
    //function that updates object's moves based on current lcoation + speed.   
    this.update = function() {
      //if (this.total === this.tail.length) {
      	for (var i = 0; i < this.tail.length-1; i++) { //as 
        	this.tail[i] = this.tail[i+1];
      	}
      if (this.total >= 1) {
      this.tail[this.total-1] = createVector(this.x, this.y);//when I am done moving I want the last spot to create Vector on the tail equals to current location of snake
		}   
      
      
      this.x = this.x + this.xspeed*scl;
      this.y = this.y + this.yspeed*scl;
      
      //to constrain snake getting off the grid
      this.x = constrain(this.x, 0, 1000-scl);
      this.x = constrain(this.x, 0, 1000-scl);
      this.y = constrain(this.y, 0, 1000-scl);
      this.y = constrain(this.y, 0, 1000-scl);
      this.y = constrain(this.y, 0, 800-scl);
      this.y = constrain(this.y, 0, 800-scl);
    }
    
    this.show = function () {
      fill(255);
      //draw the tail on current location
      	for (var i = 0; i < this.tail.length; i++){
           fill('rgb(0,255,0)');
      		rect(this.tail[i].x, this.tail[i].y, scl, scl);
          //image(img6,this.tail[i].x, this.tail[i].y, scl, scl);
      
      	}
       fill('rgb(0,255,0)');
      rect(this.x, this.y, scl, scl);
      //image(img6,this.x,this.y, scl, scl);
      
  }
}  
