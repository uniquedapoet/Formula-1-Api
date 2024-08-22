import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const getDriverData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/drivers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching driver data:", error);
    throw error;
  }
};

export const getCircuitData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/circuits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching circuit data:", error);
    throw error;
  }
};

export const getResultsData = async ({ Driver }) => {
  try {
    console.log("Drivernnnn:", Driver);
    let response;
    if (Driver === null) {
      response = await axios.get(`${API_BASE_URL}/results`);
    } else {
      response = await axios.get(`${API_BASE_URL}/results/driver/${Driver['driverRef']}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching result data:", error);
    throw error;
  }
};
