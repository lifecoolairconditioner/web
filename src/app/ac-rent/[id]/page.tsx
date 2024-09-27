"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getACRentalById } from "@/apis/acrent";
import Image from "next/image";
import { motion } from "framer-motion";

interface ACDetails {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  availability: boolean;
  rentalRates: { [key: string]: number };
}

interface ACDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ACDetailsPage({ params }: ACDetailsPageProps) {
  const router = useRouter();
  const { id } = params;

  const [acDetails, setACDetails] = useState<ACDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchACDetails = async () => {
      try {
        const response = await getACRentalById(id);
        setACDetails(response.data);
      } catch (err) {
        console.error("Error fetching AC details:", err);
        setError("Failed to fetch AC details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchACDetails();
    }
  }, [id]);

  const handlePlanSelection = (duration: string) => {
    router.push(`/ac-rent/${id}/${duration}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Loader2 className="w-12 h-12 text-[#ffc300] animate-spin" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#fafafa] flex items-center justify-center text-red-500 text-xl"
      >
        {error}
      </motion.div>
    );
  }

  if (!acDetails) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#fafafa] flex items-center justify-center text-[#010101] text-xl"
      >
        No AC details found
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8"
    >
      <header className="flex items-center mb-6">
        <Link href="/">
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
          {acDetails.name}
        </motion.h1>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Image
            src={acDetails.imageUrl}
            alt={acDetails.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-xl shadow-md"
          />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <section>
            <h2 className="text-xl font-semibold text-[#010101] mb-3">
              Description
            </h2>
            <p>{acDetails.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#010101] mb-3">
              Key Features
            </h2>
            <ul className="space-y-2">
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start"
              >
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                Portable and compact design
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start"
              >
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                Energy-efficient cooling
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-start"
              >
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                Easy installation and maintenance
              </motion.li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#010101] mb-3">
              Specifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-3 rounded-lg shadow-sm"
              >
                <h3 className="text-sm font-medium text-gray-500">Type</h3>
                <p className="text-lg font-semibold text-[#010101]">
                  {acDetails.type}
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-3 rounded-lg shadow-sm"
              >
                <h3 className="text-sm font-medium text-gray-500">
                  Availability
                </h3>
                <p className="text-lg font-semibold text-[#010101]">
                  {acDetails.availability ? "Available" : "Unavailable"}
                </p>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>

      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold text-[#010101] mb-4">Rental Plans</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(acDetails.rentalRates).map(
            ([duration, price], index) => (
              <motion.div
                key={duration}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <h3 className="text-lg font-semibold text-[#010101] mb-2">
                  {duration.replace("_", " ")}
                </h3>
                <p className="text-2xl font-bold text-[#ffc300] mb-4">
                  ₹{price}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlanSelection(duration)}
                  className="w-full py-2 px-4 bg-[#ffc300] text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                >
                  Select Plan
                </motion.button>
              </motion.div>
            )
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}
