"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Copy,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageCircle,
  CreditCard,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getOrderById } from "@/apis/order";

interface PaymentDetail {
  params: {
    id: string;
    book: string;
    rentalorderid: string;
  };
}

export default function PaymentPage({ params }: PaymentDetail) {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id, book, rentalorderid } = params;
  const router = useRouter();

  useEffect(() => {
    async function fetchRentalOrder() {
      try {
        setIsLoading(true);
        const rentalOrder = await getOrderById(rentalorderid);
        console.log(rentalOrder);

        setTotalPrice(rentalOrder.totalPrice);
      } catch (error) {
        console.error("Failed to fetch rental order:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRentalOrder();
  }, [rentalorderid]);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
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
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <header className="flex items-center mb-6">
        <button
          className="mr-4"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-6 h-6 text-[#010101]" />
        </button>
        <h1 className="text-2xl font-bold text-[#010101]">Payment</h1>
      </header>

      <div className="max-w-md mx-auto space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-[#010101] mb-4">
            {isLoading ? (
              "Loading payment details..."
            ) : (
              <>
                Pay ₹{totalPrice} for your {book}
              </>
            )}
          </h2>
          <div className="flex flex-col items-center">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Payment QR Code"
              className="w-full max-w-[200px] h-auto mx-auto mb-4"
            />
          </div>
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
          onClick={handlePaymentConfirmation}
          className="w-full py-3 px-4 bg-[#ffc300] text-[#010101] rounded-lg font-semibold hover:bg-[#e6b000] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffc300] focus:ring-opacity-50"
        >
          Confirm Payment
        </button>

        <div className="bg-white p-6 rounded-xl shadow-md">
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
        </div>
      </div>
    </div>
  );
}
