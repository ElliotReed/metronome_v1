import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Metronome from "./components/Metronome";
import TempoTapper from "./components/TempoTapper";

const App = () => {
  const [bpm, setBpm] = useState(100);

  return (
    <>
      <Header />
      <main className="main">
        <Metronome bpm={bpm} setBpm={setBpm} />
        <TempoTapper setBpm={setBpm} />
      </main>
    </>
  );
};

export default App;
