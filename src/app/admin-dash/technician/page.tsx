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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Search,
  ArrowUpDown,
  Plus,
  X,
  Edit,
  Phone,
  Mail,
  MapPin,
  User,
} from "lucide-react";
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
      setTechnicians([...technicians, newTechnicianData]);
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

  const handleUpdateTechnician = async (updatedTechnician: Technician) => {
    try {
      const updatedData = await updateTechnician(
        updatedTechnician._id,
        updatedTechnician
      );
      setTechnicians((prevTechnicians) =>
        prevTechnicians.map((tech) =>
          tech._id === updatedTechnician._id ? updatedData.data : tech
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update technician:", error);
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

  const filteredTechnicians = sortedTechnicians.filter(
    (technician) => technician.name
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedTechnician(technician);
                    setIsProfileModalOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedTechnician(technician);
                    setIsEditModalOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTechnician(technician._id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Technician Profile 👨‍🔧</DialogTitle>
            <DialogDescription>View technician details.</DialogDescription>
          </DialogHeader>
          {selectedTechnician && (
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5 text-[#ffc300]" />
                <Label>Name:</Label>
                <div className="ml-2">{selectedTechnician.name}</div>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-[#ffc300]" />
                <Label>Email:</Label>
                <div className="ml-2">{selectedTechnician.email}</div>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-[#ffc300]" />
                <Label>Phone:</Label>
                <div className="ml-2">{selectedTechnician.phone}</div>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-[#ffc300]" />
                <Label>Address:</Label>
                <div className="ml-2">{selectedTechnician.address}</div>
              </div>
              <div>
                <Label className="flex items-center">🛠️ Services:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTechnician.services.map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <Label className="mr-2">Availability:</Label>
                <Switch
                  checked={selectedTechnician.availability}
                  onCheckedChange={() =>
                    toggleAvailability(selectedTechnician._id)
                  }
                />
                <span className="ml-2">
                  {selectedTechnician.availability ? "Available 🟢" : "Busy 🔴"}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsProfileModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add Technician 🆕</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={newTechnician.name}
                onChange={(e) =>
                  setNewTechnician({ ...newTechnician, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={newTechnician.phone}
                onChange={(e) =>
                  setNewTechnician({ ...newTechnician, phone: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={newTechnician.email}
                onChange={(e) =>
                  setNewTechnician({ ...newTechnician, email: e.target.value })
                }
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
              />
            </div>
            <div>
              <Label>Services</Label>
              <Select
                onValueChange={(value) => {
                  if (!newTechnician.services.includes(value)) {
                    setNewTechnician({
                      ...newTechnician,
                      services: [...newTechnician.services, value],
                    });
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service._id} value={service._id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddTechnician}>Add</Button>
            <Button onClick={() => setIsAddModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Edit Technician ✏️</DialogTitle>
          </DialogHeader>
          {selectedTechnician && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={selectedTechnician.name}
                  onChange={(e) =>
                    setSelectedTechnician({
                      ...selectedTechnician,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={selectedTechnician.phone}
                  onChange={(e) =>
                    setSelectedTechnician({
                      ...selectedTechnician,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={selectedTechnician.email}
                  onChange={(e) =>
                    setSelectedTechnician({
                      ...selectedTechnician,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={selectedTechnician.address}
                  onChange={(e) =>
                    setSelectedTechnician({
                      ...selectedTechnician,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Services</Label>
                <Select
                  onValueChange={(value) => {
                    if (!selectedTechnician.services.includes(value)) {
                      setSelectedTechnician({
                        ...selectedTechnician,
                        services: [...selectedTechnician.services, value],
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Add service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="66eefa629de96705a8a8b58f">
                      Service 1
                    </SelectItem>
                    {/* Add more services as needed */}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTechnician.services.map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {service}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTechnician({
                            ...selectedTechnician,
                            services: selectedTechnician.services.filter(
                              (s) => s !== service
                            ),
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <Label className="mr-2">Availability:</Label>
                <Switch
                  checked={selectedTechnician.availability}
                  onCheckedChange={(checked) =>
                    setSelectedTechnician({
                      ...selectedTechnician,
                      availability: checked,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => handleUpdateTechnician(selectedTechnician)}>
              Update
            </Button>
            <Button onClick={() => setIsEditModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
