const gulp = require('gulp');

// 開発サーバ
const browserSync = require('browser-sync');

// パスの設定
const paths = require('./gulpfile/paths');

// 引数の読み込み
const arguments = require('./gulpfile/arguments');

// 動作している環境変数を表示
console.log('\x1b[36m');
console.log('****************');
console.log('*');
console.info(`* mode : ${arguments.env}`);
console.log('*');
console.log('****************');
console.log('\x1b[0m');

// 4つのメインコマンド
const pugCompile = require('./gulpfile/pug-compile');
const scssCompile = require('./gulpfile/scss-compile');
const tsCompile = require('./gulpfile/typescript-compile');
const vendorCopy = require('./gulpfile/vendor-copy');

exports.pug = pugCompile;
exports.scss = scssCompile;
exports.ts = tsCompile;
exports.vendor = vendorCopy;

// ファイル更新を監視してブラウザをリロード
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

  // pug が更新されたら HTML にコンパイル
  gulp.watch(paths.pug.src, {usePolling: true})
      .on('change', gulp.series(
          pugCompile,
          () => {
            browserSync.reload();
          },
      ));

  // scss が更新されたら css にコンパイル
  gulp.watch(paths.scss.src, {usePolling: true})
      .on('change', gulp.series(
          scssCompile,
          () => {
            browserSync.reload();
          },
      ));

  // ts が更新されたら js にコンパイル
  gulp.watch(paths.ts.src, {usePolling: true})
      .on('change', gulp.series(
          tsCompile,
          () => {
            browserSync.reload();
          },
      ));

  // vendor が更新されたらファイルをコピー
  gulp.watch(paths.vendor.src, {usePolling: true})
      .on('change', gulp.series(
          vendorCopy,
          () => {
            browserSync.reload();
          },
      ));
};

// デフォルトコマンドは4種変換を非同期で行なう
exports.default = gulp.parallel(pugCompile, scssCompile, tsCompile, vendorCopy);
