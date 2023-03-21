const gulp = require('gulp');

// 開発サーバ
const browserSync = require('browser-sync');

// パスの設定
const paths = require('./gulpfile/paths');

// 引数の読み込み
const arguments = require('./gulpfile/arguments');

console.log('\x1b[36m');
console.log('****************');
console.log('*');
console.info(`* mode : ${arguments.env}`);
console.log('*');
console.log('****************');
console.log('\x1b[0m');

const pugCompile = require('./gulpfile/pug-compile');
const scssCompile = require('./gulpfile/scss-compile');
const jsMinify = require('./gulpfile/js-minify');
const vendorCopy = require('./gulpfile/vendor-copy');

exports.pug = pugCompile;
exports.scss = scssCompile;
exports.js = jsMinify;
exports.vendor = vendorCopy;

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

  gulp.watch(paths.pug.src, {usePolling: true})
      .on('change', gulp.series(
          pugCompile,
          () => {
            browserSync.reload();
          },
      ));
  gulp.watch(paths.scss.src, {usePolling: true})
      .on('change', gulp.series(
          scssCompile,
          () => {
            browserSync.reload();
          },
      ));
  gulp.watch(paths.js.src, {usePolling: true})
      .on('change', gulp.series(
          jsMinify,
          () => {
            browserSync.reload();
          },
      ));
  gulp.watch(paths.vendor.src, {usePolling: true})
      .on('change', gulp.series(
          vendorCopy,
          () => {
            browserSync.reload();
          },
      ));
};

exports.default = gulp.parallel(pugCompile, scssCompile, jsMinify, vendorCopy);
