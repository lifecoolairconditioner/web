"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, ChevronDown, ChevronUp, X, Menu } from "lucide-react";
import Image from "next/image";

interface AcUnit {
  id: number;
  name: string;
  type: string;
  capacity: string;
  energyRating: string;
  price: number;
  image: string;
  availability: string;
}

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
      "We offer flexible rental periods ranging from 1 month to 12 months.",
  },
  {
    id: 2,
    question: "What does the maintenance service include?",
    answer:
      "Our maintenance service includes a thorough check-up and cleaning.",
  },
  {
    id: 3,
    question: "How quickly can you respond to urgent repair requests?",
    answer: "For urgent repairs, we aim to have a technician within 4 hours.",
  },
  {
    id: 4,
    question: "Do you offer installation services for purchased ACs?",
    answer: "Yes, we provide professional installation services for all ACs.",
  },
];

const CatalogPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("rentals");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [acTypeFilter, setAcTypeFilter] = useState<string>("");
  const [serviceUrgencyFilter, setServiceUrgencyFilter] = useState<string>("");
  const [quickViewItem, setQuickViewItem] = useState<AcUnit | null>(null); // Updated type
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
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
    if (sortBy === "price-low-high")
      return (
        parseFloat(a.price.replace(/[^0-9.-]+/g, "")) -
        parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
      );
    if (sortBy === "price-high-low")
      return (
        parseFloat(b.price.replace(/[^0-9.-]+/g, "")) -
        parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
      );
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
                : "bg-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("rentals")}
          >
            Rentals
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center font-semibold ${
              activeTab === "services"
                ? "bg-[#ffc300] text-[#010101]"
                : "bg-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("services")}
          >
            Services
          </button>
        </div>

        {/* Rentals Tab */}
        {activeTab === "rentals" && (
          <div>
            {/* Sort and Filter Options */}
            <div className="flex justify-between mb-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
              <select
                value={acTypeFilter}
                onChange={(e) => setAcTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              >
                <option value="">All Types</option>
                <option value="Split">Split</option>
                <option value="Window">Window</option>
                <option value="Portable">Portable</option>
              </select>
            </div>

            {/* AC Units List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAcUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="bg-white rounded-lg shadow-md p-4 relative"
                >
                  <Image
                    src={unit.image}
                    alt={unit.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h2 className="font-semibold text-lg mt-2">{unit.name}</h2>
                  <p>
                    {unit.type} | {unit.capacity}
                  </p>
                  <p className="text-yellow-500 font-semibold">
                    {unit.energyRating} <Star size={16} />
                  </p>
                  <p className="text-lg font-bold">₹{unit.price}</p>
                  <p className="text-sm text-gray-500">{unit.availability}</p>
                  <button
                    onClick={() => setQuickViewItem(unit)}
                    className="absolute top-4 right-4 bg-[#ffc300] text-[#010101] rounded-full p-2 hover:bg-[#e6b000] transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick View Modal */}
            <AnimatePresence>
              {quickViewItem && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                  <div className="bg-white rounded-lg p-6 relative max-w-lg w-full">
                    <button
                      onClick={() => setQuickViewItem(null)}
                      className="absolute top-2 right-2 text-gray-500"
                    >
                      <X size={20} />
                    </button>
                    <h2 className="text-2xl font-semibold">
                      {quickViewItem.name}
                    </h2>
                    <Image
                      src={quickViewItem.image}
                      alt={quickViewItem.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-md mt-4"
                    />
                    <p>
                      {quickViewItem.type} | {quickViewItem.capacity}
                    </p>
                    <p className="text-yellow-500 font-semibold">
                      {quickViewItem.energyRating} <Star size={16} />
                    </p>
                    <p className="text-lg font-bold">₹{quickViewItem.price}</p>
                    <p className="text-sm text-gray-500">
                      {quickViewItem.availability}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div>
            {/* Filter Options */}
            <div className="mb-4">
              <select
                value={serviceUrgencyFilter}
                onChange={(e) => setServiceUrgencyFilter(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              >
                <option value="">All Urgencies</option>
                <option value="Urgent">Urgent</option>
                <option value="Standard">Standard</option>
                <option value="Non-urgent">Non-urgent</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{service.icon}</span>
                    <h2 className="font-semibold text-lg">{service.name}</h2>
                  </div>
                  <p>{service.description}</p>
                  <p className="text-lg font-bold">{service.price}</p>
                  <p className="text-sm text-gray-500">{service.urgency}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-yellow-500 font-semibold">
                  {review.rating} <Star size={16} />
                </p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md p-4">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                  }
                >
                  <h3 className="font-semibold">{faq.question}</h3>
                  {expandedFaq === faq.id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
                {expandedFaq === faq.id && <p className="mt-2">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#010101] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} CoolAir Solutions. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CatalogPage;
