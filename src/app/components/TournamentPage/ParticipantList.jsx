import React from 'react';
import { connect } from 'react-redux';

import { addParticipant } from 'app/actions/tournamentActions';

export class ParticipantList extends React.Component {

	constructor(props) {
		super(props);
	}

	onPreventSubmit(e) {
		e.preventDefault();
	}

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

	renderAddPartipant() {
		if (this.props.canNoLongerAddParticipants) {
			return null;
		}

		return (
			<form onSubmit={ this.onPreventSubmit.bind(this) }>
				<input type="text" ref="nameInput" />
				<button onClick={ this.onAddNameClick.bind(this) }>Add Participant</button>
			</form>
		);
	}

	render() {
		let { participants } = this.props;

		return (
			<div>
				<h2>participants</h2>
				<ul>
					{ participants.map((p, pi) => (<li key={ pi }>{ p.name }</li>)) }
				</ul>

				{ this.renderAddPartipant() }
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAddParticipant: (newParticipant) => {
			dispatch(addParticipant(newParticipant));
		}
	};
};

const mapStateToProps = (state) => {
	return {
		participants: state.tournament.participants,
		canNoLongerAddParticipants: state.tournament.rounds.length > 0
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);
