//JS

window.addEventListener("load", run, false);

function run() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  
  //Start position
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  
  console.log(canvas.width);
  console.log(canvas.height);
  
  //Displacement differential
  let dx = 2;
  let dy = -2;
  
  let ballRad = 8;
  
  let canvasDraw = setInterval(draw, 10);
  
  function draw() {
    //Clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    //Draw ball
    drawBall();
    
    //Displacement :: movement
    x += dx;
    y += dy;
    
    if (x + dx > canvas.width - ballRad || x + dx < ballRad) {
      dx = -dx;
    }
    if (y + dy > canvas.height - ballRad || y + dy < ballRad) {
      dy = -dy;
    }    
  }
  
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0, Math.PI*2);
    ctx.fillStyle = "#8c008c";
    ctx.fill();
    ctx.closePath();
  }
}
