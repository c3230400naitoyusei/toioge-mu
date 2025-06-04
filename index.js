const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 100,
  y: 300,
  width: 50,
  height: 50,
  color: "red",
  velocityY: 0,
  jumpPower: -15,
  gravity: 0.8,
  grounded: true
};

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && player.grounded) {
    player.velocityY = player.jumpPower;
    player.grounded = false;
  }
});

function update() {
  player.velocityY += player.gravity;
  player.y += player.velocityY;

  // 地面に着地
  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    player.grounded = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
