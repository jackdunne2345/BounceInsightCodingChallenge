import { ChangeEvent, useEffect, useState } from "react";
import bounceLogo from "./assets/bounce2.png";
import bounceLogoDark from "./assets/bounce1.png";
import CountryContent from "./components/CountryContent";
import { CountryInterface } from "./components/CountryInterface";
import { useMediaQuery } from "@material-ui/core";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [data, setData] = useState<CountryInterface | null>(null);
  const [error, setError] = useState<string | null>("no data");
  const [countryName, setCountryName] = useState<string>("");
  const [isShrunk, setIsShrunk] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const imageSource = prefersDarkMode ? bounceLogoDark : bounceLogo;

  useEffect(() => {
    const divElement = document.getElementById("space");
    if (!isShrunk) {
      divElement!.className = "box";
    }
    if (isShrunk) {
      divElement!.className = "shrunk";
    }
  }, [isShrunk]);

  const handleGetInfo = async () => {
    try {
      const response = await fetch("/getCountryInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countryName }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        setError(null);
      } else {
        const errorResponse = await response.json();
        if (errorResponse && errorResponse.error) {
          setError(
            `Server Error ${errorResponse.error.status}: ${errorResponse.error.message}`
          );
        } else {
          setError(`Error: ${response.status} - ${response.statusText}`);
        }
        setData(null);
      }
    } catch (error) {
      setData(null);
      setError("Couldn't reach the server");
    }
    setIsLoading((prevState) => !prevState);
    setIsShrunk((prevState) => !prevState);
  };

  const submit = async () => {
    if (
      data === null ||
      (cleanString(countryName) != cleanString(data!.name?.common!) &&
        cleanString(countryName) != cleanString(data!.name?.official!))
    ) {
      if (isShrunk) {
        setIsShrunk((prevState) => !prevState);
        console.log("conditional is shrunk");
      }
      setIsLoading((prevState) => !prevState);

      await handleGetInfo();

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    function cleanString(inputString: string) {
      const cleanedString = inputString.replace(/[^a-zA-Z ]/g, "");
      const string = cleanedString.toLowerCase();
      return string;
    }
  };

  const handleKeyPress = async (e: any) => {
    if (e.key === "Enter") {
      await submit();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
  };

  return (
    <div className="container">
      <div className="logo-container">
        <a href="https://bounceinsights.com/" id="logoA">
          <img src={imageSource} className="page-logo " />
        </a>
      </div>
      <div className="search-container glow">
        <input
          onChange={handleInputChange}
          type="text"
          className="search-input"
          id="countrySearch"
          placeholder="Search..."
          onKeyDown={handleKeyPress}
        />
        <button
          className="search-button"
          onClick={async () => {
            await submit();
          }}
        >
          <span className="button-content">Search</span>
        </button>
      </div>
      <div className="country-container" style={{ textAlign: "center" }}>
        <div id="space">
          {isLoading && <div className="loading-wheel"></div>}
        </div>
        {data ? (
          <CountryContent data={data} />
        ) : (
          <p style={{ color: "red" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default App;
