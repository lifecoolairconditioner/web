import { useState } from "react";
import axios from "axios";
import { GalleryItem } from "@/components/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GallerySectionProps {
  data: GalleryItem[];
}

export default function GallerySection({ data }: GallerySectionProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(data);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cms/gallery`;
    const method = "post";

    try {
      const response = await axios({
        method,
        url,
        data: formData,
      });

      if (response.status === 200 || response.status === 201) {
        const newItem = response.data;

        setGalleryItems([...galleryItems, newItem]);
      } else {
        console.error("Error saving gallery item");
      }
    } catch (error) {
      console.error("Error submitting gallery item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cms/gallery/${id}`
      );

      if (response.status === 200) {
        setGalleryItems(galleryItems.filter((item) => item._id !== id));
      } else {
        console.error("Error deleting gallery item");
      }
    } catch (error) {
      console.error("Error deleting gallery item:", error);
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
            Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
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
            className="mt-1 block w-full"
          />
        </div>
        <Button type="submit">Add Gallery Item</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {galleryItems.map((item) => (
          <Card key={item._id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
              <div className="mt-4 space-x-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
