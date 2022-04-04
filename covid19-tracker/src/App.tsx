import React from "react";

import "./App.css";

import SummaryContextProvider from "./context/summaryContextProvider";

import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <SummaryContextProvider>
      <Navbar />
      <Dashboard />
    </SummaryContextProvider>
  );
}

export default App;
