
window.addEventListener('load', function() {
    var boolea = false;
    var myCanvas = document.getElementById('world');
var engine = Matter.Engine.create();
var world = engine.world;

var render = Matter.Render.create({
    canvas: myCanvas,
    engine: engine,
    options: {
        width: 500,
        height: 500,
        background: '#888888',
        wireframes: false,
        showAngleIndicator: false
    }
});

    var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
        element: myCanvas,
        constraint: {
            render: {
                visible: false
            },
            stiffness:0.8
        }
    });
    Matter.World.add(world, mouseConstraint);

var ball = Matter.Bodies.circle(100, 100, 40, {
    mass: 1,
    friction: .04,
    frictionAir: 0.00001,
    restitution: .7,
    inertia:0,
    render: {
        fillStyle: '#F35e66',
        strokeStyle: 'black',
        lineWidth: 1
    }
});
    // var bumper = Matter.Bodies.circle(440, 440, 40, {
    //     isStatic: true,
    //
    //     friction: 1,
    //     frictionAir: 0.00001,
    //     restitution: 1.5,
    //     render: {
    //         fillStyle: '#00FF00',
    //         strokeStyle: 'black',
    //         lineWidth: 1
    //     }
    // });
    var donthitball = 0x0001;
    var hitball = 0x0004;





    var floor = Matter.Bodies.rectangle(250, 495, 500, 10, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'black',
            visible: true
        }
    });
    var wall1 = Matter.Bodies.rectangle(5, 0, 10, 1000, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'black',
            visible: true
        }
    });
    var wall2 = Matter.Bodies.rectangle(495, 250, 10, 500, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'black',
            visible: true
        }
    });
    var top = Matter.Bodies.rectangle(250, 5, 500, 10, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'black',
            visible: true
        }
    });
    var test = Matter.Bodies.rectangle(60, 440, 100, 100, {
        isStatic: true,
        isSensor:true,
        render: {
            fillStyle: '#00FF00',
            strokeStyle: 'black',
            visible: true
        }
    });



    Matter.Events.on(engine, 'collisionStart', function(event) {

        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];

            if (pair.bodyA === ball&&pair.bodyB === test) {
              boolea=true;
            } else if (pair.bodyB === ball&&pair.bodyA === test) {

                boolea=true;
            }
        }
    });
    Matter.Events.on(engine, 'collisionEnd', function(event) {

        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];

            if (pair.bodyA === ball&&pair.bodyB === test) {

                boolea=false;
            } else if (pair.bodyB === ball&&pair.bodyA === test) {

                boolea=false;
            }
        }
    });
   // Event.on(test,'collisionEnd',function(event) {});





    Matter.World.add(world, test);

    Matter.World.add(world, wall1);
    Matter.World.add(world, top);
    Matter.World.add(world, wall2);
    Matter.World.add(world, floor);
Matter.World.add(world, ball);
Matter.Engine.run(engine);
Matter.Render.run(render);
//https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167
//https://codepen.io/lonekorean/pen/KXLrVX

    Matter.Events.on(engine, 'afterUpdate', function(event) {

        if(boolea==true){

            Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 0, y: -1});

        }
    });


});
