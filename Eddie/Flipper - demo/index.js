/**



 Hello!

 https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
 https://codepen.io/lonekorean/pen/KXLrVX


 **/

var c;
var game = {};

var paddle = {};

var defaultCategory = 0x0001;
var paddleCategory = 0x0004;


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

    // Game object creation
    makePaddle();


























    // Add all bodies to the world
    Matter.World.add(game.world, [
        mouseConstraint(),

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
            },
            collisionFilter: {
                category: defaultCategory,
                mask: defaultCategory
            }
        }),


        paddle.ball,
        paddle.paddle,
        paddle.constrainter,
        staticCircle(c.width/2 + 20, c.height/2 + 45, 10, "#FFFFFF"),
        staticCircle(c.width/2 + 60, c.height/2 - 20, 10, "#FFFFFF"),

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




window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    var key = event.code;

    if (key === "Space") {
        Matter.Body.applyForce(paddle.paddle, {
            x: paddle.paddle.position.x,
            y: paddle.paddle.position.y
        }, Matter.Vector.create(0, -100));
    }
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
                visible: true
            }
        },
        stiffness: 0.8

    });
}


function makePaddle() {
    paddle.paddle = Matter.Bodies.rectangle(c.width/2 + 300, c.height/2, 100, 15,  {
        label: "paddle",
        density: 2/3,
        collisionFilter: {
            category: defaultCategory,
            mask: paddleCategory | defaultCategory
        },
        render: {
            fillStyle: "#000000",
            strokeStyle: "#000000",
            lineWidth: 1
        }
    });

    paddle.ball = Matter.Bodies.circle(c.width/2, c.height/2, 5, {
        isStatic: true,
        render: {
            visible: false,
            fillStyle: "#F35e66",
            strokeStyle: "#000000",
            lineWidth: 1
        },
        slop: 0
    });

    let paddleGroup = Matter.Body.nextGroup(true);

    Object.values(paddle).forEach((p) => {
        p.collisionFilter.group = paddleGroup;
    });

    paddle.constrainter = Matter.Constraint.create({
        bodyA: paddle.paddle,
        pointA: { x: -35, y: 0},
        bodyB: paddle.ball,
        length: 0.01,
        stiffness: 0,
        render: {
            visible: false
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
            visible: false,
            fillStyle: colorHex,
            strokeStyle: "#000000",
            lineWidth: 1
        }
    });
}