"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Clock, Send } from "lucide-react";
import Image from "next/image";

// Mock data for the serviceman
const serviceman = {
  name: "Rahul Kumar",
  photo: "/placeholder.svg",
  bio: "Experienced AC technician with 5+ years in the field. Specialized in split and window AC repairs.",
  estimatedArrival: "2:30 PM - 3:30 PM",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  location: { lat: 28.6139, lng: 77.209 }, // Example coordinates for New Delhi
};

export default function ServicemanContactPage() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Here you would typically send the message to your backend
    console.log("Sending message:", message);
    setMessage("");
    // Show a confirmation toast or message to the user
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Serviceman
        </motion.h1>

        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Image
              src={serviceman.photo}
              alt={serviceman.name}
              width={80}
              height={80}
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold">{serviceman.name}</h2>
              <p className="text-gray-600">{serviceman.bio}</p>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <Clock className="text-[#ffc300] mr-2" size={20} />
            <span>Estimated Arrival: {serviceman.estimatedArrival}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.a
              href={`tel:${serviceman.phone}`}
              className="flex items-center justify-center bg-[#ffc300] text-[#010101] py-2 rounded-full font-semibold hover:bg-[#e6b000] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="mr-2" size={20} />
              Call
            </motion.a>
            <motion.a
              href={`https://wa.me/${serviceman.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#25D366] text-white py-2 rounded-full font-semibold hover:bg-[#128C7E] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="mr-2" size={20} />
              WhatsApp
            </motion.a>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              Serviceman Location
            </h3>
            <div className="bg-gray-200 rounded-2xl h-48 flex items-center justify-center">
              <MapPin className="text-[#ffc300]" size={32} />
              <span className="ml-2">Map placeholder</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Send a Message</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message or special instructions here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] mb-2"
              rows={3}
            />
            <motion.button
              onClick={handleSendMessage}
              className="flex items-center justify-center bg-[#ffc300] text-[#010101] py-2 px-4 rounded-full font-semibold hover:bg-[#e6b000] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="mr-2" size={20} />
              Send Message
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
