import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playing: false,
			count: 0,
			bpm: 100,
			beatsPerMeasure: 4,
			duration: '1s',
		};

		this.click1 = new Audio(click1);
		this.click2 = new Audio(click2);
	}

	startStop = () => {
		const clickLength = (60 / this.state.bpm) * 1000;
		if (this.state.playing) {
			// Stop the timer
			clearInterval(this.timer);
			this.setState({
				playing: false,
			});
		} else {
			// Start a timer with the current BPM
			this.timer = setInterval(() => {
				this.playClick();
			}, clickLength);
			this.setState(
				{
					count: 0,
					playing: true,
					duration: `${clickLength * 2}ms`,
				},
				this.playClick
			);
		}
	};

	playClick = () => {
		const { count, beatsPerMeasure } = this.state;

		// The first beat will have a different sound than the others
		if (count % beatsPerMeasure === 0) {
			this.click2.play();
		} else {
			this.click1.play();
		}

		// Track the beat
		this.setState(state => ({
			count: (state.count + 1) % state.beatsPerMeasure,
		}));
	};

	handleBpmChange = event => {
		const bpm = event.target.value;

		if (this.state.playing) {
			// Stop old timer and start a new one
			clearInterval(this.timer);
			this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

			this.setState({
				count: 0,
				bpm,
			});
		} else {
			this.setState({ bpm });
		}
	};

	render() {
		const { playing, bpm, duration } = this.state;

		let animateStyle = {
			animationIterationCount: `infinite`,
			animationDuration: `${duration}`,
		};

		return (
			<div className="metronome">
				<div className="bpm-display">{bpm} BPM</div>
				<div className="metronome__body">
					<div className="metronome__body-faceplate" />
					<div
						className="pendulum"
						style={playing ? animateStyle : null}
					>
						<div className="pendulum__bottom">
							<div className="pendulum__weight" />
						</div>
						<input
							className="pendulum__top"
							type="range"
							min="40"
							max="240"
							value={bpm}
							onChange={this.handleBpmChange}
						/>
					</div>
				</div>
				<button onClick={this.startStop}>
					{playing ? 'Stop' : 'Start'}
				</button>
			</div>
		);
	}
}

export default Metronome;
