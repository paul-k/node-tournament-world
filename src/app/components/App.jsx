import React from 'react';
import { Router, browserHistory } from 'react-router';

import Routes from 'app/components/Routes';

const App = () => (
	<Router history={ browserHistory }>
		{ Routes }
	</Router>
);

export default App;
