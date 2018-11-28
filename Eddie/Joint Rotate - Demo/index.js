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
var compositePaddle;


// Wait until window finishes loading!
window.addEventListener("load", () => {


    // Canvas reference
    c = document.getElementById("ca");




    // Tracks mouse movement
    c.addEventListener('click', () => {
        Matter.Body.applyForce(box, Matter.Vector.create(c.width/2, c.height/2), Matter.Vector(10, 10))

    }, false);


    // Matter.js setup
    engine = Matter.Engine.create();
    world = engine.world;
    world.bounds = {
        min: { x: 0, y: 0},
        max: { x: 1000, y: 800 }
    };
    let box = staticBox(c.width/2, c.height/2, 60, 20, "#000000");
    let joint = ball(c.width/2, c.height/2, 2.4);
    joint.static = true;

    Matter.Constraint.create({
        bodyA: joint,
        bodyB: box
    });


    mouseConstraint = Matter.MouseConstraint.create(engine, {
        element: c,
        constraint: {
            render: {
                visible: true
            },
            stiffness:0.8
        }
    });
    Matter.World.add(world, mouseConstraint);


    // Add all bodies to the world
    Matter.World.add(world, [
        box,
        joint,
        staticBox(500, c.height - 50, 50, 50, "#000000"),
        ball(500, 400, 20),

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
            // strokeStyle: "black",
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
            strokeStyle: "black",
            lineWidth: 1
        },
        slop: 0
    });
}


function staticBox(x, y, width, height, colorHex) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        angle: Math.random() * Math.PI,
        render: {
            fillStyle: colorHex,
            strokeStyle: "black",
            lineWidth: 1
        }
    });
}