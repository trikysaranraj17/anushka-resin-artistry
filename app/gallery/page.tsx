'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Gallery() {
  const [media, setMedia] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchMedia() {
      const { data } = await supabase
        .from('media_center')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setMedia(data)
      setLoading(false)
    }
    fetchMedia()
  }, [])

  return (
    <div className="animate-fade-in" style={{ padding: '6rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="glow-text" style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Art Gallery</h1>
        <div style={{ width: '60px', height: '2px', background: 'var(--color-gold)', margin: '1rem auto' }}></div>
        <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          A visual journey through our most exquisite custom resin creations and preserved memories.
        </p>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {loading ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>Loading masterpieces...</p>
        ) : media.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#666' }}>Your gallery is empty. Upload media from the Admin Panel!</p>
        ) : (
          media.map((item, idx) => (
            <div key={item.id} className="glass" style={{ height: idx % 3 === 0 ? '400px' : '300px', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.5s ease', position: 'relative' }}>
              {item.type === 'image' ? (
                <div 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: `url(${item.url}) center/cover`, 
                    transition: 'transform 0.5s ease' 
                  }} 
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              ) : (
                <video 
                  src={item.url} 
                  autoPlay 
                  muted 
                  loop 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}
                   onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                   onMouseOut={(e) => e.currentTarget.style.opacity = '0'}>
                <p className="glow-text" style={{ margin: 0, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>{item.title}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
