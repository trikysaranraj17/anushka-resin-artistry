'use client'

import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.includes('/admin') || pathname?.includes('/login')) return null

  return (
    <footer style={{ background: '#050505', padding: '10rem 0 4rem 0', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '6rem', marginBottom: '6rem' }}>
          <div style={{ flex: '1.5' }}>
            <h2 style={{ fontSize: '1.8rem', letterSpacing: '4px', marginBottom: '2rem' }}>ANUSHKA</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 2, maxWidth: '400px' }}>
              Crafting eternal elegance through liquid glass. Our resin masterpieces are designed to bring a touch of sophisticated luxury to modern spaces.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
              {/* Social icons would go here */}
              <a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Instagram</a>
              <a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Facebook</a>
              <a href="#" className="nav-link" style={{ fontSize: '0.7rem' }}>Pinterest</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '2.5rem', color: 'var(--color-gold)' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <a href="/products" className="nav-link">Collections</a>
              <a href="/gallery" className="nav-link">Art Gallery</a>
              <a href="/custom-orders" className="nav-link">Bespoke Orders</a>
              <a href="/contact" className="nav-link">Contact Us</a>
            </div>
          </div>

          <div>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '2.5rem', color: 'var(--color-gold)' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#888', fontSize: '0.9rem' }}>
              <p>Chennai, India</p>
              <p>+91 98407 06312</p>
              <p>jayachandran.r0110@gmail.com</p>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          paddingTop: '4rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: '2rem',
          fontSize: '0.7rem',
          color: '#444',
          letterSpacing: '1px'
        }}>
          <p>© {new Date().getFullYear()} ANUSHKA RESIN ARTISTRY. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#">PRIVACY POLICY</a>
            <a href="#">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
