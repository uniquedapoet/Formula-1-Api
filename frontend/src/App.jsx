import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Results from "./components/results";
import Drivers from "./components/drivers";
import Circuits from "./components/circuits";
import DriverData from "./components/driverData";
import CircuitData from "./components/circuitData";
import resultDataExports from "./components/resultData";
import { Helmet } from "react-helmet";
import CircuitPicture from "./components/circuitPicture";

const { ResultData } = resultDataExports; // Destructure ResultData from the default export object
function App() {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
    console.log("Driver selected:", driver);
    // Notify other components if needed
  };

  const handleCircuitSelect = (circuit) => {
    setSelectedCircuit(circuit);
    console.log("Circuit selected:", circuit);
    // Notify other components if needed
  };

  const handleResultSelect = (result) => {
    setSelectedResult(result);
    console.log("Result selected:", result);
    // Notify other components if needed
  };

  const clearAll = () => {
    setSelectedDriver(null);
    setSelectedCircuit(null);
    setSelectedResult(null);
    console.log("All data cleared.");
  };

  return (
    <div className="App">
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Formula 1 Api</title>
        <link
          rel="icon"
          href="frontend/build/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Formula 1 API</h1>
      </header>
      <div className="load-data-container">
        <div className="results-container">
          <Results
            onResultSelect={handleResultSelect}
            Driver={selectedDriver}
            selectedDriver={selectedDriver}
            selectedCircuit={selectedCircuit}
          />
        </div>
        <div className="drivers-container">
          <Drivers
            onDriverSelect={handleDriverSelect}
            selectedCircuit={selectedCircuit}
            selectedResult={selectedResult}
          />
        </div>
        <div className="circuits-container">
          <Circuits
            onCircuitSelect={handleCircuitSelect}
            selectedDriver={selectedDriver}
            selectedResult={selectedResult}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "auto",
          padding: "10px",
          overflowY: "auto",
        }}
        className="data-display"
      >
        <div className="driver-data">
          <DriverData selectedDriver={selectedDriver} />{" "}
          {/* Pass selectedDriver to DriverData */}
        </div>
        <div className="circuit-data">
          <CircuitData selectedCircuit={selectedCircuit} />
        </div>
        <div className="circuit-picture-container">
          <CircuitPicture selectedCircuit={selectedCircuit} />
          {/* <DriverData selectedDriver={selectedDriver} /> Pass selectedDriver to DriverData */}
        </div>
        <div className="result-data">
          <ResultData selectedResult={selectedResult} />
        </div>
        <button onClick={clearAll} className="clear-all">Clear All</button>
      </div>
    </div>
  );
}

export default App;
