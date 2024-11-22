import type { Metadata } from "next";
import { Viga, Mako, Kanit } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/nav";

const viga = Viga({
  subsets: ["latin"],
  fallback: ["sans-serif"],
  weight: "400",
  variable: "--font-viga",
});

const mako = Mako({
  subsets: ["latin"],
  fallback: ["sans-serif"],
  weight: "400",
  variable: "--font-mako",
});

const kanit = Kanit({
  subsets: ["latin"],
  fallback: ["sans-serif"],
  weight: ["400", "700"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Flagway League",
  description:
    "Flagway exists to create environments where students can practice and celebrate learning math.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${viga.variable} ${mako.variable} ${kanit.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
