"use client";

import React, { useState, useEffect } from "react";
import { Refrigerator, WashingMachine, Microwave, Wind ,} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    name: "AC Repair & maintainance",
    icon: Wind,
    color: "bg-blue-500",
    link: "/airconditioner",
  },
  {
    name: "Fridge Repair & maintainance",
    icon: Refrigerator,
    color: "bg-green-500",
    link: "/fridge",
  },
  {
    name: "Washing Machine Repair",
    icon: WashingMachine,
    color: "bg-purple-500",
    link: "/washingmachine",
  },
  {
    name: "Microwave Repair",
    icon: Microwave,
    color: "bg-red-500",
    link: "/oven",
  },
];

export default function MainScreen() {
  const [isLoading, setIsLoading] = useState(true);
  console.log("ENV", process.env.NEXT_PUBLIC_API_URL);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 border-4 border-[#ffc300] border-t-[#010101] rounded-full animate-spin"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold text-[#010101] mb-6"
      >
        Home Services
      </motion.h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="col-span-full lg:col-span-2 bg-[#ffc300] rounded-2xl shadow-lg overflow-hidden cursor-pointer"
        >
          <Link href="/ac-rent">
            <div className="p-6 flex items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#010101] mb-2">
                  AC Rental Service
                </h2>
                <p className="text-[#010101] opacity-80">
                  Cool comfort, delivered to your doorstep
                </p>
              </div>
             
            </div>
          </Link>
        </motion.div>

        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${service.color} rounded-xl shadow-md overflow-hidden cursor-pointer`}
          >
            <Link href={service.link}>
              <div className="p-4 flex flex-col items-center">
                <service.icon className="w-12 h-12 text-white mb-2" />
                <h3 className="text-lg font-semibold text-white text-center">
                  {service.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
