"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

type OrderStatus = "Pending" | "Approved" | "Rejected";

interface ContactDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface OrderDetails {
  status: OrderStatus;
  contact: ContactDetails;
  paymentStatus: string;
  totalPrice: number;
  timeSlot: string;
  rental: string;
  date: string;
}

const fetchOrderByPhone = async (phone: string): Promise<OrderDetails[]> => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/orders/phone/${phone}`
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

export default function OrderTrackingPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchOrderDetails();
  };

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    try {
      const details = await fetchOrderByPhone(mobileNumber);
      console.log(details); // Ensure you're logging the correct array of orders
      setOrderDetails(details);
    } catch (error) {
      console.log(error);

      alert("Failed to fetch order details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatusAnimation = (status: OrderStatus) => {
    switch (status) {
      case "Approved":
        return (
          <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
        );
      case "Rejected":
        return <XCircle className="w-16 h-16 text-red-500 animate-shake" />;
      case "Pending":
        return <Clock className="w-16 h-16 text-[#ffc300] animate-pulse" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <header className="flex items-center mb-6">
        <button className="mr-4" aria-label="Go back">
          <ChevronLeft className="w-6 h-6 text-[#010101]" />
        </button>
        <h1 className="text-2xl font-bold text-[#010101]">Order Tracking</h1>
      </header>

      <div className="max-w-md mx-auto space-y-8">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-[#ffc300] text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Fetching..." : "Track Order"}
          </button>
        </form>

        {orderDetails && orderDetails.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            {/* Safely access the first order in the array */}
            {orderDetails[0] && (
              <>
                <div className="flex flex-col items-center">
                  {renderStatusAnimation(orderDetails[0].status)}
                  <h2 className="text-2xl font-bold mt-4 text-[#010101]">
                    Order {orderDetails[0].status}
                  </h2>
                </div>

                {/* Check if the contact details exist */}
                {orderDetails[0].contact && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#010101]">
                      Contact Information
                    </h3>
                    <p>
                      <strong>Name:</strong> {orderDetails[0].contact.name}
                    </p>
                    <p>
                      <strong>Phone:</strong> {orderDetails[0].contact.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {orderDetails[0].contact.email}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {orderDetails[0].contact.address}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#010101]">
                    Order Details
                  </h3>
                  <p>
                    <strong>Status:</strong> {orderDetails[0].status}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {orderDetails[0].paymentStatus}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${orderDetails[0].totalPrice}
                  </p>
                  <p>
                    <strong>Rental Period:</strong> {orderDetails[0].timeSlot}
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(orderDetails[0].date).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={fetchOrderDetails}
                  className="flex items-center justify-center w-full py-2 px-4 bg-gray-100 text-[#010101] rounded-lg font-semibold hover:bg-gray-200 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-200 focus:ring-opacity-50"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Refresh Status
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
