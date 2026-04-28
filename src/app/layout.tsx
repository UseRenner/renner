import type { Metadata } from "next";
import { Source_Serif_4, Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "500", "600"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Renner",
  description: "Real estate errands. Nearby Renners.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${workSans.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
