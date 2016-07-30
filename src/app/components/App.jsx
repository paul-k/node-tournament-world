import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import Navigation from 'app/components/Navigation';
import HomePage from 'app/components/HomePage';
import TestPage from 'app/components/TestPage';

export default class App extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<Router history={ browserHistory }>
				
				<Route path="/" Component={ HomePage }>
					<IndexRoute component={ HomePage }/>
					<Route path="/nav" Component={ Navigation }></Route>
					<Route path="/test" Component={ TestPage }></Route>
				</Route>
				{ this.props.children }
			</Router>
		)
	}
}