import React, { useState, useEffect, createRef } from "react";
import { getDriverData } from "./apiCalls";
import Downshift from "downshift";

const Driver = () => {
  const [drivers, setDrivers] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverInputValue, setDriverInputValue] = useState("");
  const driverInputRef = createRef();

  useEffect(() => {
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
    setDriverInputValue("");
    setSelectedDriver(null);
  };

  const driverOptions = drivers
    ? drivers.map((driver) => ({
        value: driver.driverRef,
        label: driver.driverRef,
        data: driver,
      }))
    : [];

  return (
    <div>
      <h2 style={{fontSize:"24px"}}>Select a Driver:</h2>
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
                      (item) => !inputValue || item.label.includes(inputValue)
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
          <h3 style={{fontSize:"16px"}}>Selected Driver: {selectedDriver.name}</h3>
          <p>Team: {selectedDriver.driverRef}</p>
        </div>
      )}
    </div>
  );
};

export default Driver;