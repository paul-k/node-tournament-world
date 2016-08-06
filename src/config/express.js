import express from 'express';

var config = {
	port: process.env.PORT || 3000, // eslint-disable-line no-process-env
	staticOptions: {
		dotfiles: 'ignore',
		etag: false,
		extensions: ['htm', 'html'],
		index: false,
		maxAge: '1d',
		redirect: false,
		setHeaders: function(res, path, stat) {
			res.set('x-timestamp', Date.now());
		}
	}
};

var app = express();
app.use(express.static('public', config.staticOptions));
app.set('views', 'public');
app.set('view engine', 'ejs');
app.set('view cache', false);

export default {
	app: app,
	config: config
};
