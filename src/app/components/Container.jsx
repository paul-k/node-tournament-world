import React from 'react';

import Navigation from 'app/components/Navigation';

const Container = (props) => (
	<div>
		<Navigation />
		{ console.log(props) }
		{ props.children }
	</div>
);

export default Container;
