import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/technicians`;
const ORDERS_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/orders`;

const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("accessToken");
  }
  return null;
};

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

export const getOrdersByTechnician = async (technicianId) => {
  return await axios.get(`${ORDERS_API_URL}/technician/${technicianId}`);
};

export const getMyOrder = async () => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(`${ORDERS_API_URL}/myorders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.put(
      `${ORDERS_API_URL}/updatemyorders/${orderId}`,
      { newStatus },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
