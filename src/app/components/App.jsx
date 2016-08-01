import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';

import Container from 'app/components/Container';

import HomePage from 'app/components/HomePage';
import TestPage from 'app/components/TestPage';
import NotFound from 'app/components/NotFound';

const App = () => (
	<Router history={ hashHistory }>
		<Route path="/" component={ Container }>
			<IndexRoute component={ HomePage } />
			<Route path="/test" component={ TestPage }></Route>
			<Route path="*" component={ NotFound }></Route>
		</Route>
	</Router>
);

export default App;
