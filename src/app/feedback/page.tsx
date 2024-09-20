"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, Send } from "lucide-react";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState({
    overall: "",
    acUnit: "",
    service: "",
    suggestions: "",
  });
  const [postToGoogle, setPostToGoogle] = useState(false);
  const [allowTestimonial, setAllowTestimonial] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log({ rating, feedback, postToGoogle, allowTestimonial });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-lg p-8 text-center"
      >
        <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">
          Thank You for Your Feedback!
        </h2>
        <p className="text-gray-600">
          Your input is valuable and helps us improve our service.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your Feedback Matters
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Experience
          </label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRatingChange(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    (hoverRating || rating) >= star
                      ? "text-[#ffc300] fill-[#ffc300]"
                      : "text-gray-300"
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {rating > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="overall"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Overall Experience
                </label>
                <textarea
                  id="overall"
                  name="overall"
                  rows={3}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#ffc300]"
                  value={feedback.overall}
                  onChange={handleFeedbackChange}
                  placeholder="Tell us about your overall experience..."
                />
              </div>

              <div>
                <label
                  htmlFor="acUnit"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  AC Unit Feedback
                </label>
                <textarea
                  id="acUnit"
                  name="acUnit"
                  rows={3}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#ffc300]"
                  value={feedback.acUnit}
                  onChange={handleFeedbackChange}
                  placeholder="How was the AC unit? Was it efficient and easy to use?"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Service Quality
                </label>
                <textarea
                  id="service"
                  name="service"
                  rows={3}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#ffc300]"
                  value={feedback.service}
                  onChange={handleFeedbackChange}
                  placeholder="How was our customer service? Any comments on the booking process?"
                />
              </div>

              <div>
                <label
                  htmlFor="suggestions"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Suggestions for Improvement
                </label>
                <textarea
                  id="suggestions"
                  name="suggestions"
                  rows={3}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#ffc300]"
                  value={feedback.suggestions}
                  onChange={handleFeedbackChange}
                  placeholder="Any suggestions on how we can improve our service?"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="postToGoogle"
                  type="checkbox"
                  checked={postToGoogle}
                  onChange={(e) => setPostToGoogle(e.target.checked)}
                  className="h-4 w-4 text-[#ffc300] focus:ring-[#ffc300] border-gray-300 rounded"
                />
                <label
                  htmlFor="postToGoogle"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Post this review on Google Maps
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="allowTestimonial"
                  type="checkbox"
                  checked={allowTestimonial}
                  onChange={(e) => setAllowTestimonial(e.target.checked)}
                  className="h-4 w-4 text-[#ffc300] focus:ring-[#ffc300] border-gray-300 rounded"
                />
                <label
                  htmlFor="allowTestimonial"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Allow us to use this feedback as a website testimonial
                </label>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#ffc300] text-[#010101] py-3 rounded-full font-semibold text-lg hover:bg-[#e6b000] transition-colors flex items-center justify-center"
              >
                Submit Feedback
                <Send className="ml-2" size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
