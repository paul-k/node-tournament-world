import express from './config/express';
import configureRoutes from './config/routes';

configureRoutes(express.app);

express.app.listen(express.config.port, function() {
	console.log('Running on port: ' + express.config.port);
});
