import React, { useState, useEffect, createRef } from 'react';
import { getDriverData, getCircuitData } from './apiCalls';
import Downshift from 'downshift';
import '../load_data.css'; // Import the CSS file

export const DataLoader = () => {
  const [drivers, setDrivers] = useState(null);
  const [circuits, setCircuits] = useState(null);

  const driverInputRef = createRef();
  const circuitInputRef = createRef();

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const driverData = await getDriverData();
        console.log('Driver Data:', driverData); // Log driver data
        setDrivers(driverData);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    const fetchCircuitData = async () => {
      try {
        const circuitData = await getCircuitData();
        console.log('Circuit Data:', circuitData); // Log circuit data
        setCircuits(circuitData);
      } catch (error) {
        console.error('Error fetching circuit data:', error);
      }
    };

    fetchDriverData();
    fetchCircuitData();
  }, []);

  const clearDriver = () => {
    if (driverInputRef.current) {
      driverInputRef.current.value = '';
    }
  };

  const clearCircuit = () => {
    if (circuitInputRef.current) {
      circuitInputRef.current.value = '';
    }
  };

  const driverOptions = drivers ? drivers.map(driver => ({
    value: driver.driverRef,
    label: driver.driverRef,
    data: driver 
  })) : [];

  const circuitOptions = circuits ? circuits.map(circuit => ({
    value: circuit.name,
    label: circuit.name,
    data: circuit
  })) : [];

  return (
    <div>
      {drivers && (
        <div>
          <h2>Select a Driver:</h2>
          <Downshift
            itemToString={item => (item ? item.label : '')}
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
                    placeholder: 'Search for a driver',
                    ref: driverInputRef,
                  })}
                />
                <button className="clear-button" onClick={clearDriver}>×</button>
                <ul {...getMenuProps()}>
                  {isOpen
                    ? driverOptions
                        .filter(item => !inputValue || item.label.includes(inputValue))
                        .slice(0, 10)
                        .map((item, index) => (
                          <li
                            {...getItemProps({
                              key: item.value,
                              index,
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index ? 'lightgray' : 'white',
                                fontWeight: selectedItem === item ? 'bold' : 'normal',
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
      )}
      {circuits && (
        <div>
          <h2>Select a Circuit:</h2>
          <Downshift
            itemToString={item => (item ? item.label : '')}
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
                    placeholder: 'Search for a circuit',
                    ref: circuitInputRef,
                  })}
                />
                <button className="clear-button" onClick={clearCircuit}>×</button>
                <ul {...getMenuProps()}>
                  {isOpen
                    ? circuitOptions
                        .filter(item => !inputValue || item.label.includes(inputValue))
                        .slice(0, 10)
                        .map((item, index) => (
                          <li
                            {...getItemProps({
                              key: item.value,
                              index,
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index ? 'lightgray' : 'white',
                                fontWeight: selectedItem === item ? 'bold' : 'normal',
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
      )}
    </div>
  );
};

export default DataLoader;