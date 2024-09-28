import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cool Air",
  description: "App designed and developed by Md. Azam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/placeholder.svg" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
