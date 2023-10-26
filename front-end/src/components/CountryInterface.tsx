export interface CountryInterface {
  name?: {
    common?: string | undefined;
    official?: string | undefined;
    nativeName?: {
      [key: string]: {
        official?: string | undefined;
        common?: string | undefined;
      };
    };
  };
  tld?: string[] | undefined;
  cca2?: string | undefined;
  ccn3?: string | undefined;
  cca3?: string | undefined;
  cioc?: string | undefined;
  independent?: boolean | undefined;
  status?: string | undefined;
  unMember?: boolean | undefined;
  currencies?: {
    [key: string]: {
      name?: string | undefined;
      symbol?: string | undefined;
    };
  };
  idd?: {
    root?: string | undefined;
    suffixes?: string[] | undefined;
  };
  capital?: string[] | undefined;
  altSpellings?: string[] | undefined;
  region?: string | undefined;
  subregion?: string | undefined;
  languages?: {
    [key: string]: string | undefined;
  };
  translations?: {
    [key: string]: {
      official?: string | undefined;
      common?: string | undefined;
    };
  };
  latlng?: number[] | undefined;
  landlocked?: boolean | undefined;
  borders?: string[] | undefined;
  area?: number | undefined;
  demonyms?: {
    [key: string]: {
      f?: string | undefined;
      m?: string | undefined;
    };
  };
  flag?: string | undefined;
  maps?: {
    googleMaps?: string | undefined;
    openStreetMaps?: string | undefined;
  };
  population?: number | undefined;
  gini?:
    | {
        [key: string]: number;
      }
    | null
    | undefined;
  fifa?: string | undefined;
  car?: {
    signs?: string[] | undefined;
    side?: string | undefined;
  };
  timezones?: string[] | undefined;
  continents?: string[] | undefined;
  flags?: {
    png?: string | undefined;
    svg?: string | undefined;
    alt?: string | undefined;
  };
  coatOfArms?: {
    png?: string | undefined;
    svg?: string | undefined;
  };
  startOfWeek?: string | undefined;
  capitalInfo?: {
    latlng?: number[] | undefined;
  };
}
