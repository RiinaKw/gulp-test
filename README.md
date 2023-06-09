# gulp-test

ウェブ開発に関連する各種ファイルの変換を自動化して効率化するサンプルです。
gulp についての**個人的な学習の範疇**であることにご注意を。

----

## コマンド

* `npm run pug`  
  pug ファイルを html に変換します。
* `npm run scss`  
  scss ファイルを css に変換します。
* `npm run ts`  
  TypeScript ファイルを JavaScript に変換します。
* `npm run vendor`  
  今回の変換対象ではないファイルをそのままコピーします。
* `npm run dev`  
  上記4つの変換を同時に行ないます。
* `npm run prod`  
  上記変換にさらに加えて、css と js を圧縮します。
* `npm run serve`  
  開発サーバを立ち上げ、ファイルの変更を監視し、ブラウザを自動更新します。

## gulp によって変換の行われるファイル

### HTML

pug ファイルを html にコンパイルします。

`src/pug/***.pug` → `dist/***.html`

### CSS

scss ファイルを css にコンパイルします。
オプションによって圧縮も行ないます。

`src/scss/***.scss` → `dist/css/***.html`

### JavaScript

TypeScript ファイルを JavaScript にコンパイルします。
オプションによって圧縮も行ないます。

`src/ts/***.ts` → `dist/css/***.min.js`

### その他ファイル

単純にファイルをコピーします。

`src/vendor/***` → `dist/vendor/***`

## サンプルとして使用したファイルの簡単な説明

### `src/pug/index.pug`

pug 形式で記述された簡単な HTML レイアウトです。
クラス名の規則には BEM を採用しています。

### `src/scss/index.scss`

なんとなくそれっぽい表示レイアウトにします。
480px, 768px, 1200px, 1500px にブレークポイントがあり、レスポンシブに対応しています。

### `src/ts/console.ts`

ブラウザの右下に簡易的なデバッグコンソールを表示します。
画面の幅・高さ・現在適用されているメディアクエリが表示されます。

## 開発サーバによるファイル変更監視について

`npm run serve` コマンドを実行すると、`http://localhost:3000` にブラウザでアクセスできるようになります。ドキュメントルートは `dist` ディレクトリです。

アクセスした状態で `src` ディレクトリ配下のファイルを更新すると、自動的に再コンパイルされブラウザがリロードされます。

いちいち「ブラウザを開いて、キャッシュをクリアしてリロード」をする手間が省けます。

変更のあったファイル単位ではなく、pug / scss / ts / vendor の各ディレクトリ単位で再変換するので、プロジェクトが大きくなるとレスポンスが遅くなる可能性があります。

## 今後やってみたいこと

ts, scss の構文チェックを行ない、構文エラーを通知できるようにしたい。
