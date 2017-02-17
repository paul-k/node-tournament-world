var path = require('path');
var webpack = require('webpack');

module.exports = function(config) {
	config.set({

		basePath: '',

		frameworks: ['mocha'],

		files: [
			//{pattern: './node_modules/babel-polyfill/browser.js', watched: false},
			{pattern: './!(node_modules)/**/*.spec.js', watched: false}
		],

		preprocessors: {
			'./!(node_modules)/**/*.spec.js': ['webpack']
		},

		webpack: {
			resolve: {
				modules: [
					"node_modules",
					path.resolve(__dirname, './src')
				],
				extensions: ['.js', '.jsx', '.json', '.scss']
			},
			module: {
				rules: [{
					test: /\.js$|\.jsx$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react']
					}
				}]
			}
		},

		webpackMiddleware: {
			stats: 'errors-only',
			noInfo: true
		},

		plugins: [
			require('karma-webpack'),
			require('karma-chrome-launcher'),
			require('karma-phantomjs-launcher'),
			//require('karma-ie-launcher'),
			require('karma-mocha'),
			//require('karma-sinon-chai'),
			require('karma-spec-reporter'),
			//require('karma-firefox-launcher'),
			//require('karma-safari-launcher'),
			//require('karma-detect-browsers')
		],

		reporters: ['spec'],

		port: 9876,

		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: false,

		browsers: ['PhantomJS', 'Chrome'],

		phantomjsLauncher: {
			// Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
			// exitOnResourceError: true,
			settings: {
				XSSAuditingEnabled: false,
				webSecurityEnabled: false
			}
		},

		// customLaunchers: {
		// 	IE9: {
		// 		base: 'IE',
		// 		'x-ua-compatible': 'IE=EmulateIE9',
		// 		flags: ['-extoff']
		// 	}
		// },

		client: {
			chai: {
				includeStack: true
			}
		},

		singleRun: true,

		concurrency: Infinity,

		captureTimeout: 60000,
		browserDisconnectTimeout: 5000,
		browserDisconnectTolerance: 3,

		browserNoActivityTimeout: 90000
	});
};