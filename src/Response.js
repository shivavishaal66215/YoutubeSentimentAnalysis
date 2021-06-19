import React, { Component } from "react";
import Sentiment from "sentiment";

//API key: AIzaSyDsoPiFEsV3GhfDhvvMZLHndon7-KkjhwA

export default class Response extends Component {
	constructor(props) {
		super(props);

		this.state = {
			score: undefined,
		};
	}

	componentDidMount() {
		const str = "Cats are dumb";
		const sentiment = new Sentiment();
		const result = sentiment.analyze(str);
		this.setState(() => {
			return { ...this.state, score: result.score };
		});
	}
	render() {
		return (
			<div>
				<div>Score: {this.state.score}</div>
			</div>
		);
	}
}
