// moved required physical files
// -- -- -- -- -- -- -- -- -- -- -- -- --
import 'file?name=/public/index.ejs!../public/index.ejs';
// -- -- -- -- -- -- -- -- -- -- -- -- --

import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';

import Routes from 'app/components/RoutesConfig';

ReactDom.render(
	<Router history={ browserHistory }>
		{ Routes }
	</Router>
, document.getElementById('main'));
