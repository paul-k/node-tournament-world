import { USERS_ADD, USERS_REMOVE } from 'app/actions/usersActions';

function addUser(state, action) {
	let result = Object.assign({}, state);
	result.concat([action.name]);
	return result;
}

function removeUser(state, action) {
	let result = Object.assign({}, state);
	result = result.filter(u => u !== action.name);
	return result;
}

export const usersReducer = (state = [], action) => {

	switch (action.type) {
		case USERS_ADD:
			return addUser(state, action);
		case USERS_REMOVE:
			return removeUser(state, action);
		default:
			return state;
	}
};
