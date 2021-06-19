import React, { Component } from "react";

const stripVideoId = (url) => {
	var regExp =
		/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	var match = url.match(regExp);
	return match && match[7].length === 11 ? match[7] : false;
};

export default class Input extends Component {
	constructor(props) {
		super(props);

		this.state = {
			link: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e) {
		this.setState(() => {
			return { ...this.state, link: e.target.value };
		});
	}

	handleClick(e) {
		let videoId = stripVideoId(this.state.link);
		if (videoId !== false) {
			this.props.update(videoId, true);
			this.setState(() => {
				return { ...this.state, link: "" };
			});
		} else {
			this.props.errorUpdate(true);
		}
	}

	render() {
		return (
			<div>
				<input
					type="text"
					placeholder="Youtube Link"
					onChange={this.handleChange}
					value={this.state.link}
				/>
				<button onClick={this.handleClick}>Submit</button>
			</div>
		);
	}
}
