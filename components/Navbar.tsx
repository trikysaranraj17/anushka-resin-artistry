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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (pathname?.includes('/admin') || pathname?.includes('/login')) return null

  return (
    <>
      <div 
        style={{ 
          background: 'var(--gradient-mixed)', 
          color: 'var(--color-white)', 
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

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <img src="/logo.png?v=3" alt="Anushka" className="navbar-logo" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-name text-purple">
              ANUSHKA
            </span>
            <span className="brand-subtitle">Resin Artistry</span>
          </div>
        </a>

        {/* Desktop Navigation - Centered */}
        <div className="desktop-nav" style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem' }}>
          <a href="/" className="nav-link" style={{ fontWeight: 600 }}>Home</a>
          {['Collections', 'Gallery', 'Customization', 'Contact'].map((item) => (
            <a key={item} href={item === 'Customization' ? '/custom-orders' : item === 'Collections' ? '/products' : `/${item.toLowerCase()}`} className="nav-link" style={{ fontWeight: 600 }}>
              {item}
            </a>
          ))}
        </div>

        {/* Admin Button & Mobile Toggle - Right Aligned */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem', zIndex: 2200 }}>
          <a href="/admin" className="btn-purple desktop-nav" style={{ padding: '0.7rem 1.5rem', fontSize: '0.65rem' }}>Admin Portal</a>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--color-gold)', 
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '10px',
              cursor: 'pointer',
              zIndex: 3500
            }}
          >
            <span style={{ display: 'block', width: '30px', height: '2px', background: 'currentColor', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translateY(11px)' : 'none' }} />
            <span style={{ display: 'block', width: '30px', height: '2px', background: 'currentColor', opacity: isOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '30px', height: '2px', background: 'currentColor', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translateY(-11px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay - Scrollable & Responsive */}
      {isOpen && (
        <div 
          className="mobile-nav-overlay active"
          style={{ 
            position: 'fixed', inset: 0, 
            background: 'rgba(5,5,5,0.98)', 
            backdropFilter: 'blur(30px)', 
            zIndex: 3000,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-start',
            padding: '7rem 2rem 3rem 2rem',
            gap: '2rem',
            overflowY: 'auto',
            animation: 'fadeInUp 0.5s ease forwards'
          }}
        >
          <button onClick={() => setIsOpen(false)} style={{ position: 'fixed', top: '3rem', right: '2rem', background: 'none', border: 'none', color: 'var(--color-gold)', fontSize: '2rem', zIndex: 3100 }}>✕</button>
          
          <a href="/" className="mobile-nav-link" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '4px' }} onClick={() => setIsOpen(false)}>HOME</a>
          <a href="/products" className="mobile-nav-link" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '4px' }} onClick={() => setIsOpen(false)}>COLLECTIONS</a>
          <a href="/gallery" className="mobile-nav-link" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '4px' }} onClick={() => setIsOpen(false)}>GALLERY</a>
          <a href="/custom-orders" className="mobile-nav-link" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '4px' }} onClick={() => setIsOpen(false)}>CUSTOMIZATION</a>
          <a href="/contact" className="mobile-nav-link" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '4px' }} onClick={() => setIsOpen(false)}>CONTACT</a>
          
          <a href="/admin" className="btn-solid-gold" style={{ marginTop: '2rem', width: '80%', textAlign: 'center' }} onClick={() => setIsOpen(false)}>ADMIN PANEL</a>
        </div>
      )}
    </>
  )
}
