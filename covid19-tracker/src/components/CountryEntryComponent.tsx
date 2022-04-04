import React, { useContext } from "react";
import { TableRow, TableCell } from "@material-ui/core";

import Country from "../models/Country";

import { SummaryContext } from "../context/summaryContext";

type Props = {
  country: Country;
};

const CountryEntry = (props: Props) => {
  const { country } = props;
  const { onSelectCountry } = useContext(SummaryContext);
  const btnClass = `btn btn-${country.selected ? "danger" : "primary"}`;

  return (
    <TableRow key={country.countryCode}>
      <TableCell align="center">
        <button className={btnClass} onClick={() => onSelectCountry!(country.countryCode)}>
          {country.selected ? "Unselect" : "Select"}
        </button>
      </TableCell>
      <TableCell>{country.name}</TableCell>
      <TableCell align="right">{country.stats.newConfirmed}</TableCell>
      <TableCell align="right">{country.stats.totalConfirmed}</TableCell>
      <TableCell align="right">{country.stats.newDeaths}</TableCell>
      <TableCell align="right">{country.stats.totalDeaths}</TableCell>
      <TableCell align="right">{country.stats.newRecovered}</TableCell>
      <TableCell align="right">{country.stats.totalRecovered}</TableCell>
    </TableRow>
  );
};

export default CountryEntry;
