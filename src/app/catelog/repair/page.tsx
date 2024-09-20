"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Wrench,
  Thermometer,
  Fan,
  Zap,
  Droplet,
  Calendar,
} from "lucide-react";
import Link from "next/link";

// Mock data for services
const services = [
  {
    id: 1,
    name: "General AC Repair",
    icon: Wrench,
    description: "Comprehensive repair for all AC issues",
    price: "₹1000 onwards",
  },
  {
    id: 2,
    name: "AC Installation",
    icon: Thermometer,
    description: "Professional AC installation service",
    price: "₹2500",
  },
  {
    id: 3,
    name: "Fan Motor Replacement",
    icon: Fan,
    description: "Replace faulty fan motors",
    price: "₹1500",
  },
  {
    id: 4,
    name: "Compressor Repair",
    icon: Zap,
    description: "Repair or replace AC compressors",
    price: "Request Quote",
  },
  {
    id: 5,
    name: "Refrigerant Recharge",
    icon: Droplet,
    description: "Recharge AC refrigerant",
    price: "₹800",
  },
  {
    id: 6,
    name: "Annual Maintenance Contract",
    icon: Calendar,
    description: "Year-round AC maintenance",
    price: "₹3000/year",
  },
];

export default function RepairMaintenanceServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (priceFilter === "all" ||
        (priceFilter === "fixed" && service.price !== "Request Quote") ||
        (priceFilter === "quote" && service.price === "Request Quote"))
  );

  return (
    <div className="min-h-screen bg-[#fafafa] p-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Repair and Maintenance Services
        </motion.h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full p-3 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffc300]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400" size={20} />
            <select
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffc300]"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="fixed">Fixed Price</option>
              <option value="quote">Request Quote</option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <div className="flex items-center mb-4">
                    <service.icon className="w-8 h-8 text-[#ffc300] mr-3" />
                    <h2 className="text-xl font-semibold">{service.name}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Link href={`/catelog/repair/${service.id}`} passHref>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#ffc300] text-[#010101] px-4 py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors"
                      >
                        {service.price === "Request Quote"
                          ? "Get Quote"
                          : "Book Now"}
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredServices.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 mt-8"
          >
            No services found. Please try a different search term or filter.
          </motion.p>
        )}
      </div>
    </div>
  );
}
