'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import useReveal from '@/hooks/useReveal'

export default function Home() {
  const [settings, setSettings] = useState({
    hero_title: 'ANUSHKA RESIN ARTISTRY',
    hero_subtitle: 'Handcrafted resin masterpieces that redefine the boundaries of modern elegance.',
    hero_video: 'https://cdn.shopify.com/videos/c/o/v/6f7c6f0d9c4e4b5f8c1e8b3b3b3b3b3b.mp4'
  })
  const supabase = createClient()
  useReveal()

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('site_config').select('*').single()
      if (data) setSettings({ ...settings, ...data })
    }
    fetchSettings()
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* 1. Cinematic Hero Section with Dynamic Content */}
      <section style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <video
          key={settings.hero_video}
          autoPlay
          muted
          loop
          playsInline
          className="video-bg"
          src={settings.hero_video}
        />

        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 20%, #050505 100%)', zIndex: 0 }}></div>

        <div
          className="animate-fade-in"
          style={{ maxWidth: '1000px', padding: '0 2rem', zIndex: 1 }}
        >
          <h1
            style={{ textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 800, letterSpacing: '10px' }}
          >
            {settings.hero_title.split(' ').map((word, i) => (
              <span key={i} className="text-3d-luxury-gold" style={{ display: 'inline-block', marginRight: '1rem' }}>{word} </span>
            ))}
          </h1>
          <p style={{
            fontSize: '1.4rem',
            color: '#eee',
            maxWidth: '700px',
            margin: '0 auto 4rem auto',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            letterSpacing: '3px',
            lineHeight: 1.6
          }}>
            {settings.hero_subtitle}
          </p>
          <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/products" className="btn-solid-purple">Collections</a>
            <a href="/custom-orders" className="btn-gold">Customization Art</a>
            <a href="https://instagram.com/anushka_resin_artistry" target="_blank" className="btn-purple" style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              boxShadow: '0 0 20px rgba(122,0,204,0.4)',
              border: '1px solid var(--color-purple)'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📸</span> Visit Our Page
            </a>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}>
          <div style={{ width: '1px', height: '100px', background: 'var(--gradient-gold)', animation: 'scroll-line 3s infinite' }}></div>
        </div>
      </section>

      {/* 2. Collections Overview */}
      <section className="container" style={{ padding: '8rem 2rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ textTransform: 'uppercase', letterSpacing: '6px' }}><span className="text-gold">Masterpiece</span> <span className="text-purple">Galleries</span></h2>
          <div style={{ width: '60px', height: '1px', background: 'var(--gradient-mixed)', margin: '2rem auto' }}></div>
        </div>

        <div className="product-grid" style={{ gap: '6rem' }}>
          {[
            { title: 'Signature Clocks', img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1000', link: '/products' },
            { title: 'River Tables', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1000', link: '/products' },
            { title: 'Floral Preservation', img: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=1000', link: '/products' }
          ].map((cat, idx) => (
            <div key={idx} className="reveal luxury-card" style={{ textAlign: 'center', padding: 0 }}>
              <div className="img-zoom-container" style={{ height: '500px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', borderRadius: '4px' }}>
                <img src={cat.img} alt={cat.title} />
              </div>
              <div style={{ padding: '3rem' }}>
                <h3 style={{ fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '2rem' }}>{cat.title}</h3>
                <a href={cat.link} className="btn-gold" style={{ padding: '0.8rem 2rem', fontSize: '0.7rem' }}>Discover</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          51% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
