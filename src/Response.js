import React, { Component } from "react";
import "./css/Response.css";

export default class Response extends Component {
	constructor(props) {
		super(props);
	}

	errorDiv() {
		return (
			<div className="Response-ErrorDiv">
				<div className="Response-Outerring">
					<div className="Response-Middlering">
						<div className="Response-Innerring">Error</div>
					</div>
				</div>
				<div className="Response-ErrorMessage">
					There was some error fetching comments. Please check if you have
					pasted the correct link
				</div>
			</div>
		);
	}

	resultDiv() {
		return (
			<div className="Response-ErrorDiv">
				<div className="Response-Outerring">
					<div className="Response-Middlering">
						<div className="Response-Innerring">{this.props.score}</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="Response">
				{this.props.error ? this.errorDiv() : null}
				{this.props.score !== null && this.props.error != true
					? this.resultDiv()
					: null}
			</div>
		);
	}
}
