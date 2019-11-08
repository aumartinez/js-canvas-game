//JS Script

window.addEventListener("load", run, false);

function run() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  
  //Start position  
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  
  //Displacement  
  let dx = 3;
  let dy = 3;
  
  let movX = 5;
  let movY = 5;
  
  //Ball
  let ballRad = 8;
  let ballHit = false;
  
  //User paddle  
  let paddW = 10;
  let paddH = 50;
  
  let paddHit = false;
  
  let userX = 0;
  let userY = (canvas.height / 2) - (paddH / 2);
  
  //PC paddle  
  let pcX = canvas.width - paddW;
  let pcY = userY;
  
  //Paddle movement controls init
  let upKey = false;
  let downKey = false;
  
  //Listeners
  document.addEventListener("keydown", keyDownFn, false);
  document.addEventListener("keyup", keyUpFn, false);
  
  //Canvas redraw
  let time = 10;
  let canvasDraw = setInterval(draw, time);
  
  function draw() {
    
    //Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //Move ball - ball limits    
    x += dx;
    y += dy;
    
    if (x + dx > canvas.width - ballRad || x + dx < ballRad) {
      dx = -dx;
    }
    if (y + dy < ballRad) {
      dy = -dy;
    }
    else if (y + dy > canvas.height - ballRad) {
      dy = -dy;
    }
    
    //User Paddle movement
    if (upKey && (userY) > 0) {
      userY -= movY;
    }
    else if (downKey && userY < (canvas.height - paddH)) {
      userY += movX;
    }
    
    //PC paddle movement
    if (dy < 0 && pcY > 0) {
      pcY -= 2;
    }
    else if (dy > 0 && pcY < (canvas.height - paddH)) {
      pcY += 2;
    }
    
    //Draw objects
    drawBall(ballHit);
    drawPadd(userX, userY, paddW, paddH, paddHit);
    drawPadd(pcX, pcY, paddW, paddH, paddHit);
    collDetection(x, y, userX, userY);
  
  }//End draw
  
  function drawBall(ballHit) {
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0 * Math.PI, 2 * Math.PI);
    if (ballHit) {
      ctx.fillStyle = "red";
    }
    else {
      ctx.fillStyle = "#000";
    }
    ctx.fill();
    ctx.closePath();
  }
  
  function drawPadd(paddX, paddY, paddW, paddH, paddHit) {
    ctx.beginPath();
    ctx.rect(paddX, paddY, paddW, paddH);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
  }
  
  function keyDownFn(evt) {
    switch (evt.keyCode) {
      case 38: //up arrow
      upKey = true;
      break;
      
      case 40: //down arrow
      downKey = true;
      break;
      
      default:
      return false;
    }
  }
  
  function keyUpFn(evt) {
    switch (evt.keyCode) {
      case 38: //up arrow
      upKey = false;
      break;
      
      case 40: //down arrow
      downKey = false;
      break;
      
      default:
      return false;
    }
  }
  
  function collDetection(ballX, ballY, paddX, paddY) {
        
    console.log(paddX, paddY);
    
  
    if (ballX < limitX) {
      if (ballY < limitYTop && ballY > limitYBott) {
        console.log("hit");
      }
    }
    else {
      ballHit = false;
    }
    
    return;
  }
  
} //End run
