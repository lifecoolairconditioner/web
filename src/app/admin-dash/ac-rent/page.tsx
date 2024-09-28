"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash, Loader2, Upload } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  getAllACRentals,
  createACRental,
  deleteACRental,
  updateACRental,
} from "@/apis/acrent";

interface ACUnit {
  id: string;
  _id?: string; // Make _id optional
  name: string;
  description: string;
  availability: boolean;
  rentalRates: {
    "3_months": number;
    "6_months": number;
    "1_year": number;
  };
  type: string;
  imageUrl: File | string | null;
}

export default function ACRentalManagement() {
  const [acUnits, setACUnits] = useState<ACUnit[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<ACUnit | null>(null);
  const [newUnit, setNewUnit] = useState<Omit<ACUnit, "id" | "_id">>({
    name: "",
    description: "",
    availability: true,
    rentalRates: {
      "3_months": 0,
      "6_months": 0,
      "1_year": 0,
    },
    type: "Window AC",
    imageUrl: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchACUnits();
  }, []);

  const fetchACUnits = async () => {
    setIsLoading(true);
    try {
      const data = await getAllACRentals();
      setACUnits(data);
    } catch (error) {
      console.error("Failed to fetch AC units", error);
      toast({
        title: "Error",
        description: "Failed to fetch AC units. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUnit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(newUnit).forEach(([key, value]) => {
        if (
          key === "rentalRates" &&
          typeof value === "object" &&
          value !== null
        ) {
          for (const [rateKey, rateValue] of Object.entries(value)) {
            formData.append(`rentalRates[${rateKey}]`, rateValue.toString());
          }
        } else if (key === "imageUrl" && value instanceof File) {
          formData.append("imageUrl", value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      const response = await createACRental(formData);
      setACUnits([...acUnits, response.data]);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUnit = async () => {
    if (!selectedUnit) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(selectedUnit).forEach(([key, value]) => {
        if (
          key === "rentalRates" &&
          typeof value === "object" &&
          value !== null
        ) {
          for (const [rateKey, rateValue] of Object.entries(value)) {
            formData.append(`rentalRates[${rateKey}]`, String(rateValue));
          }
        } else if (key === "imageUrl" && value instanceof File) {
          formData.append("imageUrl", value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });
      const response = await updateACRental(selectedUnit._id, formData);
      setACUnits(
        acUnits.map((unit) =>
          unit._id === selectedUnit._id ? response.data : unit
        )
      );
      setIsUpdateModalOpen(false);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUnit = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteACRental(id);
      setACUnits(acUnits.filter((unit) => unit.id !== id));
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
    } finally {
      setIsLoading(false);
    }
  };

  const resetNewUnit = () => {
    setNewUnit({
      name: "",
      description: "",
      availability: true,
      rentalRates: {
        "3_months": 0,
        "6_months": 0,
        "1_year": 0,
      },
      type: "Window AC",
      imageUrl: null,
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isNewUnit: boolean
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isNewUnit) {
        setNewUnit({ ...newUnit, imageUrl: file }); // Store file
      } else if (selectedUnit) {
        setSelectedUnit({ ...selectedUnit, imageUrl: file }); // Store file for selected unit
      }
    }
  };

  const filteredACUnits = acUnits.filter((unit) =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        AC Rental Management ❄️
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search AC units..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-64"
          />
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/90">
              <Plus className="mr-2 h-4 w-4" /> Add New AC Unit
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New AC Unit</DialogTitle>
              <DialogDescription>
                Enter the details for the new AC unit here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newUnit.name}
                  onChange={(e) =>
                    setNewUnit({ ...newUnit, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newUnit.description}
                  onChange={(e) =>
                    setNewUnit({ ...newUnit, description: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newUnit.type}
                  onValueChange={(value) =>
                    setNewUnit({ ...newUnit, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select AC type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Window AC">Window AC</SelectItem>
                    <SelectItem value="Split AC">Split AC</SelectItem>
                    <SelectItem value="Portable AC">Portable AC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="3_months" className="text-right">
                  3 Months Rate
                </Label>
                <Input
                  id="3_months"
                  type="number"
                  value={newUnit.rentalRates["3_months"]}
                  onChange={(e) =>
                    setNewUnit({
                      ...newUnit,
                      rentalRates: {
                        ...newUnit.rentalRates,
                        "3_months": parseFloat(e.target.value),
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="6_months" className="text-right">
                  6 Months Rate
                </Label>
                <Input
                  id="6_months"
                  type="number"
                  value={newUnit.rentalRates["6_months"]}
                  onChange={(e) =>
                    setNewUnit({
                      ...newUnit,
                      rentalRates: {
                        ...newUnit.rentalRates,
                        "6_months": parseFloat(e.target.value),
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="1_year" className="text-right">
                  1 Year Rate
                </Label>
                <Input
                  id="1_year"
                  type="number"
                  value={newUnit.rentalRates["1_year"]}
                  onChange={(e) =>
                    setNewUnit({
                      ...newUnit,
                      rentalRates: {
                        ...newUnit.rentalRates,
                        "1_year": parseFloat(e.target.value),
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, true)}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/90"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Image
                  </Button>
                  {newUnit.imageUrl && (
                    <p className="mt-2 text-sm text-gray-500">
                      {newUnit.imageUrl instanceof File
                        ? newUnit.imageUrl.name
                        : "Image uploaded"}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="availability"
                  checked={newUnit.availability}
                  onCheckedChange={(checked) =>
                    setNewUnit({ ...newUnit, availability: checked })
                  }
                />
                <Label htmlFor="availability">Available</Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleAddUnit}
                className="bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/90"
              >
                Add AC Unit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <Loader2 className="h-8 w-8 animate-spin" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>3 Months Rate</TableHead>
                  <TableHead>6 Months Rate</TableHead>
                  <TableHead>1 Year Rate</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredACUnits.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.name}</TableCell>
                    <TableCell>{unit.description}</TableCell>
                    <TableCell>{unit.type}</TableCell>
                    <TableCell>${unit.rentalRates["3_months"]}</TableCell>
                    <TableCell>${unit.rentalRates["6_months"]}</TableCell>
                    <TableCell>${unit.rentalRates["1_year"]}</TableCell>
                    <TableCell>
                      {unit.availability ? "Available" : "Not Available"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2"
                        onClick={() => {
                          setSelectedUnit(unit);
                          setIsUpdateModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => unit._id && handleDeleteUnit(unit._id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update AC Unit</DialogTitle>
            <DialogDescription>
              Update the details for the selected AC unit here.
            </DialogDescription>
          </DialogHeader>
          {selectedUnit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="update-name"
                  value={selectedUnit.name}
                  onChange={(e) =>
                    setSelectedUnit({ ...selectedUnit, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="update-description"
                  value={selectedUnit.description}
                  onChange={(e) =>
                    setSelectedUnit({
                      ...selectedUnit,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={selectedUnit.type}
                  onValueChange={(value) =>
                    setSelectedUnit({ ...selectedUnit, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select AC type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Window AC">Window AC</SelectItem>
                    <SelectItem value="Split AC">Split AC</SelectItem>
                    <SelectItem value="Portable AC">Portable AC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-3_months" className="text-right">
                  3 Months Rate
                </Label>
                <Input
                  id="update-3_months"
                  type="number"
                  value={selectedUnit.rentalRates["3_months"]}
                  onChange={(e) =>
                    setSelectedUnit({
                      ...selectedUnit,
                      rentalRates: {
                        ...selectedUnit.rentalRates,
                        "3_months": parseFloat(e.target.value),
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-6_months" className="text-right">
                  6 Months Rate
                </Label>
                <Input
                  id="update-6_months"
                  type="number"
                  value={selectedUnit.rentalRates["6_months"]}
                  onChange={(e) =>
                    setSelectedUnit({
                      ...selectedUnit,
                      rentalRates: {
                        ...selectedUnit.rentalRates,
                        "6_months": parseFloat(e.target.value),
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-1_year" className="text-right">
                  1 Year Rate
                </Label>
                <Input
                  id="update-1_year"
                  type="number"
                  value={selectedUnit.rentalRates["1_year"]}
                  onChange={(e) =>
                    setSelectedUnit({
                      ...selectedUnit,
                      rentalRates: {
                        ...selectedUnit.rentalRates,
                        "1_year": parseFloat(e.target.value),
                      },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3">
                  <Input
                    id="update-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, false)}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/90"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Image
                  </Button>
                  {selectedUnit.imageUrl && (
                    <p className="mt-2 text-sm text-gray-500">
                      {selectedUnit.imageUrl instanceof File
                        ? selectedUnit.imageUrl.name
                        : "Current image"}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="update-availability"
                  checked={selectedUnit.availability}
                  onCheckedChange={(checked) =>
                    setSelectedUnit({ ...selectedUnit, availability: checked })
                  }
                />
                <Label htmlFor="update-availability">Available</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={handleUpdateUnit}
              className="bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/90"
            >
              Update AC Unit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
