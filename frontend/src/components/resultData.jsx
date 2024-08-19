import React from "react";

const ResultData = ({ selectedResult }) => {
  const containerStyle = {
    zIndex: 1000,
    position: "fixed",
    bottom: "0px", // Adjust to match the height of the header
    left: "20%", // Start right next to the load-data-container
    width: "10%", // Take the remaining width
    height: "67.5%", // Take the remaining height
    display: "flex",
    flexDirection: "column", // Arrange children in a column
    justifyContent: "flex-start", // Align items at the start of the column
    padding: "10px",
    borderBottom: "1px solid #282c34",
    // backgroundColor: "#00ff2a",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr", // Single column
    rowGap: "3px", // Adjust the gap between rows
  };

  const reference = selectedResult ? selectedResult.surname + " " + selectedResult.forename : "";

  const paragraphStyle = {
    marginTop: "5px", // Adjust the margin to move the content up slightly
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ margin: "0" }}>Result Details:</h2>
      {selectedResult ? (
        <div style={gridStyle}>
          <strong>Race Name:</strong>
          <p style={paragraphStyle}>{selectedResult.circuitname}</p>
          <strong>Laps:</strong>
          <p style={paragraphStyle}>{selectedResult.nationality}</p>
          <strong>Date:</strong>
          <p style={paragraphStyle}>{selectedResult.date}</p>
          <strong>Points:</strong>
          <p style={paragraphStyle}>{selectedResult.points}</p>
          <strong>Podium:</strong>
          <p style={paragraphStyle}>{selectedResult.wins}</p>
        </div>
      ) : (
        <p>No result selected.</p>
      )}
    </div>
  );
};

export default ResultData;