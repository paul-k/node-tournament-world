import React from 'react';
import { connect } from 'react-redux';

import { loadTournament } from 'app/actions/tournamentActions';

import ParticipantList from 'app/components/TournamentPage/ParticipantList';
import ScoreBoard from 'app/components/TournamentPage/ScoreBoard';
import Rounds from 'app/components/TournamentPage/Rounds';

export class TournamentPage extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onPageLoad(this.props.params.tid);
	}

	render() {
		let { params } = this.props;

		return (
			<div>
				<h1>{ params.tid }</h1>

				<ParticipantList />
				<ScoreBoard />

				<Rounds />

			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onPageLoad: (tournamentId) => {
			dispatch(loadTournament(tournamentId));
		}
	};
};

const mapStateToProps = (state) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentPage);
