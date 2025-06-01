import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppProvider from "../components/AppProvider";
import Header from "@/components/Header";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  title: "Sui - Ticketmaster",
  description: "A Ticketmaster app built on Sui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <AppProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900">
            <Header />
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
