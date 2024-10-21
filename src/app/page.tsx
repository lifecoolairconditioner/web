"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Wind,
  Refrigerator,
  WashingMachine,
  Microwave,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCarouselImages } from "@/apis/carousel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CarouselItem {
  imageUrl: string;
  title: string;
  description: string;
  link?: string;
}

const services = [
  {
    name: "AC Repair",
    icon: Wind,
    imageUrl: "/ac-repair.png",
    link: "/airconditioner",
  },
  {
    name: "Fridge Repair",
    icon: Refrigerator,
    imageUrl: "/fridge-repair.png",
    link: "/fridge",
  },
  {
    name: "Washing Machine",
    icon: WashingMachine,
    imageUrl: "/washing-machine-repair.png",
    link: "/washingmachine",
  },
  {
    name: "Microwave Repair",
    icon: Microwave,
    imageUrl: "/microoven-repair.png",
    link: "/oven",
  },
];

const MotionLink = motion(Link);

export default function MainScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();

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

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  }, [carouselItems.length]);

  useEffect(() => {
    if (carouselItems.length > 0) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [carouselItems.length, nextSlide]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 border-4 border-[#ffc300] border-t-[#000000] rounded-full animate-spin"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white text-black"
    >
      {/* Carousel */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-black mb-8"
          >
            ABC AC services
          </motion.h2>
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-lg h-96"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence initial={false} custom={currentSlide}>
              {carouselItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute w-full h-full ${
                    index === currentSlide ? "z-10" : "z-0"
                  }`}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0,
                    x: index === currentSlide ? 0 : -300,
                  }}
                  exit={{ opacity: 0, x: -300 }}
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
                    <h3 className="text-white text-3xl font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white text-xl text-center">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full"
              onClick={() =>
                setCurrentSlide(
                  (prev) =>
                    (prev - 1 + carouselItems.length) % carouselItems.length
                )
              }
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full"
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
              }
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* AC Rental and AMC Services */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#ffc300] rounded-3xl shadow-lg overflow-hidden cursor-pointer"
          >
            <Link href="/ac-rent">
              <div className="p-8 flex items-center h-full">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">
                    AC Rental Service
                  </h2>
                  <p className="text-black text-xl">
                    Cool comfort, delivered to your doorstep
                  </p>
                </div>
                <Wind className="w-24 h-24 text-black opacity-60" />
              </div>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#ffc300] rounded-3xl shadow-lg overflow-hidden cursor-pointer"
          >
            <Link href="/amc">
              <div className="p-8 flex items-center h-full">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">
                    Annual Maintenance Contract (AMC)
                  </h2>
                  <p className="text-black text-xl">
                    Comprehensive care for commercial and large AC systems
                  </p>
                </div>
                <Calendar className="w-24 h-24 text-black opacity-60" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="container mx-auto px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-black mb-8"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <MotionLink
              key={service.name}
              href={service.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300"
            >
              <div className="p-6 flex flex-col items-center justify-center h-full relative">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  width={200}
                  height={200}
                  className="mb-4"
                />
                <h3 className="text-2xl font-semibold text-black text-center">
                  {service.name}
                </h3>
                <motion.div
                  className="absolute inset-0 bg-[#ffc300] opacity-0"
                  whileHover={{ opacity: 0.1 }}
                />
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
