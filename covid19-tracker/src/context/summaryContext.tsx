import { createContext } from "react";

import CovidSummary from "../models/CovidSummary";

interface ISummaryContext {
  summary: CovidSummary | null;
  onSelectCountry?: (code: string) => void;
}

export const SummaryContext = createContext<ISummaryContext>({ summary: null });
