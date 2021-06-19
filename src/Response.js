import React, { Component } from "react";

export default class Response extends Component {
	render() {
		return (
			<div>
				{this.props.error ? <div>Error</div> : null}
				<div>Score: {this.props.result}</div>
			</div>
		);
	}
}
