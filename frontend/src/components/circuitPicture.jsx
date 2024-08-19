import React from "react";

const CircuitPicture = ({ selectedCircuit }) => {
  if (!selectedCircuit) {
    return <p>No circuit selected</p>;
  }

  console.log("Selected circuit Picture:", selectedCircuit['name']);
  console.log("Current URL path:", window.location.pathname);

  const concatenateWithUnderscores = (text) => {
    if (typeof text !== "string") return ""; 
    const wordsArray = text.split(/\s+/);
    return wordsArray.filter(word => word !== "Grand" && word !== "Prix").join("_");
  };

  const circuit = selectedCircuit.name;
  const concatenatedCircuit = concatenateWithUnderscores(circuit);
  const imageUrl = `/Circuit_Pictures/${concatenatedCircuit}.jpg`;
  console.log("Image URL:", imageUrl);

  const circuitPictureContainerStyle = {
    zIndex: 1000,
    position: 'fixed',
    bottom: '140px', // Adjust to match the height of the header
    left: '30%', // Start right next to the load-data-container
    width: '70%', // Take the remaining width
    height: '50%', // Take the remaining width
    display: 'flex',
    flexDirection: 'column', // Arrange children in a column
    justifyContent: 'center', // Evenly space items in the column
    padding: '10px',
  };

  return (
    <div style={circuitPictureContainerStyle}>
      <img src={imageUrl} style={{height:'100%'}} alt={`Selected circuit: ${selectedCircuit.name}`} />
    </div>
  );
};

export default CircuitPicture;