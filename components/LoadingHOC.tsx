"use client";

// import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingHOC({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isLoading, setIsLoading] = useState(true);
  //
  // useEffect(() => {
  //   // Fake a loading delay; replace this with real loading logic if needed
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500);
  //
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {/* {isLoading ? ( */}
        {/*   <motion.div */}
        {/*     key="loader" */}
        {/*     initial={{ opacity: 1 }} */}
        {/*     animate={{ opacity: 1 }} */}
        {/*     exit={{ */}
        {/*       opacity: 0, */}
        {/*       transition: { duration: 0.5, ease: "easeInOut" }, */}
        {/*     }} */}
        {/*     className="absolute inset-0 flex items-center justify-center bg-black z-50" */}
        {/*   > */}
        {/*     <motion.div */}
        {/*       className="w-16 h-16 border-4 border-t-transparent border-green-800 rounded-full animate-spin" */}
        {/*       initial={{ scale: 0 }} */}
        {/*       animate={{ */}
        {/*         scale: 1, */}
        {/*         transition: { duration: 0.3, ease: "easeOut" }, */}
        {/*       }} */}
        {/*       exit={{ */}
        {/*         scale: 0, */}
        {/*         transition: { delay: 0.2, duration: 0.4, ease: "easeOut" }, */}
        {/*       }} */}
        {/*     /> */}
        {/*   </motion.div> */}
        {/* ) : ( */}
        <motion.main
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.main>
        {/* )} */}
      </AnimatePresence>
    </div>
  );
}
