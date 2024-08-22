import React from "react";

const ResultData = ({ selectedResult }) => {
  const containerStyle = {
    zIndex: 1000,
    position: "fixed",
    top: "calc(78px + 18% + 10px)", // Position below the driver-data container
    left: "20%", // Start right next to the load-data-container
    width: "10%", // Take the remaining width
    height: "47%", // Take the remaining height
    display: "flex",
    flexDirection: "column", // Arrange children in a column
    justifyContent: "center", // Align items at the start of the column
    padding: "10px",
    border: "1px solid #000000",
    backgroundColor: "#ffffee",
    font: "16px Arial, sans-serif", 
    color:"#282c34",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr", // Single column
    rowGap: "3px", // Adjust the gap between rows
  };

  const reference = selectedResult
    ? selectedResult.surname + " " + selectedResult.forename
    : "";

  const paragraphStyle = {
    marginTop: "5px", // Adjust the margin to move the content up slightly
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ margin: "0", fontSize:"20px" }}>Result Details:</h2>
      {selectedResult ? (
        <div style={gridStyle}>
          <strong>Race Name:</strong>
          <p style={paragraphStyle}>{selectedResult.circuitname}</p>
          <strong>Date:</strong>
          <p style={paragraphStyle}>{selectedResult.date}</p>
          <strong>Time:</strong>
          <p style={paragraphStyle}>{selectedResult.time}</p>
          <strong>Fastest Lap:</strong>
          <p style={paragraphStyle}>{selectedResult.fastestLapTime}</p>
          <strong>Position:</strong>
          <p style={paragraphStyle}>{selectedResult.driverId}</p>
        </div>
      ) : (
        <p>No result selected.</p>
      )}
    </div>
  );
};

export default ResultData;
