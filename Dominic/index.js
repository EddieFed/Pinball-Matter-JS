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
    box = Bodies.rectangle(400,400,20,20);
    Engine.run(engine);
}

function draw(){
    background(51);
}
// https://www.youtube.com/watch?v=urR596FsU68
// 8:46