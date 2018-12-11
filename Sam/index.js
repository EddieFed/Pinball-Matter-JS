
window.addEventListener('load', function() {
    var boolea = false;
    var left =false;
    var right = false;
    var myCanvas = document.getElementById('world');
var engine = Matter.Engine.create();
var world = engine.world;
 var   Body = Matter.Body;
//var star = Vertices.fromPath('50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38');
var render = Matter.Render.create({
    canvas: myCanvas,
    engine: engine,
    options: {
        width: 500,
        height: 500,
        background: '#888888',
        wireframes: false,
        showAngleIndicator: true
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

var ball = Matter.Bodies.circle(300, 100, 20, {
    mass: 1,
    friction: .1,
    frictionAir: 0.001,
    restitution: .7,
    inertia:0,
    render: {
        fillStyle: '#F35e66',
        strokeStyle: 'black',
        lineWidth: 1
    }
});






    var floor = Matter.Bodies.rectangle(250, 495, 700, 10, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'black',
            visible: true
        }
    });
    var wall1 = Matter.Bodies.rectangle(5, 200, 10, 400, {
        isStatic: true,
        render: {
            fillStyle: '#000000',
            strokeStyle: 'black',
            visible: true
        }
    });
    var wall2 = Matter.Bodies.rectangle(495, 200, 10, 400, {
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

    var p1 = Matter.Bodies.rectangle(5, 450, 10, 100, {
        isStatic: true,
        isSensor:true,
        render: {
            fillStyle: '#0000FF',
            strokeStyle: 'black',
            visible: true
        }
    });
    var p2 = Matter.Bodies.rectangle(495, 450, 10, 100, {
        isStatic: true,
        isSensor:true,
        render: {
            fillStyle: '#0000FF',
            strokeStyle: 'black',
            visible: true
        }
    });

    var test = Matter.Bodies.rectangle(200, 440, 100, 100, {
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

            if (pair.bodyA === ball&&pair.bodyB === test) {//checks what objects collided
              boolea=true;
            } else if (pair.bodyB === ball&&pair.bodyA === test) {//check reverse

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

            else if ((pair.bodyA === ball&&pair.bodyB === p1)||(pair.bodyB === ball&&pair.bodyA === p1)) {
                if(right===true){
                    right=false;
                }
                else{
                    Body.setPosition(ball,{x:p2.position.x+30, y:p2.position.y+(ball.position.y-p1.position.y)});
                    left=true;
                }

            }
            if ((pair.bodyA === ball&&pair.bodyB === p2)||(pair.bodyB === ball&&pair.bodyA === p2)) {
                if(left===true){
                    left=false;
                }
                else{
                    Body.setPosition(ball,{x:p1.position.x-30,  y:p1.position.y+(ball.position.y-p2.position.y)});
                    right=true;
                }

            }



            }
    });
   // Event.on(test,'collisionEnd',function(event) {});



Matter.World.add(world, test);
    Matter.World.add(world, ball);

    Matter.World.add(world, p1);
    Matter.World.add(world, p2);


    Matter.World.add(world, wall1);
    Matter.World.add(world, top);
    Matter.World.add(world, wall2);
    Matter.World.add(world, floor);

Matter.Engine.run(engine);
Matter.Render.run(render);
//https://blog.alexandergottlieb.com/matter-js-the-missing-tutorial-70aafc06b167//basics
//https://codepen.io/lonekorean/pen/KXLrVX// pinball example
//https://github.com/liabru/matter-js/blob/master/examples/concave.js//concave poly
    Matter.Events.on(engine, 'afterUpdate', function(event) {// after each update of the engine

        if(boolea===true){//only on when ball is in the green square
            Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: -0.001, y: -.000});//left force

        }
    });


});
