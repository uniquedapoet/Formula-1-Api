import React from "react";

const CircuitPicture = ({ selectedCircuit }) => {
  if (!selectedCircuit) {
    return <p>No circuit selected</p>;
  }

  console.log("Selected circuit Picture:", selectedCircuit["name"]);
  console.log("Current URL path:", window.location.pathname);

  const concatenateWithUnderscores = (text) => {
    if (typeof text !== "string") return "";
    const wordsArray = text.split(/\s+/);
    return wordsArray
      .filter((word) => word !== "Grand" && word !== "Prix")
      .join("_");
  };

  const circuit = selectedCircuit.name;
  const concatenatedCircuit = concatenateWithUnderscores(circuit);
  const imageUrl = `/Circuit_Pictures/${concatenatedCircuit}.jpg`;
  console.log("Image URL:", imageUrl);

  const circuitPictureContainerStyle = {
    zIndex: 1000,
    position: "fixed",
    top: "calc(78px + 18% + 10px)",
    left: "30%", // Start right next to the load-data-container
    width: "70%", // Take the remaining width
    height: "47%", // Take the remaining height
    display: "flex",
    flexDirection: "column", // Arrange children in a column
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cfcfc4",
    padding: "10px",
    borderRadius: "10px", 
  };

  return (
    <div style={circuitPictureContainerStyle}>
      <img
        src={imageUrl}
        style={{ height: "100%", width: "96%" }}
        alt={`No Picture For ${circuit}`}
      />
    </div>
  );
};

export default CircuitPicture;
