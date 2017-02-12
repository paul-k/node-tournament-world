import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { mainReducer, initialState } from 'app/reducers/mainReducer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	: compose;

const store = createStore(mainReducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
