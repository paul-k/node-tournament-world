import React from 'react';
import { connect } from 'react-redux';

import { loadTournament, addParticipant, generateRounds, calculateScores } from 'app/actions/tournamentActions';

export class TournamentPage extends React.Component {

	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	this.props.onPageLoad();
	// }

	onAddNameClick() {
		if (this.refs.nameInput.value.length > 0) {
			let newParticipant = {
				id: this.props.participants.length + 1,
				name: this.refs.nameInput.value
			};

			this.refs.nameInput.value = '';

			this.props.onAddParticipant(newParticipant);
		}
	}
	onPreventSubmit(e) {
		e.preventDefault();
	}

	onGenerateRoundsClick() {
		let participantsId = this.props.participants.map(p => p.id);
		this.props.onGenerateRounds(participantsId);
	}

	findParticipant(id) {
		return this.props.participants.filter((a) => a.id === id)[0];
	}

	onGroupWinnerSelected(group, e) {
		group.winnerId = parseInt(e.target.value, 0);

		this.props.onUpdateScores();
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
		let { scores } = this.props;

		if (scores.length === 0) {
			return null;
		}

		return (
			<div>
				<h2>scores</h2>
				<ul>
					{ scores.map((s) => (<li key={ s.pid }>{ s.name } : { s.score }</li>)) }
				</ul>
			</div>
		);
	}

	render() {
		let { participants, scores } = this.props;

		return (
			<div>

				<h2>participants</h2>
				<ul>
					{ participants.map((p, pi) => (<li key={ pi }>{ p.name }</li>)) }
				</ul>

				<form onSubmit={ this.onPreventSubmit.bind(this) }>
					<input type="text" ref="nameInput" />
					<button onClick={ this.onAddNameClick.bind(this) }>Add Participant</button>
				</form>

				<form onSubmit={ this.onPreventSubmit.bind(this) }>
					<button onClick={ this.onGenerateRoundsClick.bind(this) }>Generate Rounds</button>
				</form>

				{ this.renderScoreBoard() }

				{ rounds.map(this.generateRound.bind(this)) }
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onPageLoad: () => {
			dispatch(loadTournament());
		},
		onAddParticipant: (newParticipant) => {
			dispatch(addParticipant(newParticipant));
		},
		onGenerateRounds: (participantsId) => {
			dispatch(generateRounds(participantsId));
		},
		onUpdateScores: () => {
			dispatch(calculateScores());
		}
	};
};

const mapStateToProps = (state) => {
	return {
		participants: state.tournament.participants,
		rounds: state.tournament.rounds,
		scores: state.tournament.scores
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentPage);
