import reactController from 'controllers/reactController';
import userController from 'controllers/userController';
import generatorController from 'controllers/generatorController';

import bodyParser from 'body-parser';

var jsonParser = bodyParser.json()

const routes = function(app) {
	app.get('/api/users', userController.get);
	app.post('/api/generator/roundRobin', jsonParser, generatorController.roundRobin);

	app.get('*', reactController.index);
};

export default routes;
