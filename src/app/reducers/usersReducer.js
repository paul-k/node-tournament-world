import { USERS_ADD, USERS_REMOVE } from 'app/actions/usersActions';

function addUser(state, action) {
	let result = Object.assign([], state);
	result.list = result.list.concat([action.user]);
	return result;
}

function removeUser(state, action) {
	let result = Object.assign([], state);
	result.list = result.list.filter(u => u.id !== action.user.id);
	return result;
}

const initialState = {
	list: []
};

export const usersReducer = (state = initialState, action) => {

	switch (action.type) {
		case USERS_ADD:
			return addUser(state, action);
		case USERS_REMOVE:
			return removeUser(state, action);
		default:
			return state;
	}
};
