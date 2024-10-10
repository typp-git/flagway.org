import type { Metadata } from "next";
import { Anuphan } from 'next/font/google'
import "./globals.css";
import Navigation from "@/components/nav";

const anuphan = Anuphan({
  subsets: ["latin"],
  fallback: ["sans-serif"],
  variable: "--font-anuphan"
})

export const metadata: Metadata = {
  title: "Flagway League",
  description: "Flagway exists to create environments where students can practice and celebrate learning math.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anuphan.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
