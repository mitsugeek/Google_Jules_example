---
layout: post
title:  "シューティングゲーム"
date:   2025-10-16 18:20:00 +0900
categories: game
lang: ja
ref: tap-game
---

シンプルなシューティングゲームです。左右に動いて敵を倒し、スコアを稼ぎましょう！

<div id="game-container" style="text-align: center; font-family: sans-serif;">
  <canvas id="gameCanvas" width="480" height="320" style="background-color: #333; border: 1px solid #ccc;"></canvas>
  <p>スコア: <span id="score">0</span></p>
  <p>操作方法: 矢印キーで移動、スペースキーで弾を発射</p>
</div>

<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');

  let score = 0;
  let rightPressed = false;
  let leftPressed = false;

  // Player
  const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 30,
    width: 30,
    height: 20,
    color: 'cyan',
    speed: 5
  };

  // Bullets
  const bullets = [];
  const bullet = {
    width: 5,
    height: 10,
    color: 'yellow',
    speed: 7,
    cooldown: 15, // frames
    timer: 0
  };

  // Enemies
  const enemies = [];
  const enemy = {
    width: 30,
    height: 20,
    color: 'magenta',
    speed: 2,
    spawnInterval: 60, // frames
    timer: 0
  };

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = true;
    } else if (e.key === ' ') { // Space bar
      fireBullet();
    }
  }

  function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = false;
    }
  }

  function fireBullet() {
    if (bullet.timer <= 0) {
      bullets.push({
        x: player.x + player.width / 2 - bullet.width / 2,
        y: player.y,
        width: bullet.width,
        height: bullet.height,
        color: bullet.color
      });
      bullet.timer = bullet.cooldown;
    }
  }

  function spawnEnemy() {
    if (enemy.timer <= 0) {
      enemies.push({
        x: Math.random() * (canvas.width - enemy.width),
        y: -enemy.height,
        width: enemy.width,
        height: enemy.height,
        color: enemy.color
      });
      enemy.timer = enemy.spawnInterval;
    }
  }

  function update() {
    // Move player
    if (rightPressed && player.x < canvas.width - player.width) {
      player.x += player.speed;
    }
    if (leftPressed && player.x > 0) {
      player.x -= player.speed;
    }

    // Update timers
    if (bullet.timer > 0) bullet.timer--;
    if (enemy.timer > 0) enemy.timer--;

    // Spawn enemies
    spawnEnemy();

    // Update bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.y -= bullet.speed;
      if (b.y < -b.height) {
        bullets.splice(i, 1);
      }
    }

    // Update enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      e.y += enemy.speed;
      if (e.y > canvas.height) {
        enemies.splice(i, 1);
      }
    }

    // Collision detection
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
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw bullets
    for (const b of bullets) {
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.width, b.height);
    }

    // Draw enemies
    for (const e of enemies) {
      ctx.fillStyle = e.color;
      ctx.fillRect(e.x, e.y, e.width, e.height);
    }
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
</script>