"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TextCarousel: React.FC = () => {
  const texts: string[] = [
    "celebrate learning math",
    "laugh while doing math",
    "find breakthrough in math",
    "turn learning into an adventure",
    "discover the joy of numbers",
    "build confidence in problem solving",
    "work together to solve challenges",
    "unlock their math potential",
    "grow in collaboration and play",
    "connect math to real life experiences",
    "make new friends while exploring math",
    "transform their perspective on math",
    "succeed in a supportive community",
    "find excitement in every equation",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="overflow-hidden flex justify-center items-center h-32 w-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-full h-full text-wrap flex items-start whitespace-nowrap"
        >
          {texts[currentIndex] + "."}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextCarousel;
