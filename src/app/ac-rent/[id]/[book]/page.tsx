"use client";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/apis/order";

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 20; hour++) {
    slots.push(`${hour}:00`);
    if (hour !== 20) slots.push(`${hour}:30`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

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
  const router = useRouter();

  const { id, book } = params;
  const rental = id;
  const rentalPeriod = book;

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

    if (
      !selectedDate ||
      !selectedTime ||
      !userData.name ||
      !userData.phone ||
      !userData.email ||
      !userData.address
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Format selected date for API
    const formattedDate = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

    const bookingData = {
      rental,
      timeSlot: rentalPeriod,
      date: formattedDate,
      contact: {
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        address: userData.address,
      },
      ...(location && { location }), // Include location if available
    };

    try {
      const response = await createOrder(bookingData);
      setIsModalOpen(false);
      router.push(`/ac-rent/${rental}/${rentalPeriod}/${response._id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  const generateCalendar = () => {
    const today = new Date();
    const calendar = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      calendar.push(date);
    }
    return calendar;
  };

  const calendar = generateCalendar();

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <header className="flex items-center mb-6">
        <button className="mr-4" aria-label="Go back">
          <ChevronLeft className="w-6 h-6 text-[#010101]" />
        </button>
        <h1 className="text-2xl font-bold text-[#010101]">Book Your Slot</h1>
      </header>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#010101] mb-4">
          Select Date
        </h2>
        <div className="flex overflow-x-auto pb-4">
          {calendar.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`flex flex-col items-center justify-center w-16 h-20 mr-2 rounded-lg ${
                selectedDate?.toDateString() === date.toDateString()
                  ? "bg-[#ffc300] text-[#010101]"
                  : "bg-white text-[#010101]"
              } shadow-sm transition-colors duration-200`}
            >
              <span className="text-sm">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="text-lg font-bold">{date.getDate()}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#010101] mb-4">
          Select Time
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {timeSlots.map((time, index) => (
            <button
              key={index}
              onClick={() => handleTimeClick(time)}
              className={`py-2 px-4 rounded-lg ${
                selectedTime === time
                  ? "bg-[#ffc300] text-[#010101]"
                  : "bg-white text-[#010101]"
              } shadow-sm transition-colors duration-200`}
            >
              {time}
            </button>
          ))}
        </div>
      </section>
      <Button
        onClick={handleProceed}
        disabled={!selectedDate || !selectedTime}
        className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-300 ${
          selectedDate && selectedTime
            ? "bg-[#ffc300] hover:bg-[#e6b000]"
            : "bg-gray-300 cursor-not-allowed"
        } focus:outline-none focus:ring-4 focus:ring-yellow-300`}
      >
        Proceed
      </Button>
      {locationError && <p className="text-red-500 mt-4">{locationError}</p>}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Enter Your Details</DialogTitle>
            <DialogDescription>
              Please provide your information to complete the booking.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
            >
              Confirm Booking
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
