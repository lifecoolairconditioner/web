"use client";

import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchCarousel2Images,
  uploadCarousel2Image,
  deleteCarousel2Image,
} from "@/apis/carousel2";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface ImageData {
  _id: string;
  imageUrl: string;
  title: string;
}

export default function AdminCarouselManager() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [title, setTitle] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { toast } = useToast();

  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCarousel2Images();
      setImages(data);
    } catch (error) {
      console.error("Error loading images:", error);
      toast({
        title: "Error",
        description: "Failed to load images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!imageFile || !title) {
      toast({
        title: "Incomplete Form",
        description: "Please provide a title and an image.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("imageUrl", imageFile);

    try {
      setLoading(true);
      setUploadProgress(0);
      const uploadProgressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      if (editMode && editId) {
        clearInterval(uploadProgressInterval);
        setUploadProgress(100);
        toast({
          title: "Success",
          description: "Image updated successfully!",
        });
      } else {
        const newImage = await uploadCarousel2Image(formData);
        setImages([...images, newImage]);
        clearInterval(uploadProgressInterval);
        setUploadProgress(100);

        toast({
          title: "Success",
          description: "Image uploaded successfully! +10 points",
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const resetForm = () => {
    setTitle("");
    setImageFile(null);
    setEditMode(false);
    setEditId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteCarousel2Image(id);
      setImages(images.filter((image) => image._id !== id));
      toast({
        title: "Success",
        description: "Image deleted successfully! +5 points",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image: ImageData) => {
    setEditMode(true);
    setEditId(image._id);
    setTitle(image.title);
  };

  return (
    <div className="admin-carousel-manager p-6 bg-[#fafafa] min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-[#010101]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Manage Carousel Images
      </motion.h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editMode ? "Edit Image" : "Upload New Image"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter image title"
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>

            {uploadProgress > 0 && (
              <Progress value={uploadProgress} className="w-full" />
            )}

            <div className="flex justify-end space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                {editMode ? "Update Image" : "Upload Image"}
              </Button>
              {editMode && (
                <Button type="button" onClick={resetForm} variant="outline">
                  <X className="mr-2 h-4 w-4" />
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Images</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading images...</p>}
          {!loading && images.length === 0 && <p>No images uploaded yet.</p>}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <AnimatePresence>
              {images.map((image) => (
                <motion.div
                  key={image._id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <Image
                        src={image.imageUrl}
                        alt={image.title}
                        width={400}
                        height={160}
                        className="w-full h-40 object-cover rounded-md mb-2"
                      />
                      <h4 className="font-semibold text-lg mb-2">
                        {image.title}
                      </h4>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={() => handleEdit(image)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(image._id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
