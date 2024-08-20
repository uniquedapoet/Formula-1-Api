import React, { useState, useEffect, createRef } from "react";
import { getResultsData } from "./apiCalls";
import Downshift from "downshift";

const Results = ({ onResultSelect }) => {
  const [results, setResults] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [resultInputValue, setResultInputValue] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const resultInputRef = createRef();

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const resultData = await getResultsData();
        console.log("Result Data:", resultData);
        setResults(resultData);
      } catch (error) {
        console.error("Error fetching result data:", error);
      }
    };

    fetchResultsData();
  }, []);

  const clearResult = () => {
    setSelectedResult(null);
    setResultInputValue("");
    setSelectedYear("");
  };

  const handleResultChange = (selection) => {
    setSelectedResult(selection.data);
    onResultSelect(selection.data);
  };

  const resultOptions = results
    ? results.map((result) => {
        const refrence = result.year + " " + result.circuitname;
        return {
          value: result.circuitname,
          refrence: refrence,
          label: result.circuitname,
          year: result.year,
          data: result,
        };
      })
    : [];

  const fetchAndFilterResults = async (year, inputValue) => {
    console.log("Year:", year);
    let query;
    if (year === "All Years") {
      query = `http://127.0.0.1:5000/results`;
    } else if (year) {
      query = `http://127.0.0.1:5000/results/years/${year}`;
    }

    try {
      console.log("Query:", query);
      const response = await fetch(query);
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Received non-JSON response");
      }
      console.log("Query:", query);
      const data = await response.json();
      console.log("Data:", data);

      const filteredResults = data
        ? data.map((data) => {
            const refrence = data.year + " " + data.circuitname;
            return {
              value: data.circuitname,
              refrence: refrence,
              label: data.circuitname,
              year: data.year,
              data: data,
            };
          })
        : [];

      setFilteredResults(filteredResults);
      console.log("Filtered Results:", filteredResults);
    } catch (error) {
      console.error("Error fetching and filtering results:", error);
    }
  };

  useEffect(() => {
    if (selectedYear) {
      fetchAndFilterResults(selectedYear, resultInputValue);
    }
  }, [selectedYear, resultInputValue]);

  return (
    <div>
      <h2 style={{ fontSize: "24px" }}>Select A Result:</h2>
      <Downshift
        inputValue={resultInputValue}
        onInputValueChange={(inputValue) => setResultInputValue(inputValue)}
        itemToString={(item) => (item ? item.label : "")}
        onChange={handleResultChange}
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
          <div>
            <input
              {...getInputProps({
                placeholder: "Search for a race",
                ref: resultInputRef,
              })}
            />
            <button className="clear-button" onClick={clearResult}>
              ×
            </button>
            <ul {...getMenuProps()}>
              {isOpen
                ? filteredResults
                    .filter((item) =>
                      item.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    )
                    .slice(0, 5)
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map((item, index) => (
                      <li
                        key={`${item.name}-${index}`}
                        {...getItemProps({
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? "lightgray" : "gray",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal",
                          },
                        })}
                      >
                        {item.refrence}
                      </li>
                    ))
                : null}
            </ul>
            <div className="select-container">
              <label style={{ fontSize: "16px" }} htmlFor="year-select">
                Optional year filter:
              </label>
              <select
                style={{ fontSize: "10px", visibility: "visible" }}
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="All Years">All Years</option>
                {resultOptions
                  .map((item) => item.year)
                  .filter((year, index, self) => self.indexOf(year) === index)
                  .map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default Results;
