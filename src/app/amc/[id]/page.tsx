"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Loader2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getACRentalById, getACTypeById } from "../../../apis/acrent";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface RentalRate {
  duration: string; // Keep duration as string if it's formatted like '1', '2', etc.
  actualPrice: number; // Add actualPrice property
  offerPrice: number; // Add offerPrice property
}

interface ACDetails {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  availability: boolean;
  rentalRates: RentalRate[];
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
  const [acTypeName, setACTypeName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchACDetails = async () => {
      try {
        const response = await getACRentalById(id);
        setACDetails(response);

        if (response.type) {
          const typeResponse = await getACTypeById(response.type);
          setACTypeName(typeResponse.name);
        }
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
    if (quantity < 1) {
      alert("Please enter a valid quantity.");
      return;
    }
    router.push(`/ac-rent/${id}/${duration}?quantity=${quantity}`);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8"
      >
        <header className="flex items-center mb-6">
          <Link href="../">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mr-4 bg-blue-300 text-[#010101] p-2 rounded-full"
              aria-label="Go back"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </Link>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold text-[#010101]"
          >
            {acDetails.name}
          </motion.h1>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
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
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <section>
              <h2 className="text-xl font-semibold text-[#010101] mb-3">
                Description
              </h2>
              <p className="text-[#010101]">{acDetails.description}</p>
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
                    {acTypeName || "Unknown Type"}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-3 rounded-lg shadow-sm"
                >
                  <h3 className="text-sm font-medium text-gray-500">
                    Available quantity of {acDetails.name}
                  </h3>
                  <p className="text-lg font-semibold text-[#010101]">
                    {acDetails.availability}
                  </p>
                </motion.div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#010101] mb-3">
                Quantity
              </h2>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={decrementQuantity}
                  className="p-2 bg-blue-300 text-[#010101] rounded-full"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="w-20 p-2 border border-[#ffc300] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc300] text-center text-[#010101]"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={incrementQuantity}
                  className="p-2 bg-blue-300 text-[#010101] rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
                <p className="text-lg font-semibold text-[#010101]">Units</p>
              </div>
            </section>
          </motion.div>
        </div>

        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-[#010101] mb-4">
            Rental Plans
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {acDetails.rentalRates.map(
              ({ duration, actualPrice, offerPrice }, index) => (
                <motion.div
                  key={duration}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-md text-center"
                >
                  <h3 className="text-lg font-semibold text-[#010101] mb-2">
                    {duration} month{parseInt(duration) > 1 ? "s" : ""}
                    {/* Pluralization */}
                  </h3>
                  <p className="text-2xl line-through font-bold text-[#ffc300] mb-4">
                    ₹{actualPrice} {/* Ensure you're using actualPrice */}
                  </p>
                  <p className="text-2xl font-bold text-[#ffc300] mb-4">
                    ₹{offerPrice} {/* Ensure you're using offerPrice */}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePlanSelection(duration)}
                    className="w-full py-2 px-4 bg-blue-300 text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  >
                    Select Plan
                  </motion.button>
                </motion.div>
              )
            )}
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
}
