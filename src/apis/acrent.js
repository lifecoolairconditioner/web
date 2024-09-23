import axios from "axios";

const API_URL = "http://localhost:8000/api/acrent";

// Get all AC rentals
export const getAllACRentals = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching AC rentals:", error);
    throw error;
  }
};

// Get a single AC rental by ID
export const getACRentalById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching AC rental by ID (${id}):`, error);
    throw error;
  }
};

// Create a new AC rental (Admin access required)
export const createACRental = async (acRentalData) => {
  try {
    const response = await axios.post(API_URL, acRentalData);
    return response;
  } catch (error) {
    console.error("Error creating AC rental:", error);
    throw error;
  }
};

// Update an existing AC rental (Admin access required)
export const updateACRental = async (id, acRentalData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, acRentalData);
    return response;
  } catch (error) {
    console.error(`Error updating AC rental with ID (${id}):`, error);
    throw error;
  }
};

// Delete an AC rental (Admin access required)
export const deleteACRental = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting AC rental with ID (${id}):`, error);
    throw error;
  }
};
