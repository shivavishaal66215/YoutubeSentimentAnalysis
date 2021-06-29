import React, { Component } from "react";
import "./css/Response.css";
import good from "./images/good.svg";
import bad from "./images/bad.svg";
import search from "./images/search.svg";
import error from "./images/error.svg";

export default class Response extends Component {
	render() {
		let res;
		let msg;
		if (this.props.error) {
			res = error;
			msg = "There was some error. Are you sure you entered the correct url?";
		} else if (
			this.props.num_positive === this.props.num_negative &&
			this.props.num_positive === 0
		) {
			res = search;
			msg = "Go on! Try the app!";
		} else if (this.props.num_positive >= this.props.num_negative) {
			res = good;
			msg =
				"The comments are looking awesome! Keep doing whatever you are doing!";
		} else if (this.props.num_negative > this.props.num_positive) {
			res = bad;
			msg = "Okay, listen up. You might wanna change things up a bit.";
		}
		return (
			<div className="Response">
				<div className="Response-left">
					<img src={res} alt="response" />
				</div>
				<div className="Response-right">
					<div className="Response-content">{msg}</div>
				</div>
			</div>
		);
	}
}
