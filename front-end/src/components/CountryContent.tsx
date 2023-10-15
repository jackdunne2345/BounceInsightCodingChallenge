import { useState } from "react";
import { CountryData } from "./CountryData";
import "../styleSheets/country.css";
type CountryInfoProps = {
  data: CountryData;
};
export default function CountryContent({ data }: CountryInfoProps) {
  const [showTranslations, setShowTranslations] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setShowTranslations(true);
  };

  const handleMouseLeave = () => {
    setShowTranslations(false);
  };

  const nativeNames = Object.entries(data.name!.nativeName!).map(
    ([key, value]) => ({
      language: key,
      official: value.official,
      common: value.common,
    })
  );

  const languages = Object.entries(data.languages!).map(([key, value]) => ({
    key: key,
    language: value,
  }));

  const translations = Object.entries(data.translations!).map(
    ([key, value]) => ({
      short: key,
      name: value.common,
    })
  );

  const currencies = Object.entries(data.currencies!).map(([key, value]) => ({
    name: value.name,
    short: key,
    symbol: value.symbol,
  }));
  const demonyms = Object.entries(data.demonyms!).map(([key, value]) => ({
    lang: key,
    m: value.m,
    f: value.f,
  }));

  const borderCountries = Object.entries(data.borders!).map(([, value]) => ({
    cCode: value,
  }));

  return (
    <div className="country-content">
      <div id="flag-container">
        <img id="flag" src={data.flags!.svg} />
      </div>
      <div className="name-region">
        <div
          id="name"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div>
            <strong>{data.name!.common + ", "}</strong>
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
        <div id="region">
          <strong>
            {" "}
            {data.subregion ? data.subregion + ", " : ""}
            {data.region ? data.region : ""}
          </strong>
        </div>
      </div>
      <p>
        {data.name!.common} is{" "}
        {data.independent ? "an independent" : "a non independent"},{" "}
        {data.landlocked ? "landlocked" : "not landlcoked"} countrie located in
        the {data.continents!.length > 1 ? "continents" : "continent"} of
        {data.continents!.map((value, index) => (
          <>
            {" " + value}
            {index === data.continents!.length - 2 && " and"}
            {index < data.continents!.length - 2 && ","}
          </>
        ))}{" "}
        positioned at{" "}
        {"(lat: " + data.latlng![0] + " lng: " + data.latlng![1] + ")"}.{" "}
        {data.name!.common} is{" "}
        {data.unMember
          ? "a UN memember countrie"
          : "not a member of the United Nations"}{" "}
        and has a population of {data.population!.toLocaleString() + " "}people
        and a land area of {data.area!.toLocaleString() + "km². "} The{" "}
        {languages.length > 1 ? "languages" : "language"} spoken officially in{" "}
        {data.name!.common} {languages.length > 1 ? "are" : "is "}{" "}
        {languages.map((value, index) => (
          <>
            {value.language}
            {index === languages.length - 2 && " and "}
            {index < languages.length - 2 && ", "}
          </>
        ))}
        . The {currencies.length > 1 ? "currencies" : "currencie"} you can use
        when traveling to {data.name!.common}{" "}
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
        {data.name!.common}s capital is {data.capital} located at{" "}
        {"(lat: " +
          data.capitalInfo!.latlng![0] +
          " lng: " +
          data.capitalInfo!.latlng![1] +
          ")"}
        .{". "}Make sure to remember that cars drive on the {data.car!.side}{" "}
        hand side of the road, take note if this is different to your home
        countrie.
      </p>{" "}
      <button onClick={() => setShowMoreInfo(!showMoreInfo)}>
        {showMoreInfo ? "Hide info" : "See more information"}
      </button>
      {showMoreInfo && (
        <div className="more-info">
          <div className="entry">
            <div className="info-left">Coat of arms:</div>{" "}
            <div className="info-right">
              <img src={data.coatOfArms?.svg} alt="" />
            </div>
          </div>
          <div className="entry">
            <div className="info-left">Start of the week</div>{" "}
            <div className="info-right">
              <p> {data.startOfWeek}</p>
            </div>
          </div>
          <div className="entry">
            <div className="info-left">Time zones</div>{" "}
            <div className="info-right">
              {/* fix this need to fit all the time zones */}
              {data.timezones + ""}
            </div>
          </div>
          <div className="entry">
            <div className="info-left">Car signs</div>{" "}
            <div className="info-right">
              <p> {data.car?.signs + ""}</p>
            </div>
          </div>
          <div className="entry">
            <div className="info-left">Fifa</div>{" "}
            <div className="info-right">{data.fifa}</div>
          </div>
          <div className="entry">
            <div className="info-left">Flag code</div>{" "}
            <div className="info-right">
              <p> {data.flag}</p>
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
            <div className="info-right">{data.borders + ""}</div>
          </div>
          <div className="entry">
            <div className="info-left">Also known as</div>{" "}
            <div className="info-right">{data.altSpellings + ""}</div>
          </div>
          <div className="entry">
            <div className="info-left">Status</div>{" "}
            <div className="info-right">{data.status + ""}</div>
          </div>
          <div className="entry">
            <div className="info-left">Also known as</div>{" "}
            <div className="info-right">{data.altSpellings + ""}</div>
          </div>
          <div className="entry">
            <div className="info-left">tld</div>{" "}
            <div className="info-right">{data.tld + ""}</div>
          </div>
          <div className="entry">
            <div className="info-left">cca2</div>{" "}
            <div className="info-right">{data.cca2 + ""}</div>
          </div>
          <div className="entry">
            <div className="info-left">ccn3</div>{" "}
            <div className="info-right">{data.ccn3 + ""}</div>
          </div>
          <div className="entry">
            <div className="info-left">cioc</div>{" "}
            <div className="info-right">{data.cioc + ""}</div>
          </div>
        </div>
      )}
      {/* <p>
        {" "}
        <strong>Area: </strong> {data.area} km²
      </p>
      <p>
        <strong>Capital: </strong> {data.capital}{" "}
        {"(lat: " +
          data.capitalInfo.latlng[0] +
          ", lng: " +
          data.capitalInfo.latlng[1] +
          ")"}
      </p>
      <p>Cars drive on the {data.car.side} hand side of the road</p>
      <p>
        within the continent of{" "}
        {data.continents.map((value, index) => (
          <>
            <strong key={index}>
              {value}
              {index === data.continents.length - 2 && " and "}
              {index < data.continents.length - 2 && ", "}
            </strong>
          </>
        ))}
      </p>
      <p>
        <strong>{data.independent ? "Independent" : "Not independent"}</strong>
      </p>
      <p>
        <strong>
          {data.unMember ? "Is a UN member" : "Is not a UN member"}
        </strong>
      </p>
      <p>
        languages spoken are{" "}
        {languages.map((value, index) => (
          <>
            <strong key={index}>{value.language}</strong>
            {index === languages.length - 2 && " and "}
            {index < languages.length - 2 && ", "}
          </>
        ))}
      </p>

      <button onClick={() => setShowAliases(!showAliases)}>
        {showAliases ? "Hide " : "Show "}aliases
      </button>
      <div>
        {showAliases && (
          <ul>
            {nativeNames.map((nativeName, index) => (
              <li key={index}>
                <strong>Language:</strong> {nativeName.language}
                <br />
                <strong>Official Name:</strong> {nativeName.official}
                <br />
                <strong>Common Name:</strong> {nativeName.common}
                <br />
              </li>
            ))}
          </ul>
        )}
      </div>
      <p>
        <strong>Population: </strong> {data.population}
      </p>

      <button onClick={() => setShowCurrencies(!showCurrencies)}>
        {showCurrencies ? "Hide " : "Show "}currencies
      </button>
      <div>
        {" "}
        {showCurrencies && (
          <ul>
            {currencies.map((currencie, index) => (
              <li key={index}>
                <strong>{currencie.name} </strong>{" "}
                <strong>{currencie.short} </strong>{" "}
                <strong>{currencie.symbol} </strong>
              </li>
            ))}
          </ul>
        )}
      </div>
      {!data.landlocked ? (
        <p>
          <strong>{data.name.common}</strong> is <strong>not landlocked</strong>
        </p>
      ) : (
        <p>
          <strong>{data.name.common}</strong> is <strong>landlocked</strong>
        </p>
      )}
      {data.borders.length > 0 ? (
        <>
          <button onClick={() => setShowBorders(!showBorders)}>
            {showBorders ? "Hide " : "Show "}Bordering countries
          </button>
          <div>
            {showBorders && (
              <ul>
                {borderCountries.map((countries, index) => (
                  <li key={index}>
                    <strong>{countries.cCode}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : null} */}
    </div>
  );
}
