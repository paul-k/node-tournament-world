export const USERS_ADD = 'USERS_ADD';
export const USERS_REMOVE = 'USERS_REMOVE';
export const USERS_LOAD_FROM_SERVER = 'USERS_LOAD_FROM_SERVER';

export function addUser(user) {
	return { type: USERS_ADD, user };
}

export function removeUser(user) {
	return { type: USERS_REMOVE, user };
}

export function loadUsers() {
	return (dispatch) => {
		fetch('/api/users')
			.then(resp => {
				return resp.json();
			}).then(data => {
				for (let i = 0; i < data.length; i++) {
					dispatch(addUser(data[i]));
				}
			});
	};
}
