import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { mainReducer, initialState } from 'app/reducers/mainReducer';

const store = createStore(mainReducer, initialState, applyMiddleware(thunkMiddleware));

export default store;
