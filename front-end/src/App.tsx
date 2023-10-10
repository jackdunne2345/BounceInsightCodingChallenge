import { useState } from "react";
import bounceLogo from "./assets/bounce2.png";
import CountryContent from "./components/CountryContent";
import jsonData from "./components/ireland.json";
import { CountryData } from "./components/CountryData";

function App() {
  const [height, setHeight] = useState<number>(100);
  const [searching, setSearch] = useState<boolean>();
  const [data, setData] = useState<CountryData>(jsonData);
  const [error, setError] = useState();

  const decreaseHeight = () => {
    if (height > 0) {
      setHeight(height - 10);
    }
  };

  return (
    <>
      <div className="container">
        <div className="logo-container">
          <a href="https://bounceinsights.com/" id="logoA">
            <img src={bounceLogo} className="page-logo " />
          </a>
        </div>
        <div className="search-container glow">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="search-button" onClick={decreaseHeight}>
            <span className="button-content">Search</span>
          </button>
        </div>
        <div className="country-container">
          <div id="space" style={{ height: `${height}%` }}></div>
          <CountryContent data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
