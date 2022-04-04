import { useEffect, useState } from "react";

import CovidSummary from "../models/CovidSummary";

import { getSummaryPerCountry } from "../services/covidService";

const useSummary = () => {
  const [summary, setSummary] = useState<CovidSummary | null>(null);

  useEffect(() => {
    const getInfo = async () => await getSummaryPerCountry();

    getInfo().then(setSummary);
  }, []);

  const onSelectCountry = (code: string) => {
    setSummary(prevState => {
      const countries = prevState!.countries.map(country => {
        if (country.countryCode === code) country.selected = !country.selected;

        return country;
      });

      let selected: number = 0,
        totalConfirmed: number = 0,
        totalDeaths: number = 0,
        totalRecovered: number = 0;

      countries.forEach(c => {
        if (c.selected) {
          selected += 1;
          totalConfirmed += c.stats.totalConfirmed;
          totalDeaths += c.stats.totalDeaths;
          totalRecovered += c.stats.totalRecovered;
        }
      });

      return { ...prevState, countries, dashboard: { selected, totalConfirmed, totalDeaths, totalRecovered } } as CovidSummary;
    });
  };

  return { summary, onSelectCountry };
};

export default useSummary;
