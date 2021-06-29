import React, { Component } from "react";
import "./css/Input.css";
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
		this.handleKeyDown = this.handleKeyDown.bind(this);
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
		} else {
			this.props.errorUpdate(true);
		}
	}

	handleKeyDown(e) {
		if (e.key === "Enter") {
			//console.log("Enter pressed");
			let videoId = stripVideoId(this.state.link);
			if (videoId !== false) {
				this.props.update(videoId, true);
			} else {
				this.props.errorUpdate(true);
			}
		}
	}

	render() {
		return (
			<div className="Input">
				<div className="Input-overallcontainer">
					<div className="Input-searchbox">
						<label
							style={{ cursor: "pointer" }}
							id="Input-searchiconlabel"
							htmlFor="Input-input"
						>
							<svg
								width="3.5vw"
								height="3.5vw"
								viewBox="0 0 32 32"
								version="1.1"
							>
								<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
									<g id="icon-111-search" fill="#000000">
										<path d="M19.4271164,20.4271164 C18.0372495,21.4174803 16.3366522,22 14.5,22 C9.80557939,22 6,18.1944206 6,13.5 C6,8.80557939 9.80557939,5 14.5,5 C19.1944206,5 23,8.80557939 23,13.5 C23,15.8472103 22.0486052,17.9722103 20.5104077,19.5104077 L26.5077736,25.5077736 C26.782828,25.782828 26.7761424,26.2238576 26.5,26.5 C26.2219324,26.7780676 25.7796227,26.7796227 25.5077736,26.5077736 L19.4271164,20.4271164 L19.4271164,20.4271164 Z M14.5,21 C18.6421358,21 22,17.6421358 22,13.5 C22,9.35786417 18.6421358,6 14.5,6 C10.3578642,6 7,9.35786417 7,13.5 C7,17.6421358 10.3578642,21 14.5,21 L14.5,21 Z"></path>
									</g>
								</g>
							</svg>
						</label>
						<input
							type="text"
							placeholder="Youtube Link"
							onChange={this.handleChange}
							value={this.state.link}
							id="Input-input"
							onKeyPress={this.handleKeyDown}
						/>
					</div>
					<div
						style={{ cursor: "pointer" }}
						id="Input-buttondiv"
						onClick={this.handleClick}
					>
						<svg
							height="2.8vw"
							width="2.8vw"
							viewBox="-18 -18 572 572"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="m268.15625-.0742188c-108.457031-.0195312-206.242188 65.3085938-247.746094 165.5117188-41.496094 100.207031-18.542968 215.542969 58.171875 292.210938 104.703125 104.703124 274.453125 104.703124 379.152344 0 104.699219-104.695313 104.699219-274.445313 0-379.148438-50.167969-50.453125-118.429687-78.746094-189.578125-78.5742188zm0 511.3554688c-134.074219 0-243.203125-109.132812-243.203125-243.207031s109.128906-243.203125 243.203125-243.203125 243.207031 109.128906 243.207031 243.203125-109.132812 243.207031-243.207031 243.207031zm0 0" />
							<path d="m395.621094 185.636719-161.011719 153.902343-87.804687-87.679687c-4.855469-4.855469-12.726563-4.855469-17.585938 0-4.855469 4.859375-4.855469 12.730469 0 17.589844l96.410156 96.410156c2.339844 2.351563 5.535156 3.65625 8.855469 3.613281 3.21875.03125 6.316406-1.226562 8.605469-3.492187l169.742187-162.257813c4.921875-4.769531 5.082031-12.613281.363281-17.578125-4.726562-4.960937-12.566406-5.1875-17.574218-.507812zm0 0" />
						</svg>
					</div>
				</div>
			</div>
		);
	}
}
