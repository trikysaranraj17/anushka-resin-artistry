import type { Metadata } from 'next'
import './globals.css'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Anushka Resin Artistry | Luxury Resin Art',
  description: 'High-end, modern, fully responsive luxury e-commerce for Anushka Resin Artistry. Handcrafted resin art, custom orders, and preservation art.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
