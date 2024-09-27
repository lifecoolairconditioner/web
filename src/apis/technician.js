// src/api.js
import axios from "axios";

// Base URL of your backend API
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/technicians`;

// Technicians API calls
export const getAllTechnicians = async () => {
  return await axios.get(`${API_URL}`);
};

export const createTechnician = async (technicianData) => {
  return await axios.post(`${API_URL}`, technicianData);
};

export const updateTechnician = async (id, technicianData) => {
  console.log(technicianData);
  return await axios.put(`${API_URL}/${id}`, technicianData);
};

export const deleteTechnician = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
