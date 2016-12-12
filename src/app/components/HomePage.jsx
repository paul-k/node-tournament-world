import React from 'react';

import generateRounds from 'app/services/roundGenerator';

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
				groupId: id,
				firstId: ids[0],
				secondId: ids[1],
				winnerId: 0
			};
		};

		let rounds = generateRounds(participantsId, convertToRoundGroup);
		this.setState({ rounds });
	}

	findParticipant(id) {
		return this.state.participants.filter((a) => a.id === id)[0];
	}

	calculateScores() {
		let scores = {};

		let winners = this.state.rounds.reduce((rounds, r) => {
			return rounds.concat(
				r.groups.reduce((groups, g) => {
					return groups.concat(g.winnerId, 0);
				}, [])
			);
		}, []).sort();

		for (let w = 0; w < winners.length; w++) {
			let winnersId = winners[w];
			if (isNaN(winnersId)) {
				continue;
			}

			let p = this.findParticipant(winnersId);
			if (scores.hasOwnProperty(p.name)) {
				scores[p.name] += 1;
			} else {
				scores[p.name] = 1;
			}
		}

		this.setState({ scores });
	}

	onGroupWinnerSelected(group, e) {
		group.winnerId = parseInt(e.target.value, 0);
		this.calculateScores();
	}

	generateRoundGroup(group, idx) {
		var participant1 = this.findParticipant(group.firstId);
		var participant2 = this.findParticipant(group.secondId);

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
