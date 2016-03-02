'use strict';

var gulp = require('gulp');
var gulp-rev = require('gulp-rev');
var gulp-useref = require('gulp-useref');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();

// 开发阶段
gulp.task("dev", ["serve"], function () {
  console.log("正在监听文件变动……");
})

// 开发阶段：编译 Scss
gulp.task('dev:css', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./src/css'));
});

// 开发阶段：浏览器自动刷新
gulp.task('serve', ['dev:sass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("./src/scss/**/*.scss", ['dev:sass']);
    gulp.watch("./src/**/*.html").on('change', browserSync.reload);
});

// 编译 Sass 并把 CSS 注入浏览器
gulp.task('dev:sass', function() {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
        .pipe(gulp.dest("./src/css"))
        .pipe(browserSync.stream());
});



// 打包阶段
gulp.task("build", ["build:css", "build:js"], function () {
  console.log("编译已完成，请查看 dist 文件夹");
})

// 打包阶段：编译 Scss 并压缩 CSS
gulp.task('build:css', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'));
});

// 打包阶段：压缩 JS
gulp.task('build:js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// 打包阶段：压缩图片
gulp.task('build:img', function {
    return gulp.src('./src/img/raw/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/img-compressed'));
});
