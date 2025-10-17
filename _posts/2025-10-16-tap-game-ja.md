---
layout: post
title:  "タップで遊べるゲーム"
date:   2025-10-16 17:49:00 +0900
categories: game
lang: ja
ref: tap-game
---

シンプルなタップゲームです。画面をタップしてスコアを増やしましょう！

<div id="game-container">
  <p>スコア: <span id="score">0</span></p>
  <div id="tap-area">タップ！</div>
</div>

<style>
  #game-container {
    text-align: center;
    font-family: sans-serif;
  }
  #tap-area {
    width: 200px;
    height: 200px;
    background-color: #4CAF50;
    color: white;
    font-size: 24px;
    line-height: 200px;
    margin: 20px auto;
    cursor: pointer;
    border-radius: 50%;
    user-select: none; /* テキスト選択を防ぐ */
  }
  #tap-area:active {
    background-color: #45a049;
  }
</style>

<script>
  const scoreElement = document.getElementById('score');
  const tapArea = document.getElementById('tap-area');
  let score = 0;

  tapArea.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score;
  });
</script>