"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Copy,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getOrderById } from "@/apis/order";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface PaymentDetail {
  params: {
    id: string;
    book: string;
    rentalorderid: string;
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
  const [scannerDetails, setScannerDetails] = useState<ScannerDetails | null>(
    null
  );
  const { book, rentalorderid } = params;
  const router = useRouter();
  console.log(scannerDetails);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [rentalOrder, scannerResponse] = await Promise.all([
          getOrderById(rentalorderid),
          fetch("http://192.168.43.177:8000/api/scanner/"),
        ]);

        const scannerData = await scannerResponse.json();

        setTotalPrice(rentalOrder.totalPrice);
        setScannerDetails(scannerData[0]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to fetch details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [rentalorderid]);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy. Please try again.");
      });
  };

  const handlePaymentConfirmation = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to confirm the payment?"
    );
    if (isConfirmed) {
      console.log("Payment confirmed. Navigating to Order Tracking Page.");
      router.push(`/track`);
    } else {
      console.log("Payment cancelled. Staying on the current page.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="flex items-center mb-6">
        <Link href="../">
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
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-[#010101]"
        >
          Payment
        </motion.h1>
      </header>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-md mx-auto space-y-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold text-[#010101] mb-4">
            {isLoading ? (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                Loading payment details...
              </motion.div>
            ) : (
              <>
                Pay ₹{totalPrice} for {book} months
              </>
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
          whileHover={{ scale: 1.02 }}
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
                className="text-[#ffc300] hover:text-[#e6b000] transition-colors"
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
                className="text-[#ffc300] hover:text-[#e6b000] transition-colors"
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
              {showBankDetails ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
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
          whileHover={{ scale: 1.02 }}
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
              className="flex items-center text-[#010101] hover:text-[#ffc300] transition-colors"
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
              className="flex items-center text-[#010101] hover:text-[#ffc300] transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>WhatsApp</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePaymentConfirmation}
          className="w-full py-3 px-4 bg-[#ffc300] text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50"
        >
          Confirm Payment
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.02 }}
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
      </motion.div>
    </motion.div>
  );
}
