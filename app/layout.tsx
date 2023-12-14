import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReduxProvider from '../redux/features/provider'
import Header from './component/HeaderComponent'
import Footer from './component/FooterComponent'
import LoginModal from './component/LoginModal'
import SignUpModal from './component/SignUpModal'
import InitiateLoad from './component/InitiateLoad'
import Toast from './component/toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dish Diaries',
  description: 'Unveiling Culinary Journeys, One Dish at a Time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ReduxProvider>
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col justify-around`}>
        <InitiateLoad/>
      <Header/>
      <div className='min-h-[75vh] bg-base-100'>
        {children}
      </div>
      <Toast/>
        <LoginModal/>
        <SignUpModal/>
      <Footer/>
      </body>
    </html>
    </ReduxProvider>
  )
}
