import React, { Component } from "react";
import Button from "../common/Button";
import "./tempoTapper.css";

export const calculteBeatsPerMinute = (taps) => {
  const length = taps.length;
  if (length === 1) {
    return "keep tapping!";
  } else {
    const totalTime = taps[length - 1] - taps[0];
    const seconds = totalTime / 1000;
    const beat = seconds / length;
    const bpm = Math.floor(60 / beat);

    return bpm;
  }
};

export default class TempoTapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taps: [],
      tempo: "tap button to start",
    };
  }

  handleTempoTap = () => {
    const now = new Date();
    const taps = this.state.taps;
    taps.push(now);

    if (taps.length > 6) {
      taps.shift();
    }

    const tempo = calculteBeatsPerMinute(taps);
    this.setState({ tempo });
  };

  render() {
    const { tempo } = this.state;
    return (
      <section className="tapper">
        <header>
          <h2 title="Provide at least 6 taps for greater accuracy!">
            Tempo Tapper
          </h2>
        </header>
        <main>
          <div className="tapper__display">
            <h3>Tempo</h3>
            <p>{tempo}</p>
            <Button
              onClick={() => {
                typeof tempo !== "number"
                  ? this.props.setBpm(100)
                  : this.props.setBpm(tempo);
              }}
            >
              Set BPM
            </Button>
          </div>
          <button className="tapper__button" onClick={this.handleTempoTap}>
            Tap!
          </button>
        </main>
      </section>
    );
  }
}
