"use client";

import React, { useEffect, useState } from "react";

import { FixedNav } from "@/components/ui/floating-navbar";
import Hero from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { About } from "@/components/home/About";
import { Gallery } from "@/components/home/Gallery";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";
import WhatsAppFloat from "@/components/whatsapp";

const menuItems = [
  { name: "Home", link: "#home" },
  { name: "We Repair", link: "#we-repair" },
  { name: "Services", link: "#services" },
  { name: "Why Us", link: "#why-us" },
  { name: "About", link: "#about" },
  { name: "Gallery", link: "#gallery" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "FAQ", link: "#faq" },
  { name: "Contact", link: "#contact" },
];

interface HeroData {
  _id: string;
  companyDescription: string;
  privacyPolicyLink: string;
  termsAndConditionsLink: string;
  location: string;
  __v: number;
}

export default function AirConditioningService() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cms/hero`
        );
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col min-h-screen bg-white w-full text-black">
        <FixedNav navItems={menuItems} />
        {/* Render Hero only when heroData is available */}
        {heroData ? <Hero heroData={heroData} /> : <p>Loading...</p>}
        <Services />
        <WhyChooseUs />
        <About />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>
      <WhatsAppFloat phoneNumber="919975551431" />
    </div>
  );
}
