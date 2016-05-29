import React from 'react';
import ReactDomServer from 'react-dom/server';

import App from 'app/components/HelloWorld';
let ReactApp = React.createFactory(App);

var controller = {
	index: function(req, res) {
		var reactHtml = ReactDomServer.renderToString(ReactApp({ text: "fromServer" }));
		res.render('index.ejs', {
			reactOutput: reactHtml
		});
	}
};

export default controller;