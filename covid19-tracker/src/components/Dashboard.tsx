import React, { useContext } from "react";
import { Grid } from "@material-ui/core";

import { SummaryContext } from "../context/summaryContext";

import CountryTable from "../components/CountryTableComponent";
import CountryComputation from "../components/CountryComputationComponent";

const Dashboard = () => {
  const { summary } = useContext(SummaryContext);

  return (
    <section className="container">
      {summary ? (
        <>
          <div className="counter-form">
            <CountryComputation />
          </div>
          <br />
          <div className="countries">
            <Grid container spacing={1}>
              <CountryTable />
            </Grid>
          </div>
        </>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </section>
  );
};

export default Dashboard;
