import axios from "axios";

// Define the base URL of your backend server
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/carousel2`;

// Fetch all carousel images
export const fetchCarousel2Images = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    throw error;
  }
};

// Upload a new carousel image (with the image file and title)
export const uploadCarousel2Image = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file upload
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading carousel image:", error);
    throw error;
  }
};

// Delete a carousel image by its ID
export const deleteCarousel2Image = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting carousel image:", error);
    throw error;
  }
};
