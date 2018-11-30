/**



 Hello!

 https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
 https://codepen.io/lonekorean/pen/KXLrVX


 **/


var c;
var engine;
var world;
var render;
var mouseConstraint;
var paddle = {};


// Wait until window finishes loading!
window.addEventListener("load", () => {


    // Canvas reference
    c = document.getElementById("ca");




    // Tracks mouse movement
    c.addEventListener('click', () => {
        // alert("Click");
        Matter.Body.applyForce(paddle.thing, {
            x: paddle.thing.position.x - 1,
            y: paddle.thing.position.y - 1
        }, Matter.Vector.create(0.0,-0.05));
    }, false);



    // keyboard paddle events
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

    paddle.thing = Matter.Bodies.rectangle(c.width/2 + 35, c.height/2, 70, 15,  {
        label: "paddle",
        render: {
            fillStyle: "#000000",
            strokeStyle: "#000000",
            lineWidth: 1
        }
    });

    paddle.const = Matter.Bodies.circle(c.width/2, c.height/2, 5, {
        isStatic: true,
        render: {
            visible: true,//what the paddle revolves around
            fillStyle: "#F35e66",
            strokeStyle: "#000000",
            lineWidth: 1
        },
        slop: 0
    });

    paddle.constrained = Matter.Constraint.create({
        bodyA: paddle.thing,
        pointA: { x: -35, y: 0},
        bodyB: paddle.const,
        length: 0,
        stiffness: 0,
        render: {
            visible: false
        }
    });






    // Add all bodies to the world
    Matter.World.add(world, [
        mouseConstraint,

        paddle.thing,
        paddle.const,
        paddle.constrained,


        staticBox(c.width/2 + 25, c.height/2 + 40, 80, 10, "#FFFFFF", (Math.PI) / 4),
        staticBox(c.width/2 + 40, c.height/2 - 15, 80, 10, "#FFFFFF", 0),
        ball(700, 400, 20),

        // Window edges (top, bottom, left, right)
        border(500, -5, 1000, 10),
        border(500, 805, 1000, 10),
        border(-5, 400, 10, 800),
        border(1005, 400, 10, 800)
    ]);

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
        density: 0.05,
        friction: 0.008,
        frictionAir: 0.00032,
        restitution: 1,
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
        render: {
            visible: false,
            fillStyle: colorHex,
            strokeStyle: "#000000",
            lineWidth: 1
        }
    });
}