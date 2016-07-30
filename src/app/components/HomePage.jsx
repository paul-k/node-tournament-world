import React from 'react';

export default class HomePage extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<h1>Hello World from React - { this.props.children }</h1>
		)
	}
}