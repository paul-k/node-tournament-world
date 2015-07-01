/**
 * Created by Paul on 22/06/2015.
 */

(function() {

    'use strict';

    var homeController = require('../controllers/homeController');


    var routes = function(app) {

        app.get('/', homeController.index);

    }

    module.exports = routes;

})();
