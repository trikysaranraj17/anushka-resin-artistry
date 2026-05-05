'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.includes('/admin') || pathname?.includes('/login')) return null

  return (
    <footer style={{ background: '#050505', padding: '15rem 0 5rem 0', borderTop: '1px solid rgba(212, 175, 55, 0.1)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Glow */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8rem', marginBottom: '8rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/logo.png?v=3" alt="Logo" style={{ height: '80px', marginBottom: '3rem', filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.3))' }} />
            <h2 style={{ fontSize: '2rem', letterSpacing: '8px', marginBottom: '1.5rem' }}>ANUSHKA</h2>
            <p style={{ color: '#666', fontSize: '1rem', lineHeight: 2, maxWidth: '450px' }}>
              Crafting eternal elegance through liquid glass. Our resin masterpieces are designed to bring a touch of sophisticated luxury to modern spaces.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '5px', fontSize: '0.9rem', marginBottom: '3rem', color: 'var(--color-gold)' }}>Collections</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {['Wall Clocks', 'River Tables', 'Name Boards', 'Preservations'].map((item) => (
                <a key={item} href="/products" className="nav-link" style={{ fontSize: '0.9rem', letterSpacing: '2px' }}>{item}</a>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '5px', fontSize: '0.9rem', marginBottom: '3rem', color: 'var(--color-gold)' }}>Experience</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#888', fontSize: '0.9rem', letterSpacing: '2px' }}>
              <p>Chennai, India</p>
              <p>+91 98407 06312</p>
              <p>jayachandran.r0110@gmail.com</p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', justifyContent: 'center' }}>
                <a href="#" className="nav-link">IG</a>
                <a href="#" className="nav-link">FB</a>
                <a href="#" className="nav-link">YT</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          paddingTop: '5rem', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column',
          gap: '2rem',
          fontSize: '0.8rem',
          color: '#444',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>
          <p>© {new Date().getFullYear()} ANUSHKA RESIN ARTISTRY. THE PINNACLE OF LUXURY.</p>
          <div style={{ display: 'flex', gap: '4rem' }}>
            <a href="#" style={{ color: 'inherit' }}>Privacy</a>
            <a href="#" style={{ color: 'inherit' }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
