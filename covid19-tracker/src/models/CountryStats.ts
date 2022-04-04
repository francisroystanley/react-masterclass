export default class CountryStats {
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
  date: string;

  constructor(countryResponse: any) {
    this.newConfirmed = countryResponse.NewConfirmed;
    this.totalConfirmed = countryResponse.TotalConfirmed;
    this.newDeaths = countryResponse.NewDeaths;
    this.totalDeaths = countryResponse.TotalDeaths;
    this.newRecovered = countryResponse.NewRecovered;
    this.totalRecovered = countryResponse.TotalRecovered;
    this.date = countryResponse.Date;
  }
}
