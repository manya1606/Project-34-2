var dog, happyDog, database, foodS, foodStock




function preload()
{
  dog=loadImage( "images/dogImg1.png")
  happyDog=loadImage ( "images/dogImg.png")
}

function setup() {
  database=firebase.database()
  createCanvas(500,500);
  pet=createSprite(250,300,150,150)
  pet.addImage (dog)
  
  pet.scale=0.15

  foodStock=database.ref('Food');
    foodStock.on("value", readStock)

  
}


function draw() {  
  background(46,139,87)

  if (keyDown("UP_ARROW")){
    writeStock(foodS);
    pet.addImage(happyDog)
  }



  drawSprites();
  textSize(20)
  fill("white")
  text("Press UP Arrow Key To Feed The Dog",130,10,300,20)

  textSize(20)
  fill("white")
  text("Food Remaining:  20",160,120,400,200)

  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  } else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}