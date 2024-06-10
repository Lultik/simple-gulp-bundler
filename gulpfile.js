const gulp = require('gulp');
const concat = require('gulp-concat');
const cheerio = require('gulp-cheerio');
const fileInclude = require('gulp-file-include');
const fs = require("fs-extra");

gulp.task('js', function() {
    return gulp.src('src/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
    return gulp.src('src/**/*.css') // source of any css files
        .pipe(concat('styles.css')) // the name of the concatenated files
        .pipe(gulp.dest('dist/css')); // the destination of the files
});


gulp.task('file-include', function () {
    return gulp.src('src/index.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(cheerio($ => {
            $('head').append('<link rel="stylesheet" href="css/styles.css">');
            $('body').append('<script src="js/script.js"></script>');
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-static', function(done) {
    fs.copy('src/static', 'dist/static')
        .then(() => done())
        .catch(err => done(err));
});

gulp.task('default', gulp.series('js', 'css', 'file-include', 'copy-static'));
