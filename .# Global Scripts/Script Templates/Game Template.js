/**

 ## Company B
 |      Pinball Game

 ## Reference Tools:
 |      https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
 |      https://codepen.io/lonekorean/pen/KXLrVX

 ## Contributors:
 |      Andrew Milas
 |      Viraj Sule
 |      Brenden Mitra
 |      Sam Lundstrum
 |      Eddie Federmeyer
 |      Dominic Laskero

 ## Physics Engine:
 |      matter.js
 |      http://brm.io/matter-js/

 **/

var c;
var game = {};


// Wait until window finishes loading!
window.addEventListener("load", () => {

    //Canvas reference
    c = document.getElementById("ca");

    // Matter.js setup
    game.engine = Matter.Engine.create();
    game.world = game.engine.world;
    world.bounds = {
        min: { x: 0, y: 0},
        max: { x: c.width, y: c.height }
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
        mouseConstraint(),

        // The current player ball (Delete if needed)
        Matter.Bodies.circle(550, 20, 10, {
            density: 0.1,
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


        //              ** Window borders **
        border(c.width/2, -5, c.width, 10),             // Top
        border(c.width/2, c.height + 5, c.width, 10),   // Bottom
        border(-5, c.height/2, 10, c.height),           // Left
        border(c.width + 5, c.height/2, 10, c.height)   // Right
    ]);

    // Basic renderer and runner
    Matter.Runner.run(game.engine);
    Matter.Render.run(game.render);
});




// ------------------------
// ** Creation functions **


// World border creation
function border(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: "#000000",
            lineWidth: 1
        }
    });
}


// Mouse recognition creation
function mouseConstraint() {
    return Matter.MouseConstraint.create(game.engine, {
        element: c,
        constraint: {
            render: {
                visible: true
            }
        },
        stiffness: 0.8
    });
}