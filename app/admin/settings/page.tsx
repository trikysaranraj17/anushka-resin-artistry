'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    hero_title: 'LIQUID LUXURY',
    hero_subtitle: 'Handcrafted resin masterpieces that redefine the boundaries of modern elegance.',
    hero_video: 'https://cdn.shopify.com/videos/c/o/v/6f7c6f0d9c4e4b5f8c1e8b3b3b3b3b3b.mp4',
    announcement: 'Ultra-Luxury Resin Masterpieces | Pan-India Shipping',
    about_text: 'Every piece is hand-poured with industrial-grade premium resin, infused with raw pigments and 24k gold leaf accents.',
    footer_about: 'Crafting eternal elegance through liquid glass. Our resin masterpieces are designed to bring a touch of sophisticated luxury to modern spaces.'
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
    else alert('Site updated successfully!')
    setSaving(false)
  }

  if (loading) return <div style={{ padding: '2rem' }}>Loading Settings...</div>

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '4rem' }}>
        <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Global Site Editor</h1>
        <p style={{ color: '#aaa' }}>Update your entire brand identity and content from this central hub.</p>
      </div>

      <form onSubmit={handleSave} className="glass" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Section 1: Hero */}
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '1rem' }}>1. Hero Experience</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>MAIN TITLE</label>
              <input type="text" value={settings.hero_title} onChange={e => setSettings({...settings, hero_title: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>VIDEO BACKGROUND URL</label>
              <input type="text" value={settings.hero_video} onChange={e => setSettings({...settings, hero_video: e.target.value})} />
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>SUBTITLE / BRAND STATEMENT</label>
            <textarea rows={3} value={settings.hero_subtitle} onChange={e => setSettings({...settings, hero_subtitle: e.target.value})} />
          </div>
        </div>

        {/* Section 2: Branding */}
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '1rem' }}>2. Global Branding</h2>
          <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>TOP ANNOUNCEMENT BANNER</label>
          <input type="text" value={settings.announcement} onChange={e => setSettings({...settings, announcement: e.target.value})} />
        </div>

        {/* Section 3: About Us (Home Page) */}
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '1rem' }}>3. About Our Craft (Home Page)</h2>
          <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>CRAFTSMANSHIP STORY</label>
          <textarea rows={5} value={settings.about_text} onChange={e => setSettings({...settings, about_text: e.target.value})} />
        </div>

        {/* Section 4: Footer */}
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '1rem' }}>4. Footer Branding</h2>
          <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', letterSpacing: '2px' }}>FOOTER ABOUT TEXT</label>
          <textarea rows={3} value={settings.footer_about} onChange={e => setSettings({...settings, footer_about: e.target.value})} />
        </div>

        <button type="submit" className="btn-solid-gold" style={{ padding: '1.5rem', fontSize: '1rem' }} disabled={saving}>
          {saving ? 'SYNCING ALL PAGES...' : 'PUBLISH SITE UPDATES'}
        </button>
      </form>
    </div>
  )
}
