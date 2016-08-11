import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from 'app/components/Routes';

var controller = {
	index: function(req, res) {
		match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
			if (error) {
				res.status(500).send(error.message);
			} else if (redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				// You can also check renderProps.components or renderProps.routes for
				// your "not found" component or route respectively, and send a 404 as
				// below, if you're using a catch-all route.
				var reactHtml = renderToString(<RouterContext {...renderProps} />);
				res.render('index.ejs', {
					reactOutput: reactHtml
				});
				//res.status(200).send()
			} else {
				res.status(404).send('Not found');
			}
		});
	}
};

export default controller;
