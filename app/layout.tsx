import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";

import "./global.css";
import Header from "./header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: {
    default: "Llew's site",
    template: "%s | Llew's site",
  },
  description: "Llew's personal website and blog.",
  authors: { name: "Llew Vallis" },
  generator: "Next.js",
  keywords: ["blog"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fredoka.variable}`}>
      <body className="overflow-hidden">
        <Header />
        {children}
      </body>
    </html>
  );
}
