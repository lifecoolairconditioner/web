import axios from "axios";

const API_URL = "http://localhost:8000/api/services";

// Get all services (Public)
export const getAllServices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Get a single service by ID (Public)
export const getServiceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service by ID (${id}):`, error);
    throw error;
  }
};

// Create a new service (Admin only)
export const createService = async (serviceData) => {
  try {
    const response = await axios.post(API_URL, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

// Update an existing service (Admin only)
export const updateService = async (id, serviceData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating service by ID (${id}):`, error);
    throw error;
  }
};

// Delete a service by ID (Admin only)
export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting service by ID (${id}):`, error);
    throw error;
  }
};
