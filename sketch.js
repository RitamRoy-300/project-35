var balloon1
var database
var position

function preload(){
backgroundImage= loadImage("cityImage.png")
balloonImage= loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png")
balloonImage1= loadImage("hotairballoon1.png")
}
function setup() {
  createCanvas(800,400);
  database= firebase.database();

 
  balloon1= createSprite(100,200,40,40)
  balloon1.addAnimation("balloon",balloonImage)
  balloon1.scale=0.4
  var balloonPosition= database.ref('balloon/height')
  balloonPosition.on("value",readPosition, showError)
}

function draw() {
  background(backgroundImage); 
 

  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
  } 
  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
  }
  if(keyDown(UP_ARROW)){
   updateHeight(0,-10)
   balloon2.addAnimation("balloon",balloonImage)
   balloon2.scale=balloon2.scale-0.01
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10)
    balloon2.addAnimation("balloon",balloonImage)
    balloon2.scale=balloon2.scale+0.01
  }
  console.log(balloon1.x)
  console.log(balloon1.y)
  drawSprites();

}
function updateHeight(x,y){
database.ref('balloon/height').set({
  'x': position.x+ x,
  'y': position.y+ y
})
}
function readPosition(data){
  position=data.val();
  balloon1.x = position.x;
  balloon1.y= position.y;
}
function showError(){
  console.log("An error in writing the database")
}