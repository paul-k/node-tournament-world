/**
 * Created by Paul on 11/07/2015.
 */

(function() {
	
	'use strict';
	
	var swig = require('swig'),
		res;
	
	describe('Home Controller', function() {
		
		beforeEach(function() {
			res = {
				render: swig.render
			};
		});
		
		describe('Index', function() {
			it.skip('returns 200 status', function() {
				
				var homeController = require('../../controllers/homeController');
				
				homeController.index({}, res);
				
				//res.status.should.be(200);
			});
		});
	});
	
})();