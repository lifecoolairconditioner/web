"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ReasonsSection from "@/components/reasons-section";
import GallerySection from "@/components/gallery-section";
import FAQSection from "@/components/faq-section";
import TestimonialsSection from "@/components/testimonials-section";
import { CMSData } from "@/components/types";
import axios from "axios";

export default function ConsolidatedCMS() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CMSData>({
    hero: null,
    services: [],
    reasons: [],
    gallery: [],
    testimonials: [],
    faq: [],
    contact: null,
    footer: null,
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const sections: Array<keyof CMSData> = [
          "hero",
          "services",
          "reasons",
          "gallery",
          "testimonials",
          "faq",
          "contact",
          "footer",
        ];

        const responses = await Promise.all(
          sections.map((section) =>
            axios
              .get(`${process.env.NEXT_PUBLIC_API_URL}/api/cms/${section}`)
              .then((res) => res.data)
          )
        );

        const fetchedData = Object.fromEntries(
          sections.map((section, i) => [section, responses[i]])
        ) as CMSData;

        setData(fetchedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message || err.message
            : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (section: string, formData: FormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cms/${section}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const updatedData = await response.json();
      setData((prevData) => ({ ...prevData, [section]: updatedData }));
    } catch (err) {
      console.error(`Error updating ${section}:`, err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Main page - CMS</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <nav>
              <ul className="space-y-2">
                {[
                  "hero",
                  "services",
                  "reasons",
                  "gallery",
                  "testimonials",
                  "faq",
                ].map((section) => (
                  <li key={section}>
                    <Button
                      variant={
                        activeSection === section ? "default" : "outline"
                      }
                      className="w-full justify-start"
                      onClick={() => setActiveSection(section)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}{" "}
              Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeSection === "hero" && (
              <HeroSection
                data={data.hero}
                onSubmit={(formData) => handleSubmit("hero", formData)}
              />
            )}
            {activeSection === "services" && (
              <ServicesSection
                data={data.services}
                onSubmit={(formData) => handleSubmit("services", formData)}
              />
            )}
            {activeSection === "reasons" && (
              <ReasonsSection
                data={data.reasons}
                onSubmit={(formData) => handleSubmit("reasons", formData)}
              />
            )}
            {activeSection === "gallery" && (
              <GallerySection data={data.gallery} />
            )}
            {activeSection === "testimonials" && <TestimonialsSection />}
            {activeSection === "faq" && <FAQSection data={data.faq} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
