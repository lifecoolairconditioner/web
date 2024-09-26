"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  ArrowUpDown,
  Edit,
  Trash,
  Wind,
  Thermometer,
  DollarSign,
} from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  getAllACRentals,
  createACRental,
  updateACRental,
  deleteACRental,
} from "@/apis/acrent";

interface ACUnit {
  id: string;
  model: string;
  capacity: string;
  energyRating: string;
  dailyRate: number;
  available: boolean;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

interface APIResponse {
  _id: string;
  name: string;
  description: string;
  rentalRates: {
    "3_months": number;
    "6_months": number;
  };
  availability: boolean;
  type?: string;
}

export function AcRentalManagement() {
  const [acUnits, setACUnits] = useState<ACUnit[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<ACUnit | null>(null);
  const [newUnit, setNewUnit] = useState<Omit<ACUnit, "id">>({
    model: "",
    capacity: "",
    energyRating: "",
    dailyRate: 0,
    available: true,
    type: "Window AC",
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ACUnit;
    direction: "ascending" | "descending";
  } | null>(null);
  const [filterAvailable, setFilterAvailable] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchACUnits = async () => {
      try {
        const data: APIResponse[] = await getAllACRentals();
        const formattedData = data.map((item) => ({
          id: item._id,
          model: item.name,
          capacity: item.description,
          dailyRate: item.rentalRates["3_months"],
          available: item.availability,
          energyRating: `${item.rentalRates["6_months"]} kWh`,
          type: item.type || "Window AC",
        }));
        setACUnits(formattedData);
      } catch (error) {
        console.error("Failed to fetch AC rentals", error);
        toast({
          title: "Error",
          description: "Failed to fetch AC rentals. Please try again.",
          variant: "destructive",
        });
      }
    };
    fetchACUnits();
  }, []);

  const handleSort = (key: keyof ACUnit) => {
    setSortConfig((prevSortConfig) => {
      const newDirection =
        prevSortConfig?.key === key && prevSortConfig.direction === "ascending"
          ? "descending"
          : "ascending";
      return { key, direction: newDirection };
    });
  };

  const sortedACUnits = useMemo(() => {
    const sortableUnits = [...acUnits];
    if (sortConfig) {
      sortableUnits.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableUnits;
  }, [acUnits, sortConfig]);

  const filteredACUnits = useMemo(() => {
    return sortedACUnits.filter(
      (unit) =>
        (filterAvailable === null || unit.available === filterAvailable) &&
        unit.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedACUnits, filterAvailable, searchTerm]);

  const handleAddUnit = async () => {
    try {
      const newACUnit = await createACRental({
        name: newUnit.model,
        description: newUnit.capacity,
        rentalRates: {
          "3_months": newUnit.dailyRate,
          "6_months": parseFloat(newUnit.energyRating),
          "1_year": (newUnit.dailyRate * 365) / 12,
        },
        availability: newUnit.available,
        type: newUnit.type,
      });
      setACUnits((prevUnits) => [...prevUnits, newACUnit]);
      setIsAddModalOpen(false);
      resetNewUnit();
      toast({
        title: "Success",
        description: "New AC unit added successfully.",
      });
    } catch (error) {
      console.error("Failed to add AC unit", error);
      toast({
        title: "Error",
        description: "Failed to add new AC unit. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetNewUnit = () => {
    setNewUnit({
      model: "",
      capacity: "",
      energyRating: "",
      dailyRate: 0,
      available: true,
      type: "Window AC",
    });
  };

  const handleUpdateUnit = async () => {
    if (!selectedUnit) return;
    try {
      const updatedACUnit = await updateACRental(selectedUnit.id, {
        name: selectedUnit.model,
        description: selectedUnit.capacity,
        rentalRates: {
          "3_months": selectedUnit.dailyRate,
          "6_months": parseFloat(selectedUnit.energyRating),
          "1_year": (selectedUnit.dailyRate * 365) / 12,
        },
        availability: selectedUnit.available,
        type: selectedUnit.type,
      });
      setACUnits((prevUnits) =>
        prevUnits.map((unit) =>
          unit.id === selectedUnit.id ? updatedACUnit : unit
        )
      );
      setIsEditModalOpen(false);
      setSelectedUnit(null);
      toast({
        title: "Success",
        description: "AC unit updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update AC unit", error);
      toast({
        title: "Error",
        description: "Failed to update AC unit. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUnit = async (id: string) => {
    try {
      await deleteACRental(id);
      setACUnits((prevUnits) => prevUnits.filter((unit) => unit.id !== id));
      toast({
        title: "Success",
        description: "AC unit deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete AC unit", error);
      toast({
        title: "Error",
        description: "Failed to delete AC unit. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-[#fafafa]">
      <h1 className="text-3xl font-bold text-[#010101]">
        AC Rental Management ❄️
      </h1>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Select
            value={
              filterAvailable === null ? "all" : filterAvailable.toString()
            }
            onValueChange={(value) =>
              setFilterAvailable(value === "all" ? null : value === "true")
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Units 📋</SelectItem>
              <SelectItem value="true">Available ✅</SelectItem>
              <SelectItem value="false">Rented ❌</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search AC units... 🔍"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2"
            />
          </div>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New AC Unit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New AC Unit</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new AC unit to the inventory.
              </DialogDescription>
            </DialogHeader>
            <ACUnitForm acUnit={newUnit} setACUnit={setNewUnit} />
            <DialogFooter>
              <Button onClick={handleAddUnit}>Add Unit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("model")}
              className="cursor-pointer"
            >
              Model <ArrowUpDown className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead
              onClick={() => handleSort("type")}
              className="cursor-pointer"
            >
              Type <ArrowUpDown className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead
              onClick={() => handleSort("capacity")}
              className="cursor-pointer"
            >
              Capacity <Thermometer className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead
              onClick={() => handleSort("energyRating")}
              className="cursor-pointer"
            >
              Energy Rating <Wind className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead
              onClick={() => handleSort("dailyRate")}
              className="cursor-pointer"
            >
              Daily Rate <DollarSign className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead
              onClick={() => handleSort("available")}
              className="cursor-pointer"
            >
              Availability <ArrowUpDown className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filteredACUnits.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No AC units found 😕
                </TableCell>
              </TableRow>
            ) : (
              filteredACUnits.map((unit) => (
                <motion.tr
                  key={unit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="hover:bg-gray-100"
                >
                  <TableCell>{unit.model}</TableCell>
                  <TableCell>{unit.type}</TableCell>
                  <TableCell>{unit.capacity}</TableCell>
                  <TableCell>{unit.energyRating}</TableCell>
                  <TableCell>${unit.dailyRate}</TableCell>
                  <TableCell>
                    {unit.available ? "✅ Available" : "❌ Rented"}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUnit(unit);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteUnit(unit.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </TableBody>
      </Table>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit AC Unit</DialogTitle>
            <DialogDescription>
              Modify the details of the selected AC unit.
            </DialogDescription>
          </DialogHeader>
          {selectedUnit && (
            <ACUnitForm acUnit={selectedUnit} setACUnit={setSelectedUnit} />
          )}
          <DialogFooter>
            <Button onClick={handleUpdateUnit}>Update Unit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ACUnitFormProps {
  acUnit: Omit<ACUnit, "id">;
  setACUnit: React.Dispatch<React.SetStateAction<Omit<ACUnit, "id">>>;
}

const ACUnitForm: React.FC<ACUnitFormProps> = ({ acUnit, setACUnit }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setACUnit((prevUnit) => ({
      ...prevUnit,
      [name]: name === "dailyRate" ? parseFloat(value) : value,
    }));
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            name="model"
            value={acUnit.model}
            onChange={handleInputChange}
            placeholder="Model name"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select name="type" value={acUnit.type} onChange={handleInputChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select AC type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Window AC">Window AC</SelectItem>
              <SelectItem value="Split AC">Split AC</SelectItem>
              <SelectItem value="Portable AC">Portable AC</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            name="capacity"
            value={acUnit.capacity}
            onChange={handleInputChange}
            placeholder="Cooling capacity (e.g., 1.5 Ton)"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="energyRating">Energy Rating</Label>
          <Input
            name="energyRating"
            value={acUnit.energyRating}
            onChange={handleInputChange}
            placeholder="Energy rating (e.g., 5 Star)"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="dailyRate">Daily Rate</Label>
          <Input
            type="number"
            name="dailyRate"
            value={acUnit.dailyRate}
            onChange={handleInputChange}
            placeholder="Daily rental rate in $"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="available">Availability</Label>
          <Switch
            checked={acUnit.available}
            onCheckedChange={(checked) =>
              setACUnit((prevUnit) => ({ ...prevUnit, available: checked }))
            }
          />
        </div>
      </div>
    </>
  );
};
