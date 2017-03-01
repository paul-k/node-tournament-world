export const TOURNAMENT_RESET = 'TOURNAMENT_RESET';
export const TOURNAMENT_ADD_PARTICIPANT = 'TOURNAMENT_ADD_PARTICIPANT';
export const TOURNAMENT_UPDATE_ROUNDS = 'TOURNAMENT_UPDATE_ROUNDS';
export const TOURNAMENT_CALCULATE_SCORES = 'TOURNAMENT_CALCULATE_SCORES';

export function resetTournament() {
	return { type: TOURNAMENT_RESET };
}

export function addParticipant(participant) {
	return { type: TOURNAMENT_ADD_PARTICIPANT, participant };
}

export function updateRounds(roundsData) {
	return { type: TOURNAMENT_UPDATE_ROUNDS, data: roundsData };
}

export function calculateScores() {
	return { type: TOURNAMENT_CALCULATE_SCORES };
}

export function generateRounds(participantsId) {
	return (dispatch) => {
		return fetch('/api/generator/roundRobin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(participantsId)
		}).then(resp => {
			return resp.json();
		}).then(data => {
			dispatch(updateRounds(data));
			dispatch(calculateScores());
		});
	};
}

export function loadTournament(tournamentId) {
	return (dispatch) => {
		return fetch(`/api/tournaments/${tournamentId}`)
			.then(resp => {
				return resp.json();
			}).then(data => {
				dispatch(resetTournament());
				for (var p = 0; p < data.participants.length; p++) {
					dispatch(addParticipant(data.participants[p]));
				}
				dispatch(updateRounds(data.rounds));
				dispatch(calculateScores());
			});
	};
}
