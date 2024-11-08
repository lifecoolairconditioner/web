"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");

    // Redirect to login if no access token
    if (!accessToken) {
      router.push("/auth/login");
    } else {
      setIsLoggedIn(true); // User is logged in
    }
  }, [router]);

  // If not logged in, you might want to return null or a loading spinner
  if (!isLoggedIn) return null;

  return (
    <html lang="en">
      <link rel="apple-touch-icon" href="/logosmall-t.png" />
      <link rel="shortcut icon" href="/logosmall-t.png" type="image/x-icon" />
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
