import Image from 'next/image'

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
      {/* Dramatic Hero Section */}
      <section style={{ 
        minHeight: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--color-black)',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
        textAlign: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow overlay */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, animation: 'pulse-glow 4s infinite alternate' }}></div>
        
        <div className="animate-fade-in" style={{ maxWidth: '900px', padding: '2rem', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/logo.png?v=3" alt="Anushka Resin Artistry Logo" className="responsive-logo" />
          
          <p style={{ fontSize: '1.5rem', marginBottom: '3rem', color: '#E0E0E0', fontFamily: 'var(--font-serif)', fontStyle: 'italic', letterSpacing: '2px' }}>
            Where liquid glass meets eternal elegance.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/products" className="btn-solid-gold">Explore Collection</a>
            <a href="/custom-orders" className="btn-gold">Commission Masterpiece</a>
            <a href="https://www.instagram.com/resin_artist0110/" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ border: '1px solid #E1306C', color: '#E1306C' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Visit our page
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ textTransform: 'uppercase', letterSpacing: '4px' }}>Our <span className="text-gold">Galleries</span></h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-gold)', margin: '1rem auto' }}></div>
          <p style={{ color: '#aaa', fontSize: '1.1rem' }}>Discover the perfect piece to elevate your space</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {[
            { title: 'Name Boards', img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600' },
            { title: 'Resin Tables', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600' },
            { title: 'Preservation Art', img: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600' }
          ].map((cat, idx) => (
            <div key={idx} className="glass" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '350px', background: `url(${cat.img}) center/cover`, transition: 'transform 0.7s ease' }} className="hover:scale-110"></div>
              <div style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
                <h3 style={{ marginBottom: '1rem' }}>{cat.title}</h3>
                <a href={`/products`} className="text-gold" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features/CTA */}
      <section style={{ position: 'relative', padding: '6rem 0', marginTop: '4rem' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url("https://images.unsplash.com/photo-1615800098779-1be32e60cca3?w=1200") center/cover', opacity: 0.1, zIndex: -1 }}></div>
        <div className="container glass" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', padding: '4rem', border: '1px solid rgba(212,175,55,0.3)' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 className="glow-text" style={{ marginBottom: '1.5rem', lineHeight: 1.1 }}>Bring Your Vision to Life</h2>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem', color: '#ccc' }}>
              We specialize in custom orders. Choose your primary and secondary colors, specify your dimensions, and let us craft a masterpiece unique to you.
            </p>
            <a href="/custom-orders" className="btn-solid-gold">Start Custom Order</a>
          </div>
          <div style={{ flex: '1 1 400px', height: '450px', background: 'url("https://images.unsplash.com/photo-1615800098779-1be32e60cca3?w=800") center/cover', borderRadius: '12px', boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)' }}>
          </div>
        </div>
      </section>
    </div>
  )
}
