var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Stocks Trooper - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016 <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/freelancer.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('css/freelancer.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Minify JS
gulp.task('minify-js-app', function() {
    return gulp.src(['js/app.module.js', 'js/app.*.js', 'js/list_news.directive.js', '!js/*.min.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('minify-js-st', function() {
    return gulp.src(['js/stockstrooper.module.js', 'js/stockstrooper.*.js', '!js/*.min.js'])
        .pipe(concat('stockstrooper.js'))
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'));

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'));

    gulp.src(['node_modules/angular/angular.js', 'node_modules/angular/angular.min.js'])
        .pipe(gulp.dest('vendor/angular'));

    gulp.src(['node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js', 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'])
        .pipe(gulp.dest('vendor/angular-ui-bootstrap'));

    gulp.src(['node_modules/angular-timeline/dist/angular-timeline.js','node_modules/angular-timeline/dist/angular-timeline.css'])
        .pipe(gulp.dest('vendor/angular-timeline'));

    gulp.src(['node_modules/highcharts-ng/dist/highcharts-ng.min.js', 'node_modules/highcharts-ng/dist/lazyload.min.js'])
        .pipe(gulp.dest('vendor/highcharts-ng'));

    gulp.src(['node_modules/angular-spinkit/build/angular-spinkit.min.js', 'node_modules/angular-spinkit/build/angular-spinkit.min.css'])
        .pipe(gulp.dest('vendor/angular-spinkit'));

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'));
});

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js-app', 'minify-js-st', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    });
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js-app', 'minify-js-st'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js-app', 'minify-js-st']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
