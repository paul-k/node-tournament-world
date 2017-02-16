import React from 'react';
import { connect } from 'react-redux';

export class ScoreBoard extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
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
}

const mapStateToProps = (state) => {
	return {
		scores: state.tournament.scores
	};
};

export default connect(mapStateToProps)(ScoreBoard);
