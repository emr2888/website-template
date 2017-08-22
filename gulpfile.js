const gulp = require('gulp');
const glp = require('gulp-load-plugins')({
    lazy: true
});

//SASS Compile
gulp.task('sass-compile', () =>
    gulp.src('./src/sass/style.scss')
        .pipe(glp.sass().on('error', glp.sass.logError))
        .pipe(gulp.dest('./dist/css/'))
);

// CSS Autoprefixer
gulp.task('build-css', ['sass-compile'], () =>
    gulp.src('./dist/css/style.css')
        .pipe(glp.autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(glp.cssnano({
            convertValues: false,
            discardComments: { removeAll: true },
            autoprefixer: false
        }))
        .pipe(glp.rename('style.min.css'))
        .pipe(gulp.dest('./dist/css/'))
);

gulp.task('default', ['build-css']);