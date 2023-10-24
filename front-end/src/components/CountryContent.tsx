import { useState } from "react";
import { CountryInterface } from "./CountryInterface";
import "../styleSheets/country.css";

export default function CountryContent(props: { data: CountryInterface }) {
  const [showTranslations, setShowTranslations] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

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
            {props.data.landlocked ? "landlocked" : "not landlcoked"} countrie
            located in the{" "}
            {props.data.continents!.length > 1 ? "continents" : "continent"} of
            {props.data.continents!.map((value, index) => (
              <>
                {" " + value}
                {index === props.data.continents!.length - 2 && " and"}
                {index < props.data.continents!.length - 2 && ","}
              </>
            ))}{" "}
            positioned at{" "}
            {"(lat: " +
              props.data.latlng![0] +
              " lng: " +
              props.data.latlng![1] +
              ")"}
            . {props.data.name!.common} is{" "}
            {props.data.unMember
              ? "a UN memember countrie"
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
            . The {currencies.length > 1 ? "currencies" : "currencie"} you can
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
              props.data.capitalInfo!.latlng![0] +
              " lng: " +
              props.data.capitalInfo!.latlng![1] +
              ")"}
            .{". "}Make sure to remember that cars drive on the{" "}
            {props.data.car!.side} hand side of the road, take note if this is
            different to your home countrie.
          </p>{" "}
          <button onClick={() => setShowMoreInfo(!showMoreInfo)}>
            {showMoreInfo ? "Hide info" : "See more information"}
          </button>
          {showMoreInfo && (
            <div className="more-info">
              <div className="entry">
                <div className="info-left">Coat of arms:</div>{" "}
                <div className="info-right">
                  <img src={props.data.coatOfArms?.svg} alt="" />
                </div>
              </div>
              <div className="entry">
                <div className="info-left">Start of the week</div>{" "}
                <div className="info-right">
                  <p> {props.data.startOfWeek}</p>
                </div>
              </div>
              <div className="entry">
                <div className="info-left">Time zones</div>{" "}
                <div className="info-right">
                  {/* fix this need to fit all the time zones */}
                  {props.data.timezones + ""}
                </div>
              </div>
              <div className="entry">
                <div className="info-left">Car signs</div>{" "}
                <div className="info-right">
                  <p> {props.data.car?.signs + ""}</p>
                </div>
              </div>
              <div className="entry">
                <div className="info-left">Fifa</div>{" "}
                <div className="info-right">{props.data.fifa}</div>
              </div>
              <div className="entry">
                <div className="info-left">Flag code</div>{" "}
                <div className="info-right">
                  <p> {props.data.flag}</p>
                </div>
              </div>
              <div className="entry">
                <div className="info-left">Demonys</div>{" "}
                <div className="info-right">
                  <ul>
                    {demonyms.map((value, index) => (
                      <li key={index}>
                        <strong>Lang:</strong> {value.lang}
                        <br />
                        <strong>M:</strong> {value.m}
                        <br />
                        <strong>F:</strong> {value.f}
                        <br />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="entry">
                <div className="info-left">Borders</div>{" "}
                <div className="info-right">{props.data.borders + ""}</div>
              </div>
              <div className="entry">
                <div className="info-left">Also known as</div>{" "}
                <div className="info-right">{props.data.altSpellings + ""}</div>
              </div>
              <div className="entry">
                <div className="info-left">Status</div>{" "}
                <div className="info-right">{props.data.status + ""}</div>
              </div>
              <div className="entry">
                <div className="info-left">Also known as</div>{" "}
                <div className="info-right">{props.data.altSpellings + ""}</div>
              </div>
              <div className="entry">
                <div className="info-left">tld</div>{" "}
                <div className="info-right">{props.data.tld + ""}</div>
              </div>
              <div className="entry">
                <div className="info-left">cca2</div>{" "}
                <div className="info-right">{props.data.cca2 + ""}</div>
              </div>
              <div className="entry">
                <div className="info-left">ccn3</div>{" "}
                <div className="info-right">{props.data.ccn3 + ""}</div>
              </div>
              <div className="entry">
                <div className="info-left">cioc</div>{" "}
                <div className="info-right">{props.data.cioc + ""}</div>
              </div>
              <div className="entry">
                <div className="info-left">Native name</div>{" "}
                <div className="info-right">
                  {
                    <ul>
                      {nativeNames.map((value, index) => (
                        <li key={index}>
                          <strong>Lang:</strong> {value.language}
                          <br />
                          <strong>Common:</strong> {value.common}
                          <br />
                          <strong>Official:</strong> {value.official}
                          <br />
                          <br />
                        </li>
                      ))}
                    </ul>
                  }
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
