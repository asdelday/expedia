var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var minCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Sass Task
gulp.task('sass', function () {
    gulp.src(['./src/sass/main.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('expedia.css'))
        .pipe(gulp.dest('./src/css/dist'))
        .pipe(minCSS())
        .pipe(concat('expedia.min.css'))
        .pipe(gulp.dest('./src/css/dist'))
        .pipe(plumber.stop());

    gulp.src(['./src/sass/page.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('page.css'))
        .pipe(gulp.dest('./src/css/dist'))
        .pipe(minCSS())
        .pipe(concat('page.min.css'))
        .pipe(gulp.dest('./src/css/dist'))
        .pipe(plumber.stop());
});

gulp.task('browserify', function() {
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
    gulp.src(['./src/js/main.js'])
        .pipe(plumber())
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))

        .pipe(concat('expedia.js'))
        .pipe(clean({force: true}))
        // Output it to our dist folder
        .pipe(gulp.dest('./src/js/dist'))

        // minify
        .pipe(uglify())
        // Bundle to a single file
        .pipe(concat('expedia.min.js'))
        .pipe(clean({force: true}))
        // Output it to our dist folder
        .pipe(gulp.dest('./src/js/dist'))
        .pipe(plumber.stop());
});

gulp.task('moveSusy', function() {
    gulp.src('./bower_components/susy/**/*.scss')
        .pipe(plumber())
        .pipe(gulp.dest('./src/sass/vendor/susy/'))
        .pipe(plumber.stop());
});

gulp.task('watch', function() {
    gulp.watch(['./src/sass/**/*.scss', '!./src/sass/vendor/**/*.scss'], ['sass']);
    gulp.watch(['./src/js/**/*.js', '!./src/js/dist/**/*.js'], ['browserify']);
});

gulp.task('default', ['moveSusy', 'sass', 'browserify', 'watch']);
