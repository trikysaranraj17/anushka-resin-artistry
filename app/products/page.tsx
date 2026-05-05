'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import useReveal from '@/hooks/useReveal'

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  useReveal()

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('SUPABASE ERROR (Products):', error.message)
      }
      
      if (data) setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <div style={{ padding: '12rem 0' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '8rem' }}>
        <h1 style={{ letterSpacing: '12px', textTransform: 'uppercase' }}>THE <span className="text-gold">COLLECTION</span></h1>
        <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', margin: '2rem auto' }}></div>
        <p style={{ color: '#888', fontSize: '1.1rem', letterSpacing: '2px', fontStyle: 'italic' }}>
          Exquisite resin masterpieces handcrafted for the discerning eye.
        </p>
      </div>

      <div className="container product-grid" style={{ gap: '6rem' }}>
        {loading ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', letterSpacing: '4px' }}>ACCESSING ARCHIVES...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#666' }}>The collection is currently private. Please check back soon.</p>
        ) : (
          products.map((product) => (
            <div 
              key={product.id} 
              className="reveal luxury-card" 
              style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.1)' }}
            >
              <div className="img-zoom-container" style={{ height: '450px' }}>
                <img src={product.image_url} alt={product.title} />
              </div>
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '4px', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>{product.category}</p>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', letterSpacing: '2px' }}>{product.title}</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2.5rem', color: 'var(--color-white)' }}>₹{product.price.toLocaleString()}</p>
                <a href={`/contact`} className="btn-gold" style={{ width: '100%', padding: '1rem' }}>Inquire Now</a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
