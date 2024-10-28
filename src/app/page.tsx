"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { PinContainer } from "@/components/ui/3d-pin";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
export default function AirConditioningService() {
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
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
  );
  const items = [
    {
      title: "The Dawn of Innovation",
      description: "Explore the birth of groundbreaking ideas and inventions.",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
      imageSrc:
        "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
    },
    {
      title: "The Digital Revolution",
      description: "Dive into the transformative power of technology.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
      imageSrc:
        "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
    },
    {
      title: "The Art of Design",
      description: "Discover the beauty of thoughtful and functional design.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
      imageSrc:
        "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
    },
    {
      title: "The Power of Communication",
      description:
        "Understand the impact of effective communication in our lives.",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
      imageSrc:
        "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
    },
  ];
  const faqItems = [
    {
      question: "How often should I service my AC?",
      answer:
        "Its recommended to service your AC at least once a year, preferably before the start of the summer season. Regular maintenance helps ensure efficient operation and can prevent costly breakdowns.",
    },
    {
      question: "What are signs that my AC needs repair?",
      answer:
        "Common signs include weak airflow, warm air coming from vents, strange noises, frequent cycling, and unexplained increases in energy bills. If you notice any of these, its best to call for professional inspection.",
    },
    {
      question: "How long does an AC installation typically take?",
      answer:
        "A standard AC installation usually takes between 4-8 hours, depending on the complexity of the job and the type of system being installed. However, some installations may take a full day or more.",
    },
    {
      question: "Whats the average lifespan of an AC unit?",
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

  // Updated teamMembers with id property
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      designation: "Senior Technician",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "HVAC Specialist",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Mike Johnson",
      designation: "Installation Expert",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Sarah Brown",
      designation: "Customer Service Manager",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <FloatingNav navItems={menuItems} />;
      <main className="flex-grow">
        <section
          id="home"
          className="relative h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden rounded-lg"
        >
          <h1 className="md:text-7xl text-4xl lg:text-6xl font-bold text-center text-[#BBDEFB] relative z-20">
            Stay Cool with Expert AC Services
          </h1>
          <div className="mt-8 relative z-20">
            <TextGenerateEffect words="Professional repairs, maintenance, and installations for all your cooling needs" />
          </div>
          <div className="mt-8 relative z-20">
            <Link href={"/home"}>
              <Button size="lg" variant="secondary">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </section>

        <section id="we-repair" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              We Repair...
            </h2>
            <BentoGrid className="max-w-4xl mx-auto">
              {[
                {
                  icon: <Snowflake className="w-12 h-12 text-primary" />,
                  title: "Air Conditioners",
                  imageSrc:
                    "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
                },
                {
                  icon: <Wind className="w-12 h-12 text-primary" />,
                  title: "Refrigerators",
                  imageSrc:
                    "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
                },
                {
                  icon: <ThermometerSun className="w-12 h-12 text-primary" />,
                  title: "Freezers",
                  imageSrc:
                    "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
                },
                {
                  icon: <ThermometerSun className="w-12 h-12 text-primary" />,
                  title: "Washing Machines",
                  imageSrc:
                    "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
                },
              ].map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  className="text-2xl"
                  image={item.imageSrc}
                />
              ))}
            </BentoGrid>
          </div>
        </section>

        <section id="services" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "AC Repair",
                  description: "Quick and reliable AC repair services",
                },
                {
                  title: "Maintenance",
                  description:
                    "Regular maintenance to keep your AC running efficiently",
                },
                {
                  title: "Installation",
                  description: "Expert installation of new AC units",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
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
          </div>
        </section>

        <section id="why-us" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Why Choose Us?
            </h2>
            <BentoGrid className="max-w-4xl mx-auto">
              {[
                {
                  title: "Expert Technicians",
                  description: "Highly trained and certified professionals",
                  imageSrc:
                    "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
                },
                {
                  title: "24/7 Service",
                  description: "Round-the-clock emergency repairs",
                  imageSrc:
                    "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
                },
                {
                  title: "Affordable Pricing",
                  description: "Competitive rates without compromising quality",
                  imageSrc:
                    "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
                },
                {
                  title: "Guaranteed Satisfaction",
                  description: "We re not happy until you re happy",
                  imageSrc:
                    "https://res.cloudinary.com/dmaxqrcjm/image/upload/v1727870261/ytntj7fnjelzm1ziroyr.jpg",
                },
              ].map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  className="text-2xl"
                  image={item.imageSrc}
                />
              ))}
            </BentoGrid>
          </div>
        </section>

        <section id="about" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              About Us
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg"
                  alt="About Us"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <TextGenerateEffect words="Life Cool Air Conditioner has been providing top-notch AC repair and maintenance services for over a decade. Our team of expert technicians is dedicated to ensuring your comfort in any weather." />
                <TextGenerateEffect words="We pride ourselves on our quick response times, quality workmanship, and customer satisfaction. Whether its a simple repair or a complex installation, we have the skills and experience to get the job done right." />
                <div className="mt-4">
                  <Button>Learn More About Us</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
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

        <section id="testimonials" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "John Doe",
                  comment: "Excellent service! They fixed my AC in no time.",
                },
                {
                  name: "Jane Smith",
                  comment:
                    "Very professional and knowledgeable team. Highly recommended!",
                },
                {
                  name: "Mike Johnson",
                  comment:
                    "Fair pricing and great customer service. Will use again!",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-4">
                        {testimonial.comment}
                      </p>
                      <p className="font-semibold">- {testimonial.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
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

        <section id="pricing" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800  mb-12">
              Our Pricing Plans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={cn(plan.isPopular && "border-primary")}
                >
                  <CardContent className="p-6">
                    <h3 className="text-3xl font-bold mb-2">{plan.title}</h3>
                    <p className="text-4xl font-bold mb-4">{plan.price}</p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Star className="w-5 h-5 mr-2 text-yellow-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.isPopular ? "default" : "outline"}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="emergency-services" className="py-20">
          <div className="container mx-auto px-4">
            <PinContainer>
              <div className="flex flex-col items-center justify-center h-[30rem] w-full">
                <h3 className="text-4xl font-bold text-center mb-4">
                  24/7 Emergency Services
                </h3>
                <p className="text-center mb-6">
                  Were here for you around the clock. Dont let AC problems
                  disrupt your life.
                </p>
                <Button size="lg" variant="destructive">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  <Link href={"tel: 9975551431"}>+91 9975551431</Link>
                </Button>
              </div>
            </PinContainer>
          </div>
        </section>

        <section id="team" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Meet Our Expert Team
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <AnimatedTooltip items={teamMembers} />
            </div>
          </div>
        </section>

        <section id="awards" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
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
                  description:
                    "Recognized for promoting energy-efficient products",
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

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <PhoneCall className="mr-2 text-primary" />
                    <span>+91-9975551431</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="mr-2 text-primary" />
                    <span>suhailsayyed2408@gmail.com</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="mr-2 text-primary" />
                    <span>Mon - Sun: 07:00 AM - 11:30 PM</span>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="mr-2 text-primary" />
                    <span>Kondhwa, Pune, Maharashtra 411048</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Send Us a Message
                </h3>
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
                  <Button type="submit">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Rest of the code remains the same until the Quick Links section in the footer */}
      <footer className=" text-black py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">
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
                      className="hover:text-primary transition-colors"
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
                  src="/placeholder.svg"
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
    </div>
  );
}
