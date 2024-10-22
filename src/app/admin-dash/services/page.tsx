"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Plus, Edit, Trash, Search } from "lucide-react";

interface Service {
  _id: string;
  name: string;
  description: string;
  offerPrice: number; // Add offer price
  actualPrice: number; // Add actual price
  imageUrl: string | File | null;
  category: string;
  imageDescription: string;
}

interface ServiceFormData {
  name: string;
  description: string;
  offerPrice: number; // Add offer price
  actualPrice: number; // Add actual price
  imageUrl: File | null;
  category: string;
  imageDescription: string;
}

export default function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<Service[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services`
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Function to handle adding a new service
  const handleAddService = async (newService: ServiceFormData) => {
    const formData = new FormData();
    formData.append("name", newService.name);
    formData.append("description", newService.description);
    formData.append("offerPrice", String(newService.offerPrice)); // Add offerPrice
    formData.append("actualPrice", String(newService.actualPrice)); // Add actualPrice
    formData.append("category", newService.category);
    formData.append("imageDescription", newService.imageDescription);

    if (newService.imageUrl) {
      formData.append("imageUrl", newService.imageUrl);
    }

    try {
      const response = await axios.post<Service>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setServices((prevServices) => [...prevServices, response.data]);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleEditService = async (updatedService: ServiceFormData) => {
    const formData = new FormData();
    formData.append("name", updatedService.name);
    formData.append("description", updatedService.description);
    formData.append("offerPrice", String(updatedService.offerPrice)); // Add offerPrice
    formData.append("actualPrice", String(updatedService.actualPrice)); // Add actualPrice
    formData.append("category", updatedService.category);
    formData.append("imageDescription", updatedService.imageDescription);

    if (updatedService.imageUrl) {
      formData.append("imageUrl", updatedService.imageUrl);
    }

    try {
      await axios.put<Service>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services/${selectedService?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === selectedService?._id
            ? { ...service, ...updatedService }
            : service
        )
      );

      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleDeleteService = async () => {
    try {
      if (selectedService) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services/${selectedService._id}`
        );
        setServices((prevServices) =>
          prevServices.filter((service) => service._id !== selectedService._id)
        );
        setIsDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const filteredServices = services
    .filter((service) =>
      categoryFilter === "all"
        ? true
        : service.category.toLowerCase() === categoryFilter
    )
    .filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-6 space-y-6 bg-[#fafafa]"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-[#010101]"
      >
        Service Management 🛠️
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center space-x-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Categories 📋</SelectItem>
              <SelectItem value="fridge">Fridge 🔧</SelectItem>
              <SelectItem value="washingmachine">Washing Machine 🔨</SelectItem>
              <SelectItem value="oven">Oven 🔌</SelectItem>
              <SelectItem value="airconditioner">Air Conditioner 🔌</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2"
            />
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/90">
              <Plus className="mr-2 h-4 w-4" /> Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add New Service ✨</DialogTitle>
              <DialogDescription>
                Enter the details for the new service.
              </DialogDescription>
            </DialogHeader>
            <ServiceForm onSubmit={handleAddService} />
          </DialogContent>
        </Dialog>
      </motion.div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name 📛</TableHead>
                <TableHead>Category 🏷️</TableHead>
                <TableHead>Actual Price 💰</TableHead>
                <TableHead>Offer Price 💰</TableHead>
                <TableHead>Description 📝</TableHead>
                <TableHead>Actions 🔧</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>₹{service.actualPrice}</TableCell>
                  <TableCell>₹{service.offerPrice}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      className="bg-[#4caf50] text-white"
                      onClick={() => {
                        setSelectedService(service);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      className="bg-[#f44336] text-white"
                      onClick={() => {
                        setSelectedService(service);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </AnimatePresence>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit Service ✏️</DialogTitle>
            <DialogDescription>Update the service details.</DialogDescription>
          </DialogHeader>
          {selectedService && (
            <ServiceForm
              onSubmit={handleEditService}
              initialData={{
                name: selectedService.name,
                description: selectedService.description,
                offerPrice: selectedService.offerPrice, // Add offerPrice
                actualPrice: selectedService.actualPrice, // Add actualPrice
                category: selectedService.category,
                imageDescription: selectedService.imageDescription,
                imageUrl: null, // Optional, handle file upload separately
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion ❌</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteService}
              className="bg-red-600 text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => Promise<void>;
  initialData?: ServiceFormData;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    offerPrice: initialData?.offerPrice || 0, // Initialize offerPrice
    actualPrice: initialData?.actualPrice || 0, // Initialize actualPrice
    imageUrl: null,
    category: initialData?.category || "",
    imageDescription: initialData?.imageDescription || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, imageUrl: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Service Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          name="category"
          value={formData.category}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="fridge">Fridge 🔧</SelectItem>
            <SelectItem value="washingmachine">Washing Machine 🔨</SelectItem>
            <SelectItem value="oven">Oven 🔌</SelectItem>
            <SelectItem value="airconditioner">Air Conditioner 🔌</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="offerPrice">Offer Price</Label>
        <Input
          id="offerPrice"
          name="offerPrice"
          type="number"
          value={formData.offerPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="actualPrice">Actual Price</Label>
        <Input
          id="actualPrice"
          name="actualPrice"
          type="number"
          value={formData.actualPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="imageDescription">Image Description</Label>
        <Textarea
          id="imageDescription"
          name="imageDescription"
          value={formData.imageDescription}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">Upload Image</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <Button type="submit" className="bg-blue-600 text-white">
        Submit
      </Button>
    </form>
  );
};
