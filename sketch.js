//Global Variables
var player_running, backImage, bananaimg, obstacle_img, score, backImg, invisibleGround, player;
var bananaGroup, obstaclesGroup;
var score;
  

function preload(){
  backImg = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png" );
  
  bananaimg = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  
  backImage = createSprite(600, 100,1200,10);
  backImage.addImage(backImg);
  backImage.velocityX = -4;
  backImage.x = backImage.width/2;
  
  player = createSprite(150,270,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.1;
  
  invisibleGround = createSprite(600,280,1200,10);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}


function draw(){
 background(255);
  
  
  
  if (backImage.x<0){
    backImage.x = backImage.width/2;
  }
  
   //make the monkey jump
    if (keyDown("space")) {
        player.velocityY = -8;
      
    }
    
    //add gravity
    player.velocityY = player.velocityY+0.8;
  
  if (bananaGroup.isTouching(player)) {
        bananaGroup.destroyEach();
        score = score+2;
      
    }
  if (obstaclesGroup.isTouching(player)){
      player.scale = 0.1;
  }
    
    switch (score){
      case 10: player.scale = 0.12;
               break;
      case 20:  player.scale = 0.14;        
                break;
      case 30:  player.scale = 0.16;
                break;
      case 40:  player.scale = 0.18;
                break;
     default: break;
    }
  
  food();
  createObstacle();
  
  player.collide(invisibleGround);
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
}

function food(){
    if (frameCount%80===0) {
        var banana = createSprite(300, 150,10,10);
        banana.y = Math.round(random(100,180));
        //add image of banana
        banana.addImage(bananaimg);
        banana.scale = 0.05;
        banana.velocityX = -6;
        banana.lifetime = 100;
        bananaGroup.add(banana);
        
    }
  
}

function createObstacle(){
    if (frameCount%300===0) {
        var obstacle = createSprite(560,250,50,20);
        //add image of obstacles
        obstacle.addImage(obstacle_img);
        obstacle.scale = 0.15;
        obstacle.velocityX = -4;
        obstacle.lifetime = 150;
        obstaclesGroup.add(obstacle);
      
    }
  
}