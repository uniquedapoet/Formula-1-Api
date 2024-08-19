import React from "react";

const DriverData = ({ selectedDriver }) => {
  const containerStyle = {
    position: "fixed",
    top: "60px", // Adjust to match the height of the header
    left: "20%", // Start right next to the load-data-container
    width: "80%", // Take the remaining width
    display: "flex",
    flexDirection: "column", // Arrange children in a column
    justifyContent: "space-between", // Evenly space items in the column
    padding: "10px",
    borderBottom: "1px solid #282c34",
    backgroundColor: "#FF8000",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)", // Adjust the number of columns as needed
    gap: "0px",
  };
  
  const paragraphStyle = {
    marginTop: "5px", // Adjust the margin to move the content up slightly
  };
  
  const reference = selectedDriver ? selectedDriver.surname + " " + selectedDriver.forename : "";
  
  return (
    <div style={containerStyle}>
      <h2>Driver Details:</h2>
      {selectedDriver ? (
        <div style={gridStyle}>
          <strong>Name:</strong>
          <strong>Nationality:</strong>
          <strong>Date Of Birth:</strong>
          <strong>Team:</strong>
          <strong>Wins:</strong>
          <strong>Championships:</strong>
          <p style={paragraphStyle}>{reference}</p>
          <p style={paragraphStyle}>{selectedDriver.nationality}</p>
          <p style={paragraphStyle}>{selectedDriver.dob}</p>
          <p style={paragraphStyle}>{selectedDriver.dob}</p>
          <p style={paragraphStyle}>{selectedDriver.dob}</p>
          <p style={paragraphStyle}>{selectedDriver.dob}</p>
          {/* Add more driver details here */}
        </div>
      ) : (
        <p>No driver selected.</p>
      )}
    </div>
  );
};

export default DriverData;