import React from 'react';

class HomePage extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h2>participants</h2>
				<ul>
					<li>Dave</li>
					<li>Alvin</li>
					<li>Simon</li>
					<li>Theodore</li>
				</ul>

				<h2>round 1</h2>
				<ul>
					<li>Dave - Alvin</li>
					<li>Simon - Theodore</li>
				</ul>

				<h2>round 2</h2>
				<ul>
					<li>Dave - Simon</li>
					<li>Alvin - Theodore</li>
				</ul>

				<h2>round 3</h2>
				<ul>
					<li>Dave - Theodore</li>
					<li>Alvin - Simon</li>
				</ul>
			</div>
		);
	}
}

export default HomePage;
