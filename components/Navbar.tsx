'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [announcement, setAnnouncement] = useState('Ultra-Luxury Resin Masterpieces | Pan-India Shipping')
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    
    async function fetchSettings() {
      const { data } = await supabase.from('site_config').select('announcement').single()
      if (data) setAnnouncement(data.announcement)
    }
    fetchSettings()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname?.includes('/admin') || pathname?.includes('/login')) return null

  return (
    <>
      <div 
        style={{ 
          background: 'var(--gradient-gold)', 
          color: 'var(--color-black)', 
          textAlign: 'center', 
          padding: '0.6rem', 
          fontSize: '0.7rem', 
          fontWeight: 800, 
          letterSpacing: '3px',
          textTransform: 'uppercase',
          position: 'fixed',
          top: 0, width: '100%',
          zIndex: 2100,
          animation: 'fadeInDown 1s ease forwards'
        }}
      >
        {announcement}
      </div>

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} style={{ top: '2.5rem' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <img src="/logo.png?v=3" alt="Anushka" style={{ height: '45px', filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.4))' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '4px', lineHeight: 1 }} className="text-gold">
              ANUSHKA
            </span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '3px', opacity: 0.6, textTransform: 'uppercase' }}>Resin Artistry</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{ gap: '3rem' }}>
          {['Collections', 'Gallery', 'Bespoke', 'Contact'].map((item) => (
            <a key={item} href={item === 'Bespoke' ? '/custom-orders' : item === 'Collections' ? '/products' : `/${item.toLowerCase()}`} className="nav-link" style={{ fontWeight: 600 }}>
              {item}
            </a>
          ))}
          <a href="/admin" className="btn-gold" style={{ padding: '0.7rem 2rem', fontSize: '0.65rem' }}>Admin Portal</a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--color-gold)', position: 'relative', width: '30px', height: '20px' }}
        >
          <span style={{ display: 'block', width: '100%', height: '2px', background: 'currentColor', position: 'absolute', top: 0, transition: '0.3s', transform: isOpen ? 'rotate(45deg) translateY(9px)' : 'none' }} />
          <span style={{ display: 'block', width: '100%', height: '2px', background: 'currentColor', position: 'absolute', top: '9px', opacity: isOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '100%', height: '2px', background: 'currentColor', position: 'absolute', bottom: 0, transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translateY(-9px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="mobile-nav-overlay active"
          style={{ background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(30px)', opacity: 1, visibility: 'visible', pointerEvents: 'all' }}
        >
          {['Home', 'Collections', 'Gallery', 'Bespoke', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={item === 'Home' ? '/' : item === 'Bespoke' ? '/custom-orders' : item === 'Collections' ? '/products' : `/${item.toLowerCase()}`} 
              className="mobile-nav-link" 
              onClick={() => setIsOpen(false)}
              style={{ fontSize: '2.5rem', fontWeight: 800 }}
            >
              {item}
            </a>
          ))}
          <a href="/admin" className="btn-solid-gold" style={{ marginTop: '3rem' }} onClick={() => setIsOpen(false)}>Admin Panel</a>
        </div>
      )}
    </>
  )
}
