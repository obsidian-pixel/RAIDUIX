import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Raiduix | The Ultimate Visual UI Builder & Code Generator',
  description: 'Build stunning UIs with React, Vue, and Angular. Switch between Neo-Material, Glass, and Skeuomorphic themes instantly.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}