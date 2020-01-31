var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var browerSync = require('browser-sync').create();

var config = {
    paths: {
        scss: './app/scss/**/*.scss',
        html: './app/index.html'
    },
    output: {
        cssName: 'bundle.min.css',
        path: './dist'
    }
};

gulp.task('sass', function() {
    return gulp.src(config.paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        // .pipe(cleanCss())
        .pipe(gulp.dest(config.output.path))
        .pipe(browerSync.stream());
});

// gulp.task('scripts', function() {
//     return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
//     .pipe(browserSync.reload({ stream: true }))
// });

gulp.task('code', function() {
    return gulp.src(config.paths.html)
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('serve', function() {
    browerSync.init({
        server: {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.scss, gulp.parallel('sass'));
    gulp.watch(config.paths.html, gulp.parallel('code'));
    // gulp.watch(config.paths.html).on('change', browerSync.reload({ stream: true }));
});



gulp.task('default', gulp.parallel('sass', 'serve'));