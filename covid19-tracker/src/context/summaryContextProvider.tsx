import React, { FC } from "react";

import useSummary from "../hooks/useSummary";

import { SummaryContext } from "./summaryContext";

const SummaryContextProvider: FC<{}> = props => {
  const { children } = props;
  const { summary, onSelectCountry } = useSummary();

  return <SummaryContext.Provider value={{ summary, onSelectCountry }}>{children}</SummaryContext.Provider>;
};

export default SummaryContextProvider;
