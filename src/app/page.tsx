import React from "react";
import { Refrigerator, WashingMachine, Microwave } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const services = [
  {
    name: "AC Repair",
    icon: Refrigerator,
    color: "bg-blue-500",
    link: "/Repair",
  },
  {
    name: "Fridge Repair",
    icon: Refrigerator,
    color: "bg-green-500",
    link: "/Repair",
  },
  {
    name: "Washing Machine Repair",
    icon: WashingMachine,
    color: "bg-purple-500",
    link: "/Repair",
  },
  {
    name: "Microwave Repair",
    icon: Microwave,
    color: "bg-red-500",
    link: "/Repair",
  },
];

export default function MainScreen() {
  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-[#010101] mb-6">Home Services</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* AC Rent Service Card */}
        <div className="col-span-full lg:col-span-2 bg-[#ffc300] rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-[1.02]">
          <Link href={"/ac-rent"}>
            {" "}
            <div className="p-6 flex items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#010101] mb-2">
                  AC Rental Service
                </h2>
                <p className="text-[#010101] opacity-80">
                  Cool comfort, delivered to your doorstep
                </p>
              </div>
              <Image
                src="/placeholder.svg"
                alt="AC Rental"
                width={"100"}
                height={"100"}
                className="w-30 h-28 object-cover rounded-xl"
              />
            </div>
          </Link>
        </div>

        {/* Repair Service Cards */}
        {services.map((service) => (
          <div
            key={service.name}
            className={`${service.color} rounded-xl shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-[1.05]`}
          >
            <Link href={service.link}>
              <div className="p-4 flex flex-col items-center">
                <service.icon className="w-12 h-12 text-white mb-2" />
                <h3 className="text-lg font-semibold text-white text-center">
                  {service.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
