import reactController from 'controllers/reactController';
import accountController from 'controllers/accountController';
import userController from 'controllers/userController';

var routes = function(app) {
	app.get('/api/account', accountController.index);
	app.get('/api/account/signin', accountController.signin);
	app.get('/api/account/register', accountController.register);
	app.get('/api/users', userController.get);

	app.get('*', reactController.index);
};

export default routes;
