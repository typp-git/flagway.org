"use client";

import { CgSpinner } from "react-icons/cg";
import { motion } from "framer-motion";

// import Image from 'next/image';
// import Structure from "@/public/clear-structure.png"

export default function Loading() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <CgSpinner />
    </motion.div>
  );
}

