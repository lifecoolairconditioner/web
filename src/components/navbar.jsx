"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Briefcase,
  Users,
  Menu,
  X,
  AirVent,
  CreditCard,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { name: "Orders", icon: ShoppingBag, href: "/admin-dash/orders" },
  { name: "Services", icon: Briefcase, href: "/admin-dash/services" },
  { name: "Technician", icon: Users, href: "/admin-dash/technician" },
  { name: "AC rent", icon: AirVent, href: "/admin-dash/ac-rent" },
  { name: "Payment", icon: CreditCard, href: "/admin-dash/payment" },
  { name: "Carousel", icon: ImageIcon, href: "/admin-dash/carousel" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    const loadingTimer = setTimeout(() => setLoading(false), 1000);
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(loadingTimer);
      clearInterval(progressInterval);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    toast({
      title: isOpen ? "Menu closed" : "Menu opened",
      duration: 1000,
    });
  };

  return (
    <motion.nav
      className="bg-[#fafafa] shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Progress value={progress} className="w-full h-1" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <Image
                  className="h-8 w-auto"
                  src="/placeholder.svg"
                  height={100}
                  width={100}
                  alt="Logo"
                />
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} className="h-8 w-24" />)
              : menuItems.map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    isActive={activeItem === item.name}
                    onClick={() => setActiveItem(item.name)}
                  />
                ))}
          </div>
          <div className="flex items-center md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#010101] hover:text-[#FFFF00] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FFFF00]"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <MobileNavItem
                  key={item.name}
                  item={item}
                  isActive={activeItem === item.name}
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsOpen(false);
                    toast({
                      title: `Navigating to ${item.name}`,
                      duration: 1000,
                    });
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavItem({ item, isActive, onClick }) {
  return (
    <Link href={item.href} passHref>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          isActive
            ? "text-[#FFFF00] bg-[#010101] bg-opacity-10"
            : "text-[#010101] hover:text-[#FFFF00] hover:bg-[#010101] hover:bg-opacity-5"
        }`}
        onClick={onClick}
      >
        <item.icon className="mr-2 h-5 w-5" />
        {item.name}
      </motion.a>
    </Link>
  );
}

function MobileNavItem({ item, isActive, onClick }) {
  return (
    <Link href={item.href} passHref>
      <motion.a
        whileTap={{ scale: 0.95 }}
        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          isActive
            ? "text-[#FFFF00] bg-[#010101] bg-opacity-10"
            : "text-[#010101] hover:text-[#FFFF00] hover:bg-[#010101] hover:bg-opacity-5"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center">
          <item.icon className="mr-3 h-5 w-5" />
          {item.name}
        </div>
      </motion.a>
    </Link>
  );
}
