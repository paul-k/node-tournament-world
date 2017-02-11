import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { mainReducer, initialState } from 'app/reducers/mainReducer';

let middlewares = process.env.NODE_ENV === 'development'
	? compose(
			applyMiddleware(thunkMiddleware),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	: compose(
			applyMiddleware(thunkMiddleware)
		);

const store = createStore(mainReducer, initialState, middlewares);

export default store;
