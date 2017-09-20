import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { Provider } from 'react-redux';
import Store from 'app/store';
import App from 'app/MainApp';

var controller = {
	index: function(req, res) {

		var context = {};

		var reactHtml = renderToString(
			<Provider store={ Store }>
				<StaticRouter location={ req.url } context={ context }>
					<App />
				</StaticRouter>
			</Provider>
		);

		if (context.url) {
			res.redirect(302, context.url);
		}

		res.status(context.statusCode || 200)
			.render('index.ejs', {
				reactOutput: reactHtml
			});
	}
};

export default controller;
