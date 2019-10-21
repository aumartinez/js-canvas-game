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
  
  //Bricks constructor
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
  
  //Lives
  let lives = 3;
  
  //Canvas redraw
  let time = 10;
  let canvasDraw = setInterval(draw, time);
  
  //Touch pad support
  addBtns();
  let touchLeft = document.getElementById("touchLeft");
  let touchRight = document.getElementById("touchRight");
    
  //Listeners  
  document.addEventListener("keydown", keyDownFn, false);
  document.addEventListener("keyup", keyUpFn, false);
  document.addEventListener("mousemove", mouseMoveFn, false);    
    
  touchLeft.addEventListener("touchstart", touchLeftDownFn, false);
  touchLeft.addEventListener("touchend", touchLeftUpFn, false);
  touchRight.addEventListener("touchstart", touchRightDownFn, false);
  touchRight.addEventListener("touchend", touchRightUpFn, false);
  
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
    drawLives();
    
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
        //Remove one life
        lives--;
        
        if (lives >= 0) {
          //Move ball to start position
          x = canvas.width / 2;
          y = canvas.height - 30;
          dy = -dy;
        }
        else {
          clearInterval(canvasDraw);
          alert("GAME OVER");
          document.location.reload();
        }
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
  
  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#8c008c";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
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
  
  function touchLeftDownFn(evt) {    
    evt.preventDefault();
    leftKey = true;
  }
  
  function touchLeftUpFn(evt) {    
    evt.preventDefault();
    leftKey = false;
  }
  
  function touchRightDownFn(evt) {
    evt.preventDefault();
    rightKey = true;
  }
  
  function touchRightUpFn(evt) {
    evt.preventDefault();
    rightKey = false;
  }
  
  function mouseMoveFn(evt) {
    let relX = evt.clientX - canvas.offsetLeft;
    
    if (relX > paddWidth && relX < canvas.width) {
      paddX = relX - paddWidth;
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
            
            if ((score / 5) == brickRows * brickColumns) {
              clearInterval(canvasDraw);
              alert("GAME CLEARED");              
              document.location.reload();
            }
        }
      }
    }
  }
  
  function addBtns() {
    let btnLeft = document.createElement("div");
    let btnRight = document.createElement("div");
    let scriptDiv = document.querySelector("body script");
    
    btnLeft.setAttribute("id", "touchLeft");
    btnRight.setAttribute("id", "touchRight");
    
    btnLeft.style.position = "absolute";
    btnLeft.style.width = "50%";
    btnLeft.style.height = "100%";
    btnLeft.style.left = "0";
    btnLeft.style.top = "0";
    btnLeft.style.zIndex = "2";
    
    btnRight.style.position = "absolute";
    btnRight.style.width = "50%";
    btnRight.style.height = "100%";
    btnRight.style.right = "0";
    btnRight.style.top = "0";
    btnRight.style.zIndex = "2";
    
    document.body.insertBefore(btnLeft, scriptDiv);
    document.body.insertBefore(btnRight, scriptDiv);
  }
}
