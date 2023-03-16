const gulp = require('gulp')

// sass
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')

const debug = require('gulp-debug')
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")

exports.default = () => {
    return gulp.src('src/scss/**/*.{scss,css}')
        // エラーが起きたときにデスクトップへ通知する
        .pipe(plumber(notify.onError('Error: <%= error.message %>')))
        // ***.css.map の準備
        .pipe(sourcemaps.init())
        // コンパイル
        .pipe(sass.sync({
            outputStyle: "expanded"
        }))
        // ***.css.map を出力
        .pipe(sourcemaps.write('./maps'))
        // css を出力
        .pipe(gulp.dest('dist/css'))
        // ログ出力
        .pipe(debug({ title: 'scss :' }))
}

