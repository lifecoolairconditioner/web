"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Check, X } from "lucide-react";
import Link from "next/link";
import { getAllACRentals } from "@/apis/acrent";

type RentalRates = {
  "3_months": number;
  "6_months": number;
  "1_year": number;
};

interface ACType {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  availability: boolean;
  rentalRates: RentalRates;
}

export default function ACRentTypesScreen() {
  const [acTypes, setACTypes] = useState<ACType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchACTypes = async () => {
      try {
        const data = await getAllACRentals();
        setACTypes(data);
      } catch (error) {
        setError("Failed to fetch AC rental options");
      } finally {
        setLoading(false);
      }
    };

    fetchACTypes();
  }, []);

  const handleBookClick = (id: string) => {
    console.log(`Navigating to AC Details Page for AC with id: ${id}`);
  };

  if (loading) {
    return <div>Loading AC rental options...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <header className="flex items-center mb-6">
        <Link href={"/"}>
          <button className="mr-4" aria-label="Go back">
            <ChevronLeft className="w-6 h-6 text-[#010101]" />
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-[#010101]">AC Rental Options</h1>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[calc(100vh-120px)]">
        {acTypes.map((ac) => (
          <div
            key={ac._id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <Link href={`/ac-rent/${ac._id}`}>
              <img
                src={ac.imageUrl}
                alt={ac.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-[#010101] mb-2">
                  {ac.name}
                </h2>
                <p className="text-gray-600 mb-2">{ac.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      ac.availability
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {ac.availability ? (
                      <>
                        <Check className="w-4 h-4 inline mr-1" /> Available
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 inline mr-1" /> Unavailable
                      </>
                    )}
                  </span>
                </div>
                <button
                  onClick={() => handleBookClick(ac._id)}
                  className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors duration-300 ${
                    ac.availability
                      ? "bg-[#ffc300] hover:bg-[#e6b000] focus:ring-4 focus:ring-yellow-300"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!ac.availability}
                >
                  {ac.availability ? "Book Now" : "Not Available"}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
