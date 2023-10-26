import { useState } from "react";
import { CountryInterface } from "./CountryInterface";
import "../styleSheets/country.css";

export default function CountryContent(props: { data: CountryInterface }) {
  const [showTranslations, setShowTranslations] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  const colors = ["#242424", "#757575"];

  const handleMouseEnter = () => {
    setShowTranslations(true);
  };

  const handleMouseLeave = () => {
    setShowTranslations(false);
  };

  const nativeNames = Object.entries(props.data.name!.nativeName!).map(
    ([key, value]) => ({
      language: key,
      official: value.official,
      common: value.common,
    })
  );

  const languages = Object.entries(props.data.languages!).map(
    ([key, value]) => ({
      key: key,
      language: value,
    })
  );

  const translations = Object.entries(props.data.translations!).map(
    ([key, value]) => ({
      short: key,
      name: value.common,
    })
  );

  const currencies = Object.entries(props.data.currencies!).map(
    ([key, value]) => ({
      name: value.name,
      short: key,
      symbol: value.symbol,
    })
  );
  const demonyms = Object.entries(props.data.demonyms!).map(([key, value]) => ({
    lang: key,
    m: value.m,
    f: value.f,
  }));

  return (
    <div className="country-content">
      {props.data ? (
        <>
          <div id="flag-container">
            <img id="flag" src={props.data.flags!.svg} />
          </div>
          <div
            id="name"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <p>
                <strong>{props.data.name!.common + ", "}</strong>{" "}
                {props.data.subregion ? props.data.subregion + ", " : ""}
                {props.data.region ? props.data.region : ""}
              </p>
            </div>
            {/* come back to this */}
            {showTranslations && (
              <div className="hover-box">
                <p>Translation:</p>{" "}
                {translations.map((value, index) => (
                  <>
                    <strong key={index}>
                      {value.name}
                      {index != translations.length ? ", " : " "}
                    </strong>
                  </>
                ))}
              </div>
            )}
          </div>
          <p>
            {props.data.name!.common} is{" "}
            {props.data.independent ? "an independent" : "a non independent"},{" "}
            {props.data.landlocked ? "landlocked" : "not landlocked"} country
            located on the{" "}
            {props.data.continents!.length > 1 ? "continents" : "continent"} of
            {props.data.continents!.map((value, index) => (
              <>
                {" " + value}
                {index === props.data.continents!.length - 2 && " and"}
                {index < props.data.continents!.length - 2 && ","}
              </>
            ))}{" "}
            positioned at{" "}
            {"(lat:" +
              props.data.latlng![0] +
              " lng:" +
              props.data.latlng![1] +
              ")"}
            . {props.data.name!.common} is{" "}
            {props.data.unMember
              ? "a UN member country"
              : "not a member of the United Nations"}{" "}
            and has a population of{" "}
            {props.data.population!.toLocaleString() + " "}
            people and a land area of{" "}
            {props.data.area!.toLocaleString() + "km². "} The{" "}
            {languages.length > 1 ? "languages" : "language"} spoken officially
            in {props.data.name!.common} {languages.length > 1 ? "are" : "is "}{" "}
            {languages.map((value, index) => (
              <>
                {value.language}
                {index === languages.length - 2 && " and "}
                {index < languages.length - 2 && ", "}
              </>
            ))}
            . The {currencies.length > 1 ? "currencies" : "currency"} you can
            use when traveling to {props.data.name!.common}{" "}
            {currencies.length > 1 ? "are" : "is"}{" "}
            {currencies.map((value, index) => (
              <>
                {value.symbol + " " + value.name}
                {index === currencies.length - 2 && " and "}
                {index < currencies.length - 2 && ", "}
              </>
            ))}
          </p>
          <p>
            {props.data.name!.common}s capital is {props.data.capital} located
            at{" "}
            {"(lat: " +
              props.data!.capitalInfo!.latlng?.[0] +
              " lng: " +
              props.data!.capitalInfo!.latlng?.[1] +
              ")"}
            {". "}Make sure to remember that cars drive on the{" "}
            {props.data.car!.side} hand side of the road. Take note of this is
            different in your home country.
          </p>{" "}
          <button onClick={() => setShowMoreInfo(!showMoreInfo)}>
            {showMoreInfo ? "Hide info" : "See more information"}
          </button>
          <br></br>
          {showMoreInfo && (
            <div className="more-info">
              <div className="entry">
                <div className="info-top">
                  <strong>Coat of arms:</strong>
                </div>{" "}
                <div className="info-bottom">
                  <img src={props.data.coatOfArms?.svg} alt="" />
                </div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>Start of the week</strong>
                </div>{" "}
                <div className="info-bottom">
                  <div> {props.data.startOfWeek}</div>
                </div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>Time zones</strong>
                </div>{" "}
                <div className="info-bottom">
                  {props.data.timezones?.map((value, index) => (
                    <div
                      style={{
                        color: colors[Math.abs((index % 2) - 1)],
                        width: "100%",
                        backgroundColor: colors[index % 2],
                      }}
                      className="generate"
                      key={index}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>Car signs</strong>
                </div>{" "}
                <div className="info-bottom">
                  {" "}
                  {props.data.car?.signs?.map((value, index) => (
                    <div
                      style={{
                        color: colors[Math.abs((index % 2) - 1)],
                        width: "100%",
                        backgroundColor: colors[index % 2],
                      }}
                      className="generate"
                      key={index}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>Fifa</strong>
                </div>{" "}
                <div className="info-bottom">{props.data.fifa}</div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>Flag code</strong>
                </div>{" "}
                <div className="info-bottom">
                  <p> {props.data.flag}</p>
                </div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>Demonys</strong>
                </div>{" "}
                <div className="info-bottom">
                  {demonyms.map((value, index) => (
                    <div
                      style={{
                        color: colors[Math.abs((index % 2) - 1)],

                        backgroundColor: colors[index % 2],
                      }}
                      className="generate"
                      key={index}
                    >
                      <p>Lang: {value.lang}</p>
                      <p>M: {value.m}</p>
                      <p>F: {value.f}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>Borders</strong>
                </div>{" "}
                <div className="info-bottom">
                  {props.data.borders?.map((value, index) => (
                    <div
                      style={{
                        color: colors[Math.abs((index % 2) - 1)],
                        width: "100%",
                        backgroundColor: colors[index % 2],
                      }}
                      className="generate"
                      key={index}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>

              <div className="entry">
                <div className="info-top">
                  <strong>Status</strong>
                </div>{" "}
                <div className="info-bottom">{props.data.status + " "}</div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>Also known as</strong>
                </div>{" "}
                <div className="info-bottom">
                  {props.data.altSpellings?.map((value, index) => (
                    <div
                      style={{
                        color: colors[Math.abs((index % 2) - 1)],
                        width: "100%",
                        backgroundColor: colors[index % 2],
                      }}
                      className="generate"
                      key={index}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>tld</strong>
                </div>{" "}
                <div className="info-bottom">
                  {" "}
                  {props.data.tld?.map((value, index) => (
                    <div key={index}>{value}</div>
                  ))}
                </div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>cca2</strong>
                </div>{" "}
                <div className="info-bottom">{props.data.cca2 + ""}</div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>ccn3</strong>
                </div>{" "}
                <div className="info-bottom">{props.data.ccn3 + ""}</div>
              </div>
              <div className="entry">
                <div className="info-top">
                  <strong>cioc</strong>
                </div>{" "}
                <div className="info-bottom">{props.data.cioc + ""}</div>
              </div>
              <div className="entry" style={{ borderBottom: "none" }}>
                <div className="info-top">
                  <strong>Native name</strong>
                </div>{" "}
                <div className="info-bottom">
                  {nativeNames.map((value, index) => (
                    <div
                      key={index}
                      style={{
                        color: colors[Math.abs((index % 2) - 1)],
                        width: "100%",
                        backgroundColor: colors[index % 2],
                      }}
                      className="generate"
                    >
                      <p>
                        {" "}
                        <strong>Lang:</strong> {value.language}
                      </p>
                      <p>
                        {" "}
                        <strong>Common:</strong> {value.common}
                      </p>
                      <p>
                        {" "}
                        <strong>Official:</strong>
                        {value.official}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>no data</p>
      )}
    </div>
  );
}
