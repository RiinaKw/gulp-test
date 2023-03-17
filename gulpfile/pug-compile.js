const gulp = require('gulp');
const pug = require('gulp-pug');

// その他
const debug = require('gulp-debug'); // デバッグログ
const plumber = require('gulp-plumber'); // デスクトップ通知
const notify = require('gulp-notify');

// パスの設定
const paths = require('./paths');

/**
 * pug をコンパイル
 *
 * @return {gulp}
 */
const pugCompile = () => {
  return gulp.src(paths.pug.src)
  // エラーが起きたときにデスクトップへ通知する
      .pipe(plumber(notify.onError('Error: <%= error.message %>')))
      // pug コンパイル
      .pipe(pug({
        pretty: true,
      }))
      // html を出力
      .pipe(gulp.dest(paths.pug.dist))
      // ログ出力
      .pipe(debug({title: 'pug :'}))
  ;
};
exports.default = pugCompile;
