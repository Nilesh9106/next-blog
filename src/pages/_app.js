import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })
  }, [router.query])
  return (
    <>
      <ThemeProvider attribute="class">
        <LoadingBar
          color='#6d28d9'
          progress={progress}
          waitingTime={500}
          height={3}
          onLoaderFinished={() => setProgress(0)}
        />
        <div className='bg-white text-black dark:bg-neutral-950 dark:text-gray-100'>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}
