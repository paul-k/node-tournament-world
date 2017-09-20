import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from 'app/components/Navigation';

import HomePage from 'app/components/HomePage';
import TournamentPage from 'app/components/TournamentPage';
import TestPage from 'app/components/TestPage';
import NotFound from 'app/components/NotFound';

const MainApp = () => (
	<div>
		<Navigation />
		<Switch>
			<Route path="/" exact component={ HomePage } />
			<Route path="/t/:tid" component={ TournamentPage } />
			<Route path="/test" component={ TestPage } />
			<Route path="*" component={ NotFound } />
		</Switch>
	</div>
);

export default MainApp;
