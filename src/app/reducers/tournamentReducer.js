import { TOURNAMENT_RESET, TOURNAMENT_ADD_PARTICIPANT, TOURNAMENT_UPDATE_ROUNDS, TOURNAMENT_CALCULATE_SCORES } from 'app/actions/tournamentActions';

const initialState = {
	participants: [],
	rounds: [],
	scores: []
};

const resetTournament = (state, action) => {
	return initialState;
};

const addParticipant = (state, action) => {
	let result = Object.assign({}, state);
	result.participants = state.participants.slice(0).concat([action.participant]);
	return result;
};

const updateRounds = (state, action) => {
	let result = Object.assign({}, state);
	result.rounds = action.data;
	return result;
};

const calculateScores = (state, action) => {
	let result = Object.assign({}, state);

	let roundWinnerIds = result.rounds.reduce((rs, r) => {
		return rs.concat(r.groups.reduce((gs, g) => {
			return gs.concat(g.winnerId, []);
		}, []));
	}, []).sort();

	let scores = [], currentId;
	for (let w = 0; w < roundWinnerIds.length; w++) {
		let winnersId = roundWinnerIds[w];
		if (isNaN(winnersId) || winnersId === 0) {
			continue;
		}

		if (winnersId !== currentId) {
			let p = result.participants.filter((a) => a.id === winnersId)[0];
			scores.push({
				pid: p.id,
				name: p.name,
				score: 1
			});
		} else {
			scores[scores.length - 1].score++;
		}
		currentId = winnersId;
	}

	for (let x = 0; x < scores.length; x++) {
		for (let y = 0; y < x; y++) {
			if (scores[x].score > scores[y].score) {
				let s = scores[x];
				scores[x] = scores[y];
				scores[y] = s;
			}
		}
	}

	result.scores = scores;
	return result;
};

export const tournamentReducer = (state = initialState, action) => {

	switch (action.type) {
		case TOURNAMENT_RESET:
			return resetTournament(state, action);
		case TOURNAMENT_ADD_PARTICIPANT:
			return addParticipant(state, action);
		case TOURNAMENT_UPDATE_ROUNDS:
			return updateRounds(state, action);
		case TOURNAMENT_CALCULATE_SCORES:
			return calculateScores(state, action);
		default:
			return state;
	}
};
