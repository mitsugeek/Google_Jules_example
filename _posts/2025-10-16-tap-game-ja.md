---
layout: post
title:  "シューティングゲーム"
date:   2025-10-16 18:20:00 +0900
categories: game
lang: ja
ref: tap-game
---

シンプルなシューティングゲームです。左右に動いて敵を倒し、スコアを稼ぎましょう！

<div id="game-container" style="position: relative; text-align: center; font-family: sans-serif; width: 480px; margin: auto;">
  <canvas id="gameCanvas" width="480" height="320" style="background-color: #333; border: 1px solid #ccc;"></canvas>
  <div id="game-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h2 id="message">シューティングゲーム</h2>
    <button id="start-button">ゲームスタート</button>
    <button id="restart-button" style="display: none;">もう一度遊ぶ</button>
  </div>
  <p>スコア: <span id="score">0</span></p>
  <p>操作方法: 矢印キーまたはボタンで移動、スペースキーまたはボタンで弾を発射</p>
  <div id="controls" style="margin-top: 10px; display: flex; justify-content: space-around; -webkit-user-select: none; user-select: none;">
    <button id="left-button" style="padding: 15px 30px; font-size: 18px;">←</button>
    <button id="fire-button" style="padding: 15px 30px; font-size: 18px;">発射</button>
    <button id="right-button" style="padding: 15px 30px; font-size: 18px;">→</button>
  </div>
</div>

<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');
  const gameOverlay = document.getElementById('game-overlay');
  const messageEl = document.getElementById('message');
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  const leftButton = document.getElementById('left-button');
  const rightButton = document.getElementById('right-button');
  const fireButton = document.getElementById('fire-button');

  let score = 0;
  let rightPressed = false;
  let leftPressed = false;
  let gameState = 'start'; // 'start', 'playing', 'gameOver'
  let animationFrameId;

  const player = { x: canvas.width / 2 - 15, y: canvas.height - 30, width: 30, height: 20, color: 'cyan', speed: 5 };
  const bullets = [];
  const bullet = { width: 5, height: 10, color: 'yellow', speed: 7, cooldown: 15, timer: 0 };
  const enemies = [];
  const enemy = { width: 30, height: 20, color: 'magenta', speed: 2, spawnInterval: 60, timer: 0 };

  function resetGame() {
    score = 0;
    scoreElement.textContent = score;
    player.x = canvas.width / 2 - 15;
    bullets.length = 0;
    enemies.length = 0;
    bullet.timer = 0;
    enemy.timer = 0;
    rightPressed = false;
    leftPressed = false;
  }

  function startGame() {
    resetGame();
    gameState = 'playing';
    gameOverlay.style.display = 'none';
    gameLoop();
  }

  function gameOver() {
    gameState = 'gameOver';
    cancelAnimationFrame(animationFrameId);
    messageEl.textContent = 'ゲームオーバー';
    restartButton.style.display = 'block';
    startButton.style.display = 'none';
    gameOverlay.style.display = 'flex';
  }

  // Event Listeners for controls
  document.addEventListener('keydown', e => {
    if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = true;
    else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = true;
    else if (e.key === ' ') fireBullet();
  });
  document.addEventListener('keyup', e => {
    if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = false;
    else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = false;
  });

  // Touch/Mouse controls
  leftButton.addEventListener('mousedown', () => leftPressed = true);
  leftButton.addEventListener('mouseup', () => leftPressed = false);
  leftButton.addEventListener('touchstart', (e) => { e.preventDefault(); leftPressed = true; });
  leftButton.addEventListener('touchend', () => leftPressed = false);

  rightButton.addEventListener('mousedown', () => rightPressed = true);
  rightButton.addEventListener('mouseup', () => rightPressed = false);
  rightButton.addEventListener('touchstart', (e) => { e.preventDefault(); rightPressed = true; });
  rightButton.addEventListener('touchend', () => rightPressed = false);

  fireButton.addEventListener('click', fireBullet);

  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', startGame);

  function fireBullet() {
    if (gameState !== 'playing' || bullet.timer > 0) return;
    bullets.push({ x: player.x + player.width / 2 - bullet.width / 2, y: player.y, width: bullet.width, height: bullet.height, color: bullet.color });
    bullet.timer = bullet.cooldown;
  }

  function spawnEnemy() {
    if (enemy.timer <= 0) {
      enemies.push({ x: Math.random() * (canvas.width - enemy.width), y: -enemy.height, width: enemy.width, height: enemy.height, color: enemy.color });
      enemy.timer = enemy.spawnInterval;
    }
  }

  function update() {
    if (gameState !== 'playing') return;

    if (rightPressed && player.x < canvas.width - player.width) player.x += player.speed;
    if (leftPressed && player.x > 0) player.x -= player.speed;

    if (bullet.timer > 0) bullet.timer--;
    if (enemy.timer > 0) enemy.timer--;

    spawnEnemy();

    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.y -= bullet.speed;
      if (b.y < -b.height) bullets.splice(i, 1);
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      e.y += enemy.speed;
      if (e.y > canvas.height) {
        enemies.splice(i, 1);
        gameOver();
        return;
      }
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        const b = bullets[i];
        const e = enemies[j];
        if (b && e && b.x < e.x + e.width && b.x + b.width > e.x && b.y < e.y + e.height && b.y + b.height > e.y) {
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          score += 10;
          scoreElement.textContent = score;
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    for (const b of bullets) {
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.width, b.height);
    }
    for (const e of enemies) {
      ctx.fillStyle = e.color;
      ctx.fillRect(e.x, e.y, e.width, e.height);
    }
  }

  function gameLoop() {
    update();
    draw();
    if (gameState === 'playing') {
      animationFrameId = requestAnimationFrame(gameLoop);
    }
  }

  // Initial draw
  draw();
</script>