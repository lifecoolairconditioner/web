import { useState } from "react";
import { Service } from "@/components/types";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ServicesSectionProps {
  data: Service[];
  onSubmit: (formData: FormData) => void;
}

export default function ServicesSection({
  data,
  onSubmit,
}: ServicesSectionProps) {
  const [services, setServices] = useState<Service[]>(data);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
    setEditingService(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  const handleDelete = async (id: string) => {
    console.log(setServices);
    console.log(id);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Service Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={editingService?.name || ""}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            defaultValue={editingService?.description || ""}
            className="mt-1 block w-full"
            rows={3}
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            defaultValue={editingService?.price || ""}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <Input
            type="text"
            id="category"
            name="category"
            defaultValue={editingService?.category || ""}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <Input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="mt-1 block w-full"
          />
        </div>
        <Button type="submit">
          {editingService ? "Update Service" : "Add Service"}
        </Button>
        {editingService && (
          <Button type="button" onClick={() => setEditingService(null)}>
            Cancel Edit
          </Button>
        )}
      </form>
      <Accordion type="single" collapsible className="w-full">
        {services.map((service, index) => (
          <AccordionItem value={`item-${index}`} key={service._id}>
            <AccordionTrigger>{service.name}</AccordionTrigger>
            <AccordionContent>
              <p>{service.description}</p>
              <p>Price: ${service.price}</p>
              <p>Category: {service.category}</p>
              <Button
                variant="secondary"
                onClick={() => handleEdit(service)}
                className="mt-2 mr-2"
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(service._id)}
                className="mt-2"
              >
                Delete
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
