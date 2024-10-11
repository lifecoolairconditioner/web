"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
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
import Image from "next/image";

interface ACRental {
  _id: string;
  name: string;
  description: string;
  type: string;
  availability: number; // Changed from boolean to number
  imageUrl?: string;
  rentalRates: Array<{ duration: string; price: string }>;
}

interface ACType {
  _id: string;
  name: string;
  description: string;
  features: string[];
}

export default function ACRentalDashboard() {
  const [rentals, setRentals] = useState<ACRental[]>([]);
  const [selectedRental, setSelectedRental] = useState<ACRental | null>(null);
  const [rentalName, setRentalName] = useState("");
  const [rentalDescription, setRentalDescription] = useState("");
  const [rentalType, setRentalType] = useState("");
  const [rentalAvailability, setRentalAvailability] = useState(0); // Changed initial value to 0
  const [rentalImageFile, setRentalImageFile] = useState<File | null>(null);
  const [rentalRates, setRentalRates] = useState<
    Array<{ duration: string; price: string }>
  >([{ duration: "", price: "" }]);

  const [types, setTypes] = useState<ACType[]>([]);
  const [selectedType, setSelectedType] = useState<ACType | null>(null);
  const [typeName, setTypeName] = useState("");
  const [typeDescription, setTypeDescription] = useState("");
  const [typeFeatures, setTypeFeatures] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchRentals();
    fetchTypes();
  }, []);

  const fetchRentals = async () => {
    try {
      const data = await getAllACRentals();
      setRentals(data);
    } catch (err) {
      console.error("Failed to fetch rentals", err);
      setError("Failed to fetch rentals");
    }
  };

  const fetchTypes = async () => {
    try {
      const data = await getAllACTypes();
      setTypes(data);
    } catch (err) {
      console.error("Failed to fetch AC types", err);
      setError("Failed to fetch AC types");
    }
  };

  const handleCreateRental = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", rentalName);
    formData.append("description", rentalDescription);
    formData.append("type", rentalType);
    formData.append("availability", rentalAvailability.toString());
    if (rentalImageFile) {
      formData.append("imageUrl", rentalImageFile);
    }
    rentalRates.forEach((rate, index) => {
      formData.append(`rentalRates[${index}][duration]`, rate.duration);
      formData.append(`rentalRates[${index}][price]`, rate.price);
    });

    try {
      await createACRental(formData);
      setSuccess("AC Rental created successfully!");
      fetchRentals();
      resetRentalForm();
    } catch (err) {
      console.error("Failed to create AC Rental", err);
      setError("Failed to create AC Rental");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRental = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRental) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", rentalName);
    formData.append("description", rentalDescription);
    formData.append("type", rentalType);
    formData.append("availability", rentalAvailability.toString());
    if (rentalImageFile) {
      formData.append("imageUrl", rentalImageFile);
    }
    rentalRates.forEach((rate, index) => {
      formData.append(`rentalRates[${index}][duration]`, rate.duration);
      formData.append(`rentalRates[${index}][price]`, rate.price);
    });

    try {
      await updateACRental(selectedRental._id, formData);
      setSuccess("AC Rental updated successfully!");
      fetchRentals();
      resetRentalForm();
    } catch (err) {
      console.error("Failed to update AC Rental", err);
      setError("Failed to update AC Rental");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRental = async (rentalId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteACRental(rentalId);
      setSuccess("AC Rental deleted successfully!");
      fetchRentals();
    } catch (err) {
      console.error("Failed to delete AC Rental", err);
      setError("Failed to delete AC Rental");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateType = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await createACType({
        name: typeName,
        description: typeDescription,
        features: typeFeatures,
      });
      setSuccess("AC Type created successfully!");
      fetchTypes();
      resetTypeForm();
    } catch (err) {
      console.error("Failed to create AC Type", err);
      setError("Failed to create AC Type");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateACType(selectedType._id, {
        name: typeName,
        description: typeDescription,
        features: typeFeatures,
      });
      setSuccess("AC Type updated successfully!");
      fetchTypes();
      resetTypeForm();
    } catch (err) {
      console.error("Failed to update AC Type", err);
      setError("Failed to update AC Type");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteType = async (typeId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteACType(typeId);
      setSuccess("AC Type deleted successfully!");
      fetchTypes();
    } catch (err) {
      console.error("Failed to delete AC Type", err);
      setError("Failed to delete AC Type");
    } finally {
      setLoading(false);
    }
  };

  const resetRentalForm = () => {
    setSelectedRental(null);
    setRentalName("");
    setRentalDescription("");
    setRentalType("");
    setRentalAvailability(0); // Reset to 0 instead of true
    setRentalImageFile(null);
    setRentalRates([{ duration: "", price: "" }]);
  };

  const resetTypeForm = () => {
    setSelectedType(null);
    setTypeName("");
    setTypeDescription("");
    setTypeFeatures([]);
  };

  const handleRentalSelect = (rentalId: string) => {
    const rental = rentals.find((r) => r._id === rentalId);
    if (rental) {
      setSelectedRental(rental);
      setRentalName(rental.name);
      setRentalDescription(rental.description);
      setRentalType(rental.type);
      setRentalAvailability(rental.availability);
      setRentalRates(rental.rentalRates);
    }
  };

  const handleTypeSelect = (typeId: string) => {
    const type = types.find((t) => t._id === typeId);
    if (type) {
      setSelectedType(type);
      setTypeName(type.name);
      setTypeDescription(type.description);
      setTypeFeatures(type.features);
    }
  };

  const handleRentalRateChange = (
    index: number,
    field: "duration" | "price",
    value: string
  ) => {
    const updatedRates = [...rentalRates];
    updatedRates[index][field] = value;
    setRentalRates(updatedRates);
  };

  const addRentalRate = () => {
    setRentalRates([...rentalRates, { duration: "", price: "" }]);
  };

  const addTypeFeature = () => {
    setTypeFeatures([...typeFeatures, ""]);
  };

  const handleTypeFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...typeFeatures];
    updatedFeatures[index] = value;
    setTypeFeatures(updatedFeatures);
  };

  const removeTypeFeature = (index: number) => {
    const updatedFeatures = typeFeatures.filter((_, i) => i !== index);
    setTypeFeatures(updatedFeatures);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="container mx-auto p-4 bg-[#fafafa] min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-[#010101]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AC Rental Dashboard
      </motion.h1>

      <Tabs defaultValue="rentals" className="space-y-4">
        <TabsList className="bg-[#ffc300] p-1 rounded-full">
          <TabsTrigger
            value="rentals"
            className="rounded-full px-4 py-2 data-[state=active]:bg-[#010101] data-[state=active]:text-[#fafafa]"
          >
            AC Rentals
          </TabsTrigger>
          <TabsTrigger
            value="types"
            className="rounded-full px-4 py-2 data-[state=active]:bg-[#010101] data-[state=active]:text-[#fafafa]"
          >
            AC Types
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rentals">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>All AC Rentals</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Available Units</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rentals.map((rental) => (
                        <TableRow key={rental._id}>
                          <TableCell>{rental.name}</TableCell>
                          <TableCell>{rental.description}</TableCell>
                          <TableCell>{rental.type}</TableCell>
                          <TableCell>{rental.availability}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleRentalSelect(rental._id)}
                              className="mr-2 bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/80"
                            >
                              <Edit className="w-4 h-4 mr-1" /> Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteRental(rental._id)}
                              variant="destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedRental ? "Update" : "Create"} AC Rental
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={
                      selectedRental ? handleUpdateRental : handleCreateRental
                    }
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="rentalName">Name</Label>
                      <Input
                        id="rentalName"
                        value={rentalName}
                        onChange={(e) => setRentalName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="rentalDescription">Description</Label>
                      <Textarea
                        id="rentalDescription"
                        value={rentalDescription}
                        onChange={(e) => setRentalDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="rentalType">Type</Label>
                      <Select value={rentalType} onValueChange={setRentalType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select AC Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {types.map((type) => (
                            <SelectItem key={type._id} value={type._id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rentalImageUrl">Image</Label>
                      <Input
                        id="rentalImageUrl"
                        type="file"
                        onChange={(e) =>
                          setRentalImageFile(e.target.files?.[0] || null)
                        }
                      />
                      {selectedRental?.imageUrl && (
                        <Image
                          src={selectedRental.imageUrl}
                          width={100}
                          height={100}
                          alt="Current AC"
                          className="mt-2 w-32 h-32 object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div>
                      <Label htmlFor="rentalAvailability">
                        Available Units
                      </Label>
                      <Input
                        id="rentalAvailability"
                        type="number"
                        min="0"
                        value={rentalAvailability}
                        onChange={(e) =>
                          setRentalAvailability(parseInt(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label>Rental Rates</Label>
                      {rentalRates.map((rate, index) => (
                        <div key={index} className="flex space-x-2 mt-2">
                          <Input
                            placeholder="Duration"
                            value={rate.duration}
                            onChange={(e) =>
                              handleRentalRateChange(
                                index,
                                "duration",
                                e.target.value
                              )
                            }
                            required
                          />
                          <Input
                            placeholder="Price"
                            value={rate.price}
                            onChange={(e) =>
                              handleRentalRateChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={addRentalRate}
                        className="mt-2 bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/80"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Rate
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-[#010101] text-[#fafafa] hover:bg-[#010101]/80"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : null}
                      {loading
                        ? "Processing..."
                        : (selectedRental ? "Update" : "Create") + " AC Rental"}
                    </Button>
                    {selectedRental && (
                      <Button
                        type="button"
                        onClick={resetRentalForm}
                        variant="outline"
                        className="ml-2"
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="types">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>All AC Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Features</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {types.map((type) => (
                        <TableRow key={type._id}>
                          <TableCell>{type.name}</TableCell>
                          <TableCell>{type.description}</TableCell>
                          <TableCell>{type.features.join(", ")}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleTypeSelect(type._id)}
                              className="mr-2 bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/80"
                            >
                              <Edit className="w-4 h-4 mr-1" /> Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteType(type._id)}
                              variant="destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedType ? "Update" : "Create"} AC Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={
                      selectedType ? handleUpdateType : handleCreateType
                    }
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="typeName">Type Name</Label>
                      <Input
                        id="typeName"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="typeDescription">Description</Label>
                      <Textarea
                        id="typeDescription"
                        value={typeDescription}
                        onChange={(e) => setTypeDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Features</Label>
                      {typeFeatures.map((feature, index) => (
                        <div key={index} className="flex space-x-2 mt-2">
                          <Input
                            value={feature}
                            onChange={(e) =>
                              handleTypeFeatureChange(index, e.target.value)
                            }
                            placeholder="Feature"
                          />
                          <Button
                            type="button"
                            onClick={() => removeTypeFeature(index)}
                            variant="destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={addTypeFeature}
                        className="mt-2 bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/80"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Feature
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-[#010101] text-[#fafafa] hover:bg-[#010101]/80"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : null}
                      {loading
                        ? "Processing..."
                        : (selectedType ? "Update" : "Create") + " AC Type"}
                    </Button>
                    {selectedType && (
                      <Button
                        type="button"
                        onClick={resetTypeForm}
                        variant="outline"
                        className="ml-2"
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-4 p-4 bg-red-100 text-red-700 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            className="mt-4 p-4 bg-green-100 text-green-700 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
