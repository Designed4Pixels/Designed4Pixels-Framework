// Get the required Gulp Packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    bower = require('gulp-bower'),
    zip = require('gulp-zip'),
    requireDir = require('require-dir');


// Get the required Node Packages
var fontAwesome = require('node-font-awesome');


// Create Array of Bourbon Paths
var bourbon = require('node-bourbon');


// Update Foundation with Bower and save to /bower_components
gulp.task('foundation:update', function() {
  return bower({ cmd: 'update'})
    .pipe(gulp.dest('bower_components/'))
});


// Compile the Latest Foundation
gulp.task('foundation:build', function() {
  return gulp.src('./assets/scss/foundation/*.scss')
    .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
    }))
    .pipe(sass({ 
      includePaths: ['bower_components/foundation-sites/scss/']
    }))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./assets/_foundation'))     
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./assets/_foundation'))
});


// Update Theme with Foundation CSS & JS files following update
gulp.task('theme:update', function() {
  gulp.src('./assets/_foundation/*.css').pipe(gulp.dest('../theme-src/designed4pixels/assets/css/foundation'));
  gulp.src('./bower_components/foundation-sites/dist/js/*.js').pipe(gulp.dest('../theme-src/designed4pixels/assets/js/foundation'));
});

 
// Update Theme FontAwesome Icons
gulp.task('theme:fonts', function() {
  gulp.src(fontAwesome.fonts).pipe(gulp.dest('../theme-src/designed4pixels/assets/fonts'));
  gulp.src(fontAwesome.css)
    .pipe(gulp.dest('../theme-src/designed4pixels/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('../theme-src/designed4pixels/assets/css'))
});


// Compile the Latest Custom CSS Files
gulp.task('theme:css', function() {
  return gulp.src('./assets/scss/*.scss')
    .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
    }))
    .pipe(sass({ 
      includePaths: ['bower_components/foundation-sites/scss/']
    }))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./assets/_css'))
    .pipe(gulp.dest('../theme-src/designed4pixels/'))     
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('../theme-src/designed4pixels/assets/css/'))
});


// Compile the Latest WooCommerce CSS Files
gulp.task('theme:wc', function() {
  return gulp.src('./assets/scss/woocommerce/*.scss')
    .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
    }))
    .pipe(sass({ 
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('../theme-src/designed4pixels/assets/css/woocommerce/'))     
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('../theme-src/designed4pixels/assets/css/woocommerce/'))
});

    
// Copy JavaScript Files to Theme
gulp.task('theme:js', function() {
  return gulp.src([	
      // Grab your custom scripts
  		'./assets/js/*.js' 
  ])
    .pipe(gulp.dest('../theme-src/designed4pixels/assets/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('../theme-src/designed4pixels/assets/js/'))
});


// Create Theme Zip File
gulp.task('theme:zip', function() {
  gulp.src( '../theme-src/**/*' ).pipe(zip('designed4pixels.zip')).pipe(gulp.dest( '../zip-files' ));
});    


// Create a Default Task 
gulp.task('default', function() {
  gulp.start('theme:css', 'theme:js', 'theme:zip');
});


// Watch files for changes
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('./assets/scss/**/*.scss', ['theme:css']);

  // Watch site-js files
  gulp.watch('./assets/js/*.js', ['theme:js']);
  
  // Watch foundation-js files
  gulp.watch('./bower_components/foundation-sites/js/*.js', ['theme:update']);

});
