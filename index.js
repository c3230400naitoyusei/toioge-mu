const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let dx = 1;
let dy = 0;

let food = { x: 5, y: 5 };
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  switch (e.key) {
    case "ArrowUp":
      if (dy === 0) { dx = 0; dy = -1; }
      break;
    case "ArrowDown":
      if (dy === 0) { dx = 0; dy = 1; }
      break;
    case "ArrowLeft":
      if (dx === 0) { dx = -1; dy = 0; }
      break;
    case "ArrowRight":
      if (dx === 0) { dx = 1; dy = 0; }
      break;
  }
}

function gameLoop() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // 衝突判定（壁）
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return gameOver();
  }

  // 衝突判定（自分自身）
  for (let part of snake) {
    if (head.x === part.x && head.y === part.y) return gameOver();
  }

  snake.unshift(head);

  // 食べ物を食べたらスコア加算
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = `スコア: ${score}`;
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop();
  }

  drawGame();
  setTimeout(gameLoop, 100);
}

function drawGame() {
  // 背景を塗る
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // スネークを描く
  ctx.fillStyle = "lime";
  for (let part of snake) {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  }

  // 食べ物を描く
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function gameOver() {
  alert(`ゲームオーバー！スコア: ${score}`);
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
  score = 0;
  document.getElementById("score").textContent = "スコア: 0";
  food = { x: 5, y: 5 };
  setTimeout(gameLoop, 1000);
}

gameLoop();
