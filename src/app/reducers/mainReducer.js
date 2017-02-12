import { usersReducer } from 'app/reducers/usersReducer';
import { tournamentReducer } from 'app/reducers/tournamentReducer';

export const initialState = {
};

export const mainReducer = (state = initialState, action) => {
	return {
		users: usersReducer(state.users, action),
		tournament: tournamentReducer(state.tournament, action)
	};
};
