import React from 'react';
import { Link } from 'react-router';

export default class Navigation extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<nav>
				<ul>
					<li><Link to="/account" activeClassName="active">My Account</Link></li>
					<li><Link to="/signin" activeClassName="active">Sign in</Link></li>
					<li><Link to="/register" activeClassName="active">Register</Link></li>
				</ul>
			</nav>
		)
	}
}