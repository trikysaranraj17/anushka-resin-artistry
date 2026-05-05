'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import useReveal from '@/hooks/useReveal'

export default function Gallery() {
  const [media, setMedia] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  
  useReveal()

  const [settings, setSettings] = useState({
    gallery_title: 'ART GALLERY',
    gallery_subtitle: 'A visual journey through our most exquisite custom resin creations and preserved memories.'
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  
  useReveal()

  useEffect(() => {
    async function fetchContent() {
      const { data: config } = await supabase.from('site_config').select('gallery_title, gallery_subtitle').single()
      if (config) setSettings(config)
      
      const { data } = await supabase.from('media_center').select('*').order('created_at', { ascending: false })
      if (data) setMedia(data)
      setLoading(false)
    }
    fetchContent()
  }, [])

  return (
    <div style={{ padding: '10rem 0' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <h1 style={{ marginBottom: '1.5rem', letterSpacing: '8px', textTransform: 'uppercase' }}>{settings.gallery_title}</h1>
        <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', margin: '1.5rem auto' }}></div>
        <p style={{ color: '#888', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', letterSpacing: '1px' }}>
          {settings.gallery_subtitle}
        </p>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {loading ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#666' }}>Loading masterpieces...</p>
        ) : media.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#666' }}>Your gallery is empty. Upload media from the Admin Panel!</p>
        ) : (
          media.map((item, idx) => (
            <div key={item.id} className="reveal luxury-card" style={{ padding: 0, height: '450px', overflow: 'hidden', position: 'relative' }}>
              {item.type === 'image' ? (
                <div className="img-zoom-container" style={{ width: '100%', height: '100%' }}>
                  <img 
                    src={item.url} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    alt={item.title} 
                  />
                </div>
              ) : (
                <video 
                  src={item.url} 
                  autoPlay 
                  muted 
                  loop 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', 
                opacity: 0, 
                transition: 'opacity 0.5s ease', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'flex-end', 
                padding: '2.5rem' 
              }}
              className="hover-overlay"
              onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '0'}>
                <p style={{ color: 'var(--color-gold)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{item.category || 'Luxury Art'}</p>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>{item.title}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
