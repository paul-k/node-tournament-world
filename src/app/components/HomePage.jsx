import React from 'react';

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
			rounds: [{
				groups: [{
					name1: 1,
					name2: 2
				}, {
					name1: 3,
					name2: 4
				}]
			}, {
				groups: [{
					name1: 1,
					name2: 3
				}, {
					name1: 2,
					name2: 4
				}]
			}, {
				groups: [{
					name1: 1,
					name2: 4
				}, {
					name1: 2,
					name2: 3
				}]
			}]
		}
	}

	onAddNameClick() {
		if (this.refs.nameInput.value.length > 0) {
			let participants = Object.assign([], this.state.participants);

			participants.push({
				id: participants.length,
				name: this.refs.nameInput.value
			});
			this.refs.nameInput.value = '';

			this.setState({ participants: participants });
		}
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
									x.groups.map(g => (
										<li>
											{ this.getParticipantsName(g.name1) } - { this.getParticipantsName(g.name2) }
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
