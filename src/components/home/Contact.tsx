"use client";

import { useState, useEffect } from "react";
import { PhoneCall, Mail, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBrandWhatsapp } from "@tabler/icons-react";

interface ContactInfo {
  _id: string;
  phone: string;
  email: string;
  whatsapp: string;
  hours: string;
  address: string;
}

export function Contact() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cms/contact`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch contact information");
        }
        const data = await response.json();
        setContactInfo(data);
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <PhoneCall className="mr-2 text-[#ffc300]" />
                <a
                  href={`tel:${contactInfo?.phone}`}
                  className="hover:text-[#ffc300]"
                >
                  {contactInfo?.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-[#ffc300]" />
                <a
                  href={`mailto:${contactInfo?.email}`}
                  className="hover:text-[#ffc300]"
                >
                  {contactInfo?.email}
                </a>
              </li>
              <li className="flex items-center">
                <IconBrandWhatsapp className="mr-2 text-[#ffc300]" />
                <a
                  href={`https://wa.me/${contactInfo?.whatsapp.replace(
                    /[^0-9]/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffc300]"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 text-[#ffc300]" />
                <span>{contactInfo?.hours}</span>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 text-[#ffc300]" />
                <span>{contactInfo?.address}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-2 border rounded"
              ></textarea>
              <Button
                type="submit"
                className="bg-blue-300 text-black hover:bg-blue-300/90"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
