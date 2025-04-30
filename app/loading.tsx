"use client";

// import Image from 'next/image';
// import Structure from "@/public/clear-structure.png"
import { motion, AnimatePresence } from "framer-motion";

export default function Loading() {
  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-2 min-h-screen justify-center">
          <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading...</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
