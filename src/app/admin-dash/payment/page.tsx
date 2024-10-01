"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, Save, Upload, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PaymentDetails {
  scannerImage: string;
  phonePeNumber: string;
  upiId: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  contactPhone: string;
  contactEmail: string;
}

export default function PaymentDetailsCMS() {
  const [details, setDetails] = useState<PaymentDetails>({
    scannerImage: "",
    phonePeNumber: "",
    upiId: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  useEffect(() => {
    // Simulating fetching existing details from an API
    const fetchedDetails: PaymentDetails = {
      scannerImage: "/placeholder.svg?height=300&width=300",
      phonePeNumber: "9876543210",
      upiId: "example@upi",
      bankName: "Example Bank",
      accountNumber: "XXXX XXXX XXXX 1234",
      ifscCode: "EXMP0001234",
      contactPhone: "1234567890",
      contactEmail: "contact@example.com",
    };
    setDetails(fetchedDetails);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetails((prevDetails) => ({
          ...prevDetails,
          scannerImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating API call to update details
    console.log("Updating details:", details);
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button className="mr-4" aria-label="Go back">
            <ChevronLeft className="w-6 h-6 text-[#010101]" />
          </button>
          <h1 className="text-2xl font-bold text-[#010101]">
            Payment Details CMS
          </h1>
        </div>
        <button
          onClick={toggleEditMode}
          className="flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#010101] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc300]"
        >
          {isEditing ? "Cancel" : "Edit Details"}
        </button>
      </header>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.form
            key="edit-form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label
                htmlFor="scannerImage"
                className="block text-sm font-medium text-[#010101] mb-1"
              >
                Scanner Image
              </label>
              <div className="flex items-center space-x-4">
                <Image
                  src={details.scannerImage}
                  alt="Payment Scanner"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <label className="cursor-pointer bg-[#ffc300] text-[#010101] py-2 px-4 rounded-lg hover:bg-[#e6b000] transition duration-300">
                  <Upload className="w-5 h-5 inline-block mr-2" />
                  Upload New Image
                  <input
                    type="file"
                    id="scannerImage"
                    name="scannerImage"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="phonePeNumber"
                className="block text-sm font-medium text-[#010101] mb-1"
              >
                PhonePe Number
              </label>
              <input
                type="tel"
                id="phonePeNumber"
                name="phonePeNumber"
                value={details.phonePeNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="upiId"
                className="block text-sm font-medium text-[#010101] mb-1"
              >
                UPI ID
              </label>
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={details.upiId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="bankName"
                className="block text-sm font-medium text-[#010101] mb-1"
              >
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={details.bankName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-[#010101] mb-1"
              >
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={details.accountNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="ifscCode"
                className="block text-sm font-medium text-[#010101] mb-1"
              >
                IFSC Code
              </label>
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={details.ifscCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contactPhone"
                className="block text-sm font-medium text-[#010101] mb-1"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={details.contactPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium text-[#010101] mb-1"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={details.contactEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#010101] bg-[#ffc300] hover:bg-[#e6b000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc300]"
            >
              <Save className="w-5 h-5 inline-block mr-2" />
              Save Changes
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="details-display"
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h2 className="text-lg font-semibold text-[#010101] mb-2">
                Scanner Image
              </h2>
              <Image
                src={details.scannerImage}
                alt="Payment Scanner"
                className="w-64 h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#010101] mb-2">
                PhonePe Number
              </h2>
              <p className="text-gray-700">{details.phonePeNumber}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#010101] mb-2">
                UPI ID
              </h2>
              <p className="text-gray-700">{details.upiId}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#010101] mb-2">
                Bank Details
              </h2>
              <button
                onClick={() => setShowBankDetails(!showBankDetails)}
                className="flex items-center text-sm text-[#010101] hover:text-[#ffc300] transition duration-300"
              >
                {showBankDetails ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide Bank Details
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show Bank Details
                  </>
                )}
              </button>
              {showBankDetails && (
                <div className="mt-2 space-y-2">
                  <p className="text-gray-700">
                    <strong>Bank Name:</strong> {details.bankName}
                  </p>
                  <p className="text-gray-700">
                    <strong>Account Number:</strong> {details.accountNumber}
                  </p>
                  <p className="text-gray-700">
                    <strong>IFSC Code:</strong> {details.ifscCode}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#010101] mb-2">
                Contact Details
              </h2>
              <p className="text-gray-700">
                <strong>Phone:</strong> {details.contactPhone}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {details.contactEmail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
