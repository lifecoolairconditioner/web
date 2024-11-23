import { useState } from "react";
import { Reason } from "@/components/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

interface ReasonsProps {
  data: Reason[];
  onSubmit?: (formData: FormData) => void;
}

import axios from "axios";
import Image from "next/image";

export async function uploadReasonData(formData: FormData, id: string) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cms/reasons/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // important for file uploads
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading reason data:", error);
    throw error;
  }
}

export default function ReasonsSection({ data, onSubmit }: ReasonsProps) {
  const [reasons, setReasons] = useState<Reason[]>(data);
  const [editingReason, setEditingReason] = useState<Reason | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const validateForm = (formData: FormData) => {
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const icon = formData.get("icon")?.toString().trim();

    if (!title || !description || !icon) {
      throw new Error("Please fill in all required fields");
    }

    return { title, description, icon };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Error",
          description:
            "Please upload a valid image file (JPEG, PNG, GIF, or WEBP)",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      validateForm(formData);

      if (selectedFile) {
        formData.set("image", selectedFile);
      } else if (editingReason?.imageSrc) {
        formData.append("imageSrc", editingReason.imageSrc);
      }

      const id = editingReason?._id || "new";

      toast({
        title: "Uploading",
        description: "Please wait while we process your request...",
      });

      const result = await uploadReasonData(formData, id);

      if (editingReason) {
        setReasons((prevReasons) =>
          prevReasons.map((reason) =>
            reason._id === editingReason._id ? result : reason
          )
        );
      } else {
        setReasons((prevReasons) => [...prevReasons, result]);
      }

      toast({
        title: "Success",
        description: editingReason
          ? "Reason updated successfully"
          : "New reason added successfully",
      });

      form.reset();
      setSelectedFile(null);
      setEditingReason(null);

      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (reason: Reason) => {
    setEditingReason(reason);
    setSelectedFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this reason?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cms/reasons/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete reason");
      }

      setReasons(reasons.filter((reason) => reason._id !== id));
      toast({
        title: "Success",
        description: "Reason deleted successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to delete reason",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title*
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={editingReason?.title || ""}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description*
          </label>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={editingReason?.description || ""}
            className="mt-1 block w-full"
            rows={3}
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
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
          {editingReason?.imageSrc && !selectedFile && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Current image:</p>
              <Image
                src={editingReason.imageSrc}
                alt="Current"
                height={100}
                width={100}
                className="mt-1 max-w-xs rounded-md"
              />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : editingReason
              ? "Update Reason"
              : "Add Reason"}
          </Button>
          {editingReason && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingReason(null);
                setSelectedFile(null);
              }}
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>

      <Accordion type="single" collapsible className="w-full">
        {reasons.map((reason, index) => (
          <AccordionItem value={`item-${index}`} key={reason._id}>
            <AccordionTrigger>{reason.title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">{reason.description}</p>
                <p className="text-sm text-gray-600">Icon: {reason.icon}</p>
                {reason.imageSrc && (
                  <Image
                    src={reason.imageSrc}
                    alt={reason.title}
                    height={100}
                    width={100}
                    className="mt-2 max-w-xs rounded-md"
                  />
                )}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(reason)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(reason._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
