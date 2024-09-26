"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getACRentalById } from "@/apis/acrent";
import Image from "next/image";

interface ACDetails {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  availability: boolean;
  rentalRates: { [key: string]: number }; // Rental rates object with durations as keys and prices as values
}

interface ACDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ACDetailsPage({ params }: ACDetailsPageProps) {
  const router = useRouter();
  const { id } = params;

  const [acDetails, setACDetails] = useState<ACDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchACDetails = async () => {
      try {
        const response = await getACRentalById(id);
        console.log("Fetched AC details:", response);
        setACDetails(response.data);
      } catch (err) {
        console.error("Error fetching AC details:", err);
        setError("Failed to fetch AC details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchACDetails();
    }
  }, [id]);

  const handlePlanSelection = (duration: string) => {
    router.push(`/ac-rent/${id}/${duration}`);
  };

  if (loading) {
    return <div>Loading AC details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!acDetails) {
    return <div>No AC details found</div>;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <header className="flex items-center mb-6">
        <Link href={"/"}>
          <button className="mr-4" aria-label="Go back">
            <ChevronLeft className="w-6 h-6 text-[#010101]" />
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-[#010101]">{acDetails.name}</h1>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Image
            src={acDetails.imageUrl}
            alt={acDetails.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#010101] mb-3">
              Description
            </h2>
            <p>{acDetails.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#010101] mb-3">
              Key Features
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                Portable and compact design
              </li>
              {/* You can add more key features here */}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#010101] mb-3">
              Specifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Type</h3>
                <p className="text-lg font-semibold text-[#010101]">
                  {acDetails.type}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">
                  Availability
                </h3>
                <p className="text-lg font-semibold text-[#010101]">
                  {acDetails.availability ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-[#010101] mb-4">Rental Plans</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(acDetails.rentalRates).map(([duration, price]) => (
            <div
              key={duration}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <h3 className="text-lg font-semibold text-[#010101] mb-2">
                {duration.replace("_", " ")} {/* Format the duration */}
              </h3>
              <p className="text-2xl font-bold text-[#ffc300] mb-4">₹{price}</p>
              <button
                onClick={() => handlePlanSelection(duration)}
                className="w-full py-2 px-4 bg-[#ffc300] text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
