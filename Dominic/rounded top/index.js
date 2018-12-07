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

        // Matter.js setup
    engine = Matter.Engine.create();
    world = engine.world;
    world.bounds = {
        min: { x: 0, y: 0},
        max: { x: 1000, y: 800 }
    };

    var ball = Matter.Bodies.polygon(900, 100, 1, 25, {//this is the pinball
        density: 0.94,
        friction: .04,
        frictionAir: 0.00001,
        restitution: .7,
        render: {
            fillStyle: '#F35e66',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });
    Matter.World.add(world, ball);

    var wall = Matter.Bodies.rectangle(500, 825, 250, 50, {//this is the bottom red box
        isStatic: true, //An immovable object
        isSensor:true,
        render: {
            fillStyle: '#FF0000',
            strokeStyle: "black",
            visible: true
        }
    });
    Matter.World.add(world, wall);

    var wall2 = Matter.Bodies.rectangle(400, 800, 50, 125, {//this is the left red box
        isStatic: true, //An immovable object
        isSensor:true,
        render: {
            fillStyle: '#FF0000',
            strokeStyle: "black",
            visible: true
        }
    });
    Matter.World.add(world, wall2);

    var wall3 = Matter.Bodies.rectangle(600, 800, 50, 125, {//this is the right red box
        isStatic: true, //An immovable object
        isSensor:true,
        render: {
            fillStyle: '#FF0000',
            strokeStyle: "black",
            visible: true
        }
    });
    Matter.World.add(world, wall3);


    mouseConstraint = Matter.MouseConstraint.create(engine, {
        element: c,
        constraint: {
            render: {
                fillStyle: '#FF0000',
                strokeStyle: "black",
                visible: true
            },
            stiffness:0.8
        }
    });
    Matter.World.add(world, mouseConstraint);


    // Add all bodies to the world
    Matter.World.add(world, [
        staticBox2(500, 780, 50, 50, "#000000"),//right slide
        staticBox3(100, 500, 1000, 50, "#000000", 1.03),//left slide
        staticBox3(198, 900, 450, 350, "#000000", 0),//left small box
        staticBox3(802, 900, 450, 350, "#000000", 0),//right small box


        // Window edges (top, bottom, left, right)
        border(500, -5, 1000, 100),//top
        border(500, 852, 1000, 100),//bottom
        border(-25, 400, 100, 800),//left
        border(1025, 400, 100, 800),//right
        //for the rounded top
        border(0,100,1,10),
        border(5,95,1,10),
        border(10,90,1,10),
        border(15,85,1,10),
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

    Matter.Events.on(engine, 'collisionStart', function(event) {
        var pairs = event.pairs;
        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];
            if (pair.bodyA === ball && pair.bodyB === wall) {
                Matter.Body.setPosition(ball, { x: Math.random()*800+100, y: 100 });//respawns the ball x 100-900,y 100
            } else if (pair.bodyA === ball && pair.bodyB === wall2) {
                Matter.Body.setPosition(ball, { x: Math.random()*800+100, y: 100 });
            } else if (pair.bodyA === ball && pair.bodyB === wall3) {
                Matter.Body.setPosition(ball, { x: Math.random()*800+100, y: 100 });
            }
        }
    });

    window.addEventListener('keyup', function (event) {
        if (event.defaultPrevented) {
            return;
        }

        var key = event.key || event.keyCode;

        if (key === "ArrowRight") {// if clicked left arrow

        }
        else if (key === "ArrowLeft") {//if clicked right arrow

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
            strokeStyle: "black",
            lineWidth: 1
        }
    });
}

function staticBox2(x, y, width, height, colorHex) {
    return Matter.Bodies.rectangle(900, 500, 1000, height, {
        isStatic: true,
        angle: 2.11,
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
