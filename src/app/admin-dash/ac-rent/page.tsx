"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash } from "lucide-react";
import {
  getAllACRentals,
  getAllACTypes,
  createACRental,
  updateACRental,
  deleteACRental,
  createACType,
  updateACType,
  deleteACType,
} from "@/apis/acrent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RentalRate {
  duration: number;
  price: number;
}

interface ACRental {
  _id: string;
  name: string;
  description: string;
  availability: boolean;
  rentalRates: RentalRate[];
  type: string;
  imageUrl?: string | null;
}

interface ACType {
  _id: string;
  name: string;
  description: string;
}

export default function ACManagement() {
  const [acRentals, setACRentals] = useState<ACRental[]>([]);
  const [acTypes, setACTypes] = useState<ACType[]>([]);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<ACRental | null>(null);
  const [selectedType, setSelectedType] = useState<ACType | null>(null);
  const [loading, setLoading] = useState(false);
  const [rentalRates, setRentalRates] = useState<RentalRate[]>([
    { duration: 1, price: 0 },
  ]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchACRentals();
    fetchACTypes();
  }, []);

  const fetchACRentals = async () => {
    try {
      const rentals = await getAllACRentals();
      setACRentals(rentals);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to fetch AC rentals",
        variant: "destructive",
      });
    }
  };

  const fetchACTypes = async () => {
    try {
      const types = await getAllACTypes();
      setACTypes(types);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to fetch AC types",
        variant: "destructive",
      });
    }
  };

  const handleRentalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (imageFile) {
      formData.append("imageUrl", imageFile);
    }

    const rentalData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      availability: formData.get("availability") === "on",
      rentalRates: rentalRates.filter(
        (rate) => rate.duration > 0 && rate.price >= 0
      ),
      type: formData.get("type") as string,
    };

    if (rentalData.rentalRates.length === 0) {
      toast({
        title: "Error",
        description: "At least one valid rental rate is required.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      if (selectedRental) {
        await updateACRental(selectedRental._id, rentalData);
        toast({
          title: "Success",
          description: "AC rental updated successfully",
        });
      } else {
        await createACRental(rentalData);
        toast({
          title: "Success",
          description: "AC rental created successfully",
        });
      }
      fetchACRentals();
      resetRentalModal();
    } catch (error) {
      let errorMessage = "Failed to save AC rental";
      if (error instanceof Error && error.message) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const typeData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    };

    try {
      if (selectedType) {
        await updateACType(selectedType._id, typeData);
        toast({
          title: "Success",
          description: "AC type updated successfully",
        });
      } else {
        await createACType(typeData);
        toast({
          title: "Success",
          description: "AC type created successfully",
        });
      }
      fetchACTypes();
      resetTypeModal();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to save AC type",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetRentalModal = () => {
    setIsRentalModalOpen(false);
    setSelectedRental(null);
    setRentalRates([{ duration: 1, price: 0 }]);
    setImageFile(null);
  };

  const resetTypeModal = () => {
    setIsTypeModalOpen(false);
    setSelectedType(null);
  };

  const handleRateChange = (index: number, field: string, value: string) => {
    const updatedRates = [...rentalRates];
    updatedRates[index] = {
      ...updatedRates[index],
      [field]: parseFloat(value) || 0,
    };
    setRentalRates(updatedRates);
  };

  const handleAddRate = () => {
    setRentalRates([...rentalRates, { duration: 1, price: 0 }]);
  };

  const handleRemoveRate = (index: number) => {
    setRentalRates(rentalRates.filter((_, i) => i !== index));
  };

  const handleDeleteRental = async (id: string) => {
    try {
      await deleteACRental(id);
      toast({
        title: "Success",
        description: "AC rental deleted successfully",
      });
      fetchACRentals();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to delete AC rental",
        variant: "destructive",
      });
    }
  };

  const handleDeleteType = async (id: string) => {
    try {
      await deleteACType(id);
      toast({ title: "Success", description: "AC type deleted successfully" });
      fetchACTypes();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to delete AC type",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-[#010101] mb-6">
        AC Management ❄️
      </h1>

      <div className="space-y-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#010101]">
              AC Rentals
            </h2>
            <Button
              onClick={() => setIsRentalModalOpen(true)}
              className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Rental
            </Button>
          </div>
          <div className="bg-white shadow rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Rental Rates</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {acRentals.map((rental) => (
                    <motion.tr
                      key={rental._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TableCell>{rental.name}</TableCell>
                      <TableCell>{rental.description}</TableCell>
                      <TableCell>
                        <Switch
                          id="availability"
                          name="availability"
                          defaultChecked={selectedRental?.availability}
                        />
                      </TableCell>
                      <TableCell>
                        {rental.rentalRates.map((rate) => (
                          <div key={rate.duration}>
                            {rate.duration} hours - ${rate.price}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>{rental.type}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setSelectedRental(rental);
                            setIsRentalModalOpen(true);
                          }}
                          variant="outline"
                          className="mr-2"
                        >
                          <Edit className="mr-1 h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteRental(rental._id)}
                          variant="destructive"
                        >
                          <Trash className="mr-1 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#010101]">AC Types</h2>
            <Button
              onClick={() => setIsTypeModalOpen(true)}
              className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Type
            </Button>
          </div>
          <div className="bg-white shadow rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {acTypes.map((type) => (
                    <motion.tr
                      key={type._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TableCell>{type.name}</TableCell>
                      <TableCell>{type.description}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setSelectedType(type);
                            setIsTypeModalOpen(true);
                          }}
                          variant="outline"
                          className="mr-2"
                        >
                          <Edit className="mr-1 h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteType(type._id)}
                          variant="destructive"
                        >
                          <Trash className="mr-1 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </section>
      </div>

      {/* Rental Modal */}
      <Dialog open={isRentalModalOpen} onOpenChange={resetRentalModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedRental ? "Edit AC Rental" : "Add New AC Rental"}
            </DialogTitle>
            <DialogDescription>
              Fill out the details for the AC rental.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRentalSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                defaultValue={selectedRental?.name || ""}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                defaultValue={selectedRental?.description || ""}
              />
            </div>
            <div>
              <Label htmlFor="availability">Available</Label>
              <Switch
                id="availability"
                name="availability"
                defaultChecked={selectedRental?.availability}
              />
            </div>
            <div>
              <Label>Rental Rates</Label>
              {rentalRates.map((rate, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    type="number"
                    placeholder="Duration (hrs)"
                    value={rate.duration}
                    onChange={(e) =>
                      handleRateChange(index, "duration", e.target.value)
                    }
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Price ($)"
                    value={rate.price}
                    onChange={(e) =>
                      handleRateChange(index, "price", e.target.value)
                    }
                    required
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemoveRate(index)}
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddRate}>
                Add Rental Rate
              </Button>
            </div>
            <div>
              <Label htmlFor="imageUrl">Upload Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file);
                }}
              />
            </div>
            <DialogFooter>
              <Button type="button" onClick={resetRentalModal}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Type Modal */}
      <Dialog open={isTypeModalOpen} onOpenChange={resetTypeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedType ? "Edit AC Type" : "Add New AC Type"}
            </DialogTitle>
            <DialogDescription>
              Fill out the details for the AC type.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTypeSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                defaultValue={selectedType?.name || ""}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                defaultValue={selectedType?.description || ""}
              />
            </div>
            <DialogFooter>
              <Button type="button" onClick={resetTypeModal}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
