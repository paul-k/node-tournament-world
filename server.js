/**
 * Created by Paul on 20/06/2015.
 */

(function() {

	'use strict';

	var express = require('./app/config/express'),
		configureRoutes = require('./app/config/routes');

	configureRoutes(express.app);

	express.app.listen(express.config.port, function() {
		console.log('Running on port: ' + express.config.port);
	});

})();

