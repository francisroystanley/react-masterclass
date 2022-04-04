import React, { useContext } from "react";

import { SummaryContext } from "../context/summaryContext";

const CountryComputation = () => {
  const { summary } = useContext(SummaryContext);
  const { selected, totalConfirmed, totalDeaths, totalRecovered } = summary!.dashboard;

  const formatNumber = (num: number) => {
    if (isNaN(num)) return "0.00";

    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="counter-top bg-primary p-1 text-center text-bold">
      <div className="text-total">Total Confirmed: {formatNumber(totalConfirmed)}</div>
      <div className="text-average">Average: {formatNumber(totalConfirmed / selected)}</div>
      <div className="text-total">Total Deaths: {formatNumber(totalDeaths)}</div>
      <div className="text-average">Average: {formatNumber(totalDeaths / selected)}</div>
      <div className="text-total">Total Recovered: {formatNumber(totalRecovered)}</div>
      <div className="text-average">Average: {formatNumber(totalRecovered / selected)}</div>
      <div className="text-selected">Selected Countries: {selected}</div>
    </div>
  );
};

export default CountryComputation;
