export default class GlobalSummary {
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;

  constructor(global: any) {
    this.newConfirmed = global.NewConfirmed;
    this.totalConfirmed = global.TotalConfirmed;
    this.newDeaths = global.NewDeaths;
    this.totalDeaths = global.TotalDeaths;
    this.newRecovered = global.NewRecovered;
    this.totalRecovered = global.TotalRecovered;
  }
}
