// src/api.js
import axios from "axios";

// Base URL of your backend API
const API_URL = "http://localhost:8000/api";

// Technicians API calls
export const getAllTechnicians = async () => {
  return await axios.get(`${API_URL}/technicians`);
};

export const createTechnician = async (technicianData) => {
  return await axios.post(`${API_URL}/technicians`, technicianData);
};

export const updateTechnician = async (id, technicianData) => {
  return await axios.put(`${API_URL}/technicians/${id}`, technicianData);
};

export const deleteTechnician = async (id) => {
  return await axios.delete(`${API_URL}/technicians/${id}`);
};
