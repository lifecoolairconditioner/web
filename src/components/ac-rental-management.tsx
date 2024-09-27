"use client";

import React, { useState, useEffect, useMemo } from "react";
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

type SortConfig = {
  key: keyof ACUnit;
  direction: "ascending" | "descending";
};

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

  const isSortConfigDefined = (config: unknown): config is SortConfig => {
    if (typeof config !== "object" || config === null) {
      return false;
    }
    const { key, direction } = config as SortConfig;
    return (
      typeof key === "string" && ["ascending", "descending"].includes(direction)
    );
  };

  const sortedACUnits = useMemo(() => {
    const sortableUnits = [...acUnits];
    if (isSortConfigDefined(sortConfig)) {
      sortableUnits.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined)
          return sortConfig.direction === "ascending" ? 1 : -1;
        if (bValue === undefined)
          return sortConfig.direction === "ascending" ? -1 : 1;

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
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
        },
        availability: newUnit.available,
        type: newUnit.type,
      });

      setACUnits((prevUnits) => [
        ...prevUnits,
        {
          id: newACUnit.data._id,
          ...newUnit,
        },
      ]);
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
          unit.id === selectedUnit.id ? { ...unit, ...updatedACUnit } : unit
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
            <Button variant="default">
              <Plus className="mr-2" />
              Add AC Unit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New AC Unit</DialogTitle>
              <DialogDescription>
                Fill in the details for the new AC unit.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUnit();
              }}
            >
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={newUnit.model}
                    onChange={(e) =>
                      setNewUnit({ ...newUnit, model: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    value={newUnit.capacity}
                    onChange={(e) =>
                      setNewUnit({ ...newUnit, capacity: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="energyRating">Energy Rating (kWh)</Label>
                  <Input
                    id="energyRating"
                    type="number"
                    value={newUnit.energyRating}
                    onChange={(e) =>
                      setNewUnit({ ...newUnit, energyRating: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dailyRate">Daily Rate</Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    value={newUnit.dailyRate}
                    onChange={(e) =>
                      setNewUnit({
                        ...newUnit,
                        dailyRate: parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div className="flex items-center">
                  <Label htmlFor="available">Available</Label>
                  <Switch
                    id="available"
                    checked={newUnit.available}
                    onCheckedChange={(checked) =>
                      setNewUnit({ ...newUnit, available: checked })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newUnit.type}
                    onValueChange={(value) =>
                      setNewUnit({ ...newUnit, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Window AC">Window AC</SelectItem>
                      <SelectItem value="Split AC">Split AC</SelectItem>
                      <SelectItem value="Central AC">Central AC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add AC Unit</Button>
                <Button type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("model")}>
              Model <ArrowUpDown className="inline" />
            </TableHead>
            <TableHead onClick={() => handleSort("capacity")}>
              Capacity <ArrowUpDown className="inline" />
            </TableHead>
            <TableHead onClick={() => handleSort("dailyRate")}>
              Daily Rate <ArrowUpDown className="inline" />
            </TableHead>
            <TableHead onClick={() => handleSort("available")}>
              Available <ArrowUpDown className="inline" />
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredACUnits.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell>{unit.model}</TableCell>
              <TableCell>{unit.capacity}</TableCell>
              <TableCell>${unit.dailyRate.toFixed(2)}</TableCell>
              <TableCell>{unit.available ? "Yes" : "No"}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  onClick={() => {
                    setSelectedUnit(unit);
                    setIsEditModalOpen(true);
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  onClick={() => handleDeleteUnit(unit.id)}
                  variant="destructive"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit AC Unit</DialogTitle>
          </DialogHeader>
          {selectedUnit && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateUnit();
              }}
            >
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={selectedUnit.model}
                    onChange={(e) =>
                      setSelectedUnit({
                        ...selectedUnit,
                        model: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    value={selectedUnit.capacity}
                    onChange={(e) =>
                      setSelectedUnit({
                        ...selectedUnit,
                        capacity: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="energyRating">Energy Rating (kWh)</Label>
                  <Input
                    id="energyRating"
                    type="number"
                    value={selectedUnit.energyRating}
                    onChange={(e) =>
                      setSelectedUnit({
                        ...selectedUnit,
                        energyRating: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dailyRate">Daily Rate</Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    value={selectedUnit.dailyRate}
                    onChange={(e) =>
                      setSelectedUnit({
                        ...selectedUnit,
                        dailyRate: parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div className="flex items-center">
                  <Label htmlFor="available">Available</Label>
                  <Switch
                    id="available"
                    checked={selectedUnit.available}
                    onCheckedChange={(checked) =>
                      setSelectedUnit({ ...selectedUnit, available: checked })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={selectedUnit.type}
                    onValueChange={(value) =>
                      setSelectedUnit({ ...selectedUnit, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Window AC">Window AC</SelectItem>
                      <SelectItem value="Split AC">Split AC</SelectItem>
                      <SelectItem value="Central AC">Central AC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Update AC Unit</Button>
                <Button type="button" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
