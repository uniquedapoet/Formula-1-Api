import React, { useState, useEffect, createRef } from "react";
import { getDriverData } from "./apiCalls";
import Downshift from "downshift";

const Driver = ({ onDriverSelect = () => {} }) => {
  const [drivers, setDrivers] = useState(null); // Store driver data
  const [selectedDriver, setSelectedDriver] = useState(null); // Store the selected driver
  const [driverInputValue, setDriverInputValue] = useState(""); // Manage input field value
  const driverInputRef = createRef(); // Reference for the input field

  useEffect(() => {
    // Fetch driver data on component mount
    const fetchDriverData = async () => {
      try {
        const driverData = await getDriverData();
        console.log("Driver Data:", driverData);
        setDrivers(driverData);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    fetchDriverData();
  }, []);

  const clearDriver = () => {
    // Clear the selected driver and reset the input field
    setDriverInputValue("");
    setSelectedDriver(null);
    onDriverSelect(null); // Notify parent component of no selection
  };

  const driverOptions = drivers
    ? drivers.map((driver) => ({
        value: driver.driverRef, // Unique identifier for the driver
        label: driver.driverRef, // Displayed label for the dropdown
        data: driver, // Full driver data
      }))
    : [];

  const handleDriverChange = (selection) => {
    // Update the selected driver
    setSelectedDriver(selection.data);
    // Notify the parent component with the selected driver data
    onDriverSelect(selection.data);
  };

  return (
    <div>
      <h2 style={{ fontSize: "24px" }}>Select a Driver:</h2>
      <Downshift
        inputValue={driverInputValue}
        onChange={handleDriverChange}
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
                      (item) => !inputValue || item.label.includes(inputValue)
                    )
                    .slice(0, 5) // Limit the number of suggestions
                    .map((item, index) => (
                      <li
                        key={item.value}
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

export default Driver;
