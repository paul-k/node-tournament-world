/* eslint no-console: 0 */

const calculateAvailableCombinations = (participantIds) => {

	let availableCombinations = [];

	for (var i = 0; i < participantIds.length; i++) {
		let p = participantIds[i];
		for (var z = 1; z <= participantIds.length; z++) {
			let p2 = participantIds[z];
			if (p2 > p) {
				availableCombinations.push([p, p2]);
			}
		}
	}

	return availableCombinations;
};

const generateRounds = (participantIds, convertToRoundGroup) => {

	let rounds = [];

	participantIds = (participantIds instanceof Array ? participantIds : [participantIds]).sort();
	if (participantIds.length % 2 !== 0) {
		participantIds.unshift(-1);
	}

	convertToRoundGroup = convertToRoundGroup || ((x) => x);

	let numberOfRounds = participantIds.length - 1;
	let combinationsPerRound = participantIds.length / 2;

	let availableCombinations = calculateAvailableCombinations(participantIds);
	//console.log('start', JSON.stringify(availableCombinations));

	for (let r = 1; r <= numberOfRounds; r++) {
		//console.log(r, 'availableCombinations', JSON.stringify(availableCombinations));
		let round = {
			id: r,
			groups: []
		};

		let map = [], acceptedGroups = [], disallowedGroups = [];

		while (map.length < combinationsPerRound) {
			let usedIds = acceptedGroups.reduce((a, i) => a.concat(i), []);
			let available = availableCombinations.filter(ac =>
				disallowedGroups.indexOf(ac) === -1 && usedIds.indexOf(ac[0]) === -1 && usedIds.indexOf(ac[1]) === -1);

			if (available.length === 0) {
				let disallowedIndex = map[map.length - 1];
				let previous = availableCombinations[disallowedIndex];
				map.pop();
				acceptedGroups.pop();
				disallowedGroups.push(previous);
			} else {
				let firstAvailable = available[0];
				map.push(availableCombinations.indexOf(firstAvailable));
				acceptedGroups.push(firstAvailable);
			}
		}

		//console.log(r, map);

		for (let ag = 0; ag < acceptedGroups.length; ag++) {
			let acceptedGroup = acceptedGroups[ag];
			let group = convertToRoundGroup(ag + 1, acceptedGroup);
			round.groups.push(group);

			availableCombinations.splice(availableCombinations.indexOf(acceptedGroup), 1);
		}
		round.groups.reverse();

		rounds.push(round);
	}

	return rounds;
};

export default generateRounds;
