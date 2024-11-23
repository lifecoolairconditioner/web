import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export function Services() {
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
    <section
      id="services"
      className="relative bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden py-10"
    >
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
          <Link href="/home" passHref>
            <Button
              size="lg"
              className="bg-blue-900 text-white hover:bg-blue-500 transition-colors duration-300 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl  p-8 "
            >
              Book Services Now
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
