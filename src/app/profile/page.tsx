"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Settings, Star, ChevronRight } from "lucide-react";

// Mock data
const user = {
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 98765 43210",
  avatar: "/placeholder.svg",
};

const activeRentals = [
  { id: 1, name: "Arctic Blast Inverter AC", endDate: "2023-07-15" },
];

const upcomingAppointments = [
  {
    id: 1,
    service: "General AC Maintenance",
    date: "2023-07-10",
    time: "10:00 AM",
  },
];

const paymentHistory = [
  { id: 1, service: "AC Rental", amount: 1500, date: "2023-06-01" },
  { id: 2, service: "Repair Service", amount: 800, date: "2023-06-15" },
];

const notifications = [
  { id: 1, message: "Your AC rental booking is confirmed", isRead: false },
  {
    id: 2,
    message: "Reminder: AC maintenance scheduled for tomorrow",
    isRead: true,
  },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome, {user.name}
          </motion.h1>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="text-gray-600" />
              {notifications.some((n) => !n.isRead) && (
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="text-gray-600" />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <button
            className={`p-4 rounded-2xl ${
              activeTab === "overview"
                ? "bg-[#ffc300] text-[#010101]"
                : "bg-white text-gray-600"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`p-4 rounded-2xl ${
              activeTab === "rentals"
                ? "bg-[#ffc300] text-[#010101]"
                : "bg-white text-gray-600"
            }`}
            onClick={() => setActiveTab("rentals")}
          >
            Rentals
          </button>
          <button
            className={`p-4 rounded-2xl ${
              activeTab === "appointments"
                ? "bg-[#ffc300] text-[#010101]"
                : "bg-white text-gray-600"
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            Appointments
          </button>
          <button
            className={`p-4 rounded-2xl ${
              activeTab === "payments"
                ? "bg-[#ffc300] text-[#010101]"
                : "bg-white text-gray-600"
            }`}
            onClick={() => setActiveTab("payments")}
          >
            Payments
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Active Rentals</h2>
                  {activeRentals.map((rental) => (
                    <div
                      key={rental.id}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>{rental.name}</span>
                      <span className="text-gray-600">
                        Until {rental.endDate}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Upcoming Appointments
                  </h2>
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>{appointment.service}</span>
                      <span className="text-gray-600">
                        {appointment.date} at {appointment.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-3xl shadow-lg p-6 md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">
                    Recent Payments
                  </h2>
                  {paymentHistory.slice(0, 3).map((payment) => (
                    <div
                      key={payment.id}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>{payment.service}</span>
                      <span className="text-gray-600">
                        ₹{payment.amount} on {payment.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "rentals" && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Your Rentals</h2>
                {activeRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-2xl"
                  >
                    <div>
                      <h3 className="font-semibold">{rental.name}</h3>
                      <p className="text-gray-600">Until {rental.endDate}</p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Your Appointments
                </h2>
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-2xl"
                  >
                    <div>
                      <h3 className="font-semibold">{appointment.service}</h3>
                      <p className="text-gray-600">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "payments" && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Payment History</h2>
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-2xl"
                  >
                    <div>
                      <h3 className="font-semibold">{payment.service}</h3>
                      <p className="text-gray-600">{payment.date}</p>
                    </div>
                    <span className="font-semibold">₹{payment.amount}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-8 bg-white rounded-3xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Leave Feedback</h2>
          <div className="flex items-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Star
                  className="text-gray-300 hover:text-[#ffc300]"
                  size={24}
                />
              </motion.button>
            ))}
          </div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300]"
            rows={3}
            placeholder="Share your experience with our service..."
          />
          <motion.button
            className="mt-4 bg-[#ffc300] text-[#010101] px-6 py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Feedback
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 bg-white rounded-3xl shadow-lg p-6 w-80"
          >
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`mb-2 p-2 rounded ${
                  notification.isRead ? "bg-gray-100" : "bg-blue-100"
                }`}
              >
                {notification.message}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
