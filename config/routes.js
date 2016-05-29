import homeController from 'controllers/homeController';

var routes = function(app) {
	app.get('/', homeController.index);
}

export default routes;
