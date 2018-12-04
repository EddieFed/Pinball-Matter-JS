var engine, world, render;
var bodies;


window.addEventListener('load', function() {

    //Fetch our canvas
    var canvas = document.getElementById('world');

    //Setup Matter JS
    engine = Matter.Engine.create();
    world = engine.world;
    render = Matter.Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 500,
            height: 500,
            background: 'transparent',
            wireframes: false,
            showAngleIndicator: false
        }
    });
    bodies = [];

    //Add a ball
    var ball = Matter.Bodies.circle(100, 0, 10, {
        radius: 15,
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
    bodies.push(ball);

    //Add a floor
    var floor = Matter.Bodies.rectangle(0, 500, 1000, 40, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world, floor);

    //Add a wall
    var wall = Matter.Bodies.rectangle(0, 0, 40, 1000, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world, wall);

    //Add a border
    var wall2 = Matter.Bodies.rectangle(500, 0, 40, 1000, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world, wall2);

    //Add a ceiling
    var ceiling = Matter.Bodies.rectangle(0, 0, 1000, 40, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world, ceiling);

    var launcher = Matter.Bodies.rectangle(100,250,20,80);
    Matter.World.add(world,launcher);
    bodies.push(launcher);

    var invisCheck = Matter.Bodies.rectangle(80,400,40,50, {
        isStatic: true,
        render:{
            visible: true
        }
    });
    Matter.World.add(world,invisCheck);
    bodies.push(invisCheck);
    // Matter.Constraint.create(lWall);
    // Matter.Constraint.create(lWall2);
    // launcher.constrain();
    var lWall = Matter.Bodies.rectangle(80,0,20,1000, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world,lWall);
    bodies.push(lWall);

    var lWall2 = Matter.Bodies.rectangle(120,400,20,500, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    Matter.World.add(world,lWall2);
    bodies.push(lWall2);



    //Add a paddle
    var paddle2 = Matter.Bodies.trapezoid(900, 250, 20, 80, .33, {
        angle: 1.57,
        density: 0.2,
        friction: 0.01,
        frictionAir: 0.00001,
        restitution: 0.8,
        render: {
            fillStyle: '#F35e66',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });
    Matter.World.add(world, paddle2);
    bodies.push(paddle2);

    Matter.Events.on(engine, 'collisionStart', function (event) {
        var pairs = event.pairs;
        for(var i=0, j=pairs.length;i!=j;++i){
            var pair =pairs[i];
            if(pair.bodyA === bodies[0] && pair.bodyB === bodies[2]){
                Matter.Body.applyForce(bodies[0], {x: bodies[0].position.x, y: bodies[0].position.y}, {x: 10, y:0})
            }
        }
    });

    // Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 0.05, y: 0});




    // // keyboard paddle events
    // $('body').on('keydown', function(e) {
    //     if (e.which === 37) { // left arrow key
    //         alert("left")
    //     } else if (e.which === 39) { // right arrow key
    //         alert("right")
    //     }
    // });
    // $('body').on('keyup', function(e) {
    //     if (e.which === 37) { // left arrow key
    //         isLeftPaddleUp = false;
    //     } else if (e.which === 39) { // right arrow key
    //         isRightPaddleUp = false;
    //     }
    // });
    //
    //Make interactive
    // var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
    //     element: canvas,
    //     constraint: {
    //         render: {
    //             visible: false
    //         },
    //         stiffness:0.8
    //     }
    // });
    // Matter.World.add(world, mouseConstraint);

    //Start the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);

});


window.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    var key = event.key || event.keyCode;

    if (key === "ArrowLeft") {
        // alert(bodies[0].radius);
        Matter.Body.scale(bodies[1], 1, .5);
        Matter.Body.applyForce(bodies[0],{x:bodies[0].position.x, y: bodies[0].position.y}, {x: 0, y: -1.5});

        //Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 0, y: -0.05});

    }
        // alert(bodies[0].radius)
    // } else if (key === "ArrowRight") {
    //     // Matter.Body.rotate(bodies[1], -1)
    //     // Matter.Body.setAngularVelocity(bodies[1], )
    //     Matter.Body.applyForce(bodies[1], {x:bodies[1].position.x+20, y:bodies[1].position.y}, {x: 0, y: -6})
    //     setTimeout(function() {
    //         Matter.Body.setAngularVelocity(bodies[1], 0);
    //         Matter.Body.setVelocity(bodies[1], 0);
    //     }, 1000);
    //     // Matter.Body.setAngularVelocity(bodies[1], 1)
    //
    // }
});