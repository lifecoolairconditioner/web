"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 20; hour++) {
    slots.push(`${hour}:00`);
    if (hour !== 20) slots.push(`${hour}:30`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export default function ServiceSchedulingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleProceed = () => {
    if (selectedDate && selectedTime) {
      console.log(
        `Proceeding with booking for ${selectedDate.toDateString()} at ${selectedTime}`
      );
      // Implement navigation to User Data Collection Page here
    } else {
      alert("Please select both a date and time before proceeding.");
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
        <h1 className="text-2xl font-bold text-[#010101]">Schedule Service</h1>
      </header>

      <main className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-[#010101] mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Select Date
          </h2>
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            {calendar.map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`flex flex-col items-center justify-center w-16 h-20 mr-2 rounded-lg ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? "bg-[#ffc300] text-[#010101]"
                    : "bg-white text-[#010101]"
                } shadow-sm transition-colors duration-200 flex-shrink-0`}
              >
                <span className="text-sm">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-lg font-bold">{date.getDate()}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#010101] mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
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
      </main>

      <footer className="mt-8">
        <button
          onClick={handleProceed}
          disabled={!selectedDate || !selectedTime}
          className={`w-full py-3 px-4 rounded-lg text-[#010101] font-semibold transition-colors duration-300 ${
            selectedDate && selectedTime
              ? "bg-[#ffc300] hover:bg-[#e6b000]"
              : "bg-gray-300 cursor-not-allowed"
          } focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50`}
        >
          Proceed
        </button>
      </footer>
    </div>
  );
}
