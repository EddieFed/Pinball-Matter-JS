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


// Wait until window finishes loading!
window.addEventListener("load", () => {


    // Canvas reference
    c = document.getElementById("ca");

    // Tracks mouse movement
    c.addEventListener('dblclick', (event) => {
        var rect = c.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        Matter.World.add(world, staticBox(x, y, 50, 50, "#554C78"));

    }, false);


    // Matter.js setup
    engine = Matter.Engine.create();
    world = engine.world;
    world.bounds = {
        min: { x: 0, y: 0},
        max: { x: c.width, y: c.height }
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

        staticBox(500, c.height - 50, 50, 50, "#000000"),
        ball(500, 400, 20),

        // Window edges (top, bottom, left, right)
        border(c.width/2, -5, c.width, 10),
        border(c.width/2, c.height + 5, c.width, 10),
        border(-5, c.height/2, 10, c.height),
        border(c.width + 5, c.height/2, 10, c.height)
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
        }
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