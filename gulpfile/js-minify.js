const gulp = require('gulp');
const ts = require('gulp-typescript'); // TypeScript
const eslint = require('gulp-eslint'); // 構文チェック
const uglify = require('gulp-uglify'); // js の圧縮
const rename = require('gulp-rename'); // ファイルのリネーム

// その他
const gulpif = require('gulp-if'); // 条件分岐を簡単にしてくれるやつ
const debug = require('gulp-debug'); // デバッグログ
const plumber = require('gulp-plumber'); // デスクトップ通知
const notify = require('gulp-notify');

// パスの設定
const paths = require('./paths');

// コマンドの引数
const arguments = require('./arguments');

/**
 * js を圧縮
 *
 * @return {gulp}
 */
const jsMinify = () => {
  return gulp.src(paths.js.src)
      // エラーが起きたときにデスクトップへ通知する
      .pipe(plumber(notify.onError('Error: <%= error.message %>')))
      .pipe(eslint({useEslintrc: true}))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      // TypeScript をコンパイル
      .pipe(ts({
        esModuleInterop: true,
        module: 'es2015',
      }))
      // 本番環境の場合は圧縮
      .pipe(gulpif(
          arguments.env === 'production',
          uglify(),
      ))
      // ***.min.js にリネーム
      .pipe(rename({
        extname: '.min.js',
      }))
      // js を出力
      .pipe(gulp.dest(paths.js.dist))
      // ログ出力
      .pipe(debug({title: 'js :'}))
  ;
};
module.exports = jsMinify;
