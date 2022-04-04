import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import Forecast from "../models/Forecast";
import styles from "../assets/css/weather-list-item.module.css";

type Props = {
  forecast: Forecast;
};

const convertNumberToDateString = (value: number) => new Date(value * 1000).toDateString();

const convertNumberToTimeString = (value: number) => new Date(value * 1000).toLocaleTimeString();

const WeatherListItem = (props: Props) => {
  const { forecast } = props;
  const waterDropIcon = <i className="fas fa-raindrops"></i>;

  return (
    <TableRow className={forecast.temperatureMax >= 35 ? styles["high-temp"] : ""}>
      <TableCell>{convertNumberToDateString(forecast.time)}</TableCell>
      <TableCell>{convertNumberToTimeString(forecast.sunriseTime)}</TableCell>
      <TableCell>{convertNumberToTimeString(forecast.sunsetTime)}</TableCell>
      <TableCell>{(forecast.precipProbability * 100).toFixed(2)}%</TableCell>
      <TableCell>{forecast.temperatureMax} °C</TableCell>
      <TableCell>
        {forecast.humidity > 0.5 && waterDropIcon} {forecast.summary}
      </TableCell>
    </TableRow>
  );
};

export default WeatherListItem;
