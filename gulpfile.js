const gulp = require('gulp')

// sass
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')

// pug
const pug = require("gulp-pug")

// 開発サーバ
const browserSync = require('browser-sync')

// js
const uglify = require("gulp-uglify")   // js の圧縮
const rename = require("gulp-rename")   // ファイルのリネーム

// その他
const debug = require('gulp-debug')
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")

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

/**
 * scss をコンパイル
 */
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
 * js を圧縮
 */
const jsMinify = () => {
    return gulp.src('src/js/**/*.js')
        // 圧縮
        .pipe(uglify())
        // ***.min.js にリネーム
        .pipe(rename({
            extname: '.min.js'
        }))
        // js を出力
        .pipe(gulp.dest('dist/js'))
        // ログ出力
        .pipe(debug({ title: 'js :' }))
}

exports.pug = pugCompile
exports.scss = scssCompile
exports.js = jsMinify

exports.serve = () => {
    browserSync.init({
        open: false,
        startPath: '',
        reloadDelay: 100,
        once: true,
        notify: true,
        ghostMode: false,
        server: {
            baseDir: "dist/",
        }
    })

    gulp.watch('src/pug/**/*', { usePolling: true })
        .on('change', gulp.series(
            pugCompile,
            () => {browserSync.reload()}
        ))
    gulp.watch('src/scss/**/*', { usePolling: true })
        .on('change', gulp.series(
            scssCompile,
            () => {browserSync.reload()}
        ))
    gulp.watch('src/js/**/*', { usePolling: true })
        .on('change', gulp.series(
            jsMinify,
            () => {browserSync.reload()}
        ))
}

exports.default = gulp.parallel(pugCompile, scssCompile)
