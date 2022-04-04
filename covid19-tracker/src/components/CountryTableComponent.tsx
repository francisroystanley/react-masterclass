import React, { useContext } from "react";
import { Table, TableBody, TableCell, TableRow, TableHead, makeStyles, Paper } from "@material-ui/core/";

import { SummaryContext } from "../context/summaryContext";

import CountryEntry from "./CountryEntryComponent";

const useStyles = makeStyles({
  table: {
    maxHeight: "1000px"
  }
});

const CountryTable = () => {
  const { summary } = useContext(SummaryContext);
  const classes = useStyles();

  return (
    <Paper>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Action</TableCell>
            <TableCell>Country</TableCell>
            <TableCell align="center">New Confirmed</TableCell>
            <TableCell align="center">Total Confirmed</TableCell>
            <TableCell align="center">New Deaths</TableCell>
            <TableCell align="center">Total Deaths</TableCell>
            <TableCell align="center">New Recovered</TableCell>
            <TableCell align="center">Total Recovered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summary!.countries.map(country => (
            <CountryEntry country={country} key={country.countryCode} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CountryTable;
