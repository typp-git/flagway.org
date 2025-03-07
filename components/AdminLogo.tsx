"use client";
import Link from "next/link";
import Image from "next/image";
import YPPLogo from "@/public/YPP-Logo-white.webp";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";

export default function AdminLogo() {
  // const pathname = usePathname();
  return (
    <div className="relative w-fit h-fit">
      {/* <motion.div */}
      {/*   layoutId="underline" */}
      {/*   className="absolute inset-0 custom-border rounded-lg" */}
      {/* /> */}

      <Link
        href="/admin/dashboard"
        className="flex items-center justify-start gap-4 relative hover:cursor-pointer h-[3.7rem] w-fit px-3 min-w-[8rem]"
      >
        <Image
          priority
          alt="Logo of the Young People's Project"
          width="100"
          src={YPPLogo}
          className="w-[40px] md:w-[65px] h-auto"
        />

        <h3 className="!text-lg leading-none font-display w-fit">
          <span className="font-bold">FLAGWAY</span>
          <br />
          Admin Dashboard
        </h3>
      </Link>
    </div>
  );
}
