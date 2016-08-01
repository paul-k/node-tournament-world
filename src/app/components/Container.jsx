import React from 'react';

import Navigation from 'app/components/Navigation';

const Container = (props) => (
	<div>
		<Navigation />
		{ props.children }
	</div>
);

export default Container;
