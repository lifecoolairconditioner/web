"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Refrigerator,
  WashingMachine,
  Microwave,
  Wind,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCarouselImages } from "@/apis/carousel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Define the type for the carousel items
interface CarouselItem {
  imageUrl: string;
  title: string;
  description: string;
  link?: string; // Optional link
}

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
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();

  // Loading state for page
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Define the function to fetch carousel images
  const loadImages = useCallback(async () => {
    try {
      const images: CarouselItem[] = await fetchCarouselImages();
      setCarouselItems(images);
    } catch (error) {
      console.error("Error loading carousel images:", error);
      toast({
        title: "Error",
        description: "Failed to load carousel images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Fetch carousel images
  useEffect(() => {
    loadImages(); // Now safe to use loadImages
  }, [loadImages]); // Add loadImages to the dependency array

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  }, [carouselItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  }, [carouselItems.length]);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (carouselItems.length > 0) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [carouselItems.length, nextSlide]); // Added nextSlide to the dependency array

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

      {/* Carousel Section */}
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg h-64">
        {carouselItems.length === 0 ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <>
            <AnimatePresence initial={false} custom={currentSlide}>
              {carouselItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute w-full h-full ${
                    index === currentSlide ? "z-10" : "z-0"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    priority={index === currentSlide}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center flex-col p-4">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white text-center">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Carousel Controls */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </>
        )}
      </div>

      {/* Services Section */}
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
