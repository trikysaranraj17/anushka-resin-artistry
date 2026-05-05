'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname?.includes('/admin') || pathname?.includes('/login')) return null

  return (
    <>
      {/* Announcement Bar */}
      <div style={{ 
        background: 'var(--color-gold)', 
        color: 'var(--color-black)', 
        textAlign: 'center', 
        padding: '0.5rem', 
        fontSize: '0.75rem', 
        fontWeight: 700, 
        letterSpacing: '2px',
        textTransform: 'uppercase',
        position: 'relative',
        zIndex: 1001
      }}>
        Premium Handcrafted Resin Art | Pan-India Delivery
      </div>

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo.png?v=3" alt="Logo" style={{ height: '40px' }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '1px' }} className="glow-text">
            ANUSHKA
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <a href="/products" className="nav-link">Collections</a>
          <a href="/gallery" className="nav-link">Gallery</a>
          <a href="/custom-orders" className="nav-link">Custom Orders</a>
          <a href="/contact" className="nav-link">Contact</a>
          <a href="/admin" className="btn-gold" style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem' }}>Admin</a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--color-gold)' }}
        >
          <div style={{ width: '25px', height: '2px', background: 'currentColor', marginBottom: '6px', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
          <div style={{ width: '25px', height: '2px', background: 'currentColor', marginBottom: '6px', opacity: isOpen ? 0 : 1 }}></div>
          <div style={{ width: '25px', height: '2px', background: 'currentColor', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></div>
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`}>
        <a href="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</a>
        <a href="/products" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Collections</a>
        <a href="/gallery" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Gallery</a>
        <a href="/custom-orders" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Custom Orders</a>
        <a href="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact</a>
        <a href="/admin" className="btn-solid-gold" style={{ marginTop: '2rem' }} onClick={() => setIsOpen(false)}>Admin Panel</a>
      </div>
    </>
  )
}
