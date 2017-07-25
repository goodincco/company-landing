var gulp = require('gulp'),
    minify = require('gulp-minifier');

gulp.task('pack', function() {
  return gulp.src('www/src/**/*')
    .pipe(minify({
      minify: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest('www/release'));
});