import React, { useState, useEffect, createRef } from "react";
import { getCircuitData } from "./apiCalls";
import Downshift from "downshift";

const Circuits = ({ onCircuitSelect }) => {
  const [circuits, setCircuits] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [circuitInputValue, setCircuitInputValue] = useState("");
  const circuitInputRef = createRef();

  useEffect(() => {
    const fetchCircuitData = async () => {
      try {
        const circuitData = await getCircuitData();
        console.log("Circuit Data:", circuitData);
        setCircuits(circuitData);
      } catch (error) {
        console.error("Error fetching circuit data:", error);
      }
    };

    fetchCircuitData();
  }, []);

  const clearCircuit = () => {
    setCircuitInputValue("");
    setSelectedCircuit(null);
  };

  const handleCircuitChange = (selection) => {
    setSelectedCircuit(selection.data);
    onCircuitSelect(selection.data);
  };

  const circuitOptions = circuits
    ? circuits.map((circuit) => ({
        value: circuit.name,
        label: circuit.name,
        data: circuit,
      }))
    : [];

  return (
    <div>
      <h2 style={{ fontSize: "24px" }}>Select a Circuit:</h2>
      <Downshift
        inputValue={circuitInputValue}
        onChange={handleCircuitChange}
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
                      (item) => !inputValue || item.label.includes(inputValue)
                    )
                    .slice(0, 5)
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
    </div>
  );
};

export default Circuits;