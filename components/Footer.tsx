'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Footer() {
  const [footerText, setFooterText] = useState('Crafting eternal elegance through liquid glass. Our resin masterpieces are designed to bring a touch of sophisticated luxury to modern spaces.')
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    async function fetchFooter() {
      const { data } = await supabase.from('site_config').select('footer_about').single()
      if (data?.footer_about) setFooterText(data.footer_about)
    }
    fetchFooter()
  }, [])

  if (pathname?.includes('/admin') || pathname?.includes('/login')) return null

  return (
    <footer style={{ background: '#0A0A0A', padding: '15rem 0 5rem 0', borderTop: '1px solid rgba(212, 175, 55, 0.2)', position: 'relative', overflow: 'hidden' }}>
      {/* Luxury Resin Ocean Animation */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '500px', background: 'radial-gradient(ellipse at bottom, rgba(125, 60, 152, 0.4) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 1 }} />
        
        <div className="wave-layer wave-layer-1" style={{ position: 'absolute', bottom: '-15%', left: '-50%', width: '200%', height: '400px', background: 'radial-gradient(ellipse at top, #2A0A2F, transparent 80%)', borderRadius: '50%', filter: 'blur(30px)', opacity: 0.8, zIndex: 2 }}></div>
        <div className="wave-layer wave-layer-2" style={{ position: 'absolute', bottom: '-25%', left: '-30%', width: '150%', height: '350px', background: 'radial-gradient(ellipse at top, #5B2C83, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.7, zIndex: 3 }}></div>
        <div className="wave-layer wave-layer-3" style={{ position: 'absolute', bottom: '-35%', left: '-60%', width: '250%', height: '300px', background: 'radial-gradient(ellipse at top, #7D3C98, transparent 60%)', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.6, zIndex: 4 }}></div>

        {/* Dynamic Gold Particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className="gold-particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 4}s`
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8rem', marginBottom: '8rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/logo.png?v=3" alt="Logo" style={{ height: '80px', marginBottom: '3rem', filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.3))' }} />
            <h2 style={{ fontSize: '2rem', letterSpacing: '8px', marginBottom: '1.5rem' }}>ANUSHKA</h2>
            <p style={{ color: '#666', fontSize: '1rem', lineHeight: 2, maxWidth: '450px' }}>
              {footerText}
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '5px', fontSize: '0.9rem', marginBottom: '3rem', color: 'var(--color-gold)' }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <a href="/" className="nav-link" style={{ fontSize: '0.9rem', letterSpacing: '2px' }}>Home</a>
              <a href="/products" className="nav-link" style={{ fontSize: '0.9rem', letterSpacing: '2px' }}>Collections</a>
              <a href="/gallery" className="nav-link" style={{ fontSize: '0.9rem', letterSpacing: '2px' }}>Gallery</a>
              <a href="/custom-orders" className="nav-link" style={{ fontSize: '0.9rem', letterSpacing: '2px' }}>Customization</a>
              <a href="/contact" className="nav-link" style={{ fontSize: '0.9rem', letterSpacing: '2px' }}>Contact</a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ textTransform: 'uppercase', letterSpacing: '5px', fontSize: '0.9rem', marginBottom: '3rem', color: 'var(--color-gold)' }}>Contact</h4>
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
