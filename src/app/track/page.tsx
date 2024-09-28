"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type OrderStatus = "Pending" | "Approved" | "Rejected";

interface ContactDetails {
  name: string;
  phone: string;
  email: string;
  technician: string;
  address: string;
}

interface Technician {
  _id: string;
  name?: string;
  technician: string;
  phone: string;
  email: string;
  services: string[];
  availability: boolean;
  address: string;
}

interface OrderDetails {
  contact: ContactDetails;
  _id: string;
  service: string; // Changed from services to service based on the API response
  status: OrderStatus;
  date: string;
  timeSlot: string;
  paymentStatus: string;
  totalPrice: number;

  technician?: Technician; // Technician information might not always be available
}

// Fetch order details by phone number
const fetchOrderByPhone = async (phone: string): Promise<OrderDetails[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/phone/${phone}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch order details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

// Fetch technician details by ID
const fetchTechnicianById = async (id: string): Promise<Technician> => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/technicians/id/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch technician details");
    }
    const data = await response.json();
    return data; // Ensure the returned data matches the Technician interface
  } catch (error) {
    console.error("Error fetching technician details:", error);
    throw error;
  }
};

export default function OrderTrackingPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#fafafa";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchOrderDetails();
  };

  const fetchOrderDetails = async () => {
    setIsLoading(true); // Start loading state
    try {
      const details = await fetchOrderByPhone(mobileNumber); // Fetch order details
      console.log("details", details); // Log the fetched details

      if (details.length > 0) {
        const technician: Technician | undefined = details[0].technician; // Get the technician object

        // Check if technician is defined before extracting id
        if (technician) {
          const technicianId: string = technician._id; // Extract the technician's ID
          const technicianDetails = await fetchTechnicianById(technicianId); // Fetch technician details
          setOrderDetails({ ...details[0], technician: technicianDetails }); // Update state with order details and technician
        } else {
          console.warn("Technician is undefined"); // Log warning
          alert("Technician ID is missing for this order."); // Alert user
        }
      } else {
        console.warn("No order details found."); // Handle case where no details are returned
        alert("No order details found for this phone number.");
      }
    } catch (error) {
      console.error("Error fetching order details:", error); // Log error for debugging
      alert("Failed to fetch order details. Please try again."); // Alert user of failure
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchOrderDetails();
    setIsRefreshing(false);
  };

  const renderStatusAnimation = (
    status: OrderStatus,
    paymentStatus: string
  ) => {
    if (paymentStatus.toLowerCase() === "paid") {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <DollarSign className="w-16 h-16 text-green-500" />
        </motion.div>
      );
    }

    switch (status) {
      case "Approved":
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case "Rejected":
        return <XCircle className="w-16 h-16 text-red-500" />;
      case "Pending":
        return <Clock className="w-16 h-16 text-[#ffc300]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8"
    >
      <header className="flex items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mr-4"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6 text-[#010101]" />
        </motion.button>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-[#010101]"
        >
          Order Tracking
        </motion.h1>
      </header>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-md mx-auto space-y-8"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-[#010101] mb-1"
            >
              Enter your mobile number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="e.g., 9876543210"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-transparent transition-all duration-300"
            />
          </div>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 px-4 bg-[#ffc300] text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Fetching..." : "Track Order"}
          </motion.button>
        </form>

        <AnimatePresence>
          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-6 rounded-xl shadow-md space-y-4"
            >
              <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {renderStatusAnimation(
                  orderDetails.status,
                  orderDetails.paymentStatus
                )}
                <h2 className="text-2xl font-bold mt-4 text-[#010101]">
                  {orderDetails.paymentStatus.toLowerCase() === "paid"
                    ? "Payment Received"
                    : `Order ${orderDetails.status}`}
                </h2>
              </motion.div>

              {orderDetails.contact && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-[#010101]">
                    Contact Information
                  </h3>
                  <p>
                    <strong>Name:</strong> {orderDetails.contact.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {orderDetails.contact.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {orderDetails.contact.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {orderDetails.contact.address}
                  </p>
                </motion.div>
              )}

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-[#010101]">
                  Order Details
                </h3>
                <p>
                  <strong>Status:</strong> {orderDetails.status}
                </p>
                <p>
                  <strong>Payment Status:</strong> {orderDetails.paymentStatus}
                </p>
                <p>
                  <strong>Total Price:</strong> $ {orderDetails.totalPrice}
                </p>
                <p>
                  <strong>Rental:</strong> {orderDetails.service}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(orderDetails.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time Slot:</strong>{" "}
                  {new Date(orderDetails.timeSlot).toLocaleTimeString()}
                </p>
              </motion.div>

              {orderDetails.technician && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-[#010101]">
                    Assigned Technician
                  </h3>
                  <p>
                    <strong>Name:</strong> {orderDetails.technician.name}
                  </p>
                  <p>
                    <strong>ID:</strong> {orderDetails.technician._id}
                  </p>
                  <p>
                    <strong>Phone:</strong> {orderDetails.technician.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {orderDetails.technician.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {orderDetails.technician.address}
                  </p>
                </motion.div>
              )}

              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 px-4 bg-[#ffc300] text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRefreshing ? "Refreshing..." : "Refresh Order Status"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
