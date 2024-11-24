"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconTool, IconBuildingStore, IconThumbUp } from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Reason {
  _id: string;
  title: string;
  description: string;
  icon: string;
  imageSrc: string;
}

export function WhyChooseUs() {
  const [reasons, setReasons] = useState<Reason[]>([]);

  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/cms/reasons");
        if (!response.ok) {
          throw new Error("Failed to fetch reasons");
        }
        const data = await response.json();
        setReasons(data);
      } catch (error) {
        console.error("Error fetching reasons:", error);
      }
    };

    fetchReasons();
  }, []);

  const getIcon = (iconPath: string) => {
    switch (iconPath) {
      case "/icons/technician.png":
        return <IconTool className="w-6 h-6 text-yellow-500" />;
      case "/icons/price.png":
        return <IconBuildingStore className="w-6 h-6 text-yellow-500" />;
      case "/icons/satisfaction.png":
        return <IconThumbUp className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="why-us"
      className="py-10 bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us?
        </motion.h2>
        <BentoGrid className="max-w-5xl mx-auto">
          {reasons.map((item) => (
            <BentoGridItem
              key={item._id}
              title={item.title}
              description={item.description}
              header={
                <div className="p-3">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-52 rounded-t-lg"
                  />
                </div>
              }
              className="border h-full border-gray-200 hover:border-yellow-500 transition-colors duration-300"
            />
          ))}
        </BentoGrid>
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/home" passHref>
            <Button
              size="lg"
              className="bg-blue-900 text-white hover:bg-blue-500 transition-colors duration-300 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl p-8"
            >
              Book Services Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
