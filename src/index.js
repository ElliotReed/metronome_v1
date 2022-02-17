import React from "react";
import ReactDOM from "react-dom";
import "./normalize.css";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("metronome-root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
