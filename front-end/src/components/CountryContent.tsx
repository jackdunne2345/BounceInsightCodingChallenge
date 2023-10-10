import { useState } from "react";
import { CountryData } from "./CountryData";
type CountryInfoProps = {
  data: CountryData;
};
export default function CountryContent({ data }: CountryInfoProps) {
  const [alias, showAlias] = useState<boolean>(false);

  const nativeNames = Object.entries(data.name.nativeName).map(
    ([key, value]) => ({
      language: key,
      official: value.official,
      common: value.common,
    })
  );

  return (
    <div className="country-content">
      <h1>Country Information</h1>
      <p>
        <strong>Common Name:{data?.name.common}</strong>
      </p>
      <button onClick={() => showAlias(!alias)}>
        {alias ? "Hide " : "Show "}aliases
      </button>
      <div>
        {alias && (
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
    </div>
  );
}
