var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify');
reactify = require('reactify'),
    debowerify = require('debowerify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace')
duration = require('gulp-duration'),
    gutil = require('gulp-util'),
    //less = require('gulp-less'),
    //watchLess = require('gulp-watch-less'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require("gulp-notify"),
    csso = require('gulp-csso'),
    to5Browserify = require('6to5-browserify'),
    pwd = process.env.PWD + '/',
    node_modules_alias = '/.composer/';

gulp.task('javascript', function () {
    var bundler = watchify(browserify('./assets/js/app.js', watchify.args).transform(to5Browserify));
    bundler.transform(reactify);
    bundler.transform(debowerify);

    bundler.on('update', bundle);

    function bundle() {
        console.log('Bundling app.js');
        var bundleTime = duration('bundling');
        var totalTime = duration('total');
        return bundler.bundle()
            .pipe(source('app.js'))
            //.pipe(bundleTime)
            .pipe(buffer())
            //.pipe(uglify())
          //  .pipe(replace(pwd, '/'))
           // .pipe(replace('/node_modules/', node_modules_alias))
          //  .pipe(totalTime)
            .pipe(gulp.dest('./webroot/js/'))
            .pipe(notify("Build: app.js!"));
    }

    return bundle();
});

gulp.task('less', function () {
    console.log('Building app.css');
    return gulp.src('./assets/less/app.less')
        .pipe(watchLess('./assets/less/app.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
        .pipe(sourcemaps.write())
        .pipe(csso())
        .pipe(gulp.dest('./webroot/css/'))
        /*.pipe(notify("Build: app.css!"))*/;
});

gulp.task('default', [
    'javascript',
    //'less',
]);

