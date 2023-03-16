const gulp = require('gulp')

// sass
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')

// pug
const pug = require('gulp-pug')

// 開発サーバ
const browserSync = require('browser-sync')

// js
const uglify = require('gulp-uglify')   // js の圧縮
const rename = require('gulp-rename')   // ファイルのリネーム

// その他
const debug = require('gulp-debug')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

// パスの設定
const paths = {
    'src': {
        pug: 'src/pug/**/*.pug',
        scss: 'src/scss/**/*.{scss,css}',
        js: 'src/js/**/*.js',
    },
    'dist': {
        pug: 'dist',
        scss: 'dist/css',
        js: 'dist/js',
    }
}

/**
 * pug をコンパイル
 */
const pugCompile = () => {
    return gulp.src(paths.src.pug)
        // エラーが起きたときにデスクトップへ通知する
        .pipe(plumber(notify.onError('Error: <%= error.message %>')))
        // pug コンパイル
        .pipe(pug({
            pretty: true
        }))
        // html を出力
        .pipe(gulp.dest(paths.dist.pug))
        // ログ出力
        .pipe(debug({ title: 'pug :' }))
}

/**
 * scss をコンパイル
 */
const scssCompile = () => {
    return gulp.src(paths.src.scss)
        // エラーが起きたときにデスクトップへ通知する
        .pipe(plumber(notify.onError('Error: <%= error.message %>')))
        // ***.css.map の準備
        .pipe(sourcemaps.init())
        // コンパイル
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }))
        // ***.css.map を出力
        .pipe(sourcemaps.write('./maps'))
        // css を出力
        .pipe(gulp.dest(paths.dist.scss))
        // ログ出力
        .pipe(debug({ title: 'scss :' }))
}

/**
 * js を圧縮
 */
const jsMinify = () => {
    return gulp.src(paths.src.js)
        // エラーが起きたときにデスクトップへ通知する
        .pipe(plumber(notify.onError('Error: <%= error.message %>')))
        // 圧縮
        .pipe(uglify())
        // ***.min.js にリネーム
        .pipe(rename({
            extname: '.min.js'
        }))
        // js を出力
        .pipe(gulp.dest(paths.dist.js))
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
            baseDir: 'dist/',
        }
    })

    gulp.watch(paths.src.pug, { usePolling: true })
        .on('change', gulp.series(
            pugCompile,
            () => {browserSync.reload()}
        ))
    gulp.watch(paths.src.scss, { usePolling: true })
        .on('change', gulp.series(
            scssCompile,
            () => {browserSync.reload()}
        ))
    gulp.watch(paths.src.js, { usePolling: true })
        .on('change', gulp.series(
            jsMinify,
            () => {browserSync.reload()}
        ))
}

exports.default = gulp.parallel(pugCompile, scssCompile, jsMinify)
