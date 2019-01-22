const
	gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	postcss = require('gulp-postcss'),
	less = require('gulp-less'),
	imgmin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin'),
	jsmin = require('gulp-uglify'),
	concat = require('gulp-concat'),
	del = require('del'),
	rigger = require('gulp-rigger'),
	babel = require('gulp-babel')

function html() {
	return gulp.src('src/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('dev'))
}

function min_html() {
	return gulp.src('dev/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
		 	removeComments: true,
			minifyCSS: true
		}))
		.pipe(gulp.dest('docs'))
}

function css() {
	return gulp.src(['!src/less/index.less', 'src/less/*.css', 'src/less/*.less'])
		.pipe(sourcemaps.init({
			loadMaps: true,
			largeFile: true
		}))
		.pipe(sourcemaps.identityMap())
		.pipe(postcss([
			require('postcss-font-magician'),
			require('postcss-inline-svg'),
			require('postcss-svgo')({
				plugins: [
					{removeViewBox: false},
					{cleanupIDs: true},
					{removeDimensions: true}
				]
		}),
			require('postcss-focus'),
		],
		{syntax: require('postcss-less')}
		))
		.pipe(concat('index.css'))
		.pipe(less())
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest('dev/css'))
}

function min_css() {
	return gulp.src(['dev/css/*.css'])
		.pipe(postcss([
			require('autoprefixer'),
			require('css-mqpacker')({
				sort: true
			}),
			require('postcss-mq-last'),
			require('postcss-csso')({comments: false})
		]))
		.pipe(gulp.dest('docs/css'))
}

function js() {
	return gulp.src(['src/js/!(index.js)*.js', 'src/js/*.js'])
		.pipe(sourcemaps.init({
			loadMaps: true,
			largeFile: true
		}))
		.pipe(sourcemaps.identityMap())
		.pipe(concat('index.js'))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest('dev/js'))
}

function min_js() {
	return gulp.src(['dev/js/*.js'])
		.pipe(jsmin())
		.pipe(gulp.dest('docs/js'))
}

function img() {
	return gulp.src('src/img/*', {since: gulp.lastRun(img)})
		.pipe(gulp.dest('dev/img'))
}

function min_img() {
	del(['docs/img/*'])
	return gulp.src('src/img/*')
		.pipe(imgmin(imgmin.svgo({
			plugins: [
				{removeViewBox: false},
				{cleanupIDs: true},
				{removeDimensions: true}
			]
	})))
		.pipe(gulp.dest('docs/img'))
}

function min_fonts() {
	del(['docs/fonts/*'])
	return gulp.src('src/fonts/*')
		// .pipe(font())
		.pipe(gulp.dest('docs/fonts'))
}

// watch

function watch_html() {
	return gulp.watch(['src/*.html', 'src/templates/*.html'], html)
}

function watch_css() {
	return gulp.watch('src/less/', css)
}

function watch_js() {
	return gulp.watch('src/js/', js)
}

function watch_img() {
	return gulp.watch('src/img/', img)
}

// tasks

gulp.task('default', gulp.series(html, css, js, gulp.parallel(watch_html, watch_css, watch_js)))

gulp.task('build', gulp.series(html, css, js, min_html, min_css, min_js))
gulp.task('assets', gulp.parallel(min_img, min_fonts))
