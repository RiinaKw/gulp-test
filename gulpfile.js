const gulp = require('gulp')

// sass
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')

// pug
const pug = require("gulp-pug")

// その他
const debug = require('gulp-debug')
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")

const scssCompile = () => {
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

/**
 * pug をコンパイル
 */
const pugCompile = () => {
    return gulp.src('src/pug/**/*.pug')
        // エラーが起きたときにデスクトップへ通知する
        .pipe(plumber(notify.onError('Error: <%= error.message %>')))
        // pug コンパイル
        .pipe(pug({
            pretty: true
        }))
        // html を出力
        .pipe(gulp.dest('dist'))
        // ログ出力
        .pipe(debug({ title: 'pug :' }))
}

exports.pug = pugCompile
exports.scss = scssCompile
