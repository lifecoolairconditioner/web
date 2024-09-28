import axios from "axios";

const AC_RENTAL_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/acrent`;

// Get all AC rentals
export const getAllACRentals = async () => {
  try {
    const response = await axios.get(AC_RENTAL_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching AC rentals:", error);
    throw error;
  }
};

// Get a single AC rental by ID
export const getACRentalById = async (id) => {
  try {
    const response = await axios.get(`${AC_RENTAL_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching AC rental by ID (${id}):`, error);
    throw error;
  }
};

// Create a new AC rental (Admin access required)
export const createACRental = async (acRentalData) => {
  try {
    const response = await axios.post(AC_RENTAL_API_URL, acRentalData);
    return response.data;
  } catch (error) {
    console.error("Error creating AC rental:", error);
    throw error;
  }
};

// Update an existing AC rental (Admin access required)
export const updateACRental = async (id, acRentalData) => {
  try {
    const response = await axios.put(
      `${AC_RENTAL_API_URL}/${id}`,
      acRentalData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating AC rental with ID (${id}):`, error);
    throw error;
  }
};

// Delete an AC rental (Admin access required)
export const deleteACRental = async (id) => {
  try {
    const response = await axios.delete(`${AC_RENTAL_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting AC rental with ID (${id}):`, error);
    throw error;
  }
};

const AC_TYPE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/acrent/acrental`;

// Get all AC types
export const getAllACTypes = async () => {
  try {
    const response = await axios.get(`${AC_TYPE_API_URL}/acs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching AC types:", error);
    throw error;
  }
};

// Get a single AC type by ID
export const getACTypeById = async (id) => {
  try {
    const response = await axios.get(`${AC_TYPE_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching AC type by ID (${id}):`, error);
    throw error;
  }
};

// Create a new AC type (Admin access required)
export const createACType = async (acTypeData) => {
  try {
    const response = await axios.post(`${AC_TYPE_API_URL}/acs`, acTypeData);
    return response.data;
  } catch (error) {
    console.error("Error creating AC type:", error);
    throw error;
  }
};

// Update an existing AC type (Admin access required)
export const updateACType = async (id, acTypeData) => {
  try {
    const response = await axios.put(`${AC_TYPE_API_URL}/${id}`, acTypeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating AC type with ID (${id}):`, error);
    throw error;
  }
};

// Delete an AC type (Admin access required)
export const deleteACType = async (id) => {
  try {
    const response = await axios.delete(`${AC_TYPE_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting AC type with ID (${id}):`, error);
    throw error;
  }
};
