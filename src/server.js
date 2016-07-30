// moved required physical files
// -- -- -- -- -- -- -- -- -- -- -- -- --
import 'file?name=gulpfile.js!gulpfile.js';
// -- -- -- -- -- -- -- -- -- -- -- -- --


import express from './config/express';
import configureRoutes from './config/routes';
import nodeJsx from 'node-jsx';

nodeJsx.install();

configureRoutes(express.app);

express.app.listen(express.config.port, function() {
	console.log('Running on port: ' + express.config.port);
});
