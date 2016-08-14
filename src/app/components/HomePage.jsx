import React from 'react';

import generateRounds from 'app/roundGenerator';

class HomePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			participants: [
				{ id: 1, name: 'Dave' },
				{ id: 2, name: 'Alvin' },
				{ id: 3, name: 'Simon' },
				{ id: 4, name: 'Theodore' }
			],
			rounds: [],
			scores: []
		};
	}

	onAddNameClick() {
		if (this.refs.nameInput.value.length > 0) {
			let participants = Object.assign([], this.state.participants);

			participants.push({
				id: participants.length + 1,
				name: this.refs.nameInput.value
			});
			this.refs.nameInput.value = '';

			this.setState({ participants });
		}
	}
	onPreventSubmit(e) {
		e.preventDefault();
	}

	onGenerateRoundsClick() {
		let participantsId = this.state.participants.map(p => p.id);
		let convertToRoundGroup = (id, ids) => {
			return {
				id: id,
				id1: ids[0],
				id2: ids[1],
				winnerId: ''
			};
		};

		let rounds = generateRounds(participantsId, convertToRoundGroup);
		this.setState({ rounds });
	}

	calculateScores() {
		let scores = {};

		let winners = this.state.rounds.reduce((rounds, r) => {
			return rounds.concat(
				r.groups.reduce((groups, g) => {
					return groups.concat(parseInt(g.winnerId, 0));
				}, [])
			);
		}, []).sort();

		for (var w = 0; w < winners.length; w++) {
			if (isNaN(winners[w])) {
				continue;
			}

			let p = this.state.participants.filter((a) => a.id === winners[w])[0];
			if (scores.hasOwnProperty(p.name)) {
				scores[p.name] += 1;
			} else {
				scores[p.name] = 1;
			}
		}

		this.setState({ scores });
	}

	onGroupWinnerSelected(group, e) {
		group.winnerId = e.target.value;
		this.calculateScores();
	}

	generateRoundGroup(group, idx) {
		var participant1 = this.state.participants.filter(p => p.id === group.id1)[0];
		var participant2 = this.state.participants.filter(p => p.id === group.id2)[0];

		if (participant1 && participant2) {
			return (
				<li key={ idx }>
					<span>{ participant1.name } <i>vs</i> { participant2.name }</span>
					<select value={ group.winnerId } onChange={ this.onGroupWinnerSelected.bind(this, group) }>
						<option value="">Winner?..</option>
						<option value={ participant1.id }>{ participant1.name }</option>
						<option value={ participant2.id }>{ participant2.name }</option>
					</select>
				</li>
			);
		}

		return (
			<li key={ idx }>
				{ (participant1 || participant2).name }
				<select value={ group.winnerId }>
						<option value={ (participant1 || participant2).id }>{ (participant1 || participant2).name }</option>
					</select>
			</li>
		);
	}

	generateRound(round, idx) {
		return (
			<div key={ idx }>
				<h3>round { idx + 1 }</h3>
				<ul>
					{ (round.groups || []).map(this.generateRoundGroup.bind(this)) }
				</ul>
			</div>
		);
	}

	render() {
		return (
			<div>

				<h2>participants</h2>
				<ul>
					{ this.state.participants.map((p, pi) => (<li key={ pi }>{ p.name }</li>)) }
				</ul>

				<form onSubmit={ this.onPreventSubmit.bind(this) }>
					<input type="text" ref="nameInput" />
					<button onClick={ this.onAddNameClick.bind(this) }>Add Participant</button>
				</form>

				<form onSubmit={ this.onPreventSubmit.bind(this) }>
					<button onClick={ this.onGenerateRoundsClick.bind(this) }>Generate Rounds</button>
				</form>

				{ this.state.rounds.map(this.generateRound.bind(this)) }
			</div>
		);
	}
}

export default HomePage;
