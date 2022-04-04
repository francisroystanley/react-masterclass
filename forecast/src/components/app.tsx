import React, { useState, useEffect } from "react";

import { getDailyForecastSummary } from "../services/forecastService";
import WeatherList from "./weather-list";
import Forecast from "../models/Forecast";

const App = () => {
  const [forecasts, setForecasts] = useState<Forecast[]>([]);

  const loadForecasts = () => {
    getDailyForecastSummary().then(setForecasts);
  };

  useEffect(() => {
    loadForecasts();
  }, []);

  return (
    <div className="App">
      <WeatherList forecasts={forecasts} />
    </div>
  );
};

export default App;
