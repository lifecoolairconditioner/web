"use client"

import React, { useState } from "react"
import { ChevronLeft, Calendar, Clock, User, Phone, Mail, MapPin } from "lucide-react"
import { createOrder } from "@/apis/order"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour <= 20; hour++) {
    slots.push(`${hour}:00`)
    if (hour !== 20) slots.push(`${hour}:30`)
  }
  return slots
}

const timeSlots = generateTimeSlots()

export function ServiceSchedulingPageComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  })

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
  }

  const handleProceed = () => {
    if (selectedDate && selectedTime) {
      setIsContactModalOpen(true)
    } else {
      toast({
        title: "Incomplete Selection",
        description: "Please select both a date and time before proceeding.",
        variant: "destructive",
      })
    }
  }

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value })
  }

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDate && selectedTime) {
      try {
        const orderData = {
          ...contactForm,
          date: selectedDate.toISOString(),
          timeSlot: selectedTime,
        }
        const response = await createOrder(orderData)
        console.log("Order created:", response)
        setIsContactModalOpen(false)
        toast({
          title: "Booking Successful",
          description: "Your service has been scheduled successfully!",
        })
        // Implement navigation to confirmation page or dashboard here
      } catch (error) {
        console.error("Error creating order:", error)
        toast({
          title: "Booking Failed",
          description: "There was an error scheduling your service. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const generateCalendar = () => {
    const today = new Date()
    const calendar = []
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      calendar.push(date)
    }
    return calendar
  }

  const calendar = generateCalendar()

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <header className="flex items-center mb-6">
        <Button variant="ghost" className="mr-4" aria-label="Go back">
          <ChevronLeft className="w-6 h-6 text-[#010101]" />
        </Button>
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
              <Button
                key={index}
                onClick={() => handleDateClick(date)}
                variant={selectedDate?.toDateString() === date.toDateString() ? "default" : "outline"}
                className="flex flex-col items-center justify-center w-16 h-20 mr-2 rounded-lg flex-shrink-0"
              >
                <span className="text-sm">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-lg font-bold">{date.getDate()}</span>
              </Button>
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
              <Button
                key={index}
                onClick={() => handleTimeClick(time)}
                variant={selectedTime === time ? "default" : "outline"}
              >
                {time}
              </Button>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-8">
        <Button
          onClick={handleProceed}
          disabled={!selectedDate || !selectedTime}
          className="w-full py-6 text-lg"
        >
          Proceed
        </Button>
      </footer>

      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Information</DialogTitle>
            <DialogDescription>
              Please provide your contact details to complete the booking.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  <User className="h-4 w-4 inline-block mr-2" />
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  <Phone className="h-4 w-4 inline-block mr-2" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleContactFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  <Mail className="h-4 w-4 inline-block mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  <MapPin className="h-4 w-4 inline-block mr-2" />
                  Address
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={contactForm.address}
                  onChange={handleContactFormChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Complete Booking</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}