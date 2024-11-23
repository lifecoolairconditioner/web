"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
}

export function FAQ() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFAQItems = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/cms/faq");
        if (!response.ok) {
          throw new Error("Failed to fetch FAQ items");
        }
        const data = await response.json();
        setFaqItems(data);
      } catch (error) {
        console.error("Error fetching FAQ items:", error);
      }
    };

    fetchFAQItems();
  }, []);

  const filteredFaqItems = faqItems.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      id="faq"
      className="py-20 bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-2xl mx-auto text-black"
        >
          {filteredFaqItems.map((item) => (
            <AccordionItem value={item._id} key={item._id}>
              <AccordionTrigger className="text-left text-black">
                <TextGenerateEffect words={item.question} />
              </AccordionTrigger>
              <AccordionContent className="text-black">
                <TextGenerateEffect
                  className="text-black"
                  words={item.answer}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {filteredFaqItems.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No matching questions found. Please try a different search term.
          </p>
        )}
      </div>
    </section>
  );
}
