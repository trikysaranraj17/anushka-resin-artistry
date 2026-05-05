'use client'

import useReveal from '@/hooks/useReveal'

export default function Home() {
  useReveal()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* 1. Ultra-Luxury Hero Section */}
      <section style={{ 
        height: '100vh', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Parallax Background */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'url("https://images.unsplash.com/photo-1615800098779-1be32e60cca3?w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
          zIndex: -1,
          transform: 'scale(1.1)'
        }} className="parallax-bg"></div>

        <div className="reveal active" style={{ maxWidth: '1000px', padding: '0 2rem' }}>
          <h1 style={{ textTransform: 'uppercase', letterSpacing: '8px', marginBottom: '1.5rem' }}>
            Eternal <span className="text-gold">Artistry</span>
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#ccc', 
            maxWidth: '600px', 
            margin: '0 auto 3rem auto', 
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            letterSpacing: '2px',
            lineHeight: 1.8
          }}>
            Handcrafted luxury resin masterpieces designed to transform your space into a sophisticated sanctuary.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/products" className="btn-solid-gold">View Collections</a>
            <a href="/custom-orders" className="btn-gold">Bespoke Commission</a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{ 
          position: 'absolute', 
          bottom: '2rem', 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          opacity: 0.6
        }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Discover</span>
          <div style={{ width: '1px', height: '60px', background: 'var(--color-gold)', animation: 'scroll-line 2s infinite' }}></div>
        </div>
      </section>

      {/* 2. Collections Overview (Circular/Modern) */}
      <section className="container" style={{ padding: '10rem 2rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ textTransform: 'uppercase', letterSpacing: '4px' }}>Curated <span className="text-gold">Collections</span></h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', margin: '1.5rem auto' }}></div>
        </div>

        <div className="product-grid">
          {[
            { title: 'Signature Clocks', img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800', link: '/products' },
            { title: 'Statement Tables', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800', link: '/products' },
            { title: 'Preservation Art', img: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800', link: '/products' }
          ].map((cat, idx) => (
            <div key={idx} className="reveal luxury-card" style={{ padding: 0, textAlign: 'center' }}>
              <div className="img-zoom-container" style={{ height: '400px' }}>
                <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1.5rem' }}>{cat.title}</h3>
                <a href={cat.link} className="text-gold" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px' }}>EXPLORE COLLECTION →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Masterpiece (Split Layout) */}
      <section style={{ background: '#080808', padding: '10rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '6rem', alignItems: 'center' }}>
          <div className="reveal" style={{ flex: '1 1 500px' }}>
            <div className="img-zoom-container" style={{ position: 'relative', height: '600px', boxShadow: '30px 30px 0 var(--color-gold)' }}>
              <img src="https://images.unsplash.com/photo-1615800098779-1be32e60cca3?w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Masterpiece" />
            </div>
          </div>
          <div className="reveal" style={{ flex: '1 1 400px' }}>
            <h2 className="glow-text" style={{ fontSize: '3rem', lineHeight: 1.2 }}>The Art of <br/>Preservation</h2>
            <p style={{ color: '#aaa', margin: '2rem 0 3rem 0', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Each piece is a labor of love, combining premium epoxy resin with natural elements, metallic pigments, and meticulous craftsmanship. We don't just make art; we capture memories.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '1px', background: 'var(--color-gold)' }}></div>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Custom Colors & Dimensions</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '1px', background: 'var(--color-gold)' }}></div>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Premium Material Sourcing</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '1px', background: 'var(--color-gold)' }}></div>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Pan-India White Glove Delivery</span>
              </div>
            </div>
            <a href="/custom-orders" className="btn-gold" style={{ marginTop: '4rem' }}>Start Your Commission</a>
          </div>
        </div>
      </section>

      {/* 4. Luxury CTA Section */}
      <section style={{ padding: '10rem 2rem', textAlign: 'center', background: 'var(--color-black)' }}>
        <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>Elevate Your <span className="text-gold">Lifestyle</span></h2>
          <p style={{ color: '#888', marginBottom: '4rem', fontSize: '1.2rem' }}>
            Join our exclusive circle of collectors and receive early access to new collections and bespoke art updates.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <input type="email" placeholder="ENTER YOUR EMAIL" style={{ maxWidth: '400px', borderRadius: '0', border: 'none', borderBottom: '1px solid #333', background: 'transparent', marginBottom: 0 }} />
            <button className="btn-solid-gold">Join Now</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
