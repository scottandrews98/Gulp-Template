var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jsmin = require('gulp-jsmin');
var concat = require('gulp-concat');


// Compiles SASS
gulp.task('sass', function(){
    return gulp.src('development/sass/*.scss')
    .pipe(sass())

    .pipe(gulp.dest('release'))

    .pipe(browserSync.reload({
        stream: true
    }))
})

// Minify Javascript
gulp.task('minifyJS', function(done){
    gulp.src('development/js/*.js')
        .pipe(jsmin())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('release'));
    done()
})

// Watch For Changes
gulp.task('watch', gulp.series('sass'), function(){
    browserSync.init({
        server: "release"
    })

    gulp.watch('development/sass/*.scss', gulp.series('sass'))
    gulp.watch('release/*.html'.on('change', browserSync.reload))
    gulp.watch('release/*.js'.on('change', browserSync.reload))
})
