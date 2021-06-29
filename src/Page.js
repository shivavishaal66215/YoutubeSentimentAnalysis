import React, { Component } from "react";
import "./css/Page.css";
import App from "./App";
import { Doughnut } from "react-chartjs-2";
import Tile from "./Tile";
import img1 from "./images/img1.svg";
import img2 from "./images/img2.svg";
import img3 from "./images/img3.svg";
import img4 from "./images/img4.svg";

export default class Page extends Component {
	constructor(props) {
		super(props);

		this.state = {
			num_positive: 0,
			num_negative: 0,
			displayError: false,
		};

		this.myRef = React.createRef();
		this.myRef2 = React.createRef();
		this.executeScrollToWhy = this.executeScrollToWhy.bind(this);
		this.executeScrollToApp = this.executeScrollToApp.bind(this);
		this.setNums = this.setNums.bind(this);
		this.setDisplayError = this.setDisplayError.bind(this);
	}

	setNums(np, nn) {
		this.setState(() => {
			return { ...this.state, num_negative: nn, num_positive: np };
		});
	}

	setDisplayError(val) {
		this.setState(() => {
			return { ...this.state, displayError: val };
		});
	}

	executeScrollToWhy(e) {
		this.myRef.current.scrollIntoView();
	}

	executeScrollToApp(e) {
		this.myRef2.current.scrollIntoView();
	}

	returnHeroTile() {
		return (
			<div className="Page-fulltile">
				<div className="Page-left">
					<div className="Page-tile-content">
						<div className="Page-tile-heading">Hey there!</div>
						<div className="Page-horizontal-line"></div>
						<div className="Page-tile-addon-content">
							Do you ever wonder how everyone else feel about your Youtube
							video?
						</div>
						<div className="Page-button-container">
							<div className="Page-button" onClick={this.executeScrollToApp}>
								Try App!
							</div>
						</div>
					</div>
				</div>
				<div className="Page-right">
					<img src={img1} alt="img1" />
				</div>
			</div>
		);
	}

	returnSecondTile() {
		return (
			<div className="Page-fulltile Page-second-tile">
				<div className="Page-left">
					<img src={img2} alt="img2" />
				</div>
				<div className="Page-right">
					<div className="Page-tile-content">
						<div className="Page-tile-heading1">What does this app do?</div>
						<div className="Page-tile-addon-content Page-second-tile-addon-content">
							This app lets you find out how friendly or positive your comment
							section is.
						</div>
						<div className="Page-button-container">
							<div className="Page-button" onClick={this.executeScrollToWhy}>
								Why this app?
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	returnThirdTile() {
		const data = {
			labels: ["Positive", "Negative"],
			datasets: [
				{
					label: "Result",
					data: [this.state.num_positive, this.state.num_negative],
					backgroundColor: ["rgb(58,210,158)", "rgb(107,97,254)"],
					hoverOffset: 10,
				},
			],
			options: {
				legend: { reverse: true },
			},
		};
		return (
			<div ref={this.myRef2} className="Page-fulltile Page-third-tile">
				<div className="Page-left">
					<App setter={this.setNums} setDisplayError={this.setDisplayError} />
				</div>
				<div className="Page-right">
					{(this.state.num_positive === 0 && this.state.num_negative === 0) ||
					this.state.displayError ? (
						<img src={img3} alt="img3" />
					) : (
						<Doughnut data={data} />
					)}
				</div>
			</div>
		);
	}

	returnFourthTile() {
		return (
			<div ref={this.myRef} className="Page-fulltile Page-fourth-Tile">
				<div className="Page-left ">
					<img src={img4} alt="img4" />
				</div>
				<div className="Page-right">
					<div className="Page-tile-content">
						<div className="Page-tile-heading3">Why use this app?</div>
						<div className="Page-tile-addon-content Page-second-tile-addon-content">
							You might say: “In a site where there is a like & dislike
							system,why would I need this app?”.You are definitely not wrong.
							<br />
							<br />
							However, think of this app as more of an added metric to the likes
							and dislikes.
						</div>
					</div>
				</div>
			</div>
		);
	}
	render() {
		return (
			<div className="Page">
				<Tile>{this.returnHeroTile()}</Tile>
				<Tile>{this.returnSecondTile()}</Tile>
				<Tile>{this.returnThirdTile()}</Tile>
				<Tile>{this.returnFourthTile()}</Tile>
			</div>
		);
	}
}
