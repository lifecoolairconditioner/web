import { useState } from "react";
import axios from "axios"; // Import Axios
import { FAQ } from "@/components/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  data: FAQ[];
}

export default function FAQSection({ data }: FAQSectionProps) {
  const [faqs, setFAQs] = useState<FAQ[]>(data);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      question: formData.get("question"),
      answer: formData.get("answer"),
    };

    // Debugging: Log payload
    console.log("Payload:", payload);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cms/faq`,
        payload, // Send as JSON
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );

      if (response.status === 201) {
        const newFAQ = response.data;
        setFAQs([...faqs, newFAQ]); // Add the new FAQ to the list
        e.currentTarget.reset(); // Clear form fields
      } else {
        console.error("Error submitting FAQ");
      }
    } catch (error) {
      console.error("Error submitting FAQ:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form for adding FAQ */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700"
          >
            Question
          </label>
          <Textarea
            id="question"
            name="question" // This should match the backend key
            required
            className="mt-1 block w-full"
            rows={2}
          />
        </div>
        <div>
          <label
            htmlFor="answer"
            className="block text-sm font-medium text-gray-700"
          >
            Answer
          </label>
          <Textarea
            id="answer"
            name="answer" // This should match the backend key
            required
            className="mt-1 block w-full"
            rows={3}
          />
        </div>
        <Button type="submit">Add FAQ</Button>
      </form>

      {/* Accordion to display FAQs */}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={faq._id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
