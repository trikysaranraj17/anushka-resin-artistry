'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Name Boards',
    description: '',
    image: null as File | null
  })

  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setProducts(data)
    setLoading(false)
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.image) return alert('Please upload a product image.')

    setUploading(true)
    try {
      // 1. Upload Image
      const fileExt = formData.image.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, formData.image)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)

      // 2. Save Product
      const { error: dbError } = await supabase
        .from('products')
        .insert([{
          title: formData.title,
          price: parseFloat(formData.price),
          category: formData.category,
          description: formData.description,
          image_url: publicUrl
        }])

      if (dbError) throw dbError

      alert('Product added successfully!')
      setShowForm(false)
      setFormData({ title: '', price: '', category: 'Name Boards', description: '', image: null })
      fetchProducts()
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const deleteProduct = async (id: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const fileName = imageUrl.split('/').pop()
      if (fileName) {
        await supabase.storage.from('products').remove([fileName])
      }
      await supabase.from('products').delete().eq('id', id)
      fetchProducts()
    } catch (error) {
      alert('Delete failed')
    }
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
        <div>
          <h1 className="glow-text" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>Products Management</h1>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Control your store's inventory and luxury collection.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-solid-gold" 
          style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', alignSelf: 'flex-start' }}
        >
          {showForm ? 'Close Form' : '+ Add New Product'}
        </button>
      </div>

      {showForm && (
        <div className="glass" style={{ padding: '1.5rem', marginBottom: '3rem', animation: 'fade-in 0.3s ease' }}>
          <h2 style={{ marginBottom: '2rem', color: 'var(--color-gold)' }}>Product Details</h2>
          <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Product Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Ocean Sparkle Tray" />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price (₹)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="1500" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ backgroundColor: '#111', color: 'white' }}>
                    <option value="Name Boards">Name Boards</option>
                    <option value="Tables">Resin Tables</option>
                    <option value="Keychains">Keychains</option>
                    <option value="Wall Art">Wall Art</option>
                    <option value="Preservation">Preservation Art</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Product Image</label>
                <input type="file" required accept="image/*" onChange={e => setFormData({...formData, image: e.target.files?.[0] || null})} />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                <textarea rows={6} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the masterpiece..."></textarea>
              </div>
              <button type="submit" className="btn-solid-gold" style={{ marginTop: 'auto', padding: '1rem' }} disabled={uploading}>
                {uploading ? 'Adding to Collection...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="glass" style={{ padding: '2rem' }}>
        <div className="table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
                <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Image</th>
                <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Product</th>
                <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Category</th>
                <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Price</th>
                <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center' }}>No products found. Start adding!</td></tr>
              ) : (
                products.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>
                      <img src={item.image_url} style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} alt="" />
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{item.title}</td>
                    <td style={{ padding: '1rem', color: '#aaa' }}>{item.category}</td>
                    <td style={{ padding: '1rem' }}>₹{item.price.toLocaleString()}</td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => deleteProduct(item.id, item.image_url)} style={{ color: '#F44336', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
