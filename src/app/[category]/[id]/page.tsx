"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Clock } from "lucide-react";
import { getServiceById } from "../../../apis/service";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceDetails {
  _id: string;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  imageUrl: string;
  description: string;
  includes: string[];
  benefits: string[];
}

interface ServiceDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = params;
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        if (id) {
          const fetchedService = await getServiceById(id);
          setServiceDetails(fetchedService);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching service details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleBookService = () => {
    console.log("Navigating to Service Scheduling Page");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#ffc300]"
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="text-red-500 text-center"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  if (!serviceDetails) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="text-[#010101] text-center"
        >
          No service details found.
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fafafa]"
    >
      <header className="bg-[#fafafa] text-black p-4 sm:p-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="./">
            {" "}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mr-4"
              aria-label="Go back"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>{" "}
          </Link>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold"
          >
            {serviceDetails.name}
          </motion.h1>
        </div>
      </header>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 sm:p-6 max-w-3xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="relative h-48 sm:h-64 mb-6 rounded-xl overflow-hidden"
        >
          <Image
            src={serviceDetails.imageUrl}
            alt={serviceDetails.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-bold text-[#010101] mb-2">
            About this service
          </h2>
          <p className="text-gray-600 mb-4">{serviceDetails.description}</p>
          <div className="flex items-center text-[#010101] mb-2">
            <Clock className="w-5 h-5 mr-2" />
            <span>{serviceDetails.duration}</span>
          </div>
          <div className="flex items-center text-[#010101]">
            <Clock className="w-5 h-5 mr-2" />
            <span>Professional grade equipment</span>
          </div>
        </motion.section>
      </motion.main>

      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4"
      >
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div>
            <span className="text-2xl font-bold text-[#010101]">
              {serviceDetails.price}
            </span>
            <span className="text-gray-500 ml-2">onwards</span>
          </div>
          <Link href={`./${id}/book`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookService}
              className="bg-[#ffc300] text-[#010101] px-6 py-3 rounded-lg font-semibold hover:bg-[#e6b000] transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50"
            >
              Book Service
            </motion.button>
          </Link>
        </div>
      </motion.footer>
    </motion.div>
  );
}
