'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function AdminMedia() {
  const [media, setMedia] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState<'image' | 'video'>('image')
  const [category, setCategory] = useState('Gallery')
  const [file, setFile] = useState<File | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchMedia()
  }, [])

  async function fetchMedia() {
    setLoading(true)
    const { data, error } = await supabase
      .from('media_center')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setMedia(data)
    setLoading(false)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) return alert('Please provide a title and a file.')

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // 1. Upload to Supabase Storage (Bucket: 'media')
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      // 2. Save to Database
      const { error: dbError } = await supabase
        .from('media_center')
        .insert([{ title, url: publicUrl, type, category }])

      if (dbError) throw dbError

      alert('Media uploaded successfully!')
      setTitle('')
      setFile(null)
      fetchMedia()
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const deleteMedia = async (id: string, url: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return

    try {
      // Extract file path from URL
      const path = url.split('/').pop()
      if (path) {
        await supabase.storage.from('media').remove([path])
      }
      await supabase.from('media_center').delete().eq('id', id)
      fetchMedia()
    } catch (error) {
      alert('Delete failed')
    }
  }

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Media Center</h1>
        <p style={{ color: '#aaa' }}>Upload and manage images and videos for your gallery.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
        {/* Upload Form */}
        <div className="glass" style={{ padding: '2.5rem', height: 'fit-content' }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', color: 'var(--color-gold)' }}>Upload New Media</h2>
          <form onSubmit={handleUpload}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Ocean Wave Close-up" required />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Type</label>
                <select value={type} onChange={e => setType(e.target.value as any)} style={{ backgroundColor: '#111', color: 'white', border: '1px solid #333' }}>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category / Page</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={{ backgroundColor: '#111', color: 'white', border: '1px solid #333' }}>
                  <option value="Gallery">Main Gallery</option>
                  <option value="Home">Home Page Hero</option>
                  <option value="Name Boards">Name Boards</option>
                  <option value="Tables">Resin Tables</option>
                  <option value="Preservation">Preservation Art</option>
                  <option value="Wall Art">Wall Art</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>File</label>
              <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} required accept={type === 'image' ? 'image/*' : 'video/*'} />
            </div>

            <button type="submit" className="btn-solid-gold" style={{ width: '100%' }} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload to Gallery'}
            </button>
          </form>
        </div>

        {/* Media List */}
        <div className="glass" style={{ padding: '2.5rem' }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Gallery Content</h2>
          {loading ? (
            <p>Loading gallery...</p>
          ) : media.length === 0 ? (
            <p style={{ color: '#666' }}>No media uploaded yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
              {media.map((item) => (
                <div key={item.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                  {item.type === 'image' ? (
                    <img src={item.url} style={{ width: '100%', height: '150px', objectFit: 'cover' }} alt={item.title} />
                  ) : (
                    <div style={{ width: '100%', height: '150px', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎥</div>
                  )}
                  <div style={{ padding: '0.8rem', background: '#0a0a0a' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                    <button onClick={() => deleteMedia(item.id, item.url)} style={{ color: '#F44336', background: 'none', border: 'none', fontSize: '0.7rem', cursor: 'pointer', padding: 0 }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
