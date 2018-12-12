var engine, world, render;
var bodies;
var ballmin=0;
var moveright = true;

Bodies = Matter.Bodies;
Constraint = Matter.Constraint;
Body = Matter.Body;


window.addEventListener('load', function() {

    //Fetch our canvas
    var canvas = document.getElementById('world');
    var Body =Matter.body;
    var World = Matter.world;

    //Setup Matter JS j
    engine = Matter.Engine.create();
    world = engine.world;
    render = Matter.Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 500,
            height: 500,
            background: 'transparent',
            wireframes: false
        }
    });
    bodies = [];

    


        

    //Add a ball
    var ball = Matter.Bodies.circle(170, 450, 10, {
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

    var launcher = Matter.Bodies.rectangle(100,250,20,80, {isStatic: true});
    Matter.World.add(world,launcher);
    bodies.push(launcher);

    var invisCheck = Matter.Bodies.rectangle(100,150,20,50, {
        isStatic: true,
        isSensor: true,
        render:{
            visible: true
        }
    });
    
    Matter.World.add(world,invisCheck);
    bodies.push(invisCheck);

    var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
        paddleOptions = { density: 0.004 },
        paddle = Bodies.polygon(170, 450, 8, 20, paddleOptions),
        anchor = { x: 170, y: 450 },
        elastic = Constraint.create({ 
            pointA: anchor, 
            bodyB: paddle, 
            stiffness: 0.05
        });

    Matter.World.add(engine.world, [ground,paddle,elastic]);

    // Matter.World.add(world,[ground,paddle,elastic]);

    // var elastic = Constraint.create({ 
    //     pointA: anchor, 
    //     bodyB: ball, 
    //     stiffness: 0.05
    // });
    // Matter.world.add(world,elastic);

    // const CUSTOM_PATH = '425.6 327 273.8 315.6...';

    // function customShape(x, y) {
    //     let vertices = Matter.Vertices.fromPath(CUSTOM_PATH);
    //     return Matter.Bodies.fromVertices(x, y, vertices, {
    //         // set options if you need them...
    //     });
    // }

    // Matter.World.add(customShape(100,100));

    // Matter.Constraint.create(lWall);
    // Matter.Constraint.create(lWall2);
    // launcher.constrain();
    var lWall = Matter.Bodies.rectangle(80,0,20,1000, {
        isStatic: true, //An immovable object
        render: {
            visible: true
        }
    });
    //k
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

    // Matter.Events.on(engine, 'collisionStart', function (event) {
    //     var pairs = event.pairs;
    //     for(var i=0, j=pairs.length;i!=j;++i){
    //         var pair =pairs[i];
    //         if(pair.bodyA === ball && pair.bodyB === invisCheck){
    
    //             Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: .50, y: 0});
    //         }
    //             //alert("yo");
    //             //Matter.Body.applyForce(bodies[0],{x:bodies[0].position.x, y: bodies[0].position.y}, {x:.5, y: 0});            }
    //     }
    // });

    Matter.Events.on(engine, 'collisionStart', function(event) {

        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];

            if (pair.bodyA === ball&&pair.bodyB === invisCheck) {
                Matter.Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: .50, y: 0});

            } else if (pair.bodyB === ball&&pair.bodyA === invisCheck) {

                Matter.Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: .50, y: 0});

            }
        }
    });
    Matter.Events.on(engine, 'collisionEnd', function(event) {

        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];

            if (pair.bodyA === ball&&pair.bodyB === invisCheck) {

                boolea=false;
            } else if (pair.bodyB === ball&&pair.bodyA === invisCheck) {

                boolea=false;
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
    var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
        element: canvas,
        constraint: {
            render: {
                visible: false
            },
            stiffness:0.8
        }
    });
    Matter.World.add(world, mouseConstraint);

    // Events.on(engine, 'afterUpdate', function() {
    //     if (mouseConstraint.mouse.button === -1 && (ball.position.x > 190 || ball.position.y < 430)) {
    //         // ball = Bodies.polygon(170, 450, 7, 20, ballOptions);
    //         // World.add(engine.world, ball);
    //         elastic.bodyB = ball;
    //     }
    // });

    // render.mouse = mouse;

    //Start the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    // Matter.Events.on(engine, 'afterUpdate', function(event) {

    //         Matter.Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: .05, y: 0});


    // });


    window.addEventListener('keydown', function (event) {
        if (event.defaultPrevented) {
            return;
        }
    
        var key = event.key || event.keyCode;
        alert(launcher.position.y)
    
        if (key === "ArrowLeft") {
    
            setInterval(myMethod, 10);
            function myMethod( )
            {
                if(launcher.position.y<=300){
                    Matter.Body.setPosition(launcher,{x:launcher.position.x,y:launcher.position.y--});

                }
    
            }
        }
    });
});


// window.addEventListener('keydown', function (event) {
//     if (event.defaultPrevented) {
//         return;
//     }

//     var key = event.key || event.keyCode;

//     if (key === "ArrowLeft") {

//         setInterval(myMethod, 500);
//         function myMethod( )
//         {
//             Matter.Body.setPosition(ball,{x:ball.position.x,y:ball.position.y++});

//         }
//     }
// });