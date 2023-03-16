const gulp = require('gulp')

// pug
const pug = require('gulp-pug')

// sass
const sass = require('gulp-sass')(require('sass'))  // sass コンパイラ
const sourcemaps = require('gulp-sourcemaps')       // ***.css.map

// js
const uglify = require('gulp-uglify')   // js の圧縮
const rename = require('gulp-rename')   // ファイルのリネーム

// 開発サーバ
const browserSync = require('browser-sync')

// その他
const minimist = require('minimist')    // 引数解析
var gulpif = require('gulp-if')         // 条件分岐を簡単にしてくれるやつ
const debug = require('gulp-debug')     // デバッグログ
const plumber = require('gulp-plumber') // デスクトップ通知
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
 * 環境切り替え
 */
const options = minimist(process.argv.slice(2), {
    string: 'env',
    default: {
        env: 'development'
    }
})

console.log("\x1b[36m")
console.log("****************")
console.log("*")
console.info(`* mode : ${options.env}`)
console.log("*")
console.log("****************")
console.log("\x1b[0m")

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
        // 本番環境の場合はコンパイル後に圧縮
        .pipe(gulpif(
            options.env === 'production',
            sass.sync({
                outputStyle: "compressed"
            })
        ))
        // 開発環境の場合はコンパイルだけ
        .pipe(gulpif(
            options.env === 'development',
            sass.sync({
                outputStyle: "expanded"
            })
        ))
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
        // 本番環境の場合は圧縮
        .pipe(gulpif(
            options.env === 'production',
            uglify()
        ))
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
