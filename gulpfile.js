const gulp = require('gulp');

// pug
const pug = require('gulp-pug');

// sass
const sass = require('gulp-sass')(require('sass')); // sass コンパイラ
const sourcemaps = require('gulp-sourcemaps'); // ***.css.map
const autoprefixer = require('gulp-autoprefixer'); // ベンダープレフィックス

// js
const ts = require('gulp-typescript'); // TypeScript
const eslint = require('gulp-eslint'); // 構文チェック
const uglify = require('gulp-uglify'); // js の圧縮
const rename = require('gulp-rename'); // ファイルのリネーム

// 開発サーバ
const browserSync = require('browser-sync');

// その他
const gulpif = require('gulp-if'); // 条件分岐を簡単にしてくれるやつ
const debug = require('gulp-debug'); // デバッグログ
const plumber = require('gulp-plumber'); // デスクトップ通知
const notify = require('gulp-notify');

// パスの設定
const paths = require('./gulpfile/paths');

// 引数の読み込み
const arguments = require('./gulpfile/arguments').default;

console.log('\x1b[36m');
console.log('****************');
console.log('*');
console.info(`* mode : ${arguments.env}`);
console.log('*');
console.log('****************');
console.log('\x1b[0m');

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

/**
 * scss をコンパイル
 *
 * @return {gulp}
 */
const scssCompile = () => {
  return gulp.src(paths.scss.src)
      // エラーが起きたときにデスクトップへ通知する
      .pipe(plumber(notify.onError('Error: <%= error.message %>')))
      // ***.css.map の準備
      .pipe(sourcemaps.init())
      // 本番環境の場合はコンパイル後に圧縮
      .pipe(gulpif(
          arguments.env === 'production',
          sass.sync({
            outputStyle: 'compressed',
          }),
      ))
      // 開発環境の場合はコンパイルだけ
      .pipe(gulpif(
          arguments.env === 'development',
          sass.sync({
            outputStyle: 'expanded',
          }),
      ))
      // ベンダープレフィックス
      .pipe(autoprefixer())
      // ***.css.map を出力
      .pipe(sourcemaps.write('./maps'))
      // css を出力
      .pipe(gulp.dest(paths.scss.dist))
      // ログ出力
      .pipe(debug({title: 'scss :'}))
  ;
};

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

exports.pug = pugCompile;
exports.scss = scssCompile;
exports.js = jsMinify;

exports.serve = () => {
  browserSync.init({
    open: false,
    startPath: '',
    reloadDelay: 100,
    once: true,
    notify: true,
    ghostMode: false,
    server: {
      baseDir: 'dist/',
    },
  });

  gulp.watch(paths.src.pug, {usePolling: true})
      .on('change', gulp.series(
          pugCompile,
          () => {
            browserSync.reload();
          },
      ));
  gulp.watch(paths.src.scss, {usePolling: true})
      .on('change', gulp.series(
          scssCompile,
          () => {
            browserSync.reload();
          },
      ));
  gulp.watch(paths.src.js, {usePolling: true})
      .on('change', gulp.series(
          jsMinify,
          () => {
            browserSync.reload();
          },
      ));
};

exports.default = gulp.parallel(pugCompile, scssCompile, jsMinify);
