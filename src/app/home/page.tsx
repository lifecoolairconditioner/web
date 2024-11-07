"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Wind,
  Refrigerator,
  WashingMachine,
  Microwave,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCarouselImages } from "@/apis/carousel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchCarousel2Images } from "@/apis/carousel2";

interface CarouselItem {
  imageUrl: string;
  title: string;
  description: string;
  link?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  title: string;
}

interface CarouselNavigationProps {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  itemsLength: number;
}

interface FeaturedServicesProps {
  services: typeof services;
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
  const [isLoading, setIsLoading] = useState(false);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [carousel2Items, setCarousel2Items] = useState<CarouselItem[]>([]);
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const { toast } = useToast();

  const loadImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const images = await fetchCarouselImages();
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

  const loadImages2 = useCallback(async () => {
    try {
      const images = await fetchCarousel2Images();
      setCarousel2Items(images);
    } catch (error) {
      console.error("Error loading carousel 2 images:", error);
      toast({
        title: "Error",
        description: "Failed to load second carousel images. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    loadImages();
    loadImages2();
  }, [loadImages, loadImages2]);

  const nextSlide1 = useCallback(() => {
    setCurrentSlide1((prev) => (prev + 1) % carouselItems.length);
  }, [carouselItems.length]);

  const nextSlide2 = useCallback(() => {
    setCurrentSlide2((prev) => (prev + 1) % carousel2Items.length);
  }, [carousel2Items.length]);

  useEffect(() => {
    if (carouselItems.length > 0) {
      const timer = setInterval(nextSlide1, 5000);
      return () => clearInterval(timer);
    }
  }, [carouselItems.length, nextSlide1]);

  useEffect(() => {
    if (carousel2Items.length > 0) {
      const timer = setInterval(nextSlide2, 5000);
      return () => clearInterval(timer);
    }
  }, [carousel2Items.length, nextSlide2]);

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
      <Carousel
        items={carouselItems}
        currentSlide={currentSlide1}
        setCurrentSlide={setCurrentSlide1}
        title="Life cool air services"
      />
      <ACRentalService />
      <FeaturedServices services={services} />
      <Carousel
        items={carousel2Items}
        currentSlide={currentSlide2}
        setCurrentSlide={setCurrentSlide2}
        title="More Services"
      />
      <AMCService />
    </motion.div>
  );
}

function Carousel({
  items,
  currentSlide,
  setCurrentSlide,
  title,
}: CarouselProps) {
  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-black mb-8"
        >
          {title}
        </motion.h2>
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-lg aspect-[16/9]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence initial={false} custom={currentSlide}>
            {items.map((item, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 ${
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
                  layout="fill"
                  objectFit="cover"
                  priority={index === currentSlide}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center flex-col p-4">
                  <h3 className="text-white text-xl md:text-3xl font-bold mb-2 text-center">
                    {item.title}
                  </h3>
                  <p className="text-white text-sm md:text-xl text-center">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <CarouselNavigation
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            itemsLength={items.length}
          />
        </motion.div>
      </div>
    </div>
  );
}

function CarouselNavigation({
  setCurrentSlide,
  itemsLength,
}: CarouselNavigationProps) {
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full"
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + itemsLength) % itemsLength)
        }
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % itemsLength)}
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
      </Button>
    </>
  );
}

function ACRentalService() {
  return (
    <div className="container mx-auto px-4">
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
            <Image
              src={"/acservices.png"}
              alt="acservices"
              width={200}
              height={200}
              className="mb-4"
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

function FeaturedServices({ services }: FeaturedServicesProps) {
  return (
    <div className="container mx-auto px-4 p-6">
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
            href={service.link || "#"}
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
  );
}

function AMCService() {
  return (
    <div className="container mx-auto px-4 py-12">
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
            <Image
              src={"/amc.png"}
              alt="amc"
              width={200}
              height={200}
              className="mb-4"
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
