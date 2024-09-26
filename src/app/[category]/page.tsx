"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getServiceBycategory } from "@/apis/service";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// Define the Service type based on your service model
interface Service {
  _id: string; // Assuming the ID is a string
  name: string;
  price: number; // Assuming price is a number
  imageUrl: string; // Image URL field from the database
}

// Define the props type for the component
interface ServiceListingPageProps {
  params: {
    category: string; // Category should be a string
  };
}

export default function ServiceListingPage({
  params,
}: ServiceListingPageProps) {
  const { category } = params; // Get category from params
  const [services, setServices] = useState<Service[]>([]); // State to hold fetched services
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage errors
  console.log(services);
  console.log(category);

  useEffect(() => {
    const fetchServices = async () => {
      if (category) {
        // Ensure category is defined before making the request
        try {
          const fetchedServices = await getServiceBycategory(category);
          setServices(fetchedServices); // Set the fetched services to state
        } catch (err) {
          console.log(err);

          setError("Error fetching services");
        } finally {
          setLoading(false); // Stop loading after fetching
        }
      }
    };

    fetchServices();
  }, [category]);

  const handleServiceClick = (serviceId: string) => {
    console.log(
      `Navigating to Service Details Page for service ID: /${category}/${serviceId}`
    );
    redirect(`/${category}/${serviceId}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            className="mr-4"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-6 h-6 text-[#010101]" />
          </button>
          <h1 className="text-2xl font-bold text-[#010101]">Repair Services</h1>
        </div>
        <button
          className="text-[#ffc300] hover:text-[#e6b000] transition-colors"
          aria-label="Filter services"
        >
          {/* SVG for filter icon */}
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
            key={service._id} // Use _id as key
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => handleServiceClick(service._id)} // Use _id for service click
          >
            <Link href={`/${category}/${service._id}`}>
              <Image
                src={service.imageUrl} // Use imageUrl from the fetched service
                alt={service.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#010101] mb-2">
                  {service.name}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-[#ffc300] font-bold">
                    ₹{service.price} {/* Ensure price is formatted correctly */}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
