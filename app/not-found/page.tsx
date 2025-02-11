"use client";
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black text-center">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-9xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        404
      </motion.h1>

      {/* Error Message */}
      <p className="text-lg mt-4 opacity-70">Oops! The page you are looking for doesn't exist.</p>
      
      {/* Back to Home Button */}
      <motion.a
        href="/"
        className="mt-6 px-6 py-3 bg-black text-white font-bold rounded-lg shadow-lg transition-transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
      >
        Go Back Home
      </motion.a>
    </div>
  );
}
