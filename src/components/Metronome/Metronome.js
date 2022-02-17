import React, { Component } from "react";
import "./metronome.css";
import click from "./click.wav";
import clickAccent from "./clickAccent.wav";
import Button from "../common/Button";

function MechanicalMetronome({ bpm, swingAnimation, onChange }) {
  return (
    <div className="mechanicalMetronome">
      <div className="metronome__body-faceplate" />
      <div className="pendulum" style={swingAnimation}>
        <div className="pendulum__bottom">
          <div className="pendulum__weight" />
        </div>
        <input
          tabIndex="0"
          className="pendulum__top"
          type="range"
          min="40"
          max="320"
          value={bpm}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function MetronomeControls({ bpm, playing, onClick }) {
  return (
    <div className="MetronomeControls">
      <div className="bpm-display">{bpm} BPM</div>
      <Button onClick={onClick}>{playing ? "Stop" : "Start"}</Button>
    </div>
  );
}

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      beatsPerMeasure: 4,
      degrees: 270,
      clickLength: 1,
      evenbeat: false,
      accent: false,
      pointerEvents: "all",
    };

    this.click = new Audio(click);
    this.clickAccent = new Audio(clickAccent);
  }

  stopPendulum = () => {
    this.setState({
      degrees: 270,
      pointerEvents: "all",
      clickLength: this.state.clickLength / 2,
    });
  };

  swingPendulum = () => {
    const initialPosition = this.state.degrees;
    const centerDegrees = 270;
    const swingAmount = 45;

    if (initialPosition <= centerDegrees) {
      this.setState({
        degrees: centerDegrees + swingAmount,
        pointerEvents: "none",
      });
    }
    if (initialPosition > centerDegrees) {
      this.setState({
        degrees: centerDegrees - swingAmount,
        pointerEvents: "none",
      });
    }
  };

  startStop = () => {
    const clickLength = ((60 / this.props.bpm) * 1000).toFixed(0);
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState(
        (prevState) => ({
          playing: false,
        }),
        this.stopPendulum()
      );
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(() => {
        this.playClick();
        this.swingPendulum();
      }, clickLength);

      this.setState(
        {
          count: 0,
          playing: true,
          clickLength,
        },
        () => {
          this.playClick();
          this.swingPendulum();
        }
      );
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure, accent, evenbeat } = this.state;

    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0 && accent && !evenbeat) {
      this.clickAccent.play();
    } else if (count % 2 === 0 && evenbeat) {
      this.click.play();
    } else if (!evenbeat) {
      this.click.play();
    }

    // Track the beat
    this.setState((state) => ({
      count: (state.count + 1) % state.beatsPerMeasure,
    }));
  };

  handleBpmChange = (event) => {
    const bpm = event.target.value;

    if (this.state.playing) {
      // Stop old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      this.props.setBpm(bpm);

      this.setState({
        count: 0,
      });
    } else {
      this.props.setBpm(bpm);
    }
  };

  handleCheckboxChange = (event) => {
    let { name } = event.target;

    this.setState((prevState) => {
      return {
        [name]: !prevState[name],
      };
    });
  };

  render() {
    const { playing, degrees, clickLength, accent, evenbeat, pointerEvents } =
      this.state;
    const { bpm } = this.props;

    let swingAnimation = {
      transform: `rotateZ(${degrees}deg)`,
      transitionDuration: `${clickLength}ms`,
      pointerEvents: `${pointerEvents}`,
    };

    return (
      <div className="Metronome">
        <MechanicalMetronome
          bpm={bpm}
          swingAnimation={swingAnimation}
          onChange={this.handleBpmChange}
        />
        <div className="controls">
          <MetronomeControls
            bpm={bpm}
            playing={playing}
            onClick={this.startStop}
          />

          <section className="beat__controls">
            <form className="form">
              <div className="checkgroup">
                <label htmlFor="accent">
                  <input
                    type="checkbox"
                    id="accent"
                    name="accent"
                    value={accent}
                    onChange={this.handleCheckboxChange}
                  />
                  Accent beat 1
                </label>
              </div>
              <div className="checkgroup">
                <label htmlFor="evenbeat">
                  <input
                    type="checkbox"
                    id="evenbeat"
                    name="evenbeat"
                    value={evenbeat}
                    onChange={this.handleCheckboxChange}
                  />
                  2 and 4 only
                </label>
              </div>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default Metronome;
