import React from 'react';
import { Route } from 'react-router-dom';

const Status = ({ code, children }) => (
	<Route render={({ staticContext }) => {
		if (staticContext) {
			staticContext.statusCode = code;
		}

		return children;
	}}/>
);

export default Status;
