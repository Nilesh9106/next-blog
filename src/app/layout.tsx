"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { AuthProvider } from "@/hooks/useAuth";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider attribute="class">
          <AuthProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              transition={Slide}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="colored"
            />
            <ProgressBar
              height="3px"
              color="#0059FF"
              options={{ showSpinner: false }}
              shallowRouting
            />
            <div className="bg-white text-black dark:bg-neutral-950 dark:text-gray-100 min-h-screen">
              <Navbar />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
