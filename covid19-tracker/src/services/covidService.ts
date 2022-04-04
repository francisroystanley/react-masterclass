import CovidSummary from "../models/CovidSummary";
import data from "../data/summary.json";

export const getSummaryPerCountry = async (): Promise<CovidSummary | null> => {
  const promise = new Promise<CovidSummary | null>((resolve, reject) => {
    if (data) {
      setTimeout(() => {
        const covidSummary = new CovidSummary(data);
        resolve(covidSummary);
      }, 2000);
    } else {
      console.log("error occured");
      reject("Cannot read file.");
    }
  });

  return promise;
};
