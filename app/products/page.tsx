'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import useReveal from '@/hooks/useReveal'

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [errorInfo, setErrorInfo] = useState<string | null>(null)
  const supabase = createClient()
  useReveal(products)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) {
          setErrorInfo(error.message)
          console.error('SUPABASE ERROR (Products):', error.message)
        }
        
        if (data) setProducts(data)
      } catch (err: any) {
        setErrorInfo(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const isVideo = (url: string) => {
    if (!url) return false
    return url.match(/\.(mp4|webm|ogg|mov)$/) || url.includes('/video/')
  }

  return (
    <div style={{ padding: '12rem 0' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '8rem' }}>
        <h1 style={{ letterSpacing: '12px', textTransform: 'uppercase' }}>THE <span className="text-purple">COLLECTION</span></h1>
        <div style={{ width: '40px', height: '1px', background: 'var(--gradient-mixed)', margin: '2rem auto' }}></div>
        <p style={{ color: '#888', fontSize: '1.1rem', letterSpacing: '2px', fontStyle: 'italic' }}>
          Exquisite resin masterpieces handcrafted for the discerning eye.
        </p>
        {errorInfo && (
          <p style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '2rem' }}>SECURITY BLOCK: {errorInfo}</p>
        )}
      </div>

      <div className="container product-grid" style={{ gap: '6rem' }}>
        {loading ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', letterSpacing: '4px' }}>ACCESSING ARCHIVES...</p>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '4rem' }}>
            <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '2rem' }}>The collection is currently private or empty.</p>
            <div style={{ border: '1px solid #333', padding: '2rem', display: 'inline-block' }}>
              <p style={{ color: 'var(--color-gold)', fontSize: '0.8rem', marginBottom: '1rem' }}>ADMIN TROUBLESHOOTING:</p>
              <ul style={{ color: '#555', textAlign: 'left', fontSize: '0.8rem' }}>
                <li>1. Ensure you have run the RLS SQL policies.</li>
                <li>2. Check if the "products" table name matches exactly.</li>
                <li>3. Ensure products are set to "Public" in the uploader.</li>
              </ul>
            </div>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="reveal luxury-card" style={{ padding: 0 }}>
              <div className="img-zoom-container" style={{ height: '400px', background: '#050505', position: 'relative' }}>
                {isVideo(product.image_url) ? (
                  <video 
                    src={product.image_url} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--gradient-mixed)', color: 'white', padding: '0.3rem 0.8rem', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '2px', borderRadius: '4px' }}>
                  {product.category}
                </div>
              </div>
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', letterSpacing: '3px' }}>{product.title || product.name}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.8 }}>{product.description}</p>
                <div style={{ fontSize: '1.4rem', color: 'var(--color-gold)', fontWeight: 800, marginBottom: '2.5rem' }}>₹{product.price?.toLocaleString()}</div>
                <a href={`https://wa.me/919840706312?text=Inquiry about ${product.title || product.name}`} target="_blank" className="btn-purple" style={{ padding: '1rem 2.5rem' }}>INQUIRE NOW</a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
