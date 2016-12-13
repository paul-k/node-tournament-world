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
			let autoRoundWinnerId = ids.indexOf(-1) > -1 ? ids.filter(_ => _ !== -1)[0] : 0;
			return {
				groupId: id,
				firstId: ids[0],
				secondId: ids[1],
				winnerId: autoRoundWinnerId
			};
		};

		let rounds = generateRounds(participantsId, convertToRoundGroup);
		let scores = this.calculateScores(rounds);

		this.setState({ rounds, scores });
	}

	findParticipant(id) {
		return this.state.participants.filter((a) => a.id === id)[0];
	}

	calculateScores(rounds) {
		rounds = rounds || this.state.rounds;

		let roundWinnerIds = rounds.reduce((rs, r) => {
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
				let p = this.findParticipant(winnersId);
				scores.push({ pid: p.id, name: p.name, score: 1 });
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

		return scores;
	}

	onGroupWinnerSelected(group, e) {
		group.winnerId = parseInt(e.target.value, 0);
		let scores = this.calculateScores();

		this.setState({ scores });
	}

	generateRoundGroup(group, idx) {
		var participant1 = this.findParticipant(group.firstId);
		var participant2 = this.findParticipant(group.secondId);

		if (participant1 && participant2) {
			return (
				<li key={ idx }>
					<span>{ participant1.name } <i>vs</i> { participant2.name }</span>
					<select defaultValue={ group.winnerId } onChange={ this.onGroupWinnerSelected.bind(this, group) }>
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
				<select defaultValue={ group.winnerId }>
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

	renderScoreBoard() {
		if (this.state.scores.length === 0) {
			return null;
		}

		return (
			<div>
				<h2>scores</h2>
				<ul>
					{ this.state.scores.map((s) => (<li key={ s.pid }>{ s.name } : { s.score }</li>)) }
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

				{ this.renderScoreBoard() }

				{ this.state.rounds.map(this.generateRound.bind(this)) }
			</div>
		);
	}
}

export default HomePage;
