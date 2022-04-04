import GlobalSummary from "./GlobalSummary";
import Country from "./Country";

export default class CovidSummary {
  global: GlobalSummary;
  countries: Country[];
  date: string;
  dashboard: {
    selected: number;
    totalConfirmed: number;
    totalDeaths: number;
    totalRecovered: number;
  };

  constructor(covidResponse: any) {
    this.global = new GlobalSummary(covidResponse.Global);
    this.countries = covidResponse.Countries.map((item: any) => new Country(item));
    this.date = covidResponse.Date;
    this.dashboard = {
      selected: 0,
      totalConfirmed: 0,
      totalDeaths: 0,
      totalRecovered: 0
    };
  }
}
