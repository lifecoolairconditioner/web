"use client";

import { useState } from "react";
import { Search,  Check, X, Edit, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Sample booking data
const bookings = [
  {
    id: "B001",
    customerName: "Rahul Sharma",
    acUnit: "Deluxe Window AC",
    startDate: "2023-06-15",
    endDate: "2023-06-18",
    status: "pending",
  },
  {
    id: "B002",
    customerName: "Priya Patel",
    acUnit: "Split AC",
    startDate: "2023-06-20",
    endDate: "2023-06-25",
    status: "confirmed",
  },
  {
    id: "B003",
    customerName: "Amit Kumar",
    acUnit: "Portable AC",
    startDate: "2023-06-22",
    endDate: "2023-06-24",
    status: "completed",
  },
  {
    id: "B004",
    customerName: "Sneha Gupta",
    acUnit: "Deluxe Window AC",
    startDate: "2023-06-25",
    endDate: "2023-06-28",
    status: "pending",
  },
  {
    id: "B005",
    customerName: "Vikram Singh",
    acUnit: "Split AC",
    startDate: "2023-06-30",
    endDate: "2023-07-05",
    status: "confirmed",
  },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<
    (typeof bookings)[0] | null
  >(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const filteredBookings = bookings.filter(
    (booking) =>
      (booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || booking.status === statusFilter) &&
      (!startDate || booking.startDate >= startDate) &&
      (!endDate || booking.endDate <= endDate)
  );

  const handleAction = (
    action: "approve" | "reject" | "modify",
    booking: (typeof bookings)[0]
  ) => {
    // Here you would typically update the booking status in your backend
    console.log(`${action} booking:`, booking);
  };

  const handleGenerateConfirmation = (booking: (typeof bookings)[0]) => {
    setSelectedBooking(booking);
    setIsConfirmationModalOpen(true);
  };

  const sendConfirmation = () => {
    // Here you would typically send the confirmation message to the customer
    console.log("Sending confirmation for booking:", selectedBooking);
    console.log("Confirmation message:", confirmationMessage);
    setIsConfirmationModalOpen(false);
    setConfirmationMessage("");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#010101] mb-6">Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full md:w-auto"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full md:w-auto"
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>AC Unit</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.customerName}</TableCell>
                  <TableCell>{booking.acUnit}</TableCell>
                  <TableCell>{booking.startDate}</TableCell>
                  <TableCell>{booking.endDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        booking.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : booking.status === "confirmed"
                          ? "bg-green-200 text-green-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction("approve", booking)}
                        className="bg-green-500 text-white hover:bg-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction("reject", booking)}
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction("modify", booking)}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateConfirmation(booking)}
                        className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog
        open={isConfirmationModalOpen}
        onOpenChange={setIsConfirmationModalOpen}
      >
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Generate Booking Confirmation</DialogTitle>
            <DialogDescription>
              Send a confirmation message for booking {selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Customer
              </Label>
              <Input
                id="customer"
                value={selectedBooking?.customerName}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="acUnit" className="text-right">
                AC Unit
              </Label>
              <Input
                id="acUnit"
                value={selectedBooking?.acUnit}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dates" className="text-right">
                Dates
              </Label>
              <Input
                id="dates"
                value={`${selectedBooking?.startDate} to ${selectedBooking?.endDate}`}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                value={confirmationMessage}
                onChange={(e) => setConfirmationMessage(e.target.value)}
                className="col-span-3"
                placeholder="Enter confirmation message..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={sendConfirmation}
              className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
            >
              Send Confirmation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
