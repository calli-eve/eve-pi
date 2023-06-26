import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

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
        {children} <Analytics />
      </body>
    </html>
  );
}
