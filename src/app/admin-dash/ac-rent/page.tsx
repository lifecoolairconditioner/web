"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, ArrowUpDown, Edit, Trash } from "lucide-react";
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
import { getAllACRentals, createACRental, deleteACRental } from "@/apis/acrent";

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

export default function ACRentalManagement() {
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
  console.log(isEditModalOpen);
  console.log(selectedUnit);

  useEffect(() => {
    const fetchACUnits = async () => {
      try {
        const data = await getAllACRentals();
        const formattedData = data.map(
          (item: {
            _id: string;
            name: string;
            description: string;
            rentalRates: { [key: string]: number };
            availability: boolean;
            type?: string;
          }) => ({
            id: item._id,
            model: item.name,
            capacity: item.description,
            dailyRate: item.rentalRates["3_months"],
            available: item.availability,
            energyRating: `${item.rentalRates["6_months"]} kWh`,
            type: item.type || "Window AC", // Default to "Window AC" if type is not provided
          })
        );
        setACUnits(formattedData); // Add this line to set the fetched units
      } catch (error) {
        console.error("Failed to fetch AC units", error); // Added error logging
        toast({
          title: "Error",
          description: "Failed to fetch AC units. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchACUnits();
  }, []);

  const handleSort = (key: keyof ACUnit) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleEditUnit = (unit: ACUnit) => {
    // Open the edit modal and set the selected unit to be edited
    setSelectedUnit(unit);
    setIsEditModalOpen(true);
  };

  const sortedACUnits = React.useMemo(() => {
    if (sortConfig !== null) {
      const sortableUnits = [...acUnits];

      sortableUnits.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Check if both values are defined and comparable
        if (aValue === undefined || bValue === undefined) {
          return 0;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        }

        // Default case if types are incompatible or unexpected
        return 0;
      });

      return sortableUnits;
    }

    return acUnits;
  }, [acUnits, sortConfig]);

  const filteredACUnits = sortedACUnits.filter(
    (unit) =>
      (filterAvailable === null || unit.available === filterAvailable) &&
      unit.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUnit = async () => {
    try {
      // Assuming createACRental returns an Axios response
      const { data: newACUnit } = await createACRental({
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

      // Add the new unit to the state
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
            <Search className="absolute left-2 top-2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by model"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-5 w-5" /> Add New AC
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New AC Unit</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new AC unit.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model" className="text-right">
                  Model
                </Label>
                <Input
                  id="model"
                  value={newUnit.model}
                  onChange={(e) =>
                    setNewUnit({ ...newUnit, model: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  value={newUnit.capacity}
                  onChange={(e) =>
                    setNewUnit({ ...newUnit, capacity: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="energyRating" className="text-right">
                  Energy Rating (kWh)
                </Label>
                <Input
                  id="energyRating"
                  value={newUnit.energyRating}
                  onChange={(e) =>
                    setNewUnit({ ...newUnit, energyRating: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dailyRate" className="text-right">
                  Daily Rate ($)
                </Label>
                <Input
                  id="dailyRate"
                  type="number"
                  value={newUnit.dailyRate}
                  onChange={(e) =>
                    setNewUnit({
                      ...newUnit,
                      dailyRate: Number(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  value={newUnit.type}
                  onChange={(e) =>
                    setNewUnit({ ...newUnit, type: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="available" className="text-right">
                  Available?
                </Label>
                <Switch
                  checked={newUnit.available}
                  onCheckedChange={(value) =>
                    setNewUnit({ ...newUnit, available: value })
                  }
                  className="col-span-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddUnit}>
                Save AC Unit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("model")}
            >
              Model <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("capacity")}
            >
              Capacity <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("energyRating")}
            >
              Energy Rating (kWh){" "}
              <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("dailyRate")}
            >
              Daily Rate ($){" "}
              <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("available")}
            >
              Availability <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredACUnits.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell>{unit.model}</TableCell>
              <TableCell>{unit.capacity}</TableCell>
              <TableCell>{unit.energyRating}</TableCell>
              <TableCell>{unit.dailyRate}</TableCell>
              <TableCell>{unit.available ? "Available" : "Rented"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditUnit(unit)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteUnit(unit.id)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
