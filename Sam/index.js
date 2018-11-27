window.addEventListener('load', function() {

    var myCanvas = document.getElementById('world');
var engine = Matter.Engine.create();
var world = engine.world;

var render = Matter.Render.create({
    canvas: myCanvas,
    engine: engine,
    options: {
        width: 200,
        height: 200,
        background: '#000000',
        wireframes: false,
        showAngleIndicator: false
    }
});
var ball = Matter.Bodies.circle(100, 100, 10, {
    density: 0.04,
    friction: 0.01,
    frictionAir: 0.00001,
    restitution: 0.8,
    render: {
        fillStyle: '#F35e66',
        strokeStyle: 'black',
        lineWidth: 1
    }
});



Matter.World.add(world, ball);
Matter.Engine.run(engine);
Matter.Render.run(render);
//https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
//https://codepen.io/lonekorean/pen/KXLrVX
});
