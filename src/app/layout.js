import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FitLogProvider } from "@/context/FitLogContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FITLOG - Workout Tracker",
  description: "Track your workouts and fitness plans",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0C0D10] text-white">
        <FitLogProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}