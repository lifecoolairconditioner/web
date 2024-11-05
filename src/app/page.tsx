"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { FixedNav } from "@/components/ui/floating-navbar";
import {
  PhoneCall,
  Mail,
  Clock,
  MapPin,
  Snowflake,
  Wind,
  ThermometerSun,
  Search,
} from "lucide-react";
import { SnowfallBackground } from "@/components/ui/sparkles";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import {
  IconBolt,
  IconBuildingStore,
  IconThumbUp,
  IconTool,
  IconClock,
  IconTools,
  IconUsers,
  IconAirConditioning,
  IconToolsKitchen2,
  IconThermometer,
} from "@tabler/icons-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Input } from "@/components/ui/input";

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

export default function AirConditioningService() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <FixedNav navItems={menuItems} />
      <div className="flex-grow">
        <Hero />
        <WeRepair />
        <Services />
        <WhyChooseUs />
        <About />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Awards />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 w-full h-full">
        <SnowfallBackground
          background="#87CEEB"
          particleColor="#e0f7ff"
          minSize={2}
          maxSize={6}
          speed={0.5}
          particleDensity={150}
        />
      </div>

      <div className="relative z-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          Stay Cool with Expert AC Services
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <TextGenerateEffect
            words="Professional repairs, maintenance, and installations for all your cooling needs"
            className="text-xl md:text-2xl text-white"
          />
        </motion.div>
      </div>
    </section>
  );
}

function WeRepair() {
  const repairItems = [
    {
      icon: Snowflake,
      title: "Air Conditioners",
      imageSrc: "/ac-repair.jpg",
      description: "",
    },
    {
      icon: Wind,
      title: "Refrigerators",
      imageSrc: "/fridge-repair.jpg",
      description: "",
    },
    {
      icon: ThermometerSun,
      title: "Freezers",
      imageSrc: "/freezer-repair.jpg",
      description: "",
    },
    {
      icon: ThermometerSun,
      title: "Washing Machines",
      imageSrc: "/washing-machine-repair.jpg",
      description: "",
    },
  ];

  return (
    <section
      id="we-repair"
      className="relative min-h-screen overflow-hidden text-white"
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          We Repair...
        </h2>

        <ContainerScroll
          titleComponent={
            <div className="text-2xl md:text-4xl text-black font-bold text-center mb-10">
              Comprehensive Repair Services
            </div>
          }
        >
          {repairItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <item.icon className="w-16 h-16 mb-4 text-blue-400" />
              <h3 className="font-semibold text-3xl text-black mb-2">
                {item.title}
              </h3>
              <p className="text-center text-3xl text-black">
                {item.description}
              </p>
            </div>
          ))}
        </ContainerScroll>

        <div className="mt-12 text-center">
          <Link href="/services">
            <Button
              size="lg"
              className="bg-blue-600 text-3xl m-12 text-white hover:bg-blue-700"
            >
              Book Service
            </Button>
          </Link>
        </div>
      </div>

      {/* Accessibility enhancement for screen readers */}
      <div className="sr-only">
        <h2>Our Repair Services</h2>
        <ul>
          {repairItems.map((item, index) => (
            <li key={index}>
              {item.title}: {item.description}
            </li>
          ))}
        </ul>
        <p>Book our expert repair services now.</p>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      title: "AC Repair",
      description: "Quick and reliable AC repair services",
      link: "/",
    },
    {
      title: "Maintenance",
      description: "Regular maintenance to keep your AC running efficiently",
      link: "/",
    },
    {
      title: "Installation",
      description: "Expert installation of new AC units",
      link: "/",
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12">
          <TypewriterEffect
            words={[
              { text: "Our" },
              { text: "Expert" },
              { text: "AC" },
              { text: "Services" },
            ]}
            className="text-4xl md:text-5xl font-bold text-center"
          />
        </div>
        <HoverEffect items={services} />
        <div className="mt-12 text-center">
          <Link href="/ac-rent">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Book Service
            </Button>
          </Link>
        </div>
      </div>

      {/* Accessibility enhancement for screen readers */}
      <div className="sr-only">
        <h2>Our AC Services</h2>
        <ul>
          {services.map((service, index) => (
            <li key={index}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
        <p>Book our expert AC services now.</p>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    {
      title: "Expert Technicians",
      description: "Highly trained and certified professionals",
      icon: <IconTool className="w-6 h-6 text-yellow-500" />,
      imageSrc: "/amc.jpg",
    },
    {
      title: "24/7 Service",
      description: "Round-the-clock emergency repairs",
      icon: <IconBolt className="w-6 h-6 text-yellow-500" />,
      imageSrc: "/amc.jpg",
    },
    {
      title: "Affordable Pricing",
      description: "Competitive rates without compromising quality",
      icon: <IconBuildingStore className="w-6 h-6 text-yellow-500" />,
      imageSrc: "/amc.jpg",
    },
    {
      title: "Guaranteed Satisfaction",
      description: "Were not happy until youre happy",
      icon: <IconThumbUp className="w-6 h-6 text-yellow-500" />,
      imageSrc: "/amc.jpg",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us?
        </motion.h2>
        <BentoGrid className="max-w-5xl mx-auto">
          {reasons.map((item, i) => (
            <BentoGridItem
              key={i}
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
              className="border border-gray-200 hover:border-yellow-500 transition-colors duration-300"
              icon={
                <div className="p-4 bg-yellow-100 rounded-full">
                  {item.icon}
                </div>
              }
            />
          ))}
        </BentoGrid>
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/book-service" passHref>
            <Button
              size="lg"
              className="bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl"
            >
              Book Service Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const aboutText = `Life Cool Air Conditioner has been providing top-notch AC repair and maintenance services for over a decade. Our team of expert technicians is dedicated to ensuring your comfort in any weather. We pride ourselves on our quick response times, quality workmanship, and customer satisfaction. Whether its a simple repair or a complex installation, we have the skills and experience to get the job done right.`;

  const stats = [
    {
      icon: <IconClock className="w-6 h-6" />,
      label: "Years of Experience",
      value: "10+",
    },
    {
      icon: <IconUsers className="w-6 h-6" />,
      label: "Satisfied Customers",
      value: "5000+",
    },
    {
      icon: <IconTools className="w-6 h-6" />,
      label: "Completed Projects",
      value: "15000+",
    },
  ];

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-gray-50 to-white py-20"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/logo.png"
              alt="About Life Cool Air Conditioner"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          <div className="lg:w-1/2">
            <TextGenerateEffect
              words={aboutText}
              className="text-lg text-gray-600 mb-6"
            />
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger>
                    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                      {stat.icon}
                      <span className="text-2xl font-bold text-yellow-500 mt-2">
                        {stat.value}
                      </span>
                      <span className="text-sm text-gray-500">
                        {stat.label}
                      </span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm text-gray-600">
                      Our {stat.label.toLowerCase()} showcase our commitment to
                      excellence and customer satisfaction in the HVAC industry.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button className="bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300 text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl">
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    {
      title: "AC Installation",
      description: "Professional installation of a new air conditioning system",
      icon: <IconAirConditioning className="h-6 w-6 text-blue-500" />,
      imageSrc: "/ac-install.jpg",
      className: "md:col-span-2",
    },
    {
      title: "Ductwork Repair",
      description:
        "Fixing and optimizing air duct systems for improved efficiency",
      icon: <IconToolsKitchen2 className="h-6 w-6 text-green-500" />,
      imageSrc: "/duct.jpg",
      className: "md:col-span-1",
    },
    {
      title: "AMC",
      description: "Installing Anual maintainance contract",
      icon: <IconThermometer className="h-6 w-6 text-red-500" />,
      imageSrc: "/amc.jpg",
      className: "md:col-span-1",
    },
    {
      title: "AC rent",
      description: "Large-scale air conditioning solutions for businesses",
      icon: <IconAirConditioning className="h-6 w-6 text-purple-500" />,
      imageSrc: "/ac-rent.jpg",
      className: "md:col-span-2",
    },
  ];

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
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
          {items.map((item, i) => (
            <Dialog key={i}>
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
                    className={`${item.className} cursor-pointer transition-all duration-300 hover:shadow-xl`}
                    icon={item.icon}
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

function Testimonials() {
  const testimonials = [
    {
      quote: "Excellent service! They fixed my AC in no time.",
      name: "",
      title: "John Doe",
    },
    {
      title: "Jane Smith",
      name: "",
      quote: "Very professional and knowledgeable team. Highly recommended!",
    },
    {
      title: "Mike Johnson",
      name: "",
      quote: "Fair pricing and great customer service. Will use again!",
    },
    {
      title: "Emily Brown",
      name: "",
      quote:
        "They went above and beyond to ensure our AC was working perfectly.",
    },
    {
      title: "David Wilson",
      name: "",
      quote: "Prompt, efficient, and friendly. Couldnt ask for better service.",
    },
    {
      title: "David Wilson",
      name: "",
      quote: "Prompt, efficient, and friendly. Couldnt ask for better service.",
    },
    {
      title: "David Wilson",
      name: "",
      quote: "Prompt, efficient, and friendly. Couldnt ask for better service.",
    },
    {
      title: "David Wilson",
      name: "",
      quote: "Prompt, efficient, and friendly. Couldnt ask for better service.",
    },
  ];

  return (
    <section id="testimonials" className="">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Customers Say
        </motion.h2>
        <div className="h-[40rem] rounded-md text-black flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqItems = [
    {
      question: "How often should I service my AC?",
      answer:
        "Its recommended to service your AC at least once a year, preferably before the start of the summer season. Regular maintenance helps ensure optimal performance and can prevent costly breakdowns.",
    },
    {
      question: "What are signs that my AC needs repair?",
      answer:
        "Some common signs include weak airflow, warm air coming from vents, strange noises, frequent cycling, and unexplained increases in energy bills. If you notice any of these, its best to call a professional.",
    },
    {
      question: "How long does an AC installation typically take?",
      answer:
        "The duration of an AC installation can vary depending on the type of system and the complexity of the installation. On average, a residential installation can take anywhere from 4 to 8 hours.",
    },
    {
      question: "Do you offer emergency AC repair services?",
      answer:
        "Yes, we offer 24/7 emergency AC repair services. We understand that AC issues can occur at any time, and were always ready to help restore your comfort as quickly as possible.",
    },
    {
      question: "What types of AC systems do you work with?",
      answer:
        "We work with all major types of AC systems including central air conditioners, ductless mini-splits, window units, and portable air conditioners. Our technicians are trained to handle a wide range of brands and models.",
    },
  ];

  const filteredFaqItems = faqItems.filter((item) => item.question);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-gray-50">
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
          {filteredFaqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
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

function Awards() {
  return (
    <section id="awards" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          Our Awards & Certifications
        </h2>
        <HoverEffect
          items={[
            {
              title: "Best HVAC Service 2023",
              description: "Awarded by the National HVAC Association",
              link: "/",
            },
            {
              title: "Energy Star Partner",
              description: "Recognized for promoting energy-efficient products",
              link: "/",
            },
            {
              title: "Customer Satisfaction Award",
              description: "5-star rating on major review platforms",
              link: "/",
            },
          ]}
        />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20">
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
                <span>+91-9975551431</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-[#ffc300]" />
                <span>suhailsayyed2408@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 text-[#ffc300]" />
                <span>Mon - Sun: 07:00 AM - 11:30 PM</span>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 text-[#ffc300]" />
                <span>Kondhwa, Pune, Maharashtra 411048</span>
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
                className="bg-[#ffc300] text-black hover:bg-[#ffc300]/90"
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
function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Life Cool Air Conditioner
            </h2>
            <p>Your trusted partner for all air conditioning needs.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="hover:text-[#ffc300] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <div className="relative w-full h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.463725560107!2d73.87673507519024!3d18.46264258261976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eaf2cd486d8b%3A0xb2ae810e77ee6756!2sLife%20Cool%20Air%20Conditioner!5e0!3m2!1sen!2sin!4v1730839448929!5m2!1sen!2sin"
                width="600"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Life Cool Air Conditioner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
