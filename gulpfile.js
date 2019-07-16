var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


// Compiles SASS
gulp.task('sass', function(){
    return gulp.src('app/sass/*.scss')
    .pipe(sass())

    .pipe(gulp.dest('public'))

    .pipe(browserSync.reload({
        stream: true
    }))
})

// Watch For Changes
gulp.task('watch', gulp.series('sass'), function(){
    browserSync.init({
        server: "public"
    })

    gulp.watch('app/sass/*.scss', gulp.series('sass'))
    gulp.watch('public/*.html'.on('change', browserSync.reload))
    gulp.watch('public/*.js'.on('change', browserSync.reload))
})
