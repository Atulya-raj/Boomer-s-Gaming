import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { ReactLenis } from 'lenis/react';
import DynamicIsland from "./components/DynamicIsland";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boomer's Gaming",
  description: "Enter the Cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <ReactLenis root>
          <DynamicIsland />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
