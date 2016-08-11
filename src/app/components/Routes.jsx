import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Container from 'app/components/Container';

import HomePage from 'app/components/HomePage';
import TestPage from 'app/components/TestPage';
import NotFound from 'app/components/NotFound';

const Routes = (
	<Route path="/" component={ Container }>
		<IndexRoute component={ HomePage } />
		<Route path="/test" component={ TestPage }></Route>
		<Route path="*" component={ NotFound }></Route>
	</Route>
);

export default Routes;
