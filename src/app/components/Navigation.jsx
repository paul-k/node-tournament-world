// -- -- -- -- -- -- -- -- -- -- -- -- --
import 'scss/components/navigation.scss';
// -- -- -- -- -- -- -- -- -- -- -- -- --

import React from 'react';
import { Link } from 'react-router';

const Navigation = () => (
	<nav>
		<b>app</b> :
		<ul>
			<li><Link to="/" activeClassName="active">home</Link></li>
			<li><Link to="/test" activeClassName="active">test</Link></li>
			<li><Link to="/hello" activeClassName="active">hello</Link></li>
		</ul>
	</nav>
);

export default Navigation;
