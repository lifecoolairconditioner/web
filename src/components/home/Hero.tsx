import { ThermometerSnowflake, Phone } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroData {
  _id: string;
  companyDescription: string;
  privacyPolicyLink: string;
  termsAndConditionsLink: string;
  location: string;
  __v: number;
}

export default function Hero({ heroData }: { heroData: HeroData }) {
  return (
    <section className="grid lg:grid-cols-2 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left Panel */}
      <div className="relative p-8 lg:p-12 flex flex-col justify-center">
        <div className="mx-auto w-full">
          <div className="mb-2">
            <ThermometerSnowflake className="h-12 w-12 text-blue-600" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-blue-900">
              Stay Cool with
              <br />
              Expert AC Services
              <br />
              <span className="text-blue-600">& Rentals</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-800 mb-8"
          >
            {heroData.companyDescription}
          </motion.p>

          <div className="space-y-4 mb-8">
            <Link href="/home" className="mt-10">
              <Button
                size="lg"
                className="bg-blue-900 text-white hover:bg-blue-500 transition-colors duration-300 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl"
              >
                Book Services Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="relative hidden lg:block">
        <div className="absolute inset-0">
          <Image
            src="/expert-technicians.jpg"
            alt="Expert AC technician at work"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-blue-900/20" />
        </div>

        {/* Contact Info */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-white/90 p-4 rounded-lg shadow-lg">
            <p className="text-blue-900 font-medium mb-2">
              Need immediate assistance?
            </p>
            <div className="flex items-center gap-2 text-blue-600">
              <Phone className="h-5 w-5" />
              <span className="text-lg font-bold">+91 9975551431</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
