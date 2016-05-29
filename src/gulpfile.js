var gulp = require('gulp');

gulp.task('default', function() {
	var nodemon = require('gulp-nodemon');

	nodemon({
		script: 'server.js',
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