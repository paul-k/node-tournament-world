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
			rounds: []
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
	onAddNameSubmit(e) {
		e.preventDefault();
		this.onAddNameClick();
	}

	onGenerateRoundsClick() {
		let rounds = generateRounds(this.state.participants.map(p => p.id));
		this.setState({ rounds });
	}
	onGenerateRoundsSubmit(e) {
		e.preventDefault();
		this.onGenerateRoundsClick();
	}

	getParticipantsName(id) {
		var participant = this.state.participants.filter(p => p.id === id)[0] || {};
		return participant.name;
	}

	render() {
		return (
			<div>
				<form onSubmit={ this.onAddNameSubmit.bind(this) }>
					<input type="text" ref="nameInput" />
					<button onClick={ this.onAddNameClick.bind(this) }>Add Participant</button>
				</form>

				<form onSubmit={ this.onGenerateRoundsSubmit.bind(this) }>
					<button onClick={ this.onGenerateRoundsClick.bind(this) }>Generate Rounds</button>
				</form>

				<h2>participants</h2>
				<ul>
				{
					this.state.participants.map((p, pi) => (<li key={ 'part' + pi }>{ p.name }</li>))
				}
				</ul>

				{
					this.state.rounds.map((r, ri) => (
						<div key={ 'round' + (ri + 1) }>
							<h3>round { ri + 1 }</h3>
							<ul>
								{
									(r.groups || []).map((g, gi) => (
										<li key={ 'group' + (gi + 1) }>
											{ this.getParticipantsName(g.id1) }{g.id1} - { this.getParticipantsName(g.id2) }{g.id2}
										</li>
									))
								}
							</ul>
						</div>
					))
				}
			</div>
		);
	}
}

export default HomePage;
