export default class Forecast {
  time: number;
  sunriseTime: number;
  sunsetTime: number;
  precipProbability: number;
  temperatureMax: number;
  humidity: number;
  summary: string;

  constructor(forecastResponse: any) {
    this.time = forecastResponse.time;
    this.sunriseTime = forecastResponse.sunriseTime;
    this.sunsetTime = forecastResponse.sunsetTime;
    this.temperatureMax = forecastResponse.temperatureMax;
    this.humidity = forecastResponse.humidity;
    this.precipProbability = forecastResponse.precipProbability;
    this.summary = forecastResponse.summary;
  }
}
