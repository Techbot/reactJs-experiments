var gulp = require("gulp");
var babel = require("gulp-babel");
var reactify = require('reactify');
var watchify = require('watchify');
var browserify = require('browserify');
var debowerify = require('debowerify');
var to5Browserify = require('6to5-browserify');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var notify = require("gulp-notify");


gulp.task("default____", function () {
    return gulp.src("assets/js/app.jsx")
    //    .pipe(reactify())
        .pipe(reactify())
      //  .pipe(babel())
        .pipe(gulp.dest("app.js"));
});


gulp.task('react', function(){
    var b = browserify();
    b.transform(reactify); // use the reactify transform
  //  b.add('./main.js');
    return b.bundle()
        .pipe(source('./assets/js/app.js'))
        .pipe(buffer())
        .pipe(babel())
        .pipe(gulp.dest('./temp'));

});

/*
gulp.task('babel', function () {
    var bundler = watchify(browserify('./assets/js/app.js', watchify.args).transform(to5Browserify));

    bundler.transform(debowerify);

    bundler.on('update', bundle);

    function bundle() {
        console.log('Bundling app.js');
     //   var bundleTime = duration('bundling');
      //  var totalTime = duration('total');
        return bundler.bundle()
        //    .pipe(source('app.js'))
            //.pipe(bundleTime)
        //    .pipe(buffer())
            //.pipe(uglify())
            //  .pipe(replace(pwd, '/'))
            // .pipe(replace('/node_modules/', node_modules_alias))
            //  .pipe(totalTime)
        //    .pipe(gulp.dest('./webroot/js/'))
            .pipe(notify("Build: app.js!"));

    }
return bundle();
});
*/

gulp.task('default', [
    'react'


]);

gulp.task('babel', function () {




    var bundler = watchify(browserify('./temp/app.js', watchify.args).transform(to5Browserify));
    bundler.transform(reactify);
    bundler.transform(debowerify);

    bundler.on('update', bundle);

    function bundle() {
        console.log('Bundling app.js');
       // var bundleTime = duration('bundling');
      //  var totalTime = duration('total');
        return bundler.bundle()
            .pipe(source('app.js'))
            //.pipe(bundleTime)
            .pipe(buffer())
            .pipe(babel())
            //.pipe(uglify())
            //  .pipe(replace(pwd, '/'))
            // .pipe(replace('/node_modules/', node_modules_alias))
            //  .pipe(totalTime)
            .pipe(gulp.dest('./webroot/js/'))
            .pipe(notify("Build: app.js!"));
    }

    return bundle();
});