
// 各種ファイルの変換元・変換先の定義
exports.pug = {
  src: 'src/pug/**/*.pug',
  dist: 'dist',
};
exports.scss = {
  src: 'src/scss/**/*.{scss,css}',
  dist: 'dist/css',
};
exports.ts = {
  src: 'src/ts/**/*.{ts,js}',
  dist: 'dist/js',
};
exports.vendor = {
  src: 'src/vendor/**/*',
  dist: 'dist/vendor',
};
