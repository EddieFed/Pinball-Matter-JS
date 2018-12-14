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

var paddleLeft = {};
var paddleRight = {};

var ball;

var defaultCategory = 0x0001;
var paddleCategory = 0x0004;
var x = 750;

Bodies = Matter.Bodies;

// Wait until window finishes loading!
window.addEventListener("load", () => {
    c = document.getElementById("ca");

    // Matter.js setup
    game.engine = Matter.Engine.create();
    game.world = game.engine.world;
    game.world.bounds = {
        min: {x: 0, y: 0},
        max: {x: c.width, y: c.height}
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
    paddleLeft = makePaddle(190, 660, -1);
    paddleRight = makePaddle(430, 660, 1);

    ball = Matter.Bodies.circle(450, 20, 15, {
        density: 0.1,
        friction: 0.008,
        frictionAir: 0.00032,
        restitution: 0.8,

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
    });

    // noinspection JSValidateTypes
    mouseConstraint = Matter.MouseConstraint.create(game.engine, {
        element: c,
        constraint: {
            render: {
                visible: false
            },
            stiffness: 0.8
        }
    });


    // Add all bodies to the world
    Matter.World.add(game.world, [
        mouseConstraint,

        ball,

        paddleLeft.ball,
        paddleLeft.paddle,
        paddleLeft.constrainter,

        paddleRight.ball,
        paddleRight.paddle,
        paddleRight.constrainter,


        // Left Paddle Stoppers
        staticCircle(paddleLeft.ball.position.x + 15, paddleLeft.ball.position.y + 50, 20, "#FFFFFF"),  // Bottom
        staticCircle(paddleLeft.ball.position.x + 50, paddleLeft.ball.position.y - 40 - 5 /** dont forget to include the radius of the anchor ball **/, 20, "#FFFFFF"),  // Top

        // Right Paddle Stoppers
        staticCircle(paddleRight.ball.position.x - 15, paddleRight.ball.position.y + 50, 20, "#FFFFFF"),    // Bottom
        staticCircle(paddleRight.ball.position.x - 50, paddleRight.ball.position.y - 40 - 5 /** dont forget to include the radius of the anchor ball **/, 20, "#FFFFFF"),    // Top

        // Window borders
        border(c.width / 2, -15, c.width + 0, 30),     // Top
        border(c.width / 2, c.height + 15, c.width + 0, 30),     // Bottom
        border(-15, c.height / 2, 30, c.height + 0),    // Left
        border(c.width + 15, c.height / 2, 30, c.height + 0),    // Right


        // Left Slide
        staticBox3(40, 620, 265, 20, "#000000", .2 ),


        //Right Slide
        staticBox3(545, 625, 190, 20, "#000000", -.2),

        // Left Slide
        staticBox(640, 520, 10, 600, "#000000", 0 ),

    ]);

    // Basic render
    Matter.Engine.run(game.engine);
    Matter.Render.run(game.render);

    window.addEventListener("keyup", function (event) {
        if (event.defaultPrevented) {
            return;
        }

        var key = event.code;
        if (key === "ArrowLeft") {
            Matter.Body.applyForce(paddleLeft.paddle, {
                x: paddleLeft.paddle.position.x,
                y: paddleLeft.paddle.position.y
            }, Matter.Vector.create(0, -150));
        } else if (key === "ArrowRight") {
            Matter.Body.applyForce(paddleRight.paddle, {
                x: paddleRight.paddle.position.x,
                y: paddleRight.paddle.position.y
            }, Matter.Vector.create(0, -150));
        }
    });

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


function makePaddle(x, y, direction) {
    var paddleTemp= {};
    paddleTemp.paddle = Matter.Bodies.rectangle(x, y, 110, 15,  {
        label: "paddle",
        density: 1,
        restitution: 0,
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
        pointA: { x: direction*40, y: 0},
        bodyB: paddleTemp.ball,
        length: 0.001,
        stiffness: 1,
        render: {
            visible: true
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
            visible: true,
            fillStyle: colorHex,
            strokeStyle: "#000000",
            lineWidth: 1
        }
    });
}


function staticBox(x, y, width, height, colorHex, angle) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        angle: angle,
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