import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from 'app/components/RoutesConfig';
import NotFound from 'app/components/NotFound';

var controller = {
	index: function(req, res) {
		match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
			if (error) {
				res.status(500).send(error.message);
			} else if (redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {

				let status = 200;

				if (renderProps.components.indexOf(NotFound) > -1) {
					status = 404;
				}

				var reactHtml = renderToString(
					<RouterContext {...renderProps} />
				);

				res.render('index.ejs', {
					status,
					reactOutput: reactHtml
				});
			}
		});
	}
};

export default controller;
