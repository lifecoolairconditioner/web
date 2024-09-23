"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  Copy,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function PaymentPage() {
  const [showBankDetails, setShowBankDetails] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handlePaymentCompleted = () => {
    console.log("Payment completed. Navigating to Order Tracking Page.");
    // Implement actual navigation to Order Tracking Page here
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <header className="flex items-center mb-6">
        <button className="mr-4" aria-label="Go back">
          <ChevronLeft className="w-6 h-6 text-[#010101]" />
        </button>
        <h1 className="text-2xl font-bold text-[#010101]">Payment</h1>
      </header>

      <div className="max-w-md mx-auto space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-[#010101] mb-4">
            Scan QR Code to Pay
          </h2>
          <img
            src="/placeholder.svg?height=200&width=200"
            alt="Payment QR Code"
            className="w-full max-w-[200px] h-auto mx-auto mb-4"
          />
          <p className="text-sm text-gray-600 text-center">
            Scan this QR code with any UPI app to make the payment
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              PhonePe Number
            </h3>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
              <span className="font-medium">9876543210</span>
              <button
                onClick={() => handleCopy("9876543210")}
                className="text-[#ffc300] hover:text-[#e6b000] transition-colors"
                aria-label="Copy PhonePe number"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">UPI ID</h3>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
              <span className="font-medium">urbancompany@upi</span>
              <button
                onClick={() => handleCopy("urbancompany@upi")}
                className="text-[#ffc300] hover:text-[#e6b000] transition-colors"
                aria-label="Copy UPI ID"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowBankDetails(!showBankDetails)}
              className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 rounded-lg text-[#010101] font-medium hover:bg-gray-200 transition-colors"
            >
              <span>Show Bank Details</span>
              {showBankDetails ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {showBankDetails && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p>
                  <strong>Account Name:</strong> Urban Company
                </p>
                <p>
                  <strong>Account Number:</strong> 1234567890
                </p>
                <p>
                  <strong>IFSC Code:</strong> ABCD0001234
                </p>
                <p>
                  <strong>Bank Name:</strong> Example Bank
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <h3 className="text-lg font-semibold text-[#010101] mb-2">
            Need Help?
          </h3>
          <div className="flex items-center space-x-4">
            <a
              href="tel:1800123456"
              className="flex items-center text-[#010101] hover:text-[#ffc300] transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              <span>1800-123-456</span>
            </a>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#010101] hover:text-[#ffc300] transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <button
          onClick={handlePaymentCompleted}
          className="w-full py-3 px-4 bg-[#ffc300] text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50"
        >
          Payment Completed
        </button>
      </div>
    </div>
  );
}
