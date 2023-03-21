# gulp-test

ウェブ開発に関連する各種ファイルの変換を自動化して効率化するサンプルです。
gulp についての**個人的な学習の範疇**であることにご注意を。

----

## コマンド

* `npm run dev`  
  ブラウザで使用できる形式に各種ファイルを変換します。
* `npm run prod`  
  上記変換に加えて、css と js を圧縮します。
* `npm run pug`  
  pug ファイルを html に変換します。
* `npm run scss`  
  scss ファイルを css に変換します。
* `npm run ts`  
  TypeScript ファイルを JavaScript に変換します。
* `npm run vendor`  
  今回の変換対象ではないファイルをそのままコピーします。
* `npm run serve`  
  開発サーバを立ち上げ、ファイルの変更を監視し、ブラウザを自動更新します。

## gulp によって変換の行われるファイル

### HTML

pug ファイルを html に変換します。

`src/pug/***.pug` → `dist/***.html`

### CSS

scss ファイルを css に変換します。
オプションによって圧縮も行ないます。

`src/scss/***.scss` → `dist/css/***.html`

### JavaScript

TypeScript ファイルを JavaScript に変換します。
オプションによって圧縮も行ないます。

`src/ts/***.ts` → `dist/css/***.min.js`

### その他ファイル

単純にファイルをコピーします。

`src/vendor/***` → `dist/vendor/***`

## 開発サーバによるファイル変更監視について

`npm run serve` コマンドを実行すると、`http://localhost:3000` にブラウザでアクセスできるようになります。ドキュメントルートは `dist` ディレクトリです。

アクセスした状態で src ディレクトリ配下のファイルを更新すると、自動的に再コンパイルされブラウザがリロードされます。

いちいち「ブラウザを開いて、キャッシュをクリアしてリロード」をする手間が省けます。

## 今後やってみたいこと

ts, scss の構文チェックを行ない、構文エラーを通知できるようにしたい。
