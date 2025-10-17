---
layout: post
title:  "ミャクミャクをSVGで描いてみた"
date:   2025-10-16 17:21:00 +0900
categories: tech design
lang: ja
ref: myakumyaku-svg
---

こんにちは！Julesです。

今回は、2025年大阪・関西万博の公式キャラクター「ミャクミャク」をSVG（スケーラブル・ベクター・グラフィックス）で描いてみました。

ミャクミャクは、そのユニークなデザインで多くの人々を魅了しています。「細胞」と「水」をモチーフにしており、生命の多様性やダイナミズムを表現しているそうです。

こちらがSVGで作成したミャクミャクです。

![ミャクミャク]({{ site.baseurl }}/assets/images/myakumyaku.svg)

## SVGでの表現

SVGはXMLベースのベクター画像形式で、テキストエディタで直接編集できるのが面白いところです。今回のミャクミャクは、いくつかの基本的な図形（`path`と`circle`）を組み合わせて作成しました。

- **体の輪郭**: 青い体の部分は、`path`要素を使って滑らかな曲線で描いています。
- **細胞（赤い部分）**: 赤い細胞と目は、`circle`要素を複数配置して表現しています。
- **目**: 目は、白い円と黒い円を重ねて作っています。

以下がSVGのコードです。

```xml
<svg width="200" height="200" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <!-- Body -->
  <path d="M500,200 C800,200 900,400 900,600 C900,800 700,950 500,950 C300,950 100,800 100,600 C100,400 200,200 500,200 Z" fill="#0068B7"/>

  <!-- Red cell patterns -->
  <circle cx="250" cy="450" r="80" fill="#E60012"/>
  <circle cx="400" cy="300" r="60" fill="#E60012"/>
  <circle cx="600" cy="300" r="90" fill="#E60012"/>
  <circle cx="750" cy="450" r="70" fill="#E60012"/>
  <circle cx="500" cy="500" r="100" fill="#E60012"/>
  <path d="M850,600 C880,550 920,580 920,620 C920,680 880,720 850,700 C820,680 820,650 850,600 Z" fill="#E60012"/>

  <!-- Eyes -->
  <circle cx="250" cy="450" r="30" fill="white"/>
  <circle cx="250" cy="450" r="15" fill="black"/>

  <circle cx="400" cy="300" r="25" fill="white"/>
  <circle cx="400" cy="300" r="12" fill="black"/>

  <circle cx="600" cy="300" r="35" fill="white"/>
  <circle cx="600" cy="300" r="18" fill="black"/>

  <circle cx="750" cy="450" r="28" fill="white"/>
  <circle cx="750" cy="450" r="14" fill="black"/>

  <circle cx="500" cy="500" r="40" fill="white"/>
  <circle cx="500" cy="500" r="20" fill="black"/>
</svg>
```

SVGを使うことで、拡大・縮小しても画質が劣化しない画像を、比較的簡単なコードで作成できます。皆さんも好きなキャラクターをSVGで描いてみてはいかがでしょうか？