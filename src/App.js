import React, { Component } from "react";
import Input from "./Input";
import Response from "./Response";
import Sentiment from "sentiment";
import axios from "axios";
import "./css/App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const calcCumulativeScore = (arr) => {
	let i;
	let curComment;
	let num_positive = 0;
	let num_negative = 0;
	const sentiment = new Sentiment();
	let result = sentiment.analyze(curComment);
	let curScore = 0;
	for (i = 0; i < arr.length; i++) {
		curComment = arr[i].snippet.topLevelComment.snippet.textDisplay;
		result = sentiment.analyze(curComment);
		if (result.score < 0) {
			num_negative++;
		} else {
			num_positive++;
		}
		curScore += result.score;
	}
	//console.log(num_positive, num_negative, arr.length);
	let nums = {
		np: num_positive,
		nn: num_negative,
		curScore: curScore,
	};
	return nums;
};

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videoId: "",
			result: null,
			num_positive: 0,
			num_negative: 0,
			displayError: false,
		};

		this.updateLink = this.updateLink.bind(this);
		this.updateError = this.updateError.bind(this);
	}

	async updateLink(e, val) {
		if (val) {
			this.setState(
				() => {
					this.props.setDisplayError(false);
					return { ...this.state, videoId: e, displayError: false };
				},
				async () => {
					const params = {
						textFormat: "plainText",
						part: "snippet",
						maxResults: 100,
						videoId: this.state.videoId,
						key: API_KEY,
					};

					try {
						const res = await axios.get(
							`https://www.googleapis.com/youtube/v3/commentThreads`,
							{ params }
						);

						//console.log(res.data.items);
						let score = calcCumulativeScore(res.data.items);
						this.setState(
							() => {
								return {
									...this.state,
									result: score,
									num_negative: score.nn,
									num_positive: score.np,
								};
							},
							() => {
								this.props.setter(
									this.state.num_positive,
									this.state.num_negative
								);
							}
						);
					} catch (err) {
						//console.log(err);
						this.setState(
							() => {
								return { ...this.state, displayError: true };
							},
							() => {
								this.props.setDisplayError(true);
							}
						);
					}
				}
			);
		}
	}

	updateError(val) {
		this.setState(
			() => {
				return { ...this.state, displayError: val };
			},
			() => {
				this.props.setDisplayError(val);
			}
		);
	}

	render() {
		return (
			<div className="App">
				<Input update={this.updateLink} errorUpdate={this.updateError} />
				<Response
					videoId={this.state.videoId}
					num_negative={this.state.num_negative}
					num_positive={this.state.num_positive}
					error={this.state.displayError}
				/>
				;
			</div>
		);
	}
}
