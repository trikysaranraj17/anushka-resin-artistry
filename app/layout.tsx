import type { Metadata } from 'next'
import './globals.css'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.anushkaresinart.com'),
  title: 'ANUSHKA RESIN ARTISTRY | Luxury Resin Masterpieces',
  description: 'The pinnacle of luxury resin art in Chennai. Handcrafted masterpieces, custom river tables, signature clocks, bespoke commissions, and floral preservation.',
  keywords: ['Resin Art', 'Luxury Resin', 'Resin River Tables', 'Resin Clocks', 'Floral Preservation', 'Custom Resin Art', 'Anushka Artistry', 'Chennai Resin Artist'],
  openGraph: {
    title: 'ANUSHKA RESIN ARTISTRY | Luxury Resin Masterpieces',
    description: 'The pinnacle of luxury resin art. Discover handcrafted resin masterpieces, bespoke commissions, and floral preservation.',
    url: 'https://www.anushkaresinart.com',
    siteName: 'Anushka Resin Artistry',
    images: [
      {
        url: '/logo.png', // Fallback to logo if no specific OG image is set
        width: 800,
        height: 600,
        alt: 'Anushka Resin Artistry Luxury Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ANUSHKA RESIN ARTISTRY',
    description: 'The pinnacle of luxury resin art. Handcrafted masterpieces.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
