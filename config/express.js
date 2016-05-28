/**
 * Created by Paul on 22/06/2015.
 */

(function() {

	'use strict';

	var express = require('express'),
		swig = require('swig');

	var config = {
		port: process.env.PORT || 3000,
		staticOptions: {
			dotfiles: 'ignore',
			etag: false,
			extensions: ['htm', 'html'],
			index: false,
			maxAge: '1d',
			redirect: false,
			setHeaders: function(res, path, stat) {
				res.set('x-timestamp', Date.now());
			}
		}
	};


	var app = express();

	app.use(express.static('public', config.staticOptions));

	app.engine('html', swig.renderFile);

	app.set('view engine', 'html');
	app.set('views', './views/');

	app.set('view cache', false);
	swig.setDefaults({ cache: false });


	module.exports = {
		app: app,
		config: config
	};


})();
