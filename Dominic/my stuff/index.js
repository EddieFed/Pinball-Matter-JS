var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;


var engine;
var world;
var box;

function setup(){
    createCanvas(400, 400);
    engine = Engine.create();
    world = Engines.world;
    box = Bodies.rectangle(200,100,20,20);
    Engine.run(engine);
    world.add(box1);
    world.add(world, [boxA, boxB, ground]);
}

function draw(){
    background(51);
    console.log(box1.position.x);
    rect(box1.x, box1.y, 20, 20);
}