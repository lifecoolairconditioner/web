"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { PinContainer } from "@/components/ui/3d-pin";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  PhoneCall,
  Mail,
  Clock,
  MapPin,
  Snowflake,
  Wind,
  ThermometerSun,
  Star,
} from "lucide-react";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { WavyBackground } from "@/components/ui/wavy-background";

const menuItems = [
  { name: "Home", link: "#home" },
  { name: "We Repair", link: "#we-repair" },
  { name: "Services", link: "#services" },
  { name: "Why Us", link: "#why-us" },
  { name: "About", link: "#about" },
  { name: "Gallery", link: "#gallery" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "FAQ", link: "#faq" },
  { name: "Pricing", link: "#pricing" },
  { name: "Team", link: "#team" },
  { name: "Contact", link: "#contact" },
];

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent"></div>
);

const items = [
  {
    title: "Expert AC Repair",
    description: "Quick and efficient repair services for all AC brands.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    imageSrc: "/ac-repair.jpg",
  },
  {
    title: "Routine Maintenance",
    description: "Keep your AC running smoothly with our maintenance plans.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    imageSrc: "/ac-maintenance.jpg",
  },
  {
    title: "New Installations",
    description: "Professional installation of energy-efficient AC units.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    imageSrc: "/ac-installation.jpg",
  },
  {
    title: "24/7 Emergency Service",
    description: "Round-the-clock support for urgent AC issues.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    imageSrc: "/emergency-service.jpg",
  },
];

const faqItems = [
  {
    question: "How often should I service my AC?",
    answer:
      "It's recommended to service your AC at least once a year, preferably before the start of the summer season. Regular maintenance helps ensure efficient operation and can prevent costly breakdowns.",
  },
  {
    question: "What are signs that my AC needs repair?",
    answer:
      "Common signs include weak airflow, warm air coming from vents, strange noises, frequent cycling, and unexplained increases in energy bills. If you notice any of these, it's best to call for professional inspection.",
  },
  {
    question: "How long does an AC installation typically take?",
    answer:
      "A standard AC installation usually takes between 4-8 hours, depending on the complexity of the job and the type of system being installed. However, some installations may take a full day or more.",
  },
  {
    question: "What's the average lifespan of an AC unit?",
    answer:
      "With proper maintenance, most AC units last between 15-20 years. However, efficiency may decrease as the unit ages, and you might consider replacement after 10-15 years for better energy savings.",
  },
];

const pricingPlans = [
  {
    title: "Basic Maintenance",
    price: "$99",
    features: ["Annual check-up", "Filter replacement", "Coil cleaning"],
    isPopular: false,
  },
  {
    title: "Comprehensive Care",
    price: "$199",
    features: [
      "Bi-annual check-up",
      "All Basic features",
      "Refrigerant top-up",
      "Thermostat calibration",
    ],
    isPopular: true,
  },
  {
    title: "Premium Protection",
    price: "$299",
    features: [
      "Quarterly check-up",
      "All Comprehensive features",
      "24/7 priority support",
      "Parts discount",
    ],
    isPopular: false,
  },
];

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    designation: "Senior Technician",
    image: "/team-member-1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "HVAC Specialist",
    image: "/team-member-2.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    designation: "Installation Expert",
    image: "/team-member-3.jpg",
  },
  {
    id: 4,
    name: "Sarah Brown",
    designation: "Customer Service Manager",
    image: "/team-member-4.jpg",
  },
];

export default function AirConditioningService() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <FloatingNav navItems={menuItems} />
      <main className="flex-grow">
        <Hero />
        <WeRepair />
        <Services />
        <WhyChooseUs />
        <About />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Pricing />
        <EmergencyServices />
        <Team />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <WavyBackground />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-[#000000] relative z-20"
      >
        Stay Cool with Expert AC Services
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 relative z-20"
      >
        <TextGenerateEffect words="Professional repairs, maintenance, and installations for all your cooling needs" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 relative z-20"
      >
        <Link href="/book-service">
          <Button
            size="lg"
            className="bg-[#ffc300] text-black hover:bg-[#ffc300]/90"
          >
            Book Service
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}

function WeRepair() {
  const repairItems = [
    { icon: Snowflake, title: "Air Conditioners", imageSrc: "/ac-repair.jpg" },
    { icon: Wind, title: "Refrigerators", imageSrc: "/fridge-repair.jpg" },
    {
      icon: ThermometerSun,
      title: "Freezers",
      imageSrc: "/freezer-repair.jpg",
    },
    {
      icon: ThermometerSun,
      title: "Washing Machines",
      imageSrc: "/washing-machine-repair.jpg",
    },
  ];

  return (
    <section id="we-repair" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          We Repair...
        </h2>
        <BentoGrid className="max-w-4xl mx-auto">
          {repairItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              className="text-2xl"
              image={item.imageSrc}
            />
          ))}
        </BentoGrid>
        <div className="mt-12 text-center">
          <Link href="/book-service">
            <Button
              size="lg"
              className="bg-[#ffc300] text-black hover:bg-[#ffc300]/90"
            >
              Book Service
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      title: "AC Repair",
      description: "Quick and reliable AC repair services",
    },
    {
      title: "Maintenance",
      description: "Regular maintenance to keep your AC running efficiently",
    },
    {
      title: "Installation",
      description: "Expert installation of new AC units",
    },
  ];

  return (
    <section id="services" className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/book-service">
            <Button
              size="lg"
              className="bg-[#ffc300] text-black hover:bg-[#ffc300]/90"
            >
              Book Service
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    {
      title: "Expert Technicians",
      description: "Highly trained and certified professionals",
    },
    { title: "24/7 Service", description: "Round-the-clock emergency repairs" },
    {
      title: "Affordable Pricing",
      description: "Competitive rates without compromising quality",
    },
    {
      title: "Guaranteed Satisfaction",
      description: "We're not happy until you're happy",
    },
  ];

  return (
    <section id="why-us" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          Why Choose Us?
        </h2>
        <BentoGrid className="max-w-4xl mx-auto">
          {reasons.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              className="text-2xl"
              image={`/why-choose-us-${i + 1}.jpg`}
            />
          ))}
        </BentoGrid>
        <div className="mt-12 text-center">
          <Link href="/book-service">
            <Button
              size="lg"
              className="bg-[#ffc300] text-black hover:bg-[#ffc300]/90"
            >
              Book Service
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          About Us
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/about-us.jpg"
              alt="About Us"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <TextGenerateEffect words="Life Cool Air Conditioner has been providing top-notch AC repair and maintenance services for over a decade. Our team of expert technicians is dedicated to ensuring your comfort in any weather." />
            <TextGenerateEffect words="We pride ourselves on our quick response times, quality workmanship, and customer satisfaction. Whether it's a simple repair or a complex installation, we have the skills and experience to get the job done right." />
            <div className="mt-4">
              <Button className="bg-[#ffc300] text-black hover:bg-[#ffc300]/90">
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          Our Work Gallery
        </h2>
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
              image={item.imageSrc}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      comment: "Excellent service! They fixed my AC in no time.",
    },
    {
      name: "Jane Smith",
      comment: "Very professional and knowledgeable team. Highly recommended!",
    },
    {
      name: "Mike Johnson",
      comment: "Fair pricing and great customer service. Will use again!",
    },
  ];

  return (
    <section id="testimonials" className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{testimonial.comment}</p>
                  <p className="font-semibold">- {testimonial.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-2xl mx-auto"
        >
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <TextGenerateEffect words={item.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          Our Pricing Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={cn(plan.isPopular && "border-[#ffc300]")}
            >
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Star className="w-5 h-5 mr-2 text-[#ffc300]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[#ffc300] text-black hover:bg-[#ffc300]/90">
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmergencyServices() {
  return (
    <section id="emergency-services" className="py-20">
      <div className="container mx-auto px-4">
        <PinContainer>
          <div className="flex flex-col items-center justify-center h-[30rem] w-full">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
              24/7 Emergency Services
            </h3>
            <p className="text-center mb-6">
              We're here for you around the clock. Don't let AC problems disrupt
              your life.
            </p>
            <Button
              size="lg"
              className="bg-[#ffc300] text-black hover:bg-[#ffc300]/90"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              <Link href="tel:+919975551431">+91 9975551431</Link>
            </Button>
          </div>
        </PinContainer>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#000000] mb-12">
          Meet Our Expert Team
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <AnimatedTooltip items={teamMembers} />
        </div>
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
            <div className="aspect-video relative">
              <Image
                src="/map.jpg"
                alt="Map"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
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
