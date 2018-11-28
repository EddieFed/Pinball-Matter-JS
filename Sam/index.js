window.addEventListener('load', function() {

    var myCanvas = document.getElementById('world');
var engine = Matter.Engine.create();
var world = engine.world;

var render = Matter.Render.create({
    canvas: myCanvas,
    engine: engine,
    options: {
        width: 500,
        height: 500,
        background: '#888888',
        wireframes: false,
        showAngleIndicator: false
    }
});

    var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
        element: myCanvas,
        constraint: {
            render: {
                visible: false
            },
            stiffness:0.8
        }
    });
    Matter.World.add(world, mouseConstraint);

var ball = Matter.Bodies.circle(100, 100, 40, {
    density: 0.94,
    friction: 1,
    frictionAir: 0.00001,
    restitution: .99,
    render: {
        fillStyle: '#F35e66',
        strokeStyle: 'black',
        lineWidth: 1
    }
});

    var floor = Matter.Bodies.rectangle(250, 495, 500, 10, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'black',
            visible: true
        }
    });

    var wall1 = Matter.Bodies.rectangle(5, 0, 10, 1000, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'black',
            visible: true
        }
    });
    Matter.World.add(world, wall1);
    var wall2 = Matter.Bodies.rectangle(495, 250, 10, 500, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'black',
            visible: true
        }
    });
    var top = Matter.Bodies.rectangle(250, 5, 500, 10, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'black',
            visible: true
        }
    });

    Matter.World.add(world, top);
    Matter.World.add(world, wall2);
    Matter.World.add(world, floor);

Matter.World.add(world, ball);
Matter.Engine.run(engine);
Matter.Render.run(render);
//https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
//https://codepen.io/lonekorean/pen/KXLrVX
});
