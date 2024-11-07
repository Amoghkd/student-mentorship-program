import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";  // Keep the Sidebar import only
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EduMentor",
  description: "Student Mentorship Program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        {/* Navbar */}
        <Navbar />

        {/* Sidebar and Main Content */}
        <div className="flex flex-col flex-grow">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <main className="flex-1">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
