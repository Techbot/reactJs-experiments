// gulpfile.js

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var buffer = require('vinyl-buffer');

gulp.task('build', function () {
    browserify({
        entries: 'assets/app.jsx',
        extensions: ['.jsx'],
        debug: true
    })
        .transform(babelify)
    //    .transform(reactify)

        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});


gulp.task('react', function(){
   browserify({
       entries: 'assets/app.jsx',
       extensions: ['.jsx'],
       debug: true
   })

         // use the reactify transform
        .bundle()
        .pipe(source('dist/app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./webroot/app.js'));

});



gulp.task('default',['build']);
//gulp.task('default', ['build']);


