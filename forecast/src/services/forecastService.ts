import data from "./data/forecastSummary.json";
import Forecast from "../models/Forecast";

export const getDailyForecastSummary = async (): Promise<Forecast[]> => {
  const promise = new Promise<Forecast[]>((resolve, reject) => {
    if (data) {
      setTimeout(() => {
        const forecastData = data.daily.data.map(data => new Forecast(data));
        resolve(forecastData);
      }, 1000);
    } else {
      console.log("error occured");
      reject("Cannot read file.");
    }
  });

  return promise;
};
