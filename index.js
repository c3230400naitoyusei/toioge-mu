const moles = document.querySelectorAll('.mole');
const scoreBoard = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
let score = 0;
let gameInterval;
let gameTime = 15000;

function showRandomMole() {
  moles.forEach(m => m.classList.remove('show'));
  const i = Math.floor(Math.random() * moles.length);
  const mole = moles[i];
  mole.classList.add('show');

  mole.onclick = () => {
    if (mole.classList.contains('show')) {
      score++;
      scoreBoard.textContent = `スコア: ${score}`;
      mole.classList.remove('show');
    }
  };
}

function startGame() {
  score = 0;
  scoreBoard.textContent = 'スコア: 0';
  gameInterval = setInterval(showRandomMole, 700);

  setTimeout(() => {
    clearInterval(gameInterval);
    moles.forEach(m => m.classList.remove('show'));
    alert(`終了！スコア: ${score}`);
  }, gameTime);
}

startBtn.onclick = startGame;
