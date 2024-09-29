"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { getServiceBycategory } from "../../apis/service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface ServiceListingPageProps {
  params: {
    category: string;
  };
}

export default function ServiceListingPage({
  params,
}: ServiceListingPageProps) {
  const { category } = params;
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      if (category) {
        try {
          setLoading(true);
          const fetchedServices = await getServiceBycategory(category);
          setServices(fetchedServices);
        } catch (err) {
          console.error(err);
          setError("Error fetching services. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchServices();
  }, [category]);

  const handleServiceClick = (serviceId: string) => {
    router.push(`/${category}/${serviceId}`);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8"
    >
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="../">
            {" "}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mr-4"
              aria-label="Go back"
              onClick={() => router.back()}
            >
              <ChevronLeft className="w-6 h-6 text-[#010101]" />
            </motion.button>{" "}
          </Link>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-[#010101]"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)} Services
          </motion.h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-[#ffc300] hover:text-[#e6b000] transition-colors"
          aria-label="Filter services"
        >
          <Filter className="w-6 h-6" />
        </motion.button>
      </header>

      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#ffc300]"></div>
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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service._id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                onClick={() => handleServiceClick(service._id)}
              >
                <Link href={`/${category}/${service._id}`}>
                  <div className="relative h-40">
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-[#010101] mb-2 line-clamp-2">
                      {service.name}
                    </h2>
                    <div className="flex items-center justify-between">
                      <span className="text-[#ffc300] font-bold">
                        ₹{service.price.toLocaleString("en-IN")}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
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
