"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMyOrder, updateOrderStatus } from "@/apis/technician";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface Order {
  _id: string;
  status: string;
  quantity: number;
  totalPrice: number;
  paymentStatus: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  rental: string;
  duration: string;
  technician: string;
  contact: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}

export default function Component() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);

        if (accessToken) {
          const response = await getMyOrder();
          setOrders(response);
        } else {
          setError("You have to login");
          window.location.href = "/auth/login";
        }
      } catch (err: unknown) {
        console.log(err);

        // Typing error as 'unknown'
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch orders");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string) => {
    setUpdatingOrderId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders
          ? prevOrders.map((order) =>
              order._id === orderId ? { ...order, status: newStatus } : order
            )
          : prevOrders
      );
      setNewStatus("");
    } catch (err) {
      console.error("Failed to update order status:", err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("accessToken"); // Clear the token
      // Optionally, redirect the user or update the state to reflect the logout
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="w-16 h-16 text-yellow-500 animate-spin" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-center mt-8"
      >
        {error}
      </motion.div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-8"
      >
        No orders found.
      </motion.p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">
        My Orders
      </h2>

      {/* Logout Button */}
      <div className="mb-6 text-center">
        <Button onClick={handleLogout} className="bg-red-500 text-white">
          Logout
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          {orders.map((order, index) => (
            <motion.div
              key={order?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="mb-6 overflow-hidden">
                <CardHeader className="bg-yellow-500 uppercase text-black">
                  Order ID: {order?._id}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>Order ID:</strong> {order?._id}</p>
                      <p><strong>Rental ID:</strong> {order?.rental}</p>
                      <p><strong>Status:</strong> {order?.status}</p>
                      <p><strong>Payment Status:</strong> {order?.paymentStatus}</p>
                      <p><strong>Duration:</strong> {order?.duration} Months</p>
                      <p><strong>Quantity:</strong> {order?.quantity}</p>
                      <p><strong>Total Price:</strong> ₹{order?.totalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                      <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                      <p><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
                      <p><strong>Technician ID:</strong> {order?.technician}</p>
                      <p><strong>Contact:</strong> {order?.contact.name}, {order?.contact.phone}</p>
                      <p><strong>Email:</strong> {order?.contact.email}</p>
                      <p><strong>Address:</strong> {order?.contact.address}</p>
                      <p><strong>Location:</strong> Lat: {order?.location.latitude}, Long: {order?.location.longitude}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Select onValueChange={setNewStatus}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => handleUpdateStatus(order._id)}
                      disabled={updatingOrderId === order._id || !newStatus}
                    >
                      {updatingOrderId === order._id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : null}
                      {updatingOrderId === order._id ? "Updating..." : "Update"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
