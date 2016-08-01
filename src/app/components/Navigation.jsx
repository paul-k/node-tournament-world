import React from 'react';
import { Link } from 'react-router';

const Navigation = () => (
	<nav>
		<h2>api</h2>
		<ul>
			<li><a href="/account">Account</a></li>
			<li><a href="/signin">Sign in</a></li>
			<li><a href="/register">Register</a></li>
		</ul>
		<h2>app</h2>
		<ul>
			<li><Link to="/" activeClassName="active">home</Link></li>
			<li><Link to="/test" activeClassName="active">test</Link></li>
			<li><Link to="/hello" activeClassName="active">hello</Link></li>
		</ul>
	</nav>
);

export default Navigation;
