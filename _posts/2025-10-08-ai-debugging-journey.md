---
layout: post
title:  "AIアシスタントJulesと挑む！Jekyll + GitHub Pagesのデプロイ問題を完全解決した道のり"
date:   2025-10-08 17:00:00 +0900
categories: tech ai jekyll github
lang: ja
ref: ai_debugging_journey
---
# AIアシスタントJulesと挑む！Jekyll + GitHub Pagesのデプロイ問題を完全解決した道のり

「Jekyllで多言語ブログを作って、GitHub Pagesで公開するぞ！」――そんな思いつきから始まったこのプロジェクト。しかし、現実は甘くありませんでした。GitHub Actionsのワークフローは次々とエラーを吐き、やっとデプロイできたと思ったら表示はぐちゃぐちゃ。そんな絶望の淵で、私はAIソフトウェアエンジニアの「Jules」に助けを求めることにしました。これは、AIとのペアプログラミングで数々の問題を乗り越え、ブログを完全に機能させるまでの奮闘の記録です。

## 遭遇した3つの壁と、Julesによる解決策

### 1. ソースコードがそのままデプロイされる問題
最初に直面したのは、公開用の`gh-pages`ブランチに、ビルドされた静的サイトではなく、Jekyllのソースコードがそのままデプロイされてしまう問題でした。

*   **Julesの診断:** ワークフローのデプロイステップが、どのディレクトリを公開すべきか正しく認識していない。
*   **解決策:** `.github/workflows/main.yml`のデプロイアクションに`publish_dir: ./_site`を追加。これにより、Jekyllのビルド成果物である`_site`ディレクトリのみをデプロイ対象として明示しました。さらに、`force_orphan: true`も追加し、毎回クリーンな状態でデプロイすることで、古いファイルが残るのを防ぎました。

### 2. 謎の権限エラー（403 Forbidden）
次に、ワークフローが`Permission denied`エラーで失敗。`gh-pages`ブランチへの書き込みが拒否されていました。

*   **Julesの診断:** 近年のGitHubのセキュリティ強化により、ワークフローに与えられるデフォルトの`GITHUB_TOKEN`の権限が「読み取り専用」になっている。
*   **解決策:** ワークフローファイルに`permissions: contents: write`という設定をトップレベルで追加。これにより、ワークフローがリポジトリに書き込む権限を明示的に与え、問題を解決しました。

### 3. 表示崩れとリンク切れ地獄
ついにデプロイは成功！しかし、公開されたサイトはCSSもJavaScriptも効かず、リンクはすべて切れているという無残な姿でした。

*   **Julesの診断:** サイトが `https://<ユーザー名>.github.io/<リポジトリ名>/` というサブディレクトリで公開されているにもかかわらず、CSSやリンクのパスがルートディレクトリ（`/`）を基準に生成されている。
*   **解決策:** `_config.yml`に`baseurl`と`url`を正しく設定。`baseurl`にはリポジトリ名（例: `/Google_Jules_example`）、`url`にはホスト名（例: `https://mitsugeek.github.io`）を指定しました。これにより、Jekyllがすべてのパスを正しく生成し、サイトはついに完全な姿を取り戻しました。

## AIとのペアプログラミングを終えて
Julesとの対話は、まさに未来のソフトウェア開発でした。エラーログを渡すと即座に原因を特定し、的確な修正案を提示してくれます。時には、私の作業ミスで古い修正を上書きしてしまう「先祖返り」も発生しましたが、その状況を説明すると、冷静に原因を分析し、すべての問題を統合した最終的な解決策を導き出してくれました。

AIは単なるコード生成機ではありません。複雑な問題の文脈を理解し、対話を通じて解決に導いてくれる、頼れる「相棒」でした。

## 最終的な設定ファイル
これからJekyllブログを始める方のために、最終的に完成した設定ファイルを共有します。

#### `_config.yml`
```yaml
# ...（略）...
baseurl: "/Google_Jules_example" # a.k.a Repository name
url: "https://mitsugeek.github.io" # a.k.a GitHub Pages host
# ...（略）...
```

#### `.github/workflows/main.yml`
```yaml
name: Build and Deploy Jekyll Site

on:
  push:
    branches:
      - main

# Grant write permission to the workflow
permissions:
  contents: write

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true # Automatically runs bundle install

      - name: Build the site
        run: bundle exec jekyll build

      - name: Verify Build Output
        run: ls -R ./_site

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
          force_orphan: true
```

## まとめ
もしあなたが開発で壁にぶつかったなら、AIアシスタントに相談してみることを強くお勧めします。きっと、あなたの開発体験をよりスムーズで楽しいものに変えてくれるはずです。