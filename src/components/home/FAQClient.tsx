"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Search } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQContent {
  title: string;
  items: FAQItem[];
}

interface FAQClientProps {
  initialContent: FAQContent;
}

export default function FAQClient({ initialContent }: FAQClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [content] = useState(initialContent);

  const filteredFaqItems = content.items.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      id="faq"
      className="py-20 bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          {content.title}
        </h2>
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
          className="w-full max-w-2xl mx-auto"
        >
          {filteredFaqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left">
                <TextGenerateEffect words={item.question} />
              </AccordionTrigger>
              <AccordionContent>
                <TextGenerateEffect words={item.answer} />
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
