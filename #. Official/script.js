/**



 Hello!

 https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
 https://codepen.io/lonekorean/pen/KXLrVX


 **/

var c;
var game = {};

var paddleLeft = {};
var paddleRight = {};

var ball;


var defaultCategory = 0x0001;
var paddleCategory = 0x0004;


// Wait until window finishes loading!
window.addEventListener("load", () => {
    c = document.getElementById("ca");

    // Matter.js setup
    game.engine = Matter.Engine.create();
    game.world = game.engine.world;
    game.world.bounds = {
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

    // Game object creation
    paddleLeft = makePaddle(250, 600);
    paddleRight = makePaddle(500, 600);

    ball = Matter.Bodies.circle(450, 20, 10, {
        density: 0.1,
        friction: 0.008,
        frictionAir: 0.00032,
        restitution: 1,

        inertia: Infinity,
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

    // Add all bodies to the world
    Matter.World.add(game.world, [
        mouseConstraint(),

        ball,


        paddleLeft.ball,
        paddleLeft.paddle,
        paddleLeft.constrainter,

        paddleRight.ball,
        paddleRight.paddle,
        paddleRight.constrainter,

        staticCircle(paddleLeft.ball.position.x + 20, paddleLeft.ball.position.y + 45, 10, "#FFFFFF"),
        staticCircle(paddleLeft.ball.position.x + 60, paddleLeft.ball.position.y - 20, 10, "#FFFFFF"),

        staticCircle(paddleRight.ball.position.x - 20, paddleRight.ball.position.y + 45, 10, "#FFFFFF"),
        staticCircle(paddleRight.ball.position.x - 60, paddleRight.ball.position.y - 20, 10, "#FFFFFF"),

        //              ** Window borders **
        border(c.width/2, -5, c.width, 10),             // Top
        border(c.width/2, c.height + 5, c.width, 10),   // Bottom
        border(-5, c.height/2, 10, c.height),           // Left
        border(c.width + 5, c.height/2, 10, c.height)   // Right
    ]);

    // Basic render
    Matter.Engine.run(game.engine);
    Matter.Render.run(game.render);

    Matter.Events.on(game.engine, 'beforeUpdate', function(event) {
        // bumpers can quickly multiply velocity, so keep that in check
        Matter.Body.setVelocity(ball, {
            x: Math.max(Math.min(ball.velocity.x, 20), -20),
            y: Math.max(Math.min(ball.velocity.y, 20), -20),
        });

        // // cheap way to keep ball from going back down the shooter lane
        // if (ball.position.x > 500 && ball.velocity.y > 0) {
        //     Matter.Body.setVelocity(ball, { x: 0, y: -10 });
        // }
        // if (ball.position.x > 20 && ball.velocity.y <50) {
        //     Matter.Body.setVelocity(ball, { x: 20, y: -10 });
        // }
    });
});



window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    var key = event.code;
    if (key === "ArrowLeft") {
        Matter.Body.applyForce(paddleLeft.paddle, {
            x: paddleLeft.paddle.position.x,
            y: paddleLeft.paddle.position.y
        }, Matter.Vector.create(0, -100));
    } else if (key === "ArrowRight") {
        Matter.Body.applyForce(paddleRight.paddle, {
            x: paddleRight.paddle.position.x,
            y: paddleRight.paddle.position.y
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


function makePaddle(x, y) {
    var paddleTemp= {};
    paddleTemp.paddle = Matter.Bodies.rectangle(x-100000, y, 100, 15,  {
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

    paddleTemp.ball = Matter.Bodies.circle(x, y, 5, {
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

    Object.values(paddleTemp).forEach((p) => {
        p.collisionFilter.group = paddleGroup;
    });

    paddleTemp.constrainter = Matter.Constraint.create({
        bodyA: paddleTemp.paddle,
        pointA: { x: -35, y: 0},
        bodyB: paddleTemp.ball,
        length: 0.01,
        stiffness: 0,
        render: {
            visible: false
        }
    });
    return paddleTemp;

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