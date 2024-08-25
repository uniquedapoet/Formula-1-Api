import React from "react";

const CircuitData = ({ selectedCircuit }) => {
  const containerStyle = {
    position: "fixed",
    bottom: "32px", // Adjust to match the height of the header
    left: "20%", // Adjusted to move the container slightly left
    width: "80%", // Take the remaining width
    height: "15%", // Take the remaining height
    display: "flex",
    flexDirection: "column", // Arrange children in a column
    justifyContent: "space-between", // Evenly space items in the column
    padding: "10px",
    border: "1px solid #000000",
    backgroundColor: "#ffffee",
    zIndex: 1000,
    font: "16px Arial, sans-serif",
    color:"#282c34",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // Adjust the number of columns as needed
    gap: "5px", // Reduce the gap between grid cells
    alignItems: "center", 
    height: "100%",
  };

  const headerStyle = {
    textAlign: "center",
    paddingLeft: "5px", // Adjust to move headers slightly left
    marginBottom: "2px", // Reduce space between headers and content
  };
  
  const contentStyle = {
    textAlign: "center",
    paddingLeft: "5px", // Adjust to move content slightly left
    margin: "-5%", // Remove margin to move content closer to the header
  };

  const refrence = selectedCircuit
    ? selectedCircuit.surname + " " + selectedCircuit.forename
    : "";
  
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(3);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
  // Example usage
  const fastestLapTimeInSeconds = selectedCircuit ? selectedCircuit.fastestLapTime : 0;
  const formattedFastestLapTime = formatTime(fastestLapTimeInSeconds);
  

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom:'5px' }}>Circuit Details:</h2>
      {selectedCircuit ? (
        <div style={gridStyle}>
          <strong style={headerStyle}>Circuit Name:</strong>
          <strong style={headerStyle}>Location:</strong>
          <strong style={headerStyle}>Country:</strong>
          <strong style={headerStyle}>Fastest Lap:</strong>
          <strong style={headerStyle}>Fastest Driver:</strong>
          <p style={contentStyle}>{selectedCircuit.name}</p>
          <p style={contentStyle}>{selectedCircuit.location}</p>
          <p style={contentStyle}>{selectedCircuit.country}</p>
          <p style={contentStyle}>{formattedFastestLapTime}</p>
          <p style={contentStyle}>{selectedCircuit.fastestDriver}</p>
        </div>
      ) : (
        <p>No circuit selected.</p>
      )}
    </div>
  );
};

export default CircuitData;
