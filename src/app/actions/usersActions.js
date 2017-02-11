export const USERS_ADD = 'USERS_ADD';
export const USERS_REMOVE = 'USERS_REMOVE';

export function addUser(usersName) {
	return { type: USERS_ADD, name: usersName };
}

export function removeUser(usersName) {
	return { type: USERS_REMOVE, name: usersName };
}
