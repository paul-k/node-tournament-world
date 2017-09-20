// -- -- -- -- -- -- -- -- -- -- -- -- --
import 'file-loader?name=/public/index.ejs!../public/index.ejs';
import 'file-loader?name=/public/favicon.ico!../public/favicon.ico';
// -- -- -- -- -- -- -- -- -- -- -- -- --
import 'scss/app.scss';
// -- -- -- -- -- -- -- -- -- -- -- -- --

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Store from 'app/store';
import App from 'app/MainApp';

var provider = (
	<Provider store={Store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDom.render(provider, document.getElementById('main'));
