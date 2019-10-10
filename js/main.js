//JS

window.addEventListener("load", run, false);

function run() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  
  //Start position
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  
  //Displacement differential
  let dx = 2;
  let dy = -2;
  
  //Ball  
  let ballRad = 8;
  
  //Paddle
  let paddHeight = 10;
  let paddWidth = 75;
  let paddX = (canvas.width - paddWidth) / 2;
  
  //Bricks
  let brickRows = 3;
  let brickColumns = 5;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;
  
  let bricks = [];
  
  for (let col = 0; col < brickColumns; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRows; row++) {
      bricks[col][row] = {
        x : 0,
        y : 0,
        status : 1
      };
    }    
  }
  
  //Controls
  let rightKey = false;
  let leftKey = false;
  
  //Score
  
  let score = 0;
  
  //Canvas redraw
  let time = 10;
  let canvasDraw = setInterval(draw, time);
  
  //Listeners  
  document.addEventListener("keydown", keyDownFn, false);
  document.addEventListener("keyup", keyUpFn, false);
  
  //Functions  
  function draw() {
    //Clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    //Draw objects
    drawBall();
    drawPadd();
    drawBricks();  
    collDetection();
    drawScore();
    
    //Ball boundaries
    if (x + dx > canvas.width - ballRad || x + dx < ballRad) {
      dx = -dx;
    }
    if (y + dy < ballRad) {
      dy = -dy;
    }
    else if (y + dy > canvas.height - ballRad) {
      if (x > paddX && x < paddX + paddWidth) {
        dy = -dy;
      }
      else {
        alert("GAME OVER");
        document.location.reload();
      }
    }
    
    //Paddle movement
    if (rightKey && paddX < canvas.width - paddWidth) {
      paddX += 7;      
    }
    else if (leftKey && paddX > 0) {
      paddX -= 7;      
    }
    
    //Ball Displacement :: movement
    x += dx;
    y += dy;
  }
  
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = "#8c008c";
    ctx.fill();
    ctx.closePath();
  }
  
  function drawPadd() {
    ctx.beginPath();
    ctx.rect(paddX, canvas.height - paddHeight, paddWidth, paddHeight);
    ctx.fillStyle = "#8c008c";
    ctx.fill();
    ctx.closePath();
  }
  
  function drawBricks() {
    for (let col = 0; col < brickColumns; col++) {
      for (let row = 0; row < brickRows; row++) {
        if (bricks[col][row].status == 1) {
          let brickX = (col * (brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
        
          bricks[col][row].x = brickX;
          bricks[col][row].y = brickY;
          
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#8c008c";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
  
  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#8c008c";
    ctx.fillText("Score: " + score, 8, 20);
  }
  
  function keyDownFn(evt) {
    switch (evt.keyCode) {
      case 39: //Right key
      rightKey = true;
      break;
      
      case 37: //Left key
      leftKey = true;
      break;
      
      default:
      return false;
    }
  }
  
  function keyUpFn(evt) {
    switch (evt.keyCode) {
      case 39: //Right key
      rightKey = false;
      break;
      
      case 37: //Left key
      leftKey = false;
      break;
      
      default:
      return false;
    }
  }
    
  function collDetection() {    
    for (let col = 0; col < brickColumns; col++) {
      for (let row = 0; row < brickRows; row++) {
        let b = bricks[col][row];
        
        //Brick is hit and removed
        if (b.status == 1 && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
            dy = -dy;
            b.status = 0;
            score += 5;
            
            if ((score / 5) == brickRow * brickColumns) {
              alert("GAME CLEARED");
              document.location.reload();
            }
        }
      }
    }
  }
}
