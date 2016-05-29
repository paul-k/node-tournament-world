import React from 'react';

var controller = {
	index: function(req, res) {
		var reactHtml = "<div>Hello World</div>"; //React.renderToString(ReactApp({}));
		res.render('index.ejs', {
			reactOutput: reactHtml
		});
	}
};

export default controller;