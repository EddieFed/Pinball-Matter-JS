/**



 Hello!

 https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
 https://codepen.io/lonekorean/pen/KXLrVX


 **/
var z = 1;
var c;
var engine;
var world;
var render;
var mouseConstraint;


// Wait until window finishes loading!
window.addEventListener("load", () => {

    // Canvas reference
    c = document.getElementById("ca");

    // Tracks mouse movement
    c.addEventListener('dblclick', (event) => {//try to make a paddle or something that can rotate on an axis and hit the ball (like a paddle)
        var rect = c.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        z=z-.1;
        Matter.World.add(world, staticBox3(100, 500, 1000, 50, "#000000",z));
    }, false);






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
                visible: true
            },
            stiffness:0.8
        }
    });
    Matter.World.add(world, mouseConstraint);


    // Add all bodies to the world
    Matter.World.add(world, [


        staticBox(500, 780, 50, 50, "#000000"),
        staticBox2(500, 780, 50, 50, "#000000"),
        staticBox3(100, 500, 1000, 50, "#000000", 1),
        ball(500, 400, 25),//ball size

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
        friction: 0.0005, //affects friction so when it hits wall or ground slows down,
        frictionAir: 0.003, // affects gravity speed
        restitution: 1,
        render: {
            fillStyle: "#F35e66",
            strokeStyle: "black",
            lineWidth: 1
        }
    });
}


function staticBox(x, y, width, height, colorHex) {
    return Matter.Bodies.rectangle(x, y, width, height, {
            isStatic: true,
            angle: 1,
            render: {
                fillStyle: colorHex,
                strokeStyle: "black",
                lineWidth: 1
            }
        });
}
function staticBox2(x, y, width, height, colorHex) {
    return Matter.Bodies.rectangle(900, 500, 1000, height, {
        isStatic: true,
        angle: 2,
        render: {
            fillStyle: colorHex,
            strokeStyle: "black",
            lineWidth: 1
        }
    });
}
function staticBox3(x, y, width, height, colorHex, angles) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        angle: angles,
        render: {
            fillStyle: colorHex,
            strokeStyle: "black",
            lineWidth: 1
        }
    });
}