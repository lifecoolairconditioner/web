"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { toast } from "../../../../hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface Contact {
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface ServiceSchedulingPageProps {
  params: {
    id: string;
    category: string;
  };
}

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 20; hour++) {
    for (const minute of ["00", "30"]) {
      slots.push(`${hour.toString().padStart(2, "0")}:${minute}:00.000Z`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export default function ServiceSchedulingPage({
  params,
}: ServiceSchedulingPageProps) {
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [date, setDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { id, category } = params;
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleDateClick = (selectedDate: Date) => {
    setDate(selectedDate.toISOString().split("T")[0] + "T00:00:00.000+00:00");
  };

  const handleTimeClick = (selectedTime: string) => {
    setTimeSlot(selectedTime);
  };

  const handleProceed = () => {
    if (date && timeSlot) {
      setIsContactModalOpen(true);
    } else {
      toast({
        title: "Incomplete Selection",
        description: "Please select both a date and time before proceeding.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      service: id,
      date,
      timeSlot,
      contact,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        orderData
      );

      toast({
        title: "Order Placed Successfully",
        description: "Your service has been scheduled!",
      });
      setContact({
        name: "",
        email: "",
        address: "",
        phone: "",
      });

      setDate("");
      setTimeSlot("");
      setIsContactModalOpen(false);
      router.push(`/${category}/${id}/book/${response.data._id}`);
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Error placing order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8"
    >
      <header className="flex items-center mb-6">
        <Link href="./">
          {" "}
          <Button
            variant="ghost"
            className="mr-4"
            aria-label="Go back"
            onClick={() => router.back()}
          >
            <ChevronLeft className="w-6 h-6 text-[#010101]" />
          </Button>{" "}
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-[#010101]"
        >
          Schedule Service
        </motion.h1>
      </header>

      <main className="space-y-8">
        <motion.section
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-semibold text-[#010101] mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Select Date
          </h2>
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <AnimatePresence>
              {calendar.map((calendarDate, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDateClick(calendarDate)}
                  className={`flex flex-col items-center justify-center w-16 h-20 mr-2 rounded-lg ${
                    date.startsWith(calendarDate.toISOString().split("T")[0])
                      ? "bg-[#ffc300] text-[#010101]"
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
                    {calendarDate.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                  <span className="text-lg font-bold">
                    {calendarDate.getDate()}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        <motion.section
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-semibold text-[#010101] mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Select Time
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            <AnimatePresence>
              {timeSlots.map((slot, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleTimeClick(slot)}
                  className={`py-2 px-4 rounded-lg ${
                    timeSlot === slot
                      ? "bg-[#ffc300] text-[#010101]"
                      : "bg-white text-[#010101]"
                  } shadow-sm transition-colors duration-200`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.02 }}
                >
                  {slot.slice(0, 5)}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>

      <motion.footer
        className="mt-8"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Button
          onClick={handleProceed}
          disabled={!date || !timeSlot}
          className={`w-full py-3 px-4 rounded-lg text-[#010101] font-semibold transition-colors duration-300 ${
            date && timeSlot
              ? "bg-[#ffc300] hover:bg-[#e6b000]"
              : "bg-gray-300 cursor-not-allowed"
          } focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50`}
        >
          Proceed
        </Button>
      </motion.footer>

      <AnimatePresence>
        {isContactModalOpen && (
          <Dialog
            open={isContactModalOpen}
            onOpenChange={setIsContactModalOpen}
          >
            <DialogContent className="sm:max-w-[425px] bg-[#fafafa]">
              <DialogHeader>
                <DialogTitle className="text-[#010101]">
                  Contact Information
                </DialogTitle>
                <DialogDescription>
                  Please provide your contact details to complete the booking.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right text-[#010101]">
                      <User className="h-4 w-4 inline-block mr-2" />
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={contact.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="phone"
                      className="text-right text-[#010101]"
                    >
                      <Phone className="h-4 w-4 inline-block mr-2" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={contact.phone}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="email"
                      className="text-right text-[#010101]"
                    >
                      <Mail className="h-4 w-4 inline-block mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contact.email}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="address"
                      className="text-right text-[#010101]"
                    >
                      <MapPin className="h-4 w-4 inline-block mr-2" />
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={contact.address}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
                    disabled={loading}
                  >
                    {loading ? "Placing Order..." : "Complete Booking"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
