import "./globals.css";
import { Metadata } from "next";
import PWAInstallButton from "@/components/PWAInstallButton";

export const metadata: Metadata = {
  title: "life cool air conditioner",
  description: "lifecoolairconditioner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logosmall-t.png" />
        <link rel="shortcut icon" href="/logosmall-t.png" type="image/x-icon" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        {children}
        <PWAInstallButton /> {/* PWA install logic in client component */}
      </body>
    </html>
  );
}
