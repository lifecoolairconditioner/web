"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  icon: string;
  imageSrc: string;
  className: string;
}

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/cms/gallery");
        if (!response.ok) {
          throw new Error("Failed to fetch gallery items");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      }
    };

    fetchGalleryItems();
  }, []);

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Work Gallery
        </motion.h2>
        <BentoGrid className="max-w-6xl mx-auto">
          {items.map((item) => (
            <Dialog key={item._id}>
              <DialogTrigger asChild>
                <div>
                  <BentoGridItem
                    title={item.title}
                    description={item.description}
                    header={
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-48 rounded-t-lg"
                      />
                    }
                    className={`${
                      item.className || "md:col-span-1"
                    } cursor-pointer transition-all duration-300 hover:shadow-xl`}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="rounded-lg"
                  />
                  <p className="mt-4 text-gray-600">{item.description}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
