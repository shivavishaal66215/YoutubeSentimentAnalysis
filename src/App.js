import React, { Component } from "react";
import Input from "./Input";
import Response from "./Response";
import Sentiment from "sentiment";
import axios from "axios";
import "./css/App.css";

//API key: AIzaSyDsoPiFEsV3GhfDhvvMZLHndon7-KkjhwA

const calcMultiplier = (val) => {
	let x = Math.pow(Math.E, -1 * val);
	x += 1;
	x = 1 / x;

	return x;
};

const adjustedScore = (score) => {
	let result;

	result = Math.floor(score * 100);

	return result;
};

const calcCumulativeScore = (arr) => {
	let i;
	let curComment, curLikeCount;

	const sentiment = new Sentiment();
	let result = sentiment.analyze(curComment);
	let curScore = 0;
	for (i = 0; i < arr.length; i++) {
		curComment = arr[i].snippet.topLevelComment.snippet.textDisplay;
		curLikeCount = arr[i].snippet.topLevelComment.snippet.likeCount;
		result = sentiment.analyze(curComment);
		curScore += result.score * calcMultiplier(curLikeCount);
	}
	return curScore / arr.length;
};

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videoId: "",
			result: null,
			displayError: false,
		};

		this.updateLink = this.updateLink.bind(this);
		this.updateError = this.updateError.bind(this);
	}

	async updateLink(e, val) {
		if (val) {
			this.setState(
				() => {
					return { ...this.state, videoId: e, displayError: false };
				},
				async () => {
					const params = {
						textFormat: "plainText",
						part: "snippet",
						maxResults: 100,
						videoId: this.state.videoId,
						key: "AIzaSyDsoPiFEsV3GhfDhvvMZLHndon7-KkjhwA",
					};

					try {
						const res = await axios.get(
							`https://www.googleapis.com/youtube/v3/commentThreads`,
							{ params }
						);

						//console.log(res.data.items);
						let score = calcCumulativeScore(res.data.items);
						score = adjustedScore(score);
						this.setState(() => {
							return { ...this.state, result: score };
						});
						console.log(score);
					} catch (err) {
						console.log(err);
						this.setState(() => {
							return { ...this.state, displayError: true };
						});
					}
				}
			);
		}
	}

	updateError(val) {
		this.setState(() => {
			return { ...this.state, displayError: val };
		});
	}

	render() {
		return (
			<div className="App">
				<Input update={this.updateLink} errorUpdate={this.updateError} />
				<Response
					videoId={this.state.videoId}
					score={this.state.result}
					error={this.state.displayError}
				/>
			</div>
		);
	}
}
