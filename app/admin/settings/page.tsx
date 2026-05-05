'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    hero_title: 'LIQUID LUXURY',
    hero_subtitle: 'Handcrafted resin masterpieces that redefine the boundaries of modern elegance.',
    hero_video: 'https://cdn.shopify.com/videos/c/o/v/6f7c6f0d9c4e4b5f8c1e8b3b3b3b3b3b.mp4',
    announcement: 'Ultra-Luxury Resin Masterpieces | Pan-India Shipping'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .single()
      
      if (data) setSettings(data)
      setLoading(false)
    }
    fetchSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    const { error } = await supabase
      .from('site_config')
      .upsert({ id: 1, ...settings })

    if (error) {
      alert('Error saving settings: ' + error.message)
    } else {
      alert('Settings saved successfully! Refresh the site to see changes.')
    }
    setSaving(false)
  }

  if (loading) return <div style={{ padding: '2rem' }}>Loading Settings...</div>

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '4rem' }}>
        <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Site Editor</h1>
        <p style={{ color: '#aaa' }}>Control your website's identity and visual content instantly.</p>
      </div>

      <form onSubmit={handleSave} className="glass" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>Home Page Hero</h2>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: '#888' }}>HERO TITLE</label>
          <input 
            type="text" 
            value={settings.hero_title} 
            onChange={e => setSettings({...settings, hero_title: e.target.value})}
            style={{ fontSize: '1.2rem', fontWeight: 700 }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: '#888' }}>HERO SUBTITLE</label>
          <textarea 
            rows={3}
            value={settings.hero_subtitle} 
            onChange={e => setSettings({...settings, hero_subtitle: e.target.value})}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: '#888' }}>HERO VIDEO URL</label>
          <input 
            type="text" 
            value={settings.hero_video} 
            onChange={e => setSettings({...settings, hero_video: e.target.value})}
          />
          <p style={{ fontSize: '0.7rem', color: '#555', marginTop: '0.5rem' }}>Paste a direct .mp4 link for a cinematic background video.</p>
        </div>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', margin: '2rem 0 1rem 0' }}>Global Banner</h2>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: '#888' }}>ANNOUNCEMENT TEXT</label>
          <input 
            type="text" 
            value={settings.announcement} 
            onChange={e => setSettings({...settings, announcement: e.target.value})}
          />
        </div>

        <button type="submit" className="btn-solid-gold" style={{ marginTop: '2rem', padding: '1.5rem' }} disabled={saving}>
          {saving ? 'UPDATING SITE...' : 'PUBLISH CHANGES'}
        </button>
      </form>
    </div>
  )
}
