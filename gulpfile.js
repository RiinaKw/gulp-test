const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))

exports.default = () => {
    return gulp.src('src/scss/**/*.{scss,css}')
        .pipe(sass.sync({
            outputStyle: "expanded"
        }))
        .pipe(gulp.dest('dist/css'))
}

