import React from "react";

const CircuitData = ({ selectedCircuit }) => {
  const containerStyle = {
    position: "fixed",
    bottom: "0px", // Adjust to match the height of the header
    left: "31%", // Adjusted to move the container slightly left
    width: "68%", // Take the remaining width
    height: "15%", // Take the remaining height
    display: "flex",
    flexDirection: "column", // Arrange children in a column
    justifyContent: "space-between", // Evenly space items in the column
    padding: "10px",
    borderBottom: "1px solid #282c34",
    // backgroundColor: "#0048ff",
    zIndex: 1000,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // Adjust the number of columns as needed
    gap: "5px", // Reduce the gap between grid cells
    alignItems: "center", // Align items in the center of each cell
  };

  const headerStyle = {
    textAlign: "center",
    paddingLeft: "5px", // Adjust to move headers slightly left
    marginBottom: "2px", // Reduce space between headers and content
  };

  const contentStyle = {
    textAlign: "center",
    paddingLeft: "5px", // Adjust to move content slightly left
    margin: "-10px", // Remove margin to move content closer to the header
  };

  const refrence = selectedCircuit
    ? selectedCircuit.surname + " " + selectedCircuit.forename
    : "";

  return (
    <div style={containerStyle}>
      <h2 style={{ margin: "-10px 0 05px 10px" }}>Circuit Details:</h2>
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
          <p style={contentStyle}>{selectedCircuit.fastestLapTime}</p>
          <p style={contentStyle}>{selectedCircuit.fastestDriver}</p>
        </div>
      ) : (
        <p>No circuit selected.</p>
      )}
    </div>
  );
};

export default CircuitData;
