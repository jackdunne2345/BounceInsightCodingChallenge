import { useEffect, useState } from "react";
import bounceLogo from "./assets/bounce2.png";
import bounceLogoDark from "./assets/bounce1.png";
import CountryContent from "./components/CountryContent";
import jsonData from "./components/ireland.json";
import { CountryData } from "./components/CountryData";
import { useMediaQuery } from "@material-ui/core";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [height, setHeight] = useState<number>(100);
  const [searching, setSearch] = useState<boolean>();
  const [data, setData] = useState<CountryData>(jsonData[0]);
  const [error, setError] = useState();
  const [shrink, setShrink] = useState<boolean>(false);

  const imageSource = prefersDarkMode ? bounceLogoDark : bounceLogo;
  useEffect(() => {
    let animationFrame: number | undefined;
    let lastTimestamp: number | undefined;

    const animateHeight = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      if (height > 0) {
        const elapsedTime = timestamp - lastTimestamp;
        if (elapsedTime > 10) {
          setHeight(height - 20);
          lastTimestamp = timestamp;
        }

        animationFrame = requestAnimationFrame(animateHeight);
      } else {
        setShrink(false);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      }
    };

    if (shrink) {
      animateHeight(0);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [height, shrink]);

  return (
    <div className="container">
      <div className="logo-container">
        <a href="https://bounceinsights.com/" id="logoA">
          <img src={imageSource} className="page-logo " />
        </a>
      </div>
      <div className="search-container glow">
        <input type="text" className="search-input" placeholder="Search..." />
        <button className="search-button" onClick={() => setShrink(true)}>
          <span className="button-content">Search</span>
        </button>
      </div>
      <div className="country-container">
        <div id="space" style={{ height: `${height}%` }}></div>
        <CountryContent data={data} />
      </div>
    </div>
  );
}

export default App;
