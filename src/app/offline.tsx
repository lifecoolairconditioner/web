"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4">
      <AnimatePresence>
        {isAnimating ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <WifiOff size={80} className="text-[#010101] mx-auto" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-4xl font-bold text-[#010101]"
            >
              Connecting...
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            key="offline"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <WifiOff size={80} className="text-[#010101] mx-auto" />
            <h1 className="mt-8 text-4xl font-bold text-[#010101]">
              You re Offline
            </h1>
            <p className="mt-4 text-xl text-[#010101]">
              Check your connection and try again
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="mt-8 px-6 py-3 bg-[#ffc300] text-[#010101] rounded-full font-semibold flex items-center justify-center"
            >
              <RefreshCw size={20} className="mr-2" />
              Refresh
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
