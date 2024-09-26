"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Star, Clock, CheckCircle } from "lucide-react";
import { getServiceById } from "@/apis/service";
import Link from "next/link";
import Image from "next/image";
// Define the service details type based on your service model
interface ServiceDetails {
  _id: string;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  imageUrl: string;
  description: string;
  includes: string[];
  benefits: string[];
}

interface ServiceDetailsPageProps {
  params: {
    id: string; // The service ID should be a string
  };
}

export default function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = params;
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage errors

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        if (id) {
          const fetchedService = await getServiceById(id); // Fetch service details using the provided ID
          setServiceDetails(fetchedService); // Set the fetched service details to state
        }
      } catch (err) {
        console.log(err);

        setError("Error fetching service details");
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleBookService = () => {
    console.log("Navigating to Service Scheduling Page");
    // Implement actual navigation logic here
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!serviceDetails) {
    return <div>No service details found.</div>; // Display message if no service details are found
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-[#010101] text-white p-4 sm:p-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button
            className="mr-4"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{serviceDetails.name}</h1>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-[#ffc300] mr-1" />
          <span className="font-semibold">{serviceDetails.rating}</span>
          <span className="text-sm ml-1">
            ({serviceDetails.reviews} reviews)
          </span>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-3xl mx-auto">
        <Image
          src={serviceDetails.imageUrl}
          alt={serviceDetails.name}
          className="w-full h-48 sm:h-64 object-cover rounded-xl mb-6"
        />

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#010101] mb-2">
            About this service
          </h2>
          <p className="text-gray-600 mb-4">{serviceDetails.description}</p>
          <div className="flex items-center text-[#010101] mb-2">
            <Clock className="w-5 h-5 mr-2" />
            <span>{serviceDetails.duration}</span>
          </div>
          <div className="flex items-center text-[#010101]">
            <Clock className="w-5 h-5 mr-2" />
            <span>Professional grade equipment</span>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#010101] mb-4">
            Whats included
          </h2>
          <ul className="space-y-2">
            {serviceDetails.includes?.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#010101] mb-4">Benefits</h2>
          <ul className="space-y-2">
            {serviceDetails.benefits?.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#ffc300] mr-2 flex-shrink-0 mt-1" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div>
            <span className="text-2xl font-bold text-[#010101]">
              {serviceDetails.price}
            </span>
            <span className="text-gray-500 ml-2">onwards</span>
          </div>
          <Link href={`./${id}/book`}>
            {" "}
            <button
              onClick={handleBookService}
              className="bg-[#ffc300] text-[#010101] px-6 py-3 rounded-lg font-semibold hover:bg-[#e6b000] transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50"
            >
              Book Service
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
