import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/orders`;

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Get all orders (Admin/Technician access)
export const getAllOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Get an order by ID (Admin/Technician access)
export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order by ID (${id}):`, error);
    throw error;
  }
};

// Update order status (Admin/Technician access)
export const updateOrderStatus = async (id, newStatus) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/status`, { newStatus });
    return response.data;
  } catch (error) {
    console.error(`Error updating order status for ID (${id}):`, error);
    throw error;
  }
};

// Update order status (Admin/Technician access)
export const updatePaymentStatus = async (id, paymentStatus) => {
  try {
    const response = await axios.put(`${API_URL}/payment/${id}`, {
      paymentStatus,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating order status for ID (${id}):`, error);
    throw error;
  }
};

// Update order status (Admin/Technician access)
export const AssignTechnician = async (id, technician) => {
  try {
    console.log(technician);
    const response = await axios.put(`${API_URL}/technician/${id}`, {
      technician,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating order technician for ID (${id}):`, error);
    throw error;
  }
};

export const updateOrderDateAndTimeSlot = async (id, date, timeSlot) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/update`, {
      date,
      timeSlot,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error updating order date and time slot for ID (${id}):`,
      error
    );
    throw error;
  }
};