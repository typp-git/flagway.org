"use client";

// import Image from 'next/image';
// import Structure from "@/public/clear-structure.png"

export default function Loading() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
      <p>Loading...</p>
    </div>
  );
}
