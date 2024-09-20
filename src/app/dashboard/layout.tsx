import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import "@/app/globals.css";
export const metadata: Metadata = {
  title: "Cool Air Dashboard",
  description: "App designed and developed by Md. Azam",
};

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="antialiased mt-20">{children}</main>
    </>
  );
}
