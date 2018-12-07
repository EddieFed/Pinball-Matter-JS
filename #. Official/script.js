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
var bumpers = [];

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

    const COLOR = {
        BUMPER: '#0036f3',
        BUMPER_ALT: '#00e5ff',
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
    paddleLeft = makePaddle(250, 600, -1);
    paddleRight = makePaddle(500, 600, 1);

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

    bumper1 = Matter.Bodies.circle(200, 250, 40, {
        angle: 1.57,
        isStatic: true, //An immovable object
        density: 0.4,
        friction: 0.01,
        frictionAir: 0.00001,
        restitution: 1.25,
        render: {
            fillStyle: '#0036f3',
            strokeStyle: 'black',
            lineWidth: 1
        }
    }),
    bumper1.restitution =1.25;
    bumpers.push(makeBumper(200, 250, 40));
    bumpers.push(makeBumper(600, 250, 40));

    // Add all bodies to the world
    Matter.World.add(game.world, [
        mouseConstraint(),

        ball,
        bumpers[0],
        bumpers[1],

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
        border(c.width/2, -15, c.width, 30),             // Top
        border(c.width/2, c.height + 15, c.width, 30),   // Bottom
        border(-15, c.height/2, 30, c.height),           // Left
        border(c.width + 15, c.height/2, 30, c.height)   // Right
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
    });

    Matter.Events.on(game.engine, 'collisionStart', function(event) {

        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];

            for ( k = 0; k<bumpers.length; ++k) {
                if (pair.bodyA === ball&&pair.bodyB === bumpers[k]) {
                    bumpers[k].render.fillStyle = COLOR.BUMPER_ALT;
                    setTimeout(function() {
                        bumpers[k].render.fillStyle = COLOR.BUMPER;
                    }, 200);
                    break;
                }
            }


        }
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


function makePaddle(x, y, direction) {
    var paddleTemp= {};
    paddleTemp.paddle = Matter.Bodies.rectangle(x, y, 100, 15,  {
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
        pointA: { x: direction*35, y: 0},
        bodyB: paddleTemp.ball,
        length: 0.01,
        stiffness: 0,
        render: {
            visible: false
        }
    });
    return paddleTemp;

}

function makeBumper(x, y, radius) {
    bumper =  Matter.Bodies.circle(x, y, radius, {
        angle: 1.57,
        isStatic: true, //An immovable object
        density: 0.4,
        friction: 0.01,
        frictionAir: 0.00001,
        restitution: 1.25,
        render: {
            fillStyle: '#0036f3',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });
    bumper.restitution = 1.25;
    return bumper;
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