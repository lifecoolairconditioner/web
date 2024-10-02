"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  RefreshCw,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getOrderById } from "@/apis/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

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
  service: string;
  status: OrderStatus;
  date: string;
  timeSlot: string;
  paymentStatus: string;
  totalPrice: number;
  technician?: Technician;
}

const fetchOrderByPhone = async (phone: string): Promise<OrderDetails[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/phone/${phone}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch order details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

const fetchTechnicianById = async (id: string): Promise<Technician> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technicians/id/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch technician details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching technician details:", error);
    throw error;
  }
};

export default function OrderTrackingPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedTimeSlot, setUpdatedTimeSlot] = useState("");
  const [showRentalAlert, setShowRentalAlert] = useState(false);

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
    setIsLoading(true);
    try {
      const details = await fetchOrderByPhone(mobileNumber);
      const updatedDetails = await Promise.all(
        details.map(async (order) => {
          if (order.technician && order.technician._id) {
            try {
              const technicianDetails = await fetchTechnicianById(
                order.technician._id
              );
              return { ...order, technician: technicianDetails };
            } catch (error) {
              console.log(error);
              console.warn(
                `Failed to fetch technician details for order ${order._id}`
              );
              return order;
            }
          }
          return order;
        })
      );
      setOrderDetails(updatedDetails);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch order details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchOrderDetails();
    setIsRefreshing(false);
  };

  const handleUpdateOrder = async () => {
    if (orderDetails.length === 0) return;

    const lastOrder = orderDetails[orderDetails.length - 1];

    if (lastOrder.service.toLowerCase() === "rental") {
      setShowRentalAlert(true);
      setIsUpdateModalOpen(false);
      return;
    }

    try {
      const updatedOrder = await getOrderById(lastOrder._id);
      if (updatedOrder) {
        const updatedOrderDetails = {
          ...updatedOrder,
          date: updatedDate,
          timeSlot: updatedTimeSlot,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/datetime/${lastOrder._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOrderDetails),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update order");
        }

        toast({
          title: "Success",
          description: "Order updated successfully",
        });

        setIsUpdateModalOpen(false);
        await fetchOrderDetails();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        title: "Error",
        description: "Failed to update order. Please try again.",
        variant: "destructive",
      });
    }
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
        <Link href="../">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mr-4"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6 text-[#010101]" />
          </motion.button>
        </Link>
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
        className="max-w-3xl mx-auto space-y-8"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-[#010101] mb-1"
            >
              Enter your mobile number
            </Label>
            <Input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="e.g., 9876543210"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-transparent transition-all duration-300"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-[#ffc300] text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Fetching..." : "Track Orders"}
          </Button>
        </form>

        <AnimatePresence>
          {orderDetails.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {orderDetails.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md space-y-4"
                >
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {renderStatusAnimation(order.status, order.paymentStatus)}
                    <h2 className="text-2xl font-bold mt-4 text-[#010101]">
                      {order.paymentStatus.toLowerCase() === "paid"
                        ? "Payment Received"
                        : `Order ${order.status}`}
                    </h2>
                  </motion.div>

                  {order.contact && (
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
                        <strong>Name:</strong> {order.contact.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.contact.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {order.contact.email}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.contact.address}
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
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p>
                      <strong>Payment Status:</strong> {order.paymentStatus}
                    </p>
                    <p>
                      <strong>Total Price:</strong> $ {order.totalPrice}
                    </p>
                    <p>
                      <strong>Service:</strong> {order.service}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time Slot:</strong>{" "}
                      {new Date(order.timeSlot).toLocaleTimeString()}
                    </p>
                  </motion.div>

                  {order.technician ? (
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
                        <strong>Name:</strong> {order.technician.name}
                      </p>
                      <p>
                        <strong>ID:</strong> {order.technician._id}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.technician.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {order.technician.email}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.technician.address}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-lg font-semibold text-[#010101]">
                        Technician Information
                      </h3>
                      <p>No technician has been assigned to this order yet.</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              <motion.div className="flex space-x-4">
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex-1 py-2 px-4 bg-[#ffc300] text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRefreshing ? (
                    <>
                      <RefreshCw className="inline-block mr-2 animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="inline-block mr-2" />
                      Refresh Order Status
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setIsUpdateModalOpen(true)}
                  className="flex-1 py-2 px-4 bg-[#010101] text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-4 focus:ring-[#010101] focus:ring-opacity-50"
                >
                  <Calendar className="inline-block mr-2" />
                  Update Last Order
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#fafafa]">
          <DialogHeader>
            <DialogTitle className="text-[#010101]">
              Update Last Order
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="updatedDate"
                className="text-right text-[#010101]"
              >
                New Date
              </Label>
              <Input
                id="updatedDate"
                type="date"
                value={updatedDate}
                onChange={(e) => setUpdatedDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="updatedTimeSlot"
                className="text-right text-[#010101]"
              >
                New Time
              </Label>
              <Input
                id="updatedTimeSlot"
                type="time"
                value={updatedTimeSlot}
                onChange={(e) => setUpdatedTimeSlot(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleUpdateOrder}
              className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
            >
              Update Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {showRentalAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <Alert className="max-w-md bg-white">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Update Not Allowed</AlertTitle>
              <AlertDescription>
                You cannot update the date and time slot for rental orders.
              </AlertDescription>
              <Button
                onClick={() => setShowRentalAlert(false)}
                className="mt-4 bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
              >
                Close
              </Button>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
