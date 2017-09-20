// -- -- -- -- -- -- -- -- -- -- -- -- --
import 'scss/components/navigation.scss';
// -- -- -- -- -- -- -- -- -- -- -- -- --

import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
	<nav>
		<b>app</b> :
		<ul>
			<li><NavLink to="/" activeClassName="active">home</NavLink></li>
			<li><NavLink to="/test" activeClassName="active">test</NavLink></li>
			<li><NavLink to="/hello" activeClassName="active">hello</NavLink></li>
		</ul>
	</nav>
);

export default Navigation;
