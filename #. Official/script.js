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
var deadZone;

var portal1, portal2;
var left =false;
var right = false;

var ballmin=0;
var fan;
var fanBase;
var moveright=true;

var defaultCategory = 0x0001;
var paddleCategory = 0x0004;
var x = 750;

var lives = 0;
var score = 0;
var highScore = 0;
Bodies = Matter.Bodies;

const COLOR = {
    BUMPER: '#0036f3',
    BUMPER_ALT: '#00e5ff',
};

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
    paddleLeft = makePaddle(190, 660, -1);
    paddleRight = makePaddle(430, 660, 1);

    ball = Matter.Bodies.circle(450, 20, 15, {
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
    });

    bumpers.push(makeBumper(200, 200, 30));
    bumpers.push(makeBumper(450, 200, 30));
    bumpers.push(makeBumper(200, 400, 30));
    bumpers.push(makeBumper(450, 400, 30));

    deadZone = makeWall(400, 810, 800, 125);

    portal1 = Matter.Bodies.rectangle(0, 450, 10, 150, {
        isStatic: true,
        isSensor:true,
        render: {
            fillStyle: '#0000FF',
            strokeStyle: 'black',
            visible: true
        }
    });
    portal2 = Matter.Bodies.rectangle(635, 450, 10, 150, {
        isStatic: true,
        isSensor:true,
        render: {
            fillStyle: '#0000FF',
            strokeStyle: 'black',
            visible: true
        }
    });

    fan = Matter.Bodies.rectangle(300, 400, 50, 200, {
        isStatic: true, //An immovable object
        isSensor:true,
        render: {
            fillStyle: '#BBBBBB',
            strokeStyle: 'black',
            visible: true
        }
    });
    fanBase = Matter.Bodies.rectangle(0, 0, 50, 20, {
        isStatic: true, //An immovable object
        render: {
            fillStyle: '#777777',
            strokeStyle: 'black',
            visible: true
        }
    });

    mouseConstraint = Matter.MouseConstraint.create(game.engine, {
        element: c,
        constraint: {
            render: {
                visible: false
            },
            stiffness:0.8
        }
    });

    var paddleOptions = { density: 0.004 },
        // paddle = Bodies.polygon(170, 450, 8, 20, paddleOptions),
    //paddle = ball(170,450,20,20,paddleOptions),
    paddle = Matter.Bodies.circle(170,450,20),
    anchor = { x: 170, y: 450 },
    elastic = Matter.Constraint.create({ 
        pointA: anchor, 
        bodyB: paddle, 
        stiffness: 0.05
    });


    // Add all bodies to the world
    Matter.World.add(game.world, [
        mouseConstraint,

        fan,
        fanBase,

        ball,
        anchor,
        elastic,
        paddle,

        bumpers[0],
        bumpers[1],
        bumpers[2],
        bumpers[3],

        deadZone,

        portal1,
        portal2,

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

        // Window borders
        border(c.width/2   , -15          , c.width + 0 , 30          ),     // Top
        border(c.width/2   , c.height + 15, c.width + 0 , 30          ),     // Bottom
        border(-15         , c.height/2   , 30          , c.height + 0),    // Left
        border(c.width + 15, c.height/2   , 30          , c.height + 0),    // Right


        // Left Slide
        staticBox3(40, 620, 265, 20, "#000000", .2 ),


        //Right Slide
        staticBox3(545, 625, 190, 20, "#000000", -.2),

        // Left Slide
        staticBox(640, 520, 10, 600, "#000000", 0 ),

        // Left Rounded Top
        staticBox(5  , 0  , 150, 140, "#000000", 1.8 ),
        staticBox(-15, 170, 100, 50 , "#000000", 1.8 ),
        staticBox(-5 , 150, 100, 50 , "#000000", 1.9 ),
        staticBox(5  , 130, 100, 50 , "#000000", 2   ),
        staticBox(15 , 110, 100, 50 , "#000000", 2.1 ),
        staticBox(25 , 90 , 100, 50 , "#000000", 2.2 ),
        staticBox(35 , 70 , 100, 50 , "#000000", 2.3 ),
        staticBox(45 , 58 , 100, 50 , "#000000", 2.4 ),
        staticBox(55 , 45 , 100, 50 , "#000000", 2.5 ),
        staticBox(65 , 35 , 100, 50 , "#000000", 2.6 ),
        staticBox(75 , 25 , 100, 50 , "#000000", 2.7 ),
        staticBox(85 , 20 , 100, 50 , "#000000", 2.7 ),
        staticBox(95 , 15 , 100, 50 , "#000000", 2.7 ),
        staticBox(105, 10 , 100, 50 , "#000000", 2.8 ),
        staticBox(115, 7  , 100, 50 , "#000000", 2.8 ),
        staticBox(120, 0  , 100, 50 , "#000000", 2.9 ),
        staticBox(125, 0  , 100, 50 , "#000000", 2.9 ),
        staticBox(135, 0  , 100, 50 , "#000000", 2.9 ),
        staticBox(145, -2 , 100, 50 , "#000000", 2.9 ),
        staticBox(155, -4 , 100, 50 , "#000000", 2.9 ),
        staticBox(165, -6 , 100, 50 , "#000000", 2.9 ),
        staticBox(175, -10, 100, 50 , "#000000", 3   ),
        staticBox(185, -15, 100, 50 , "#000000", 3   ),
        staticBox(205, -15, 100, 50 , "#000000", 3   ),
        staticBox(225, -16, 100, 50 , "#000000", 3.03),
        staticBox(265, -23, 100, 50 , "#000000", 3.05),
        staticBox(295, -25, 100, 50 , "#000000", 3.05),
        staticBox(315, -25, 100, 50 , "#000000", 3.05),

        //right rounded top
        staticBox(-5+x, 0, 150, 140, "#000000", -1.8),//top right filler
        staticBox(15+x, 170, 100, 50, "#000000", -1.8),
        staticBox(5+x, 150, 100, 50, "#000000", -1.9),
        staticBox(-5+x, 130, 100, 50, "#000000", -2),
        staticBox(-15+x, 110, 100, 50, "#000000", -2.1),
        staticBox(-25+x, 90, 100, 50, "#000000", -2.2),
        staticBox(-35+x, 70, 100, 50, "#000000", -2.3),
        staticBox(-45+x, 58, 100, 50, "#000000", -2.4),
        staticBox(-55+x, 45, 100, 50, "#000000", -2.5),
        staticBox(-65+x, 35, 100, 50, "#000000", -2.6),
        staticBox(-75+x, 25, 100, 50, "#000000", -2.7),
        staticBox(-85+x, 20, 100, 50, "#000000", -2.7  ),
        staticBox(-95+x, 15, 100, 50, "#000000", -2.7),
        staticBox(-105+x, 10, 100, 50, "#000000", -2.8),
        staticBox(-115+x, 7, 100, 50, "#000000", -2.8),
        staticBox(-120+x, 0, 100, 50, "#000000", -2.9),
        staticBox(-125+x, 0, 100, 50, "#000000", -2.9),
        staticBox(-135+x, 0, 100, 50, "#000000", -2.9),
        staticBox(-145+x, -2, 100, 50, "#000000", -2.9),
        staticBox(-155+x, -4, 100, 50, "#000000", -2.9),
        staticBox(-165+x, -6, 100, 50, "#000000", -2.9),
        staticBox(-175+x, -10, 100, 50, "#000000", -3),
        staticBox(-185+x, -15, 100, 50, "#000000", -3),
        staticBox(-205+x, -15, 100, 50, "#000000", -3),
        staticBox(-225+x, -16, 100, 50, "#000000", -3.03),
        staticBox(-265+x, -23, 100, 50, "#000000", -3.05),
        staticBox(-295+x, -25, 100, 50, "#000000", -3.05),
        staticBox(-315+x, -25, 100, 50, "#000000", -3.05),

    ]);

    // Basic render
    Matter.Engine.run(game.engine);
    Matter.Render.run(game.render);

    Matter.Events.on(game.engine, 'beforeUpdate', function(event) {
        // bumpers can quickly multiply velocity, so keep that in check
        Matter.Body.setVelocity(ball, {
            x: Math.max(Math.min(ball.velocity.x, 17), -17),
            y: Math.max(Math.min(ball.velocity.y, 17), -17),
        });

        if (ball.position.x > ballmin && ball.position.y >300&&ball.position.x < ballmin+75 && ball.position.y <500) {//wind gust
            // Matter.Body.applyForce(ball,{ x: 0, y: 100 });
            // setVelocity(ball, { x: 0, y: -10 });
            Matter.Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x:0, y: -.15});

        }
    });

    Matter.Events.on(game.engine, 'afterUpdate', function() {
        if (mouseConstraint.mouse.button === -1 && (paddle.position.x > 190 || paddle.position.y < 430)) {
            // paddle = ball(170,450,20,20,paddleOptions);
            paddle = Matter.Bodies.circle(170,450,20),
            // Matter.World.add(engine.world, paddle);
            elastic.bodyB = paddle;
        }
    });

    Matter.Events.on(game.engine, 'collisionStart', function(event) {

        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i !== j; ++i) {
            var pair = pairs[i];

            if (pair.bodyA === ball&&pair.bodyB === bumpers[0]) {
                bumpers[0].render.fillStyle = COLOR.BUMPER_ALT;
                score+=50;
                setTimeout(function() {
                    bumpers[0].render.fillStyle = COLOR.BUMPER;
                }, 200);
            } else if (pair.bodyA === ball&&pair.bodyB === bumpers[1]) {
                bumpers[1].render.fillStyle = COLOR.BUMPER_ALT;
                score+=50;
                setTimeout(function() {
                    bumpers[1].render.fillStyle = COLOR.BUMPER;
                }, 200);
            }else if (pair.bodyA === ball&&pair.bodyB === bumpers[2]) {
                bumpers[2].render.fillStyle = COLOR.BUMPER_ALT;
                score+=50;
                setTimeout(function() {
                    bumpers[2].render.fillStyle = COLOR.BUMPER;
                }, 200);
            }else if (pair.bodyA === ball&&pair.bodyB === bumpers[3]) {
                score+=50;
                bumpers[3].render.fillStyle = COLOR.BUMPER_ALT;
                setTimeout(function() {
                    bumpers[3].render.fillStyle = COLOR.BUMPER;
                }, 200);
            }


            if (pair.bodyA === ball&&pair.bodyB === deadZone) {
                //round lost
                lives-=1;
                score=0;
                updateScore();
                Matter.Body.setPosition(ball, { x: 680, y: 100 });//respawns the ball x 100-900,y 100
                Matter.Body.setPosition(ball, { x: 580, y: 100 });//respawns the ball x 100-900,y 100
                Matter.Body.setVelocity(ball, { x: 0, y: 0 });//respawns the ball x 100-900,y 100
            }

            updateScore();
        }
    });

    Matter.Events.on(game.engine, 'collisionEnd', function(event) {

        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];

            if ((pair.bodyA === ball&&pair.bodyB === portal1)||(pair.bodyB === ball&&pair.bodyA === portal1)) {
                // alert("p1")
                if(right===true){
                    right=false;
                }
                else{
                    Matter.Body.setPosition(ball,{x:portal2.position.x-30, y:portal2.position.y+(ball.position.y-portal1.position.y)});
                    portal1.render.fillStyle = COLOR.BUMPER_ALT;
                    setTimeout(function() {
                        portal1.render.fillStyle = COLOR.BUMPER;
                    }, 200);
                    left=true;
                    score += 20;
                }

            }
            if ((pair.bodyA === ball&&pair.bodyB === portal2)||(pair.bodyB === ball&&pair.bodyA === portal2)) {
                // alert("p2")

                if(left===true){
                    left=false;
                }
                else{
                    Matter.Body.setPosition(ball,{x:portal1.position.x+30,  y:portal1.position.y+(ball.position.y-portal2.position.y)});
                    portal2.render.fillStyle = COLOR.BUMPER_ALT;
                    setTimeout(function() {
                        portal2.render.fillStyle = COLOR.BUMPER;
                    }, 200);
                    score+=20;
                    right=true;
                }

            }
        }

        updateScore();
    });

    setInterval(myMethod, 25);
    function myMethod( )
    {
        if(moveright){
            ballmin+=2;
        }
        if(!moveright){
            ballmin-=2;
        }
        if(ballmin>449){
            moveright=false;
        }
        if(ballmin<55){
            moveright=true;
        }
        // Matter.paddle.translate({x:400,y:100});
        // bodies.setAngularVelocity(pinball,23);
        Matter.Body.setPosition(fan,{x:ballmin+37.5,y:400});
        Matter.Body.setPosition(fanBase,{x:ballmin+37.5,y:510});

        // Body.setPosition(pinball,{x:ballmin,y:100});
    }
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
        restitution: 1.1,
        render: {
            fillStyle: '#0036f3',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });
    bumper.restitution = 1.1;
    return bumper;
}

// function ball(x, y, r) {
//     return Matter.Bodies.circle(x, y, r, {
//         density: 0.3,
//         friction: 0.008,
//         frictionAir: 0.00032,
//         restitution: 1,
//         inertia: Infinity,
//         collisionFilter: {
//             category: defaultCategory,
//             mask: defaultCategory
//         },
//         render: {
//             fillStyle: "#F35e66",
//             strokeStyle: "#000000",
//             lineWidth: 1
//         },
//         slop: 0
//     });
// }

function makeWall(x, y, w, h) {
    return Matter.Bodies.rectangle(x, y, w, h, {//this is the bottom red box
        isStatic: true, //An immovable object
        isSensor:true,
        render: {
            fillStyle: '#FF0000',
            strokeStyle: "black",
            visible: true
        }
    })
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

function updateScore() {
    if (score >= highScore) {
        highScore = score;
    }
    document.getElementById("lives").innerHTML = "Lives: "+lives;
    document.getElementById("score").innerHTML = "Score: "+score;
    document.getElementById("highScore").innerHTML = "highScore: "+highScore;
}