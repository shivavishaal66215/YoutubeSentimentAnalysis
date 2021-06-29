import React, { Component } from "react";
import "./css/Tile.css";
export default class Tile extends Component {
	render() {
		return <div className="Tile">{this.props.children}</div>;
	}
}
