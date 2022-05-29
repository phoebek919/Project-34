const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,boba,ground;
var boba_con;
var boba_con_2;

var bg_img;
var drink;
var boy;

var button,blower;
var customer;
var blink,angry,happy;

var fr,rope2;

var air;
var blower;

var isGameOver = false;


function preload()
{
  bg_img = loadImage('background.png');
  drink = loadImage('boba.png');
  boy = loadImage('boy.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  angry = loadAnimation("angry_1.png" , "angry_2.png","angry_3.png");
  happy = loadAnimation("happy_1.png","happy_2.png","happy_3.png");
  
  blink.playing = true;
  angry.playing = true;
  happy.playing = true;
  happy.looping= false;
  angry.looping = false; 

  blower = createImg('barista.png')
  blower.position(10,250);
  blower.size(182,390);
  blower.mouseClicked(airblow);
}

function setup() {
  createCanvas(700,700);

  frameRate(80);


  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  angry.frameDelay = 20;

  customer = createSprite(420,540,500,700);
  customer.scale = 0.986;

  customer.addAnimation('blinking',blink);
  customer.addAnimation('crying',angry);
  customer.addAnimation('smiling',happy);
  customer.changeAnimation('blinking');
  
  boba = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,boba);

  boba_con = new Link(rope,boba);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,700,700);

  push();
  imageMode(CENTER);
  if(boba!=null){
    image(drink,boba.position.x,boba.position.y,70,70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();
  if(collide(boba,customer)==true)
  {
    customer.changeAnimation('smiling');
    isGameOver = true;
    text("Game Over!",150,250);

  }


  if(boba!=null && boba.position.y>=650)
  {
    text("Game Over!",150,250);
    customer.changeAnimation('crying');
    boba=null;
     
   }
   
}

function drop()
{ 
  rope.break();
  boba_con.detach();
  boba_con = null; 
}

//5/24/22
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,boba);
               boba = null;
               return true; 
            }
            else{
              return false;
            }
         }
}
function airblow() {
  Matter.Body.applyForce(boba,{x:0,y:0},{x:0.01,y:0})
}

//done here - needs checking
