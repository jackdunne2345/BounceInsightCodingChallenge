import { useState } from "react";

import bounceLogo from "./assets/bounce2.png";

import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <div className="page-logo">
          <a href="https://bounceinsights.com/">
            <img src={bounceLogo} />
          </a>
        </div>
        <div className="search-container glow">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="search-button">Search</button>
        </div>
        <p>This is some test</p>
      </div>
    </>
  );
}

export default App;
