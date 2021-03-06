let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let minify = require('gulp-minify');
let order = require("gulp-order");
let concat = require("gulp-concat");

gulp.task('pack-css', () => {
    return gulp.src('source/css/index.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('static/css'));
});

gulp.task('pack-js', () => {
    return gulp.src('source/js/*.js')
        .pipe(order([
            "source/js/doc.js",
            "source/js/blog.js",
            "source/js/archive.js"
        ]))
        .pipe(concat("index.js"))
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('static/js'));
});

gulp.task('copy-release', () => {
    gulp.src('./*.html').pipe(gulp.dest('./release/'));
    gulp.src('./*.md').pipe(gulp.dest('./release/'));
    gulp.src('./LICENSE').pipe(gulp.dest('./release/'));
    gulp.src('./install.sh').pipe(gulp.dest('./release/'));
    gulp.src('./static/**/*').pipe(gulp.dest('./release/static/'));
    gulp.src('./include/**/*').pipe(gulp.dest('./release/include/'));
});

gulp.task('default', ['pack-js', 'pack-css', 'copy-release']);