"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getAllACRentals } from "../../apis/acrent";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type RentalRates = {
  "3_months": number;
  "6_months": number;
  "1_year": number;
};

interface ACType {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  availability: number; // Changed from boolean to number
  rentalRates: RentalRates;
  rent: boolean; // Add the amc property here
}
export default function Component() {
  const [acTypes, setACTypes] = useState<ACType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchACTypes = async () => {
      try {
        const data = await getAllACRentals();
        setACTypes(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch AC rental options");
      } finally {
        setLoading(false);
      }
    };

    fetchACTypes();
  }, []);

  const handleBookClick = (id: string) => {
    console.log(`Navigating to AC Details Page for AC with id: ${id}`);
  };
  const filteredACTypes = acTypes.filter((ac) => ac.rent);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8"
    >
      <header className="flex items-center mb-6">
        <Link href="./home">
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
          AC Rental Options
        </motion.h1>
      </header>

      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300" />
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-4" />
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4" />{" "}
                  {/* Updated for availability count */}
                  <div className="h-10 bg-gray-300 rounded w-full" />
                </div>
              </div>
            ))}
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-center"
          >
            {error}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[calc(100vh-120px)]"
          >
            {filteredACTypes.map((ac, index) => (
              <motion.div
                key={ac._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <Link href={`/ac-rent/${ac._id}`}>
                  <Image
                    src={ac.imageUrl}
                    alt={ac.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-[#010101] mb-2">
                      {ac.name}
                    </h2>
                    <p className="text-gray-600 mb-2">{ac.description}</p>

                    <div className="flex justify-between items-center mb-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          ac.availability > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {ac.availability > 0
                          ? `${ac.availability} Available`
                          : "Out of Stock"}
                      </span>
                    </div>
                    <motion.button
                      whileHover={ac.availability > 0 ? { scale: 1.05 } : {}}
                      whileTap={ac.availability > 0 ? { scale: 0.95 } : {}}
                      onClick={() =>
                        ac.availability > 0 && handleBookClick(ac._id)
                      }
                      className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors duration-300 ${
                        ac.availability > 0
                          ? "bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:ring-blue-4000"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={ac.availability === 0}
                    >
                      {ac.availability > 0 ? "Book Now" : "Out of Stock"}
                    </motion.button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
