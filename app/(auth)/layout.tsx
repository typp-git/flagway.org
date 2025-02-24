import Link from "next/link";
import Image from "next/image";
import YPPLogo from "@/public/YPP-Logo-white.webp";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full bg-black text-white">
        <Link
          href="/"
          className="flex items-center justify-start gap-4 relative hover:cursor-pointer w-fit px-5 mx-auto my-10 custom-border"
        >
          <Image
            priority
            alt="Logo of the Young People's Project"
            width="100"
            src={YPPLogo}
            className="w-[60px] md:w-[80px] h-auto"
          />
          <div className="brand font-bold items-center text-white">
            <div className="w-full">FLAGWAY</div>
            <div className="w-full -mt-1.5">LEAGUE</div>
          </div>
          <h3>Admin Dashboard</h3>
        </Link>
      </div>
      <main className="flex-grow bg-gray-50">{children}</main>
    </div>
  );
}
