import reactController from 'controllers/reactController';
import accountController from 'controllers/accountController';

var routes = function(app) {
	app.get('/api/account', accountController.index);
	app.get('/api/account/signin', accountController.signin);
	app.get('/api/account/register', accountController.register);

	app.get('*', reactController.index);
};

export default routes;
