"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Star,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function Component() {
  const heroRef = useRef(null);
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const { top } = stickyRef.current.getBoundingClientRect();
        setIsSticky(top <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-[#ffc300] shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Phone size={20} />
            <span>+91-9975551431/8421122153</span>
            <Mail size={20} />
            <span>suhailsayyed2408@gmail.com</span>
            <MapPin size={20} />
            <span>Kondhwa</span>
          </div>
          <div className="space-x-4">
            <Link href="/login" className="text-black hover:underline">
              Log In
            </Link>
            <Link href="/signup" className="text-black hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <ul className="flex justify-between items-center">
            <li>
              <Link href="/" className="hover:text-[#ffc300] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#we-repair"
                className="hover:text-[#ffc300] transition-colors"
              >
                We Repair...
              </Link>
            </li>
            <li>
              <Link
                href="#services"
                className="hover:text-[#ffc300] transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#why-us"
                className="hover:text-[#ffc300] transition-colors"
              >
                Why Us
              </Link>
            </li>
            <li>
              <Link
                href="#about-us"
                className="hover:text-[#ffc300] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#gallery"
                className="hover:text-[#ffc300] transition-colors"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="#testimonials"
                className="hover:text-[#ffc300] transition-colors"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <button className="flex items-center hover:text-[#ffc300] transition-colors">
                More <ChevronDown size={16} className="ml-1" />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Parallax */}
      <motion.section
        ref={heroRef}
        className="h-screen flex items-center justify-center relative overflow-hidden"
        style={{ y, opacity, scale, rotate }}
      >
        <div className="text-center z-10">
          <h1 className="text-6xl font-bold mb-4">
            One Stop for All Your Reparation Concerns
          </h1>
          <h2 className="text-2xl mb-8">We Repair...</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "AC",
              "Refrigerator & Freezer",
              "Micro Oven",
              "Washing Machine",
            ].map((item) => (
              <motion.div
                key={item}
                className="bg-white p-4 rounded shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={`/placeholder.svg?height=100&width=100`}
                  alt={item}
                  width={100}
                  height={100}
                  className="mx-auto mb-2"
                />
                <p>{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 -z-10">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
      </motion.section>

      {/* Services Section (Bento Grid) */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 skew-y-3">
            {[
              "AC Rent",
              "Washing Machine Sell",
              "Deep Freezer Sell",
              "Deep Freezer Repair & Services",
              "Fridge Sell",
              "Microwave Oven Repair & Services",
              "Micro Oven Sell",
              "Portable AC On Hire",
              "Portable AC On Sell",
            ].map((service) => (
              <Card
                key={service}
                className="overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <CardHeader className="bg-[#ffc300] text-black p-4">
                  <CardTitle>{service}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p>
                    We provide best and prompt {service.toLowerCase()} to our
                    valuable customers at nominal charges.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="hover:bg-[#ffc300] hover:text-black transition-colors"
            >
              View More
            </Button>
          </div>
        </div>
      </section>

      {/* Why Us Section (Sticky Scroll Reveal) */}
      <section
        ref={stickyRef}
        id="why-us"
        className="min-h-screen flex items-center relative bg-black text-white"
      >
        <div
          className={`sticky top-0 w-full h-screen flex items-center transition-opacity duration-500 ${
            isSticky ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                "Highly Effective Services",
                "Expert Team of Professionals",
                "Customized Resolution",
                "Nominal Prices",
              ].map((reason, index) => (
                <motion.div
                  key={reason}
                  className="bg-[#ffc300] p-6 rounded shadow text-black text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Image
                    src={`/placeholder.svg?height=80&width=80`}
                    alt={reason}
                    width={80}
                    height={80}
                    className="mx-auto mb-4"
                  />
                  <p className="font-semibold">{reason}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">About Us</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            We Life Cool Air Conditioner located at Kondhwa in Pune,
            Maharashtra, have emerged as a renowned service provider for air
            conditioner, TV, refrigerator, freezer and washing machine repair
            and service. We are engaged in providing reliable and prompt
            services to our esteemed clients at market leading prices. We strive
            to pursue the alleyway of continuous improvements and innovations in
            our services and operating structure. We also tend to provide
            maximum cooperation and practice fair business dealings with the
            clients to maintain long term relationships. We have come a long way
            and received commendable appreciation from the clients in various
            aspects of our business.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={`/placeholder.svg?height=200&width=200`}
                  alt={`Gallery image ${item}`}
                  width={200}
                  height={200}
                  className="w-full h-auto rounded"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={`/placeholder.svg?height=50&width=50`}
                      alt={`Testimonial ${item}`}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">Customer Name</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className="text-[#ffc300]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Office Address</h3>
              <p className="mb-4">
                Mauli Niwas App Near Bio Lab Bhagyodar Nagar Lane No 6 kondhwa
                khurd pune 411048, Kondhwa, Pune, Maharashtra 411048
              </p>
              <h3 className="text-xl font-semibold mb-4">General Enquiries</h3>
              <p className="mb-4">suhailsayyed2408@gmail.com</p>
              <h3 className="text-xl font-semibold mb-4">Call Us</h3>
              <p className="mb-4">
                +91-9975551431
                <br />
                +91-9049353979 | +91-8421122153
              </p>
              <h3 className="text-xl font-semibold mb-4">Our Timing</h3>
              <p>Mon - Sun : 07:00 AM - 11:30 PM / 12:00 AM - 12:00 AM</p>
            </div>
            <form className="grid gap-4">
              <Input type="text" placeholder="YOUR NAME" />
              <Input type="email" placeholder="YOUR EMAIL" />
              <Input type="tel" placeholder="YOUR CONTACT NO." />
              <Textarea placeholder="YOUR MESSAGE" rows={4} />
              <Button
                type="submit"
                className="bg-[#ffc300] text-black hover:bg-[#e6b000]"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p>
                +91-9975551431
                <br />
                +91-9049353979 | +91-8421122153
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Mail Us</h3>
              <p>suhailsayyed2408@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-white hover:text-[#ffc300] transition-colors"
                >
                  <Facebook />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-[#ffc300] transition-colors"
                >
                  <Twitter />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-[#ffc300] transition-colors"
                >
                  <Instagram />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>
              © Copyrights 2024 - 2025. Life Cool Air Conditioner. All Rights
              Reserved.
            </p>
            <p>Powered By [Your Company Name]</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
