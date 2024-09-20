"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for the AC unit
const acUnit = {
  id: 1,
  name: "Arctic Blast Inverter AC",
  type: "Split Inverter",
  capacity: "1.5 Ton",
  price: 750,
  rating: 4.5,
  reviews: 128,
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  features: [
    "Energy-efficient inverter technology",
    "Rapid cooling function",
    "Sleep mode for night-time comfort",
    "Anti-bacterial filter",
    "Remote control with LCD display",
  ],
  specifications: {
    "Cooling Capacity": "1.5 Ton (5100 BTU/hr)",
    "Power Consumption": "1400W",
    "Energy Rating": "5 Star",
    "Noise Level": "32 dB",
    Refrigerant: "R-32 (Eco-friendly)",
  },
};

// Mock data for recommended AC units
const recommendedUnits = [
  {
    id: 2,
    name: "Cool Breeze Window AC",
    type: "Window",
    capacity: "1 Ton",
    price: 500,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Frost King Split AC",
    type: "Split",
    capacity: "2 Ton",
    price: 900,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Chill Master Portable AC",
    type: "Portable",
    capacity: "1.2 Ton",
    price: 600,
    image: "/placeholder.svg",
  },
];

interface BookingModalProps {
  onClose: () => void;
  acUnit: typeof acUnit;
}

export default function ACDescriptionPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % acUnit.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + acUnit.images.length) % acUnit.images.length
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-[400px] rounded-3xl overflow-hidden"
            >
              <Image
                src={acUnit.images[currentImageIndex]}
                alt={`${acUnit.name} - Image ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
            <div className="flex justify-center mt-4 space-x-2">
              {acUnit.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImageIndex ? "bg-[#ffc300]" : "bg-gray-300"
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{acUnit.name}</h1>
            <p className="text-xl mb-2">
              {acUnit.type} - {acUnit.capacity}
            </p>
            <div className="flex items-center mb-4">
              <Star className="text-[#ffc300] mr-1" />
              <span className="font-semibold">{acUnit.rating}</span>
              <span className="text-gray-500 ml-2">
                ({acUnit.reviews} reviews)
              </span>
            </div>
            <p className="text-2xl font-bold mb-4">₹{acUnit.price}/day</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#ffc300] text-[#010101] px-6 py-3 rounded-full font-semibold text-lg mb-6 hover:bg-[#e6b000] transition-colors"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Book Now
            </motion.button>
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-none mb-6">
              {acUnit.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Check className="text-green-500 mr-2" size={20} />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <table className="w-full">
              <tbody>
                {Object.entries(acUnit.specifications).map(
                  ([key, value], index) => (
                    <motion.tr
                      key={key}
                      className={index % 2 === 0 ? "bg-gray-50" : ""}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="py-2 px-4 font-semibold">{key}</td>
                      <td className="py-2 px-4">{value}</td>
                    </motion.tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recommended AC Units</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedUnits.map((unit, index) => (
              <motion.div
                key={unit.id}
                className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Image
                  src={unit.image}
                  alt={unit.name}
                  width={300}
                  height={200}
                  className="rounded-2xl mb-4"
                />
                <h3 className="font-semibold mb-1">{unit.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {unit.type} - {unit.capacity}
                </p>
                <p className="font-bold">₹{unit.price}/day</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isBookingModalOpen && (
          <BookingModal
            onClose={() => setIsBookingModalOpen(false)}
            acUnit={acUnit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function BookingModal({ onClose, acUnit }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Invalid mobile number";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    else if (new Date(formData.endDate) <= new Date(formData.startDate))
      newErrors.endDate = "End date must be after start date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const totalDays =
    formData.startDate && formData.endDate
      ? Math.ceil(
          (new Date(formData.endDate).getTime() -
            new Date(formData.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice: number = totalDays * acUnit.price; // Explicitly define totalPrice as a number

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Book {acUnit.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] ${
                  errors.startDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                min={
                  formData.startDate || new Date().toISOString().split("T")[0]
                }
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
              )}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Booking Summary</h3>
              <p>Total Days: {totalDays}</p>
              <p>Price per Day: ₹{acUnit.price}</p>
              <p className="font-bold">Total Price: ₹{totalPrice}</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 bg-[#ffc300] text-[#010101] rounded-lg hover:bg-[#e6b000] transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Confirm Booking"}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
            <p>
              Thank you for your booking. We will contact you shortly with
              further details.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-[#ffc300] text-[#010101] rounded-lg hover:bg-[#e6b000] transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
