import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
	<div>
		<h3>click a tournament to proceed:</h3>
		<ul>
			<li><Link to="/t/1">tournament 1</Link></li>
			<li><Link to="/t/19">tournament 19</Link></li>
			<li><Link to="/t/352">tournament 352</Link></li>
			<li><Link to="/t/20003">tournament 20003</Link></li>
		</ul>
	</div>
);

export default HomePage;
