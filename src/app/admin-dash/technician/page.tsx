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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, ArrowUpDown, Plus, X, Edit } from "lucide-react";
import {
  getAllTechnicians,
  createTechnician,
  updateTechnician,
  deleteTechnician,
} from "@/apis/technician";
import { getAllServices } from "@/apis/service";

interface Technician {
  _id: string;
  name: string;
  phone: string;
  email: string;
  services: string[];
  availability: boolean;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Service {
  _id: string;
  name: string;
}

const initialTechnicians: Technician[] = [];
const initialServices: Service[] = [];

export default function TechnicianManagement() {
  const [technicians, setTechnicians] =
    useState<Technician[]>(initialTechnicians);
  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTechnician, setNewTechnician] = useState<
    Omit<Technician, "_id" | "createdAt" | "updatedAt" | "__v">
  >({
    name: "",
    phone: "",
    email: "",
    services: [],
    availability: true,
    address: "",
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Technician | null;
    direction: "ascending" | "descending";
  }>({ key: null, direction: "ascending" });
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>(initialServices);
  console.log(selectedTechnician);
  console.log(isProfileModalOpen);
  console.log(isEditModalOpen);
  console.log(selectedTechnician);
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await getAllTechnicians();
        if (Array.isArray(response.data)) {
          setTechnicians(response.data);
        } else {
          console.error("Expected an array but received:", response.data);
          setTechnicians([]);
        }
      } catch (error) {
        console.error("Failed to fetch technicians:", error);
        setTechnicians([]);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
    fetchTechnicians();
  }, []);

  const handleAddTechnician = async () => {
    try {
      const newTechnicianData = await createTechnician(newTechnician);
      if ("data" in newTechnicianData) {
        setTechnicians([...technicians, newTechnicianData.data]);
      } else {
        setTechnicians([...technicians, newTechnicianData]);
      }
      resetNewTechnician();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add technician:", error);
    }
  };

  const resetNewTechnician = () => {
    setNewTechnician({
      name: "",
      phone: "",
      email: "",
      services: [],
      availability: true,
      address: "",
    });
  };

  const handleDeleteTechnician = async (technicianId: string) => {
    try {
      await deleteTechnician(technicianId);
      setTechnicians(technicians.filter((tech) => tech._id !== technicianId));
    } catch (error) {
      console.error("Failed to delete technician:", error);
    }
  };

  const handleSort = (key: keyof Technician) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const sortedTechnicians = React.useMemo(() => {
    if (!Array.isArray(technicians)) return [];
    const sortableTechnicians = [...technicians];

    if (sortConfig.key) {
      sortableTechnicians.sort((a, b) => {
        if (
          a[sortConfig.key as keyof Technician] <
          b[sortConfig.key as keyof Technician]
        ) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof Technician] >
          b[sortConfig.key as keyof Technician]
        ) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTechnicians;
  }, [technicians, sortConfig]);

  const filteredTechnicians = sortedTechnicians.filter((technician) =>
    technician.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAvailability = async (technicianId: string) => {
    const technician = technicians.find((tech) => tech._id === technicianId);
    if (!technician) return;

    try {
      const updatedAvailability = !technician.availability;
      await updateTechnician(technicianId, {
        ...technician,
        availability: updatedAvailability,
      });

      setTechnicians(
        technicians.map((tech) =>
          tech._id === technicianId
            ? { ...tech, availability: updatedAvailability }
            : tech
        )
      );
    } catch (error) {
      console.error("Failed to update availability:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#010101]">
        Technician Management 👨‍🔧👩‍🔧
      </h1>

      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search technicians... 🔍"
            className="pl-10 pr-4 py-2 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Technician 🆕
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID 🆔</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")}>
                Name 👤 <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Phone 📞</TableHead>
            <TableHead>Email 📧</TableHead>
            <TableHead>Services 🛠️</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("availability")}
              >
                Availability 🟢🔴 <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Actions 🔧</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTechnicians.map((technician) => (
            <TableRow key={technician._id}>
              <TableCell>{technician._id}</TableCell>
              <TableCell>{technician.name}</TableCell>
              <TableCell>{technician.phone}</TableCell>
              <TableCell>{technician.email}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {technician.services.map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Switch
                  checked={technician.availability}
                  onCheckedChange={() => toggleAvailability(technician._id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedTechnician(technician);
                      setIsProfileModalOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedTechnician(technician);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteTechnician(technician._id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Technician</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new technician.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <Label>Name</Label>
              <Input
                value={newTechnician.name}
                onChange={(e) =>
                  setNewTechnician({ ...newTechnician, name: e.target.value })
                }
                placeholder="Enter technician name"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={newTechnician.phone}
                onChange={(e) =>
                  setNewTechnician({ ...newTechnician, phone: e.target.value })
                }
                placeholder="Enter technician phone number"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={newTechnician.email}
                onChange={(e) =>
                  setNewTechnician({ ...newTechnician, email: e.target.value })
                }
                placeholder="Enter technician email"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                value={newTechnician.address}
                onChange={(e) =>
                  setNewTechnician({
                    ...newTechnician,
                    address: e.target.value,
                  })
                }
                placeholder="Enter technician address"
              />
            </div>
            <div>
              <Label>Services</Label>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id={service._id}
                      checked={newTechnician.services.includes(service.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewTechnician({
                            ...newTechnician,
                            services: [...newTechnician.services, service.name],
                          });
                        } else {
                          setNewTechnician({
                            ...newTechnician,
                            services: newTechnician.services.filter(
                              (s) => s !== service.name
                            ),
                          });
                        }
                      }}
                    />
                    <label htmlFor={service._id}>{service.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddTechnician}>
              Add Technician
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
