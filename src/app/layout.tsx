import "./globals.css";
import { Inter } from "next/font/google";
import React from 'react'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EVE PI",
  description: "Lets PI!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
