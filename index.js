const box = document.getElementById('box');
const message = document.getElementById('message');
let startTime, timeoutId;

function startGame() {
  box.style.backgroundColor = 'gray';
  box.textContent = '待って…';
  message.textContent = '';

  const delay = Math.random() * 3000 + 2000; // 2〜5秒
  timeoutId = setTimeout(() => {
    box.style.backgroundColor = 'green';
    box.textContent = '今だ！クリック！';
    startTime = Date.now();
  }, delay);
}

box.onclick = () => {
  if (box.style.backgroundColor === 'green') {
    const reactionTime = Date.now() - startTime;
    message.textContent = `反応時間: ${reactionTime} ミリ秒`;
    box.textContent = 'もう一度やる？';
    box.style.backgroundColor = 'gray';
  } else if (box.style.backgroundColor === 'gray') {
    clearTimeout(timeoutId);
    startGame();
  } else {
    clearTimeout(timeoutId);
    message.textContent = 'フライング！早すぎる！';
    box.style.backgroundColor = 'red';
    box.textContent = 'もう一度やる？';
  }
};

startGame();
