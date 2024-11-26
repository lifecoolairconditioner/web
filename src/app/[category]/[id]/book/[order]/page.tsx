"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Copy,
  ChevronDown,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getOrderById } from "@/apis/order";
import { getServiceById } from "@/apis/service";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface PaymentDetail {
  params: {
    id: string;
    book: string;
    order: string;
  };
}

interface ScannerDetails {
  _id: string;
  scannerImage: string;
  phonePeNumber: string;
  upiId: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  contactPhone: string;
  contactEmail: string;
}

export default function PaymentPage({ params }: PaymentDetail) {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceName, setServiceName] = useState<string | null>(null);
  const [scannerDetails, setScannerDetails] = useState<ScannerDetails | null>(
    null
  );
  const { order, id } = params;
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [rentalOrder, service, scannerResponse] = await Promise.all([
          getOrderById(order),
          getServiceById(id),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scanner/`),
        ]);

        const scannerData = await scannerResponse.json();

        setTotalPrice(rentalOrder.totalPrice);
        setServiceName(service.name);
        setScannerDetails(scannerData[0]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id, order]);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Copied!",
          description: "Text copied to clipboard.",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Error",
          description: "Failed to copy text. Please try again.",
          variant: "destructive",
        });
      });
  };

  const handlePaymentConfirmation = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to confirm the payment?"
    );
    if (isConfirmed) {
      router.push(`/track`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8"
    >
      <header className="flex items-center mb-6">
        <Link href="./">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mr-4"
            aria-label="Go back"
            onClick={() => router.back()}
          >
            <ChevronLeft className="w-6 h-6 text-[#010101]" />
          </motion.button>
        </Link>
        <motion.h1
          variants={itemVariants}
          className="text-2xl font-bold text-[#010101]"
        >
          Payment
        </motion.h1>
      </header>

      <div className="max-w-md mx-auto space-y-8">
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold text-[#010101] mb-4">
            {isLoading ? (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading payment details...
              </motion.div>
            ) : (
              <>{`Pay ₹${totalPrice} for your ${serviceName || "Order"}`}</>
            )}
          </h2>
          <div className="flex flex-col items-center">
            {scannerDetails && (
              <Image
                src={scannerDetails.scannerImage}
                alt="Payment QR Code"
                width={400}
                height={300}
                className="w-full max-w-[200px] h-auto mx-auto mb-4"
              />
            )}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Scan this QR code with any UPI app to make the payment
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              PhonePe Number
            </h3>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
              <span className="font-medium">
                {scannerDetails?.phonePeNumber}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCopy(scannerDetails?.phonePeNumber || "")}
                className="text-blue-300 hover:text-blue-300 transition-colors"
                aria-label="Copy PhonePe number"
              >
                <Copy className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">UPI ID</h3>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
              <span className="font-medium">{scannerDetails?.upiId}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCopy(scannerDetails?.upiId || "")}
                className="text-blue-300 hover:text-blue-300 transition-colors"
                aria-label="Copy UPI ID"
              >
                <Copy className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowBankDetails(!showBankDetails)}
              className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 rounded-lg text-[#010101] font-medium hover:bg-gray-200 transition-colors"
            >
              <span>Show Bank Details</span>
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={showBankDetails ? "up" : "down"}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: showBankDetails ? 180 : 0 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <AnimatePresence>
              {showBankDetails && scannerDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 p-4 bg-gray-50 rounded-lg"
                >
                  <p>
                    <strong>Account Name:</strong> {scannerDetails.bankName}
                  </p>
                  <p>
                    <strong>Account Number:</strong>{" "}
                    {scannerDetails.accountNumber}
                  </p>
                  <p>
                    <strong>IFSC Code:</strong> {scannerDetails.ifscCode}
                  </p>
                  <p>
                    <strong>Bank Name:</strong> {scannerDetails.bankName}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <h3 className="text-lg font-semibold text-[#010101] mb-2">
            Need Help?
          </h3>
          <div className="flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${scannerDetails?.contactPhone}`}
              className="flex items-center text-[#010101] hover:text-blue-300 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              <span>{scannerDetails?.contactPhone}</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${scannerDetails?.contactPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#010101] hover:text-blue-300 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>WhatsApp</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePaymentConfirmation}
          className="w-full py-3 px-4 bg-blue-300 text-[#010101] rounded-lg font-semibold hover:bg-blue-300 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
        >
          Confirm Payment
        </motion.button>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-lg font-semibold text-[#010101] mb-2">
            Track Your Order
          </h3>
          <p className="text-sm text-gray-600">
            After confirming your payment, you can track your order by following
            these steps:
          </p>
          <ol className="list-decimal list-inside mt-2 text-sm text-gray-600">
            <li>
              Go to the <span className="font-semibold">/track</span> URL
            </li>
            <li>Enter your mobile number</li>
            <li>View your order details and track its status</li>
          </ol>
        </motion.div>
      </div>
    </motion.div>
  );
}
