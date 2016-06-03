import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import HomePage from 'app/components/HomePage';

export default class App extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" Component={HomePage}></Route>
			</Router>
		)
	}
}