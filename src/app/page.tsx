"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, Star, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data for featured AC rentals
const featuredRentals = [
  {
    id: 1,
    name: "Arctic Blast Inverter AC",
    capacity: "1.5 Ton",
    energyRating: "5 Star",
    price: 750,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Cool Breeze Window AC",
    capacity: "1 Ton",
    energyRating: "3 Star",
    price: 500,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Frosty Chill Split AC",
    capacity: "2 Ton",
    energyRating: "4 Star",
    price: 900,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Polar Bear Portable AC",
    capacity: "1.2 Ton",
    energyRating: "4 Star",
    price: 600,
    image: "/placeholder.svg",
  },
];

// Mock data for popular repair services
const repairServices = [
  {
    id: 1,
    name: "General AC Repair",
    description: "Comprehensive diagnostics and repair",
    icon: "🔧",
  },
  {
    id: 2,
    name: "Gas Refill",
    description: "Refrigerant recharge for optimal cooling",
    icon: "🧊",
  },
  {
    id: 3,
    name: "Deep Cleaning",
    description: "Thorough cleaning for improved efficiency",
    icon: "🧼",
  },
  {
    id: 4,
    name: "Installation",
    description: "Professional AC installation service",
    icon: "🔨",
  },
];

// Mock data for maintenance plans
const maintenancePlans = [
  {
    id: 1,
    name: "Basic",
    price: 1999,
    features: ["2 services per year", "Priority support", "10% off on repairs"],
  },
  {
    id: 2,
    name: "Standard",
    price: 2999,
    features: [
      "4 services per year",
      "24/7 support",
      "20% off on repairs",
      "Free filter replacement",
    ],
  },
  {
    id: 3,
    name: "Premium",
    price: 3999,
    features: [
      "6 services per year",
      "24/7 premium support",
      "30% off on repairs",
      "Free parts replacement",
      "Annual deep cleaning",
    ],
  },
];

// Mock data for customer reviews
const customerReviews = [
  {
    id: 1,
    name: "Priya S.",
    rating: 5,
    comment: "Excellent service! The technician was prompt and professional.",
  },
  {
    id: 2,
    name: "Rahul M.",
    rating: 4,
    comment:
      "Good rental options. The AC works great and was delivered on time.",
  },
  {
    id: 3,
    name: "Anita K.",
    rating: 5,
    comment:
      "The maintenance plan has saved me a lot of money on repairs. Highly recommended!",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3); // Assuming 3 slides in the carousel
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3); // Assuming 3 slides in the carousel
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % customerReviews.length);
  };

  const prevReview = () => {
    setCurrentReview(
      (prev) => (prev - 1 + customerReviews.length) % customerReviews.length
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-[#010101] text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            CoolAir<span className="text-[#ffc300]">Pro</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white text-black px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ffc300]"
              />
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link
                href="/catelog/rentals"
                className="hover:text-[#ffc300] transition-colors"
              >
                Rentals
              </Link>
              <Link
                href="/catelog/repair"
                className="hover:text-[#ffc300] transition-colors"
              >
                Repairs
              </Link>

              <Link
                href="/contact"
                className="hover:text-[#ffc300] transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner Carousel */}
      <section className="relative h-96 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={`/placeholder.svg`}
              alt={`Slide ${currentSlide + 1}`}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2>Promotion {currentSlide + 1}</h2>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Category Navigation */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <Link
              href="/catelog/rental"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 bg-[#ffc300] rounded-full flex items-center justify-center mb-2 group-hover:bg-[#e6b000] transition-colors">
                <span className="text-2xl">❄️</span>
              </div>
              <span className="text-sm font-medium">Rentals</span>
            </Link>
            <Link
              href="/catelog/repair"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 bg-[#ffc300] rounded-full flex items-center justify-center mb-2 group-hover:bg-[#e6b000] transition-colors">
                <span className="text-2xl">🔧</span>
              </div>
              <span className="text-sm font-medium">Repairs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured AC Rentals */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured AC Rentals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredRentals.map((rental) => (
              <motion.div
                key={rental.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={rental.image}
                  alt={rental.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{rental.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {rental.capacity} | {rental.energyRating}
                  </p>
                  <p className="text-lg font-bold">₹{rental.price}/day</p>
                  <button className="mt-4 w-full bg-[#ffc300] text-[#010101] py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors">
                    Rent Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Repair Services */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Popular Repair Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {repairServices.map((service) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-lg shadow-md p-6 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="font-semibold mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Plans Comparison */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Maintenance Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {maintenancePlans.map((plan) => (
              <motion.div
                key={plan.id}
                className="bg-white rounded-lg shadow-md p-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">
                  ₹{plan.price}
                  <span className="text-sm font-normal">/year</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-green-500 mr-2" size={16} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-[#ffc300] text-[#010101] py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Carousel */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="relative">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentReview}
                className="bg-white rounded-lg shadow-md p-6 text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < customerReviews[currentReview].rating
                          ? "text-[#ffc300]"
                          : "text-gray-300"
                      }
                      size={24}
                    />
                  ))}
                </div>
                <p className="text-lg mb-4">
                  {customerReviews[currentReview].comment}
                </p>
                <p className="font-semibold">
                  {customerReviews[currentReview].name}
                </p>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ffc300] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold mb-2">Expert Technicians</h3>
              <p className="text-sm text-gray-600">
                Our team consists of certified professionals with years of
                experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ffc300] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Quick Service</h3>
              <p className="text-sm text-gray-600">
                We prioritize your comfort with prompt and efficient service.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ffc300] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-sm text-gray-600">
                Get top-quality service and rentals at affordable rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#010101] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#ffc300] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-[#ffc300] transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-[#ffc300] transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#ffc300] transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/rentals"
                    className="hover:text-[#ffc300] transition-colors"
                  >
                    AC Rentals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/repairs"
                    className="hover:text-[#ffc300] transition-colors"
                  >
                    AC Repairs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/maintenance"
                    className="hover:text-[#ffc300] transition-colors"
                  >
                    Maintenance Plans
                  </Link>
                </li>
                <li>
                  <Link
                    href="/installation"
                    className="hover:text-[#ffc300] transition-colors"
                  >
                    AC Installation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>123 Cool Street</p>
              <p>Chillville, AC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@coolairpro.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="mb-4">Stay cool with our latest offers and tips!</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#ffc300]"
                />
                <button
                  type="submit"
                  className="bg-[#ffc300] text-[#010101] px-4 py-2 rounded-r-full font-semibold hover:bg-[#e6b000] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 CoolAirPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
