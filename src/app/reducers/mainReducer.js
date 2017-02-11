import { usersReducer } from 'app/reducers/usersReducer';

export const initialState = {
};

export const mainReducer = (state = initialState, action) => {
	return {
		users: usersReducer(state.users, action)
	};
};
