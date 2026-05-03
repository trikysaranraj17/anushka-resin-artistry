import type { Metadata } from 'next'
import './globals.css'
import Cursor from '@/components/Cursor'

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

function Navbar() {
  return (
    <nav className="glass" style={{ position: 'sticky', top: '1rem', zIndex: 100, padding: '1rem 2rem', margin: '1rem', borderRadius: '50px' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo.png?v=3" alt="Logo" style={{ height: '40px', filter: 'drop-shadow(0 0 5px rgba(212,175,55,0.5))' }} />
          <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }} className="glow-text">
            Anushka Resin Artistry
          </span>
        </a>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/products">Shop</a>
          <a href="/gallery">Gallery</a>
          <a href="/custom-orders">Custom Orders</a>
          <a href="/contact">Contact</a>
          <a href="/admin" className="btn-gold" style={{ padding: '0.5rem 1.5rem' }}>Admin Panel</a>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-gray)', padding: '4rem 0 2rem 0', marginTop: '4rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h3 className="text-gold">Anushka Resin Artistry</h3>
            <p>Crafted & Managed by Mr. Karthik</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
            <p>Phone: 98407 06312</p>
            <p>Email: jayachandran.r0110@gmail.com</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/">Home</a>
              <a href="/products">Shop Collection</a>
              <a href="/custom-orders">Custom Orders</a>
              <a href="/admin">Admin Portal</a>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Anushka Resin Artistry. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
