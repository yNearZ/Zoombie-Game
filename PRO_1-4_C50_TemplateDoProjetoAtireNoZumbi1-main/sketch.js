var bg,bgImg;
var player, shooterImg, shooter_shooting, explosionSound;

var zombie, zombieImg;

var life = 3;
var bullets = 70;
var zombieNumber = 30;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var gameState = "fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  explosionSound = loadSound("assets/lose.mp3");

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  bgImg = loadImage("assets/bg.jpeg");

  zombieImg = loadImage("assets/zombie.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

//criando o sprite do jogador
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = false
  player.setCollider("rectangle",0,0,300,300);

  //criar sprites para representar as vidas restantes
  heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.addImage("heart1",heart1Img)
   heart1.visible = false
   heart1.scale = 0.4

   heart2 = createSprite(displayWidth-100,40,20,20)
   heart2.addImage("heart2",heart2Img)
   heart2.visble = false;
   heart2.scale = 0.4

   heart3 = createSprite(displayWidth-150,40,20,20)
   heart3.addImage("heart3",heart3Img)
   heart3.scale = 0.4
  

   //criar o grupo para os zumbis    
   zombieGroup = new Group();
   bulletGroup = new Group();
    
}

function draw() {
  background(0); 

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando touches (toques)
  if(keyDown("W")&& player.y >= 370||touches.length>0){
    player.y = player.y-30
  }

  if(keyDown("S")&& player.y <= 550||touches.length>0){
  player.y = player.y+30
  }


//libere as balas e mude a imagem do personagem para a posição de tiro quando a tecla espaço for pressionada
  if(keyWentDown("space")){
    
    player.addImage(shooter_shooting)
  
  }

//player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){

    bullet = createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.velocityX = 20
  
   bulletGroup.add(bullet)
    player.depth = bullet.depth
    player.depth = player.depth+2
    player.addImage(shooter_shooting)
    bullets = bullets-1
    
    explosionSound.play();
    player.addImage(shooterImg)
 
  }
    if(gameState === "fight"){

  if(life === 3){
      
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
  }


  if(life === 2){

      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;
  }

  if(life === 1){

    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = true;
  }

  if(life === 0){
    
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = false;

    player.destroy();
    gameState = "lost"
  }

  for(var i=0;i<zombieGroup.length;i++){     
      
    if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy();
       life -=1;
    
    }
         } 
   }
    
   if(bullets == 0){
    gameState = "bullet"
      
  }

  if(zombieNumber == 0){
    gameState = "won"
  }

   //destruir o zumbi quando a bala tocar nele
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      //escreva uma condição para quando o zombiegroup (grupo de zumbi) tocar bulletGroup (grupo de bala)
   if(zombieGroup[i].isTouching(bulletGroup)){

    zombieNumber -=1

//destruir o zumbi
        bulletGroup.destroyEach()
        zombieGroup[i].destroy()
       
        } 
  
  
}

  }
   //chamar a função para gerar os zumbis
      enemy();
  
   drawSprites();{

    console.log(zombieNumber)
  if(gameState == "lost"){
  
      textSize(100);
      fill("red");
      text("Você Perdeu!", 470, 410);
      zombieGroup.destroy();
    
  }
    else if(gameState == "won"){
 
  textSize(100)
  fill("green")
  text("Você Ganhou ",400,400)
  zombieGroup.destroyEach();
  player.destroy();
}

  else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("Você ficou sem balas!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}

 
  }
}
  
  //criar função para gerar os zumbis
  function enemy(){
    if(frameCount%50===0){

    //atribuir posições x e y aleatórias para o zumbi aparecer
    zombie = createSprite(random(900,1400), random(200, 500)) 

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,400,800)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
  }
   
