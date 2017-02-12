import reactController from 'controllers/reactController';
import userController from 'controllers/userController';

var routes = function(app) {
	app.get('/api/users', userController.get);

	app.get('*', reactController.index);
};

export default routes;
