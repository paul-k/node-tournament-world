import React from 'react';

import generateRounds from 'app/roundGenerator';

class HomePage extends React.Component {

	constructor(props) {
		super(props)

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

	onGenerateRoundsClick() {
		let rounds = generateRounds(this.state.participants.map(p => p.id));
		this.setState({ rounds });
	}

	getParticipantsName(id) {
		var p = this.state.participants.filter(p => p.id === id)[0] || {};
		return p.name;
	}

	render() {
		return (
			<div>
				<form>
					<input type="text" ref="nameInput" />
					<button onClick={ this.onAddNameClick.bind(this) }>Add Participant</button>
				</form>

				<form>
					<button onClick={ this.onGenerateRoundsClick.bind(this) }>Generate Rounds</button>
				</form>

				<h2>participants</h2>
				<ul>
				{
					this.state.participants.map((x, i) => (<li key={ 'part' + i }>{ x.name }</li>))
				}
				</ul>
				
				{
					this.state.rounds.map((x, i) => (
						<div key={ 'round' + (i + 1) }>
							<h3>round { i + 1 }</h3>
							<ul>
								{
									(x.groups || []).map((g, i) => (
										<li key={ 'group' + (i + 1) }>
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
