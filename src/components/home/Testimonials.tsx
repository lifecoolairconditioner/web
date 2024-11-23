"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InfiniteMovingCards from "@/components/ui/infinite-moving-cards";

interface Testimonial {
  _id: string;
  text: string; // Renamed for clarity
  rating: number;
  name: string;
  email: string;
  date: string;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-yellow-500 ${
            i < rating ? "fas fa-star" : "far fa-star"
          }`}
        >
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-br from-blue-50 to-blue-100 text-black"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center p-5 text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Customers Say
        </motion.h2>
        <div className="h-[30rem] rounded-md text-black flex flex-col antialiased bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials.map((testimonial) => ({
              quote: (
                <div>
                  <p className="text-lg text-black font-semibold">
                    {testimonial.text}
                  </p>
                  <div className="mt-2 text-black">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="mt-1 text-sm text-black">
                    — {testimonial.name}
                  </p>
                </div>
              ),
              name: testimonial.name,
            }))}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
