"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    id: 1,
    name: "AC Repair",
    price: "₹499",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Fridge Repair",
    price: "₹399",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Washing Machine Repair",
    price: "₹449",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Microwave Repair",
    price: "₹349",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "TV Repair",
    price: "₹599",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Water Purifier Service",
    price: "₹299",
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function ServiceListingPage() {
  const handleServiceClick = (serviceId: number) => {
    console.log(
      `Navigating to Service Details Page for service ID: ${serviceId}`
    );
    // Implement actual navigation logic here
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button className="mr-4" aria-label="Go back">
            <ChevronLeft className="w-6 h-6 text-[#010101]" />
          </button>
          <h1 className="text-2xl font-bold text-[#010101]">Repair Services</h1>
        </div>
        <button
          className="text-[#ffc300] hover:text-[#e6b000] transition-colors"
          aria-label="Filter services"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="21" y1="4" x2="14" y2="4"></line>
            <line x1="10" y1="4" x2="3" y2="4"></line>
            <line x1="21" y1="12" x2="12" y2="12"></line>
            <line x1="8" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="20" x2="16" y2="20"></line>
            <line x1="12" y1="20" x2="3" y2="20"></line>
            <line x1="14" y1="2" x2="14" y2="6"></line>
            <line x1="8" y1="10" x2="8" y2="14"></line>
            <line x1="16" y1="18" x2="16" y2="22"></line>
          </svg>
        </button>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => handleServiceClick(service.id)}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-[#010101] mb-2">
                {service.name}
              </h2>
              <div className="flex items-center justify-between">
                <span className="text-[#ffc300] font-bold">
                  {service.price}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
