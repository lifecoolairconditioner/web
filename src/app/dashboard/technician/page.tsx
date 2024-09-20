"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  Plus,
  Star,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Sample technician data
const technicians = [
  {
    id: "T001",
    name: "Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajesh@example.com",
    status: "Available",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    jobsCompleted: 150,
    onTimeRate: 95,
  },
  {
    id: "T002",
    name: "Priya Sharma",
    phone: "+91 9876543211",
    email: "priya@example.com",
    status: "On Job",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    jobsCompleted: 120,
    onTimeRate: 92,
  },
  {
    id: "T003",
    name: "Amit Patel",
    phone: "+91 9876543212",
    email: "amit@example.com",
    status: "Off Duty",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    jobsCompleted: 180,
    onTimeRate: 98,
  },
];

export default function TechnicianDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTechnician, setNewTechnician] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleAddTechnician = () => {
    // Here you would typically add the new technician to your backend
    console.log("Adding new technician:", newTechnician);
    setIsAddModalOpen(false);
    setNewTechnician({ name: "", phone: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#010101] mb-6">
        Technician Management Dashboard
      </h1>

      <Tabs defaultValue="technicians" className="space-y-4">
        <TabsList>
          <TabsTrigger value="technicians">Technicians</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="technicians">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicians.map((technician) => (
              <Card key={technician.id}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={technician.avatar}
                        alt={technician.name}
                      />
                      <AvatarFallback>
                        {technician.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{technician.name}</CardTitle>
                      <CardDescription>{technician.id}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{technician.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{technician.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          technician.status === "Available"
                            ? "bg-green-200 text-green-800"
                            : technician.status === "On Job"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {technician.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="flex items-center justify-center bg-white">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Technician
                  </Button>
                </DialogTrigger>
              </Dialog>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Technician Schedule</CardTitle>
              <CardDescription>
                View and manage technician schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <Calendar className="h-16 w-16 text-gray-400" />
                <p className="ml-4 text-lg text-gray-500">
                  Calendar view to be implemented
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicians.map((technician) => (
              <Card key={technician.id}>
                <CardHeader>
                  <CardTitle>{technician.name}</CardTitle>
                  <CardDescription>Performance Overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-400" />
                      Rating
                    </span>
                    <span className="font-bold">{technician.rating}/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Jobs Completed
                    </span>
                    <span className="font-bold">
                      {technician.jobsCompleted}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        On-Time Rate
                      </span>
                      <span className="font-bold">
                        {technician.onTimeRate}%
                      </span>
                    </div>
                    <Progress value={technician.onTimeRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle>Add New Technician</DialogTitle>
            <DialogDescription>
              Enter the details of the new technician.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newTechnician.name}
                onChange={(e) =>
                  setNewTechnician({ ...newTechnician, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={newTechnician.phone}
                onChange={(e) =>
                  setNewTechnician({ ...newTechnician, phone: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={newTechnician.email}
                onChange={(e) =>
                  setNewTechnician({ ...newTechnician, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddTechnician}
              className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
            >
              Add Technician
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
