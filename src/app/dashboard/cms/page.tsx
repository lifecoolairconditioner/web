"use client";

import { useState } from "react";
import { Edit, Plus, Eye, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Sample AC catalog data
const acCatalog = [
  {
    id: "AC001",
    model: "Deluxe Window AC",
    capacity: "1.5 Ton",
    energyRating: "5 Star",
    price: 30000,
  },
  {
    id: "AC002",
    model: "Split AC",
    capacity: "2 Ton",
    energyRating: "3 Star",
    price: 35000,
  },
  {
    id: "AC003",
    model: "Portable AC",
    capacity: "1 Ton",
    energyRating: "4 Star",
    price: 25000,
  },
];

// Sample service data
const services = [
  {
    id: "S001",
    name: "General Servicing",
    description: "Complete AC check-up and cleaning",
    price: 1000,
  },
  {
    id: "S002",
    name: "Repair",
    description: "Diagnose and fix AC issues",
    price: 1500,
  },
  {
    id: "S003",
    name: "Installation",
    description: "Professional AC installation",
    price: 2000,
  },
];

export default function CMSInterface() {
  const [homepageContent, setHomepageContent] = useState("");
  const [selectedAC, setSelectedAC] = useState<(typeof acCatalog)[0] | null>(
    null
  );
  const [isACModalOpen, setIsACModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleSaveHomepage = () => {
    console.log("Saving homepage content:", homepageContent);
    // Here you would typically save the content to your backend
  };

  const handleSaveAC = (ac: (typeof acCatalog)[0]) => {
    console.log("Saving AC:", ac);
    // Here you would typically save the AC details to your backend
    setIsACModalOpen(false);
  };

  const handleSaveService = (service: (typeof services)[0]) => {
    console.log("Saving service:", service);
    // Here you would typically save the service details to your backend
    setIsServiceModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#010101] mb-6">
        Content Management System
      </h1>

      <Tabs defaultValue="homepage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="catalog">AC Catalog</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Content</CardTitle>
              <CardDescription>
                Edit the main content and promotions for the homepage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter homepage content here..."
                value={homepageContent}
                onChange={(e) => setHomepageContent(e.target.value)}
                className="min-h-[200px]"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setIsPreviewModalOpen(true)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                onClick={handleSaveHomepage}
                className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="catalog">
          <Card>
            <CardHeader>
              <CardTitle>AC Catalog</CardTitle>
              <CardDescription>
                Manage AC models, specifications, and pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Energy Rating</TableHead>
                    <TableHead>Price (₹)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {acCatalog.map((ac) => (
                    <TableRow key={ac.id}>
                      <TableCell>{ac.model}</TableCell>
                      <TableCell>{ac.capacity}</TableCell>
                      <TableCell>{ac.energyRating}</TableCell>
                      <TableCell>{ac.price}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAC(ac);
                            setIsACModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setSelectedAC(null);
                  setIsACModalOpen(true);
                }}
                className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New AC
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>
                Update service descriptions and pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price (₹)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedService(service);
                            setIsServiceModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setSelectedService(null);
                  setIsServiceModalOpen(true);
                }}
                className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isACModalOpen} onOpenChange={setIsACModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>{selectedAC ? "Edit AC" : "Add New AC"}</DialogTitle>
            <DialogDescription>
              {selectedAC
                ? "Update the details of the AC model."
                : "Enter the details of the new AC model."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model" className="text-right">
                Model
              </Label>
              <Input
                id="model"
                defaultValue={selectedAC?.model}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                defaultValue={selectedAC?.capacity}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="energyRating" className="text-right">
                Energy Rating
              </Label>
              <Input
                id="energyRating"
                defaultValue={selectedAC?.energyRating}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (₹)
              </Label>
              <Input
                id="price"
                type="number"
                defaultValue={selectedAC?.price}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() =>
                handleSaveAC(selectedAC || ({} as (typeof acCatalog)[0]))
              }
              className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
            <DialogDescription>
              {selectedService
                ? "Update the details of the service."
                : "Enter the details of the new service."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serviceName" className="text-right">
                Name
              </Label>
              <Input
                id="serviceName"
                defaultValue={selectedService?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serviceDescription" className="text-right">
                Description
              </Label>
              <Textarea
                id="serviceDescription"
                defaultValue={selectedService?.description}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="servicePrice" className="text-right">
                Price (₹)
              </Label>
              <Input
                id="servicePrice"
                type="number"
                defaultValue={selectedService?.price}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() =>
                handleSaveService(
                  selectedService || ({} as (typeof services)[0])
                )
              }
              className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="sm:max-w-[800px] bg-white">
          <DialogHeader>
            <DialogTitle>Preview Homepage Content</DialogTitle>
            <DialogDescription>
              This is how your homepage content will look like.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 border rounded-md bg-white">
            <div dangerouslySetInnerHTML={{ __html: homepageContent }} />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsPreviewModalOpen(false)}>
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
