import React from "react";
import { Paper, Table, TableHead, TableRow, TableBody, TableCell } from "@material-ui/core";

import WeatherListItem from "./weather-list-item";
import Forecast from "../models/Forecast";

type Props = {
  forecasts: Forecast[];
};

const renderForecasts = (forecasts: Forecast[]) => {
  return forecasts.map((forecast: Forecast) => <WeatherListItem forecast={forecast} key={forecast.time} />);
};

const WeatherList = (props: Props) => {
  const { forecasts } = props;

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Sunrise</TableCell>
            <TableCell>Sunset</TableCell>
            <TableCell>Rain Chance</TableCell>
            <TableCell>Max Temperature</TableCell>
            <TableCell>Summary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderForecasts(forecasts)}</TableBody>
      </Table>
    </Paper>
  );
};

export default WeatherList;
