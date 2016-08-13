// -- -- -- -- -- -- -- -- -- -- -- -- --
import 'scss/components/navigation.scss';
// -- -- -- -- -- -- -- -- -- -- -- -- --

import React from 'react';
import { Link } from 'react-router';

const Navigation = () => (
	<nav>
		<h2>api</h2>
		<ul>
			<li><a href="/api/account" target="_blank">Account</a></li>
			<li><a href="/api/account/signin" target="_blank">Sign in</a></li>
			<li><a href="/api/account/register" target="_blank">Register</a></li>
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
