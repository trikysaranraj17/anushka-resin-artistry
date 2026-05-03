'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="glass" style={{ position: 'sticky', top: '1rem', zIndex: 100, padding: '1rem 2rem', margin: '1rem', borderRadius: '50px' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo.png?v=3" alt="Logo" style={{ height: '35px', filter: 'drop-shadow(0 0 5px rgba(212,175,55,0.5))' }} />
          <span style={{ fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700 }} className="glow-text">
            Anushka Resin Artistry
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <a href="/products">Shop</a>
          <a href="/gallery">Gallery</a>
          <a href="/custom-orders">Custom Orders</a>
          <a href="/contact">Contact</a>
          <a href="/admin" className="btn-gold" style={{ padding: '0.5rem 1.5rem' }}>Admin Panel</a>
        </div>

        {/* Mobile Toggle Button */}
        <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          <span style={{ transform: isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none' }}></span>
          <span style={{ opacity: isOpen ? 0 : 1 }}></span>
          <span style={{ transform: isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`}>
        <a href="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</a>
        <a href="/products" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Shop</a>
        <a href="/gallery" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Gallery</a>
        <a href="/custom-orders" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Custom Orders</a>
        <a href="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact</a>
        <a href="/admin" className="btn-solid-gold" style={{ marginTop: '1rem' }} onClick={() => setIsOpen(false)}>Admin Panel</a>
      </div>
    </nav>
  )
}
