import type { Metadata } from 'next'
import './globals.css'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ANUSHKA ARTISTRY | OFFICIAL RESIN STORE',
  description: 'The pinnacle of luxury resin art. Handcrafted masterpieces, bespoke commissions, and floral preservation.',
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
