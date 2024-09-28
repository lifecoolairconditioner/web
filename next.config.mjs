// next.config.mjs

import dotenv from "dotenv";
import withPWA from "next-pwa";

// Load environment variables
dotenv.config();

const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "production",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary domain here
  },
  // Add any other Next.js config options here
};

// Wrap nextConfig with pwaConfig
export default pwaConfig(nextConfig);
