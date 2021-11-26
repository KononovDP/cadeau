var gulp = require('gulp');
var sass = require('gulp-sass');
var gcmq = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('styles', function() {
    return gulp.src('app/css/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
});

// Moves all fonts into /dist folder
gulp.task('scripts', function() {
    return gulp.src('app/js/**/*')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

// Compress all images and move them to /dist/images
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg|webp)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

// Moves all fonts into /dist folder
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

// Gulp will delete the `dist` folder for you whenever gulp clean:dist is run.
gulp.task('clean:dist', function() {
    return del.sync('dist');
});



gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['styles', 'scripts', 'images', 'fonts', 'html'],
    callback
  )
});

gulp.task('default', function (callback) {
    runSequence(['sass','browser-sync', 'watch'],
        callback
    )
});
