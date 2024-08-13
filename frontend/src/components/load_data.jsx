import React, { useState, useEffect, createRef } from 'react';
import { getDriverData, getCircuitData } from './apiCalls';
import Downshift from 'downshift';
import '../load_data.css'; // Import the CSS file

export const DataLoader = () => {
  const [drivers, setDrivers] = useState(null);
  const [circuits, setCircuits] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [driverInputValue, setDriverInputValue] = useState('');
  const [circuitInputValue, setCircuitInputValue] = useState('');

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
    setDriverInputValue('');
    setSelectedDriver(null);
  };

  const clearCircuit = () => {
    setCircuitInputValue('');
    setSelectedCircuit(null);
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
            inputValue={driverInputValue}
            onChange={selection => setSelectedDriver(selection.data)}
            itemToString={item => (item ? item.label : '')}
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
                            key={item.value}
                            {...getItemProps({
                              index,
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index ? 'lightgray' : 'gray',
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
          {selectedDriver && (
            <div>
              <h3>Selected Driver: {selectedDriver.name}</h3>
              <p>Team: {selectedDriver.driverRef}</p>
            </div>
          )}
        </div>
      )}

      {circuits && (
        <div>
          <h2>Select a Circuit:</h2>
          <Downshift
            inputValue={circuitInputValue}
            onChange={selection => setSelectedCircuit(selection.data)}
            itemToString={item => (item ? item.label : '')}
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
                            key={item.value}
                            {...getItemProps({
                              index,
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index ? 'lightgray' : 'gray',
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
