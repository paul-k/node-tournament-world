import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';

import HomePage from 'app/components/HomePage';

export default class App extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<Router history={ hashHistory }>
				<Route path="/" Component={HomePage}></Route>
			</Router>
		)
	}
}