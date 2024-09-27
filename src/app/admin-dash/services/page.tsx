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
import { Plus, Edit, Trash, Search, DollarSign, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Define types for service and form data
interface Service {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface ServiceFormData {
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services`
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleAddService = async (newService: ServiceFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/services",
        newService
      );
      setServices([...services, response.data]);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleEditService = async (updatedService: Service) => {
    try {
      await axios.put(
        `http://localhost:8000/api/services/${updatedService._id}`,
        updatedService
      );
      setServices(
        services.map((service) =>
          service._id === updatedService._id ? updatedService : service
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
          `http://localhost:8000/api/services/${selectedService._id}`
        );
        setServices(
          services.filter((service) => service._id !== selectedService._id)
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
    <div className="container mx-auto p-6 space-y-6 bg-[#fafafa]">
      <h1 className="text-3xl font-bold text-[#010101]">
        Service Management 🛠️
      </h1>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories 📋</SelectItem>
              <SelectItem value="repair">Repair 🔧</SelectItem>
              <SelectItem value="maintenance">Maintenance 🔨</SelectItem>
              <SelectItem value="installation">Installation 🔌</SelectItem>
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
      </div>

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
                <TableHead>ID 🆔</TableHead>
                <TableHead>Name 📛</TableHead>
                <TableHead>Category 🏷️</TableHead>
                <TableHead>Price 💰</TableHead>
                <TableHead>Description 📝</TableHead>
                <TableHead>Actions 🔧</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>{service._id}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>${service.price}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedService(service);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedService(service);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
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
            <DialogDescription>
              Update the details for this service.
            </DialogDescription>
          </DialogHeader>
          {selectedService && (
            <ServiceForm
              initialData={selectedService}
              onSubmit={handleEditService}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete Service 🗑️</DialogTitle>
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
            <Button variant="destructive" onClick={handleDeleteService}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: ServiceFormData | Service) => void;
}

function ServiceForm({ initialData, onSubmit }: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || 0,
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white">
      <div>
        <Label htmlFor="name" className="flex items-center">
          Service Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="category" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" /> Category
        </Label>
        <Select value={formData.category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Repair">Repair 🔧</SelectItem>
            <SelectItem value="Maintenance">Maintenance 🔨</SelectItem>
            <SelectItem value="Installation">Installation 🔌</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="price" className="flex items-center">
          <DollarSign className="mr-2 h-4 w-4" /> Price
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" /> Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="imageUrl" className="flex items-center">
          Image URL
        </Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          className="bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/90"
        >
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}
