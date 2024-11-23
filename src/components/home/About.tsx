import { IconClock, IconTools, IconUsers } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
export function About() {
  const aboutText = `Life Cool Air Conditioner has been providing top-notch AC repair and maintenance services for over a decade. Our team of expert technicians is dedicated to ensuring your comfort in any weather. We pride ourselves on our quick response times, quality workmanship, and customer satisfaction. Whether it's a simple repair or a complex installation, we have the skills and experience to get the job done right.`;

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
      className="bg-gradient-to-br from-blue-50 to-blue-100 py-20"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl text-center text-gray-800 mb-12"
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
              src="/logosmall-t.png"
              alt="About Life Cool Air Conditioner"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          <div className="lg:w-1/2">
            <TextGenerateEffect
              words={aboutText}
              className="text-sm text-gray-600 mb-6"
            />
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger>
                    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                      {stat.icon}
                      <span className="text-sm font-bold text-yellow-500 mt-2">
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
          </div>
        </div>
      </div>
    </section>
  );
}
