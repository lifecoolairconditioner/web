"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, ChevronDown, ChevronUp, X, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// Mock data for AC units
const acUnits = [
  {
    id: 1,
    name: "Arctic Chill 1.5T",
    type: "Split",
    capacity: "1.5 Ton",
    energyRating: "5 Star",
    price: 1500,
    image: "/placeholder.svg?text=AC+1",
    availability: "In Stock",
  },
  {
    id: 2,
    name: "Cool Breeze 1T",
    type: "Window",
    capacity: "1 Ton",
    energyRating: "3 Star",
    price: 1000,
    image: "/placeholder.svg?text=AC+2",
    availability: "Low Stock",
  },
  {
    id: 3,
    name: "Frosty Air 2T",
    type: "Split",
    capacity: "2 Ton",
    energyRating: "4 Star",
    price: 2000,
    image: "/placeholder.svg?text=AC+3",
    availability: "In Stock",
  },
  {
    id: 4,
    name: "Polar Chill 1.2T",
    type: "Portable",
    capacity: "1.2 Ton",
    energyRating: "4 Star",
    price: 1200,
    image: "/placeholder.svg?text=AC+4",
    availability: "Out of Stock",
  },
];

// Mock data for repair and maintenance services
const services = [
  {
    id: 1,
    name: "General AC Repair",
    description: "Comprehensive diagnostics and repair for all AC issues",
    price: "From ₹500",
    icon: "🔧",
    urgency: "Standard",
  },
  {
    id: 2,
    name: "Deep Cleaning",
    description:
      "Thorough cleaning of all AC components for optimal performance",
    price: "₹1500",
    icon: "🧼",
    urgency: "Non-urgent",
  },
  {
    id: 3,
    name: "Gas Refill",
    description: "Recharge your AC refrigerant for efficient cooling",
    price: "₹2000",
    icon: "❄️",
    urgency: "Urgent",
  },
  {
    id: 4,
    name: "Installation",
    description: "Professional installation of your new AC unit",
    price: "From ₹1000",
    icon: "🔨",
    urgency: "Scheduled",
  },
];

// Mock data for customer reviews
const reviews = [
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

// Mock data for FAQs
const faqs = [
  {
    id: 1,
    question: "How long can I rent an AC for?",
    answer:
      "We offer flexible rental periods ranging from 1 month to 12 months. You can choose the duration that best suits your needs.",
  },
  {
    id: 2,
    question: "What does the maintenance service include?",
    answer:
      "Our maintenance service includes a thorough check-up, cleaning of filters and coils, and minor repairs if needed. We ensure your AC runs at peak efficiency.",
  },
  {
    id: 3,
    question: "How quickly can you respond to urgent repair requests?",
    answer:
      "For urgent repairs, we aim to have a technician at your location within 4 hours of your request.",
  },
  {
    id: 4,
    question: "Do you offer installation services for purchased ACs?",
    answer:
      "Yes, we provide professional installation services for all types of air conditioners, whether purchased from us or elsewhere.",
  },
];

const CatalogPage = () => {
  const [activeTab, setActiveTab] = useState("rentals");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [acTypeFilter, setAcTypeFilter] = useState("");
  const [serviceUrgencyFilter, setServiceUrgencyFilter] = useState("");
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredAcUnits = acUnits.filter(
    (unit) =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (acTypeFilter === "" || unit.type === acTypeFilter)
  );

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (serviceUrgencyFilter === "" || service.urgency === serviceUrgencyFilter)
  );

  const sortedAcUnits = [...filteredAcUnits].sort((a, b) => {
    if (sortBy === "price-low-high") return a.price - b.price;
    if (sortBy === "price-high-low") return b.price - a.price;
    return 0; // Default to original order
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "price-low-high") return a.price.localeCompare(b.price);
    if (sortBy === "price-high-low") return b.price.localeCompare(a.price);
    return 0; // Default to original order
  });

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-[#010101] text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">CoolAir Solutions</h1>
            {windowWidth > 768 ? (
              <div className="flex space-x-4">
                <button className="bg-[#ffc300] text-[#010101] px-4 py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors">
                  Rent an AC
                </button>
                <button className="bg-white text-[#010101] px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Book a Service
                </button>
              </div>
            ) : (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white"
              >
                <Menu size={24} />
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for ACs or services..."
              className="w-full p-3 pl-10 rounded-full text-[#010101]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && windowWidth <= 768 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#010101] text-white py-4 px-4"
          >
            <button className="w-full bg-[#ffc300] text-[#010101] px-4 py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors mb-2">
              Rent an AC
            </button>
            <button className="w-full bg-white text-[#010101] px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Book a Service
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex mb-8">
          <button
            className={`flex-1 py-2 px-4 text-center font-semibold ${
              activeTab === "rentals"
                ? "bg-[#ffc300] text-[#010101]"
                : "bg-gray-200 text-gray-700"
            } rounded-l-full`}
            onClick={() => setActiveTab("rentals")}
          >
            AC Rentals
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center font-semibold ${
              activeTab === "services"
                ? "bg-[#ffc300] text-[#010101]"
                : "bg-gray-200 text-gray-700"
            } rounded-r-full`}
            onClick={() => setActiveTab("services")}
          >
            Repair & Maintenance
          </button>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {activeTab === "rentals" && (
              <select
                className="p-2 border rounded-md"
                value={acTypeFilter}
                onChange={(e) => setAcTypeFilter(e.target.value)}
              >
                <option value="">All AC Types</option>
                <option value="Split">Split</option>
                <option value="Window">Window</option>
                <option value="Portable">Portable</option>
              </select>
            )}
            {activeTab === "services" && (
              <select
                className="p-2 border rounded-md"
                value={serviceUrgencyFilter}
                onChange={(e) => setServiceUrgencyFilter(e.target.value)}
              >
                <option value="">All Urgencies</option>
                <option value="Urgent">Urgent</option>
                <option value="Standard">Standard</option>
                <option value="Non-urgent">Non-urgent</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            )}
          </div>
          <select
            className="p-2 border rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        {/* AC Rentals Grid */}
        {activeTab === "rentals" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedAcUnits.map((unit) => (
              <motion.div
                key={unit.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={unit.image}
                  alt={unit.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{unit.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {unit.type} | {unit.capacity} | {unit.energyRating}
                  </p>
                  <p className="text-lg font-bold mb-2">₹{unit.price}/month</p>
                  <p
                    className={`text-sm ${
                      unit.availability === "In Stock"
                        ? "text-green-500"
                        : unit.availability === "Low Stock"
                        ? "text-orange-500"
                        : "text-red-500"
                    } mb-2`}
                  >
                    {unit.availability}
                  </p>
                  <button
                    onClick={() => setQuickViewItem(unit)}
                    className="w-full bg-[#ffc300] text-[#010101] py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors"
                  >
                    Quick View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Repair & Maintenance List */}
        {activeTab === "services" && (
          <div className="space-y-4">
            {sortedServices.map((service) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mr-4 mb-4 sm:mb-0">{service.icon}</div>
                <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <div className="text-center sm:text-right mb-4 sm:mb-0">
                  <p className="font-bold">{service.price}</p>
                  <p className="text-sm text-gray-600">{service.urgency}</p>
                </div>
                <button
                  onClick={() => setQuickViewItem(service)}
                  className="w-full sm:w-auto bg-[#ffc300] text-[#010101] px-4 py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors"
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Customer Reviews */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounde d-lg shadow-md p-4"
              >
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < review.rating ? "text-[#ffc300]" : "text-gray-300"
                      }
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-2">{review.comment}</p>
                <p className="font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full p-4 text-left font-semibold flex justify-between items-center"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                  }
                >
                  {faq.question}
                  {expandedFaq === faq.id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="p-4 bg-gray-50">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </section>
      </main>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold">{quickViewItem.name}</h2>
                <button
                  onClick={() => setQuickViewItem(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              {"capacity" in quickViewItem ? (
                // AC Unit Quick View
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
                    <Image
                      src={quickViewItem.image}
                      alt={quickViewItem.name}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <p className="text-lg mb-2">
                      <strong>Type:</strong> {quickViewItem.type}
                    </p>
                    <p className="text-lg mb-2">
                      <strong>Capacity:</strong> {quickViewItem.capacity}
                    </p>
                    <p className="text-lg mb-2">
                      <strong>Energy Rating:</strong>{" "}
                      {quickViewItem.energyRating}
                    </p>
                    <p className="text-lg mb-2">
                      <strong>Price:</strong> ₹{quickViewItem.price}/month
                    </p>
                    <p className="text-lg mb-2">
                      <strong>Availability:</strong>{" "}
                      {quickViewItem.availability}
                    </p>
                    <Link href={"/catelog/rental"}>
                      {" "}
                      <button className="mt-4 w-full bg-[#ffc300] text-[#010101] py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors">
                        Rent Now
                      </button>{" "}
                    </Link>
                  </div>
                </div>
              ) : (
                // Service Quick View
                <div>
                  <p className="text-lg mb-2">
                    <strong>Description:</strong> {quickViewItem.description}
                  </p>
                  <p className="text-lg mb-2">
                    <strong>Price:</strong> {quickViewItem.price}
                  </p>
                  <p className="text-lg mb-2">
                    <strong>Urgency:</strong> {quickViewItem.urgency}
                  </p>
                  <Link href={"/catelog/repair"}>
                    {" "}
                    <button className="mt-4 w-full bg-[#ffc300] text-[#010101] py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors">
                      Book Service
                    </button>{" "}
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogPage;
