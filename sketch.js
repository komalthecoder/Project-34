var dog,HungryDog,HappyDog;
var database;
var foodS,foodStock;

function preload(){

  HungryDog = loadImage("images/dogImg.png");
  HappyDog = loadImage("images/dogImg1.png");
	
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(HungryDog);
  dog.scale = 0.3;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(HappyDog);
    dog.scale = 0.3;

  }

  drawSprites();

  fill("white");
  textSize(20);
  text("Remaining Food:" + foodS,160,90);
  
  fill("white");
  textSize(15);
  text("Note: Press the UP_ARROW key to feed Scooby Doo milk!",60,40);
  

}

function readStock(data){

  foodS = data.val();

}

function writeStock(x){

  if(x<=0){
    x = 0;
  }

  else{
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })

}

