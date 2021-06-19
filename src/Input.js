import React, { Component } from "react";

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
		this.props.update(this.state.link);

		this.setState(() => {
			return { ...this.state, link: "" };
		});
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
