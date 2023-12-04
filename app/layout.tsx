import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReduxProvider from '../redux/features/provider'
import Header from './component/HeaderComponent'
import Footer from './component/FooterComponent'
import Navigation from './component/navigation'
import LoginModal from './component/LoginModal'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dish Daries',
  description: 'Unveiling Culinary Journeys, One Dish at a Time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ReduxProvider>
    <html lang="en">
      <body className={`${inter.className} min-h-full flex flex-col justify-around`}>
      <Navigation/>
      <div className='mt-20 min-h-[70vh]'>
        {children}
      </div>
        <LoginModal/>
      <Footer/>
      </body>
    </html>
    </ReduxProvider>
  )
}
