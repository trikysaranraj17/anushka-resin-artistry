'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <div className="animate-fade-in">
      <div style={{ padding: '6rem 0', textAlign: 'center', background: 'radial-gradient(ellipse at bottom, rgba(212,175,55,0.1) 0%, transparent 70%)' }}>
        <h1 className="glow-text" style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Our Collection</h1>
        <div style={{ width: '60px', height: '2px', background: 'var(--color-gold)', margin: '1rem auto' }}></div>
        <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
          Explore our handcrafted range of luxury resin products.
        </p>
      </div>

      <div className="container" style={{ padding: '2rem 0 6rem 0', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
        {/* Sidebar Filters */}
        <aside style={{ width: '250px', flexShrink: 0 }}>
          <div className="glass" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
            <h3 className="glow-text" style={{ marginBottom: '1.5rem', fontSize: '1.2rem', textTransform: 'uppercase' }}>Categories</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" className="text-gold" style={{ fontWeight: 600 }}>All Products</a></li>
              <li><a href="#" style={{ color: '#aaa' }}>Name Boards</a></li>
              <li><a href="#" style={{ color: '#aaa' }}>Keychains</a></li>
              <li><a href="#" style={{ color: '#aaa' }}>Pendants</a></li>
              <li><a href="#" style={{ color: '#aaa' }}>Wall Hangings</a></li>
              <li><a href="#" style={{ color: '#aaa' }}>Preservation Art</a></li>
              <li><a href="/custom-orders" style={{ color: '#aaa' }}>Resin Tables (Custom)</a></li>
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '3rem' }}>
          {loading ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Loading masterpieces...</p>
          ) : products.length === 0 ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666' }}>No products found. Add some from the Admin Panel!</p>
          ) : (
            products.map((product) => (
              <a href={`/products/${product.id}`} key={product.id} className="glass" style={{ display: 'block', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ height: '320px', background: `url(${product.image_url}) center/cover`, transition: 'transform 0.5s ease' }} className="hover:scale-110"></div>
                <div style={{ padding: '2rem' }}>
                  <p style={{ color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{product.category}</p>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{product.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="btn-gold" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>View</span>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
