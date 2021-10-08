var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg,bgImg;
var player, shooterImg, shooter_shooting;
var ghost;
var score = 0;
var ghostGroup, ghost;
var bullet;                             



function preload(){
  
  shooterImg = loadImage("shooter_2.png")
  shooter_shooting = loadImage("shooter_3.png")

  bgImg = loadImage("Background.jpg");
  ghostImg = loadImage("ghost-standing.png");
  bulletImg = loadImage("bullet.png");
  bulletSound = loadSound("gun-gunshot-01.wav");
  loseSound = loadSound("lose.mp3");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  winSound = loadSound("win.mp3");
  scoreSound = loadSound("jump.wav");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);


  

//creating the player sprite
player = createSprite(displayWidth-900, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.6;


   restart = createSprite(displayWidth/2,displayHeight/2,20,20);
   restart.addImage(restartImg);
   restart.scale = 0.1;
   restart.visible = false;
   
   gameOver = createSprite(displayWidth/2,displayHeight/2-50,20,20);
   gameOver.addImage(gameOverImg);
   gameOver.visible = false;

   ghostsGroup = new Group();
  
  

   score = 0;
 
   
   

}

function draw() {
  background(bgImg);
  textSize(20);
stroke(3);
fill("white")
text("Score: "+ score, displayWidth/2,displayHeight/2-50,50); 


if (gameState===PLAY){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")){
 player.y = player.y+30
}



//release bullets and change the image of shooter to shooting position when space is pressed

if(keyWentDown("space")){
  player.addImage(shooter_shooting);
 
  bullet = createSprite(displayWidth-770, displayHeight-350, 50, 50);
   bullet.addImage(bulletImg);
   bullet.scale = 0.081;
   bulletSound.play();
   bullet.velocityX = +2;
   bullet.lifetime = 500;
}

//player goes back to original standing image once we stop pressing the space bar
if(keyWentUp("space")){
  player.addImage(shooterImg);

}
spawnGhosts();
if(ghostsGroup.isTouching(bullet)){
  score = score + 1;
  scoreSound.play();
  ghostsGroup.destroyEach();
}
if(ghostsGroup.isTouching(player)){
  gameState = END;
}

}


else if (gameState === END) {
gameOver.visible = true;
restart.visible = true;
loseSound.play();

//set velocity of each game object to 0
ghostsGroup.setVelocityXEach(0);



//set lifetime of the game objects so that they are never destroyed
ghostsGroup.setLifetimeEach(-1);

if(mousePressedOver(restart)) {
  reset();
  }

}





drawSprites();


}




function spawnGhosts(){
  if(frameCount % 300 === 0){
  ghost = createSprite(displayWidth+10, displayHeight-300, 50, 50);
   ghost.addImage(ghostImg);
   ghost.scale = 1;
   ghost.velocityX = -2;
   ghost.lifetime = 500;
   ghost.setCollider(circle,0,0,100,100);
   ghostsGroup.add(ghost); 
   
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  ghostsGroup.destroyEach();
  score = 0;

}
