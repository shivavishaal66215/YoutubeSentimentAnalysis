import React, { Component } from "react";
import Input from "./Input";
import Response from "./Response";
export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			link: "",
			result: "",
		};

		this.updateLink = this.updateLink.bind(this);
	}

	updateLink(e) {
		this.setState(() => {
			return { ...this.state, link: e };
		});
	}

	render() {
		return (
			<div>
				<Input update={this.updateLink} />
				<Response />
			</div>
		);
	}
}
