let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let sass = require('gulp-sass');
let autoprefixer = require('autoprefixer');
let flexbugs = require('postcss-flexbugs-fixes');
let csso = require('postcss-csso');
let sourcemaps = require('gulp-sourcemaps');
let postcss = require('gulp-postcss');
let plumber = require('gulp-plumber');
let flatten = require('gulp-flatten');
let sassTildeImporter = require('node-sass-tilde-importer');
let minifyImg = require('gulp-imagemin');
let del = require('del');
let purgecss = require('gulp-purgecss');

let paths = {
    src: {
        fonts: [
            './node_modules/material-design-icons/iconfont/*.{ttf,eot,woff,woff2,svg}',
            './node_modules/font-ptsans/*.{ttf,eot,woff,woff2,svg}',
            './node_modules/socicon/font/*.{ttf,eot,woff,woff2,svg}',
            './assets/fonts/**/*.{ttf,eot,woff,woff2,svg}'
        ],
        html: './templates/**/*.html',
        css: './assets/css/**/*.scss',
        images: './assets/images/**/*.{jpg,jpeg,png,gif,svg}',
    },
    dst: {
        build: './build',
        fonts: './build/fonts',
        css: './build/css',
        images: './build/images',
    },
};

gulp.task('watch', () => {
    browserSync.init({
        proxy: 'localhost:8000',
        port: 3000,
        open: false,
    });

    gulp.watch(paths.src.css, gulp.series('css'));
    gulp.watch(paths.src.fonts, gulp.series('fonts', 'css'));
    gulp.watch(paths.src.images, gulp.series('images'));
    gulp.watch('./build/js/**/*', gulp.series('refresh'));
    gulp.watch(paths.src.html, gulp.series('refresh'));
});

gulp.task('fonts', () => {
    return gulp
        .src(paths.src.fonts)
        .pipe(plumber())
        .pipe(flatten())
        .pipe(gulp.dest(paths.dst.fonts));
});

gulp.task('clean', cb => {
    return del(paths.dst.build, cb);
});

gulp.task('images', () => {
    return gulp
        .src(paths.src.images)
        .pipe(plumber())
        .pipe(minifyImg())
        .pipe(gulp.dest(paths.dst.images));
});

gulp.task('refresh', done => {
    browserSync.reload();
    done();
});

gulp.task('css', () => {
    const sassOptions = {
        importer: sassTildeImporter
    };

    const postCssOptions = [
        flexbugs(),
        autoprefixer({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        }),
        csso(),
    ];

    const purgeOptions = {
        content: [
            './templates/**/*.html'
        ]
    };

    return gulp
        .src(paths.src.css)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(postcss(postCssOptions))
        // .pipe(purgecss(purgeOptions))
        .pipe(sourcemaps.write('.', { sourceRoot: '/' }))
        .pipe(gulp.dest(paths.dst.css))
        .pipe(browserSync.stream());
});

gulp.task('build', gulp.series('fonts', 'css', 'images'));

gulp.task('default', gulp.series('build', 'watch'));
