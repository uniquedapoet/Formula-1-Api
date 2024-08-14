import React, { useState, useEffect, createRef } from "react";
import { getDriverData, getCircuitData, getResultsData } from "./apiCalls";
import Downshift from "downshift";
import "../load_data.css"; // Import the CSS file

export const DataLoader = () => {
  const [drivers, setDrivers] = useState(null);
  const [circuits, setCircuits] = useState(null);
  const [results, setResults] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [driverInputValue, setDriverInputValue] = useState("");
  const [circuitInputValue, setCircuitInputValue] = useState("");
  const [resultInputValue, setResultInputValue] = useState("");
  const [selectedYear, setSelectedYear] = useState("");


  const driverInputRef = createRef();
  const circuitInputRef = createRef();
  const resultInputRef = createRef();

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const driverData = await getDriverData();
        console.log("Driver Data:", driverData); // Log driver data
        setDrivers(driverData);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    const fetchCircuitData = async () => {
      try {
        const circuitData = await getCircuitData();
        console.log("Circuit Data:", circuitData); // Log circuit data
        setCircuits(circuitData);
      } catch (error) {
        console.error("Error fetching circuit data:", error);
      }
    };

    const fetchResultsData = async () => {
      try {
        const resultData = await getResultsData();
        console.log("Result Data:", resultData); // Log result data
        setResults(resultData);
      } catch (error) {
        console.error("Error fetching result data:", error);
      }
    };

    fetchResultsData();
    fetchDriverData();
    fetchCircuitData();
  }, []);

  const clearDriver = () => {
    setDriverInputValue("");
    setSelectedDriver(null);
  };

  const clearCircuit = () => {
    setCircuitInputValue("");
    setSelectedCircuit(null);
  };

  const clearResult = () => {
    setSelectedResult(null);
    setResultInputValue("");
    setSelectedYear("");
  };

  const driverOptions = drivers
    ? drivers.map((driver) => ({
        value: driver.driverRef,
        label: driver.driverRef,
        data: driver,
      }))
    : [];

  const circuitOptions = circuits
    ? circuits.map((circuit) => ({
        value: circuit.name,
        label: circuit.name,
        data: circuit,
      }))
    : [];


    const resultOptions = results
    ? results.map((result) => {
        const refrence = result.year + " " + result.circuitname;
        // console.log("Refrence:", refrence);
        return {
          value: result.circuitname,
          refrence: refrence,
          label: result.circuitname,
          year: result.year,
          data: result,
        };
      })
    : [];

    
    return (
    <div>
      {drivers && (
        <div>
          <h2>Select a Driver:</h2>
          <Downshift
            inputValue={driverInputValue}
            onChange={(selection) => setSelectedDriver(selection.data)}
            itemToString={(item) => (item ? item.label : "")}
            onInputValueChange={setDriverInputValue}
          >
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem,
            }) => (
              <div className="input-container">
                <input
                  {...getInputProps({
                    placeholder: "Search for a driver",
                    ref: driverInputRef,
                  })}
                />
                <button className="clear-button" onClick={clearDriver}>
                  ×
                </button>
                <ul {...getMenuProps()}>
                  {isOpen
                    ? driverOptions
                        .filter(
                          (item) =>
                            !inputValue || item.label.includes(inputValue)
                        )
                        .slice(0, 10)
                        .map((item, index) => (
                          <li
                            key={item.value}
                            {...getItemProps({
                              index,
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index
                                    ? "lightgray"
                                    : "gray",
                                fontWeight:
                                  selectedItem === item ? "bold" : "normal",
                              },
                            })}
                          >
                            {item.label}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            )}
          </Downshift>
          {selectedDriver && (
            <div>
              <h3>Selected Driver: {selectedDriver.name}</h3>
              <p>Team: {selectedDriver.driverRef}</p>
            </div>
          )}
        </div>
      )}

<div>
      <label htmlFor="year-select">Select Year:</label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">All Years</option>
        {resultOptions
          .map((item) => item.year)
          .filter((year, index, self) => self.indexOf(year) === index)
          .map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>

      <Downshift
        inputValue={resultInputValue}
        onChange={(selection) => setSelectedResult(selection)}
        itemToString={(item) => (item ? item.label : '')}
        onInputValueChange={setResultInputValue}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => (
          <div>
            <input {...getInputProps({
                    placeholder: "Search for a driver",
                    ref: resultInputRef,
                  })}
                />
            <button className="clear-button" onClick={clearResult}>
                  ×
                </button>
            <ul {...getMenuProps()}>
              {isOpen
                ? resultOptions
                    .filter(
                      (item) =>
                        (!inputValue || item.refrence.includes(inputValue)) &&
                        (!selectedYear || item.year === selectedYear)
                    )
                    .slice(0, 10)
                    .map((item, index) => (
                      <li
                        key={`${item.refrence}-${index}`}
                        {...getItemProps({
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? "lightgray" : "gray",
                            fontWeight: selectedItem === item ? "bold" : "normal",
                          },
                        })}
                      >
                        {item.label}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>

      {selectedResult && (
        <div>
          <h3>Selected Result: {selectedResult.year}</h3>
          <p>Team: {selectedResult.label}</p>
          {console.log(selectedResult)}
        </div>
      )}
    </div>

      {circuits && (
        <div>
          <h2>Select a Circuit:</h2>
          <Downshift
            inputValue={circuitInputValue}
            onChange={(selection) => setSelectedCircuit(selection.data)}
            itemToString={(item) => (item ? item.label : "")}
            onInputValueChange={setCircuitInputValue}
          >
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem,
            }) => (
              <div className="input-container">
                <input
                  {...getInputProps({
                    placeholder: "Search for a circuit",
                    ref: circuitInputRef,
                  })}
                />
                <button className="clear-button" onClick={clearCircuit}>
                  ×
                </button>
                <ul {...getMenuProps()}>
                  {isOpen
                    ? circuitOptions
                        .filter(
                          (item) =>
                            !inputValue || item.label.includes(inputValue)
                        )
                        .slice(0, 10)
                        .map((item, index) => (
                          <li
                            key={item.value}
                            {...getItemProps({
                              index,
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index
                                    ? "lightgray"
                                    : "gray",
                                fontWeight:
                                  selectedItem === item ? "bold" : "normal",
                              },
                            })}
                          >
                            {item.label}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            )}
          </Downshift>
          {selectedCircuit && (
            <div>
              <h3>Selected Circuit: {selectedCircuit.name}</h3>
              <p>Location: {selectedCircuit.location}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataLoader;
