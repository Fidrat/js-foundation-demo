var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var connect = require('gulp-connect');

var sassPaths = [
    'bower_components/normalize.scss/sass',
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

gulp.task('sass', function () {
    return gulp.src('./scss/app.scss')
            .pipe($.sass({
                includePaths: sassPaths,
                outputStyle: 'compressed' // if css compressed **file size**
            })
                    .on('error', $.sass.logError))
            .pipe($.autoprefixer({
                browsers: ['last 2 versions', 'ie >= 9']
            }))
            .pipe(gulp.dest('./css'))
            .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./scss/**/*.scss'], ['sass']);
    gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        //root: 'app',
        livereload: true
    });
});

gulp.task('default', ['connect', 'sass', 'watch'], function () {
    console.log('default');
});
