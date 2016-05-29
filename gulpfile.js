var gulp = require('gulp');

gulp.task('default', function() {
	var nodemon = require('gulp-nodemon');

	nodemon({
		script: 'build/server.js',
		ext: 'js',
		env: {
			PORT: 3000
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function() {
		console.log('Restarting...');
	});
});

gulp.task('tests', function() {
	var mocha = require('gulp-mocha');

	var testFiles = ['./tests/controllers/*.js']
	var options = {
		reporter: 'spec',
		globals: {
			should: require('should')
		}
	};

	return gulp.src(testFiles, { read: false })
		.pipe(mocha(options));
});