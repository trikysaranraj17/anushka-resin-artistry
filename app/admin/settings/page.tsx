'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    hero_title: 'LIQUID LUXURY',
    hero_subtitle: 'Handcrafted resin masterpieces that redefine the boundaries of modern elegance.',
    hero_video: 'https://cdn.shopify.com/videos/c/o/v/6f7c6f0d9c4e4b5f8c1e8b3b3b3b3b3b.mp4',
    announcement: 'Ultra-Luxury Resin Masterpieces | Pan-India Shipping',
    gallery_title: 'ART GALLERY',
    gallery_subtitle: 'A visual journey through our most exquisite custom resin creations.',
    custom_title: 'BESPOKE ARTISTRY',
    custom_subtitle: 'Collaborate with our master artisans to create a one-of-a-kind masterpiece.',
    contact_mgmt: 'Mr. Karthik',
    contact_phone: '+91 98407 06312',
    contact_email: 'jayachandran.r0110@gmail.com'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('site_config').select('*').single()
      if (data) setSettings({ ...settings, ...data })
      setLoading(false)
    }
    fetchSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.from('site_config').upsert({ id: 1, ...settings })
    if (error) alert('Error: ' + error.message)
    else alert('Global Site Updates Published!')
    setSaving(false)
  }

  if (loading) return <div style={{ padding: '2rem' }}>Loading Master Control...</div>

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '4rem' }}>
        <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Master Site Editor</h1>
        <p style={{ color: '#aaa' }}>Update every word on your website from this single dashboard.</p>
      </div>

      <form onSubmit={handleSave} className="glass" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Section 1: Home Page */}
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '1rem' }}>Home Page</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>HERO TITLE</label>
              <input type="text" value={settings.hero_title} onChange={e => setSettings({...settings, hero_title: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>VIDEO URL</label>
              <input type="text" value={settings.hero_video} onChange={e => setSettings({...settings, hero_video: e.target.value})} />
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>HERO SUBTITLE</label>
            <textarea rows={2} value={settings.hero_subtitle} onChange={e => setSettings({...settings, hero_subtitle: e.target.value})} />
          </div>
        </div>

        {/* Section 2: Gallery Page */}
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '1rem' }}>Gallery Page</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>GALLERY TITLE</label>
              <input type="text" value={settings.gallery_title} onChange={e => setSettings({...settings, gallery_title: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>GALLERY SUBTEXT</label>
              <input type="text" value={settings.gallery_subtitle} onChange={e => setSettings({...settings, gallery_subtitle: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Section 3: Customization Page */}
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '1rem' }}>Customization Page</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>HEADER TITLE</label>
              <input type="text" value={settings.custom_title} onChange={e => setSettings({...settings, custom_title: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>SUBTEXT</label>
              <input type="text" value={settings.custom_subtitle} onChange={e => setSettings({...settings, custom_subtitle: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Section 4: Contact Page */}
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '1rem' }}>Contact Page Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>MANAGEMENT NAME</label>
              <input type="text" value={settings.contact_mgmt} onChange={e => setSettings({...settings, contact_mgmt: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>PHONE / WHATSAPP</label>
              <input type="text" value={settings.contact_phone} onChange={e => setSettings({...settings, contact_phone: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>BUSINESS EMAIL</label>
              <input type="text" value={settings.contact_email} onChange={e => setSettings({...settings, contact_email: e.target.value})} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-solid-gold" style={{ padding: '1.5rem', fontSize: '1rem' }} disabled={saving}>
          {saving ? 'UPDATING ENTIRE SITE...' : 'SAVE ALL CHANGES'}
        </button>
      </form>
    </div>
  )
}
