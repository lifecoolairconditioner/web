"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { createOrder } from "../../../../apis/order";
import { motion, AnimatePresence } from "framer-motion";

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 20; hour++) {
    slots.push(`${hour}:00`);
    if (hour !== 20) slots.push(`${hour}:30`);
  }
  return slots;
};

const durations = generateTimeSlots();

interface Booking {
  params: {
    id: string;
    book: string;
  };
}

interface UserData {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export default function SlotBookingScreen({ params }: Booking) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { id, book } = params;

  // Extract the `quantity` parameter from the URL
  const quantity = searchParams.get("quantity") || "1"; // Default to '1' if not provided

  const rental = id;
  const rentalPeriod = book;

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          setLocationError("Unable to fetch location. Please try again.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const handleProceed = () => {
    if (selectedDate && selectedTime) {
      handleGetLocation();
      setIsModalOpen(true);
    } else {
      alert("Please select both a date and time before proceeding.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !selectedDate ||
      !selectedTime ||
      !userData.name ||
      !userData.phone ||
      !userData.email ||
      !userData.address
    ) {
      alert("Please fill all fields.");
      setIsLoading(false);
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];

    // Include quantity in the booking data
    const bookingData = {
      rental,
      duration: rentalPeriod,
      date: formattedDate,
      timeSlot: selectedTime,
      quantity: parseInt(quantity, 10), // Convert quantity to a number
      contact: {
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        address: userData.address,
      },
      ...(location && { location }),
    };

    try {
      const response = await createOrder(bookingData);
      setIsModalOpen(false);
      router.push(`./${rentalPeriod}/${response._id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateCalendar = () => {
    const today = new Date();
    const calendar = [];
    for (let i = 0; i < 28; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      calendar.push(date);
    }
    return calendar;
  };

  const calendar = generateCalendar();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#fafafa] flex items-center justify-center"
      >
        <div className="w-16 h-16 border-4 border-blue-300 border-t-[#010101] rounded-full animate-spin"></div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8"
    >
      <header className="flex items-center mb-6">
        <Link href={`/ac-rent/${rental}`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mr-4"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6 text-[#010101]" />
          </motion.button>
        </Link>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-[#010101]"
        >
          Book Your Slot
        </motion.h1>
      </header>
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-[#010101] mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Select Date
        </h2>
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <AnimatePresence>
            {calendar.map((date, index) => (
              <motion.button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`flex flex-col items-center justify-center w-16 h-20 mr-2 rounded-lg ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? "bg-blue-300 text-[#010101]"
                    : "bg-white text-[#010101]"
                } shadow-sm transition-colors duration-200 flex-shrink-0`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="text-sm">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-lg font-bold">{date.getDate()}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-[#010101] mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Select Time
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {durations.map((time, index) => (
            <motion.button
              key={index}
              onClick={() => handleTimeClick(time)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-2 px-4 rounded-lg ${
                selectedTime === time
                  ? "bg-blue-300 text-[#010101]"
                  : "bg-white text-[#010101]"
              } shadow-sm transition-colors duration-200`}
            >
              {time}
            </motion.button>
          ))}
        </div>
      </motion.section>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={handleProceed}
          disabled={!selectedDate || !selectedTime}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-300 ${
            selectedDate && selectedTime
              ? "bg-blue-300 hover:bg-blue-300"
              : "bg-gray-300 cursor-not-allowed"
          } focus:outline-none focus:ring-4 focus:ring-blue-4000`}
        >
          Proceed
        </Button>
      </motion.div>
      {locationError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 mt-4"
        >
          {locationError}
        </motion.p>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Enter Your Details</DialogTitle>
                <DialogDescription>
                  Please provide your information to complete the booking.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields for user data */}
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={userData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-300 text-[#010101] hover:bg-blue-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Confirm Booking"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
