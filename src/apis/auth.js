import axios from "axios";

// Base URL for API
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Login the user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    // Assuming the response contains accessToken
    const accessToken = response.data.data.accessToken;

    // Store the accessToken in localStorage only on the client-side
    if (typeof window !== "undefined") {
      window.localStorage.setItem("accessToken", accessToken);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Logout the user
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        withCredentials: true, // To include cookies for token clearance
      }
    );

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("accessToken");
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

// Refresh the access token
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/refresh-token`,
      {},
      {
        withCredentials: true, // To include cookies
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to refresh token");
  }
};

// Change the current user's password
export const changePassword = async (passwordData) => {
  try {
    const response = await axios.put(
      `${API_URL}/change-password`,
      passwordData,
      {
        withCredentials: true, // To ensure the user is authenticated
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password change failed");
  }
};

// Get the currently authenticated user's details
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      withCredentials: true, // To include access token in cookies
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

// Update the user's account details
export const updateAccountDetails = async (accountData) => {
  try {
    const response = await axios.put(`${API_URL}/update-account`, accountData, {
      withCredentials: true, // To ensure the user is authenticated
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Update failed");
  }
};
