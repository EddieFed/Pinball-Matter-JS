/**



 Hello!

 https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
 https://codepen.io/lonekorean/pen/KXLrVX


 **/

var c;
var game = {};

var paddle = {};


// Wait until window finishes loading!
window.addEventListener("load", () => {
    c = document.getElementById("ca");

    // Matter.js setup
    game.engine = Matter.Engine.create();
    game.world = game.engine.world;
    game.world.bounds = {
        min: {
            x: 0,
            y: 0
        },
        max: {
            x: 1000,
            y: 800
        }
    };

    // **!!REMEMBER!!** Set Renderer to match Canvas
    game.render = Matter.Render.create({
        canvas: c,
        engine: game.engine,
        options: {
            width: c.width,
            height: c.height,
            background: c.style.backgroundColor,
            wireframes: false,
            showAngleIndicator: false
        }
    });

    // Add all bodies to the world
    Matter.World.add(game.world, [
        mouseConstraint,

        Matter.Bodies.circle(500, 500, 10, {
            density: 0.05,
            friction: 0.008,
            frictionAir: 0.00032,
            restitution: 1,
            slop: 0,
            render: {
                fillStyle: "#F35e66",
                strokeStyle: "#000000",
                lineWidth: 1
            }
        }),




        // Window edges (top, bottom, left, right)
        border(500, -5, 1000, 10),
        border(500, 805, 1000, 10),
        border(-5, 400, 10, 800),
        border(1005, 400, 10, 800)
    ]);


    // Basic render
    Matter.Engine.run(game.engine);
    Matter.Render.run(game.render);

});





// <- Creation functions ->









function border(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: "#000000",
            lineWidth: 1
        }
    });
}

function mouseConstraint() {
    return Matter.MouseConstraint.create(game.engine, {
        element: c,
        constraint: {
            render: {
                visible: false
            }
        },
        stiffness: 0.8

    });
}