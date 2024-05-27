import "./globals.css";
import { Inter } from "next/font/google";
import React from 'react'
import PlausibleProvider from 'next-plausible'
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
      <head>
        <PlausibleProvider domain="pi.avanto.tk" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
