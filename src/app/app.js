// -- -- -- -- -- -- -- -- -- -- -- -- --
import 'file-loader?name=/public/index.ejs!../public/index.ejs';
import 'file-loader?name=/public/favicon.ico!../public/favicon.ico';
// -- -- -- -- -- -- -- -- -- -- -- -- --
import 'scss/app.scss';
// -- -- -- -- -- -- -- -- -- -- -- -- --

import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-redux';

import Store from 'app/store';
import Routes from 'app/components/RoutesConfig';

var provider = (
	<Provider store={Store}>
		<Router history={ browserHistory }>
			{ Routes }
		</Router>
	</Provider>
);

ReactDom.render(provider, document.getElementById('main'));
