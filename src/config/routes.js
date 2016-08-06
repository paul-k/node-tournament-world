import homeController from 'controllers/homeController';
import accountController from 'controllers/accountController';

var routes = function(app) {
	app.get('/', homeController.index);

	app.get('/account', accountController.index);
	app.post('/account/signin', accountController.signin);
	app.post('/account/register', accountController.register);
};

export default routes;
