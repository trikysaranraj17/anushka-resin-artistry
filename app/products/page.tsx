import Image from 'next/image'

export default function Products() {
  const products = [
    { id: "1", title: "Ocean Wave Name Board", price: 1500, category: "Name Boards", image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800" },
    { id: "2", title: "Gold Flake Keychain", price: 250, category: "Keychains", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800" },
    { id: "3", title: "Botanical Pendant", price: 450, category: "Pendants", image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800" },
    { id: "4", title: "Geode Wall Art", price: 3500, category: "Wall Hangings", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800" },
    { id: "5", title: "Wedding Varmala Preservation", price: 5000, category: "Preservation", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800" },
    { id: "6", title: "Custom Resin Table", price: 0, category: "Tables", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800" }
  ]

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
          {products.map((product) => (
            <a href={`/products/${product.id}`} key={product.id} className="glass" style={{ display: 'block', borderRadius: '16px', overflow: 'hidden', group: 'hover' }}>
              <div style={{ height: '320px', background: `url(${product.image}) center/cover`, transition: 'transform 0.5s ease' }} className="hover:scale-110"></div>
              <div style={{ padding: '2rem' }}>
                <p style={{ color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{product.category}</p>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{product.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                    {product.price > 0 ? `₹${product.price.toLocaleString()}` : 'Custom Price'}
                  </span>
                  <span className="btn-gold" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>View</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
