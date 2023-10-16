"use client"
import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Footer from '@/components/Footer'
import NextTopLoader from 'nextjs-toploader'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
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
          <div className='bg-white text-black dark:bg-neutral-950 dark:text-gray-100 min-h-screen'>
            <NextTopLoader
              color="#6d28d9"
              initialPosition={0.08}
              crawlSpeed={300}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={400}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
