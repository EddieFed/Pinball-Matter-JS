var c;
var engine;
var world;
var render;
var mouseConstraint;
var paddle = {};
var pinball;

var Bodies = Matter.Bodies;

var defaultCategory = 0x0001,
    paddleCategory = 0x0004;


// Wait until window finishes loading!
window.addEventListener("load", () => {


    // Canvas reference
    c = document.getElementById("ca");


    window.addEventListener('keyup', function (event) {
        if (event.defaultPrevented) {
            return;
        }

        var key = event.key || event.keyCode;

        if (key === "ArrowLeft") {
            Matter.Body.applyForce(paddle.thing, {
                x: paddle.thing.position.x,
                y: paddle.thing.position.y
            }, Matter.Vector.create(0,-200));
        } else if (key === "ArrowRight") {

        }
    });

    // // Tracks mouse movement
    // c.addEventListener('click', () => {
    //     // alert("Click");
    //
    //     Matter.Body.applyForce(paddle.thing, {
    //         x: paddle.thing.position.x,
    //         y: paddle.thing.position.y
    //     }, Matter.Vector.create(0,-100));
    //
    // }, false);


    // Matter.js setup
    engine = Matter.Engine.create();
    world = engine.world;
    world.bounds = {
        min: { x: 0, y: 0},
        max: { x: 1000, y: 800 }
    };



    mouseConstraint = Matter.MouseConstraint.create(engine, {
        element: c,
        constraint: {
            render: {
                visible: false
            },
            stiffness:0.8
        }
    });

    // paddle.thing = Matter.Bodies.rectangle(c.width/2+200, c.height/2, 100, 15,  {
    //     // label: "paddle",
    //     density: 2/3,
    //     collisionFilter: {
    //         category: defaultCategory,
    //         mask: paddleCategory | defaultCategory
    //     },
    //     render: {
    //         ignoreGravity: false,

    //         fillStyle: "#000000",
    //         strokeStyle: "#000000",
    //         lineWidth: 1
    //     }
    // });

    // paddle.const = Matter.Bodies.circle(c.width/2, c.height/2, 5, {
    //     isStatic: true,
    //     render: {
    //         visible: true,
    //         fillStyle: "#F35e66",
    //         strokeStyle: "#000000",
    //         lineWidth: 1
    //     },
    //     slop: 0
    // });

    // let paddleGroup = Matter.Body.nextGroup(true);

    // Object.values(paddle).forEach((p) => {
    //     p.collisionFilter.group = paddleGroup;
    // });

    // paddle.constrained = Matter.Constraint.create({
    //     bodyA: paddle.thing,
    //     pointA: { x: -35, y: 0},
    //     bodyB: paddle.const,
    //     length: -1,
    //     stiffness: 0,
    //     render: {
    //         visible: true
    //     }
    // });

    // pinball = ball(700, 400, 20);

    var ground = Bodies.rectangle(395, 600, 1210, 50, { isStatic: true }),
    paddleOptions = { density: 0.004 },
        // paddle = Bodies.polygon(170, 450, 8, 20, paddleOptions),
    paddle = ball(170,450,20,20,paddleOptions),
    anchor = { x: 170, y: 450 },
    elastic = Matter.Constraint.create({ 
        pointA: anchor, 
        bodyB: paddle, 
        stiffness: 0.05
    });

    var powerup = Matter.Bodies.circle(375, 400, 20, {
        isStatic: true,
        isSensor:true,
        render: {
            fillStyle: '#F333FF',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });

    Matter.Events.on(engine, 'collisionStart', function(event) {

        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];

            if (pair.bodyA === paddle&&pair.bodyB === powerup) {
                alert("wrse");








            } else if (pair.bodyB === paddle&&pair.bodyA === powerup) {
                    alert("wers");




            }



        }






    });

    // staticCircleBot =




    // Add all bodies to the world
    Matter.World.add(world, [
        mouseConstraint,
        ground,
        paddle,
        anchor,
        elastic,
        powerup,

        // paddle.thing,
        // //paddle.const,
        // paddle.constrained,


        // staticBox(c.width/2 + 30, c.height/2 + 45, 80, 10, "#FFFFFF", (Math.PI) / 4),
        // staticBox(c.width/2 + 70, c.height/2 - 20, 50, 10, "#FFFFFF", 0),


        // staticCircle(c.width/2 + 20, c.height/2 + 45, 10, "#FFFFFF"),
        // staticCircle(c.width/2 + 60, c.height/2 - 20, 10, "#FFFFFF"),

        // Matter.Bodies.circle(c.width/2 + 20, c.height/2 - 10, 10, {
        //     isStatic: true,
        //     render: {
        //
        //     }
        //
        // }),

        //pinball,

        // Window edges (top, bottom, left, right)
        border(500, -5, 1000, 10),
        border(500, 805, 1000, 10),
        border(-5, 400, 10, 800),
        border(1005, 400, 10, 800)
    ]);

    Matter.Events.on(engine, 'afterUpdate', function() {
        if (mouseConstraint.mouse.button === -1 && (paddle.position.x > 190 || paddle.position.y < 430)) {
            paddle = ball(170,450,20,20,paddleOptions);
            // Matter.World.add(engine.world, paddle);
            elastic.bodyB = paddle;
        }
    });


// **!!REMEMBER!!** Set Renderer to match Canvas
    render = Matter.Render.create({
        canvas: c,
        engine: engine,
        options: {
            width: c.width,
            height: c.height,
            background: c.style.backgroundColor,
            wireframes: false,
            showAngleIndicator: false
        }
    });


    // Basic render
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    // Matter.Events.on(engine, 'beforeUpdate', function() {
    //         var gravity = engine.world.gravity;
    //         // alert(gravity.y*gravity.scale*pinball.mass)
    //         // if (noGravity) {
    //         Matter.Body.applyForce(paddle.thing, {
    //             x: 0,
    //             y: 0
    //         }, {
    //             x: -gravity.x * gravity.scale * paddle.thing.mass/2,
    //             y: -gravity.y * gravity.scale * paddle.thing.mass/2
    //         });

    //     }
    // );

    // Matter.Events.on(engine, 'collisionStart', function(event) {

    //     var pairs = event.pairs;

    //     for (var i = 0, j = pairs.length; i != j; ++i) {
    //         var pair = pairs[i];

    //         if (pair.bodyA === paddle.thing&&pair.bodyB === test) {
    //             alert("rawr");
    //         } else if (pair.bodyB === ball&&pair.bodyA === test) {
    //             alert("rawr")
    //         }
    //     }
    // });
});





// ** Body Functions!! ** //

function border(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: "#000000",
            lineWidth: 1
        }
    });
}


function ball(x, y, r) {
    return Matter.Bodies.circle(x, y, r, {
        density: 0.3,
        friction: 0.008,
        frictionAir: 0.00032,
        restitution: 1,
        inertia: Infinity,
        collisionFilter: {
            category: defaultCategory,
            mask: defaultCategory
        },
        render: {
            fillStyle: "#F35e66",
            strokeStyle: "#000000",
            lineWidth: 1
        },
        slop: 0
    });
}


function staticBox(x, y, width, height, colorHex, rotate) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        angle: rotate,
        inertia: Infinity,
        collisionFilter: {
            category: paddleCategory,
            mask: defaultCategory, paddleCategory
        },
        render: {
            visible: true,
            fillStyle: colorHex,
            strokeStyle: "#000000",
            lineWidth: 1
        }
    });
}

function staticCircle(x, y, radius, colorHex) {
    return Matter.Bodies.circle(x, y, radius, {
        isStatic: true,
        inertia: Infinity,
        restitution: 0,
        collisionFilter: {
            category: paddleCategory,
            mask: defaultCategory, paddleCategory
        },
        render: {
            visible: true,
            fillStyle: colorHex,
            strokeStyle: "#000000",
            lineWidth: 1
        }
    });
}

