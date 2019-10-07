//JS

window.addEventListener("load", run, false);

function run() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = 2;
  let dy = -2;
  
  setInterval(draw, 10);
  
  function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
  }
  
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#8c008c";
    ctx.fill();
    ctx.closePath();
  }
}

