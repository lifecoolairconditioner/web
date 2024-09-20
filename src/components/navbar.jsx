"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  Home,
  Menu,
  Search,
  Snowflake,
  Tool,
  Users,
  DollarSign,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#010101] text-[#fafafa] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Snowflake className="h-8 w-8 text-[#ffc300]" />
            <span className="text-xl font-bold">CoolAir Admin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/dashboard" icon={<Home className="h-5 w-5" />}>
              Dashboard
            </NavLink>
            <NavLink href="/dashboard/repair">Repair/Maintenance</NavLink>
            <NavLink href="/dashboard/technician">
              Technician Management
            </NavLink>
            <NavLink href="/dashboard/payment">Payment Processing</NavLink>
            <NavLink href="/dashboard/cms">Content Management</NavLink>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search bookings, repairs, technicians..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-800 text-[#fafafa] rounded-full focus:outline-none focus:ring-2 focus:ring-[#ffc300]"
              />
            </div>
          </div>

          {/* User Menu and Notifications */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Image
                    src="/placeholder.svg"
                    alt="User avatar"
                    className="h-8 w-8 rounded-full"
                  />
                  <span>Admin User</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink
                href="/dashboard"
                icon={<Home className="h-5 w-5" />}
              >
                Dashboard
              </MobileNavLink>

              <MobileNavLink
                href="/dashboard/repair"
                icon={<Tool className="h-5 w-5" />}
              >
                Repair/Maintenance
              </MobileNavLink>
              <MobileNavLink
                href="/dashboard/technician"
                icon={<Users className="h-5 w-5" />}
              >
                Technician Management
              </MobileNavLink>
              <MobileNavLink
                href="/dashboard/payment"
                icon={<DollarSign className="h-5 w-5" />}
              >
                Payment Processing
              </MobileNavLink>
              <MobileNavLink
                href="/dashboard/cms"
                icon={<FileText className="h-5 w-5" />}
              >
                Content Management
              </MobileNavLink>
            </div>
            <div className="px-4 py-3">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-gray-800 text-[#fafafa] rounded-full focus:outline-none focus:ring-2 focus:ring-[#ffc300]"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-[#ffc300] transition-colors"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-[#ffc300] transition-colors"
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </Link>
  );
}
