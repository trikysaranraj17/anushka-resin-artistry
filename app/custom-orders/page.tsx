'use client'

import { useState, useEffect } from 'react'
import useReveal from '@/hooks/useReveal'
import { createClient } from '@/lib/supabase/client'

export default function CustomOrders() {
  const [settings, setSettings] = useState({
    custom_title: 'BESPOKE ARTISTRY',
    custom_subtitle: 'Collaborate with our master artisans to create a one-of-a-kind resin masterpiece tailored to your exact vision.'
  })
  
  const [formData, setFormData] = useState({
    category: 'Resin Tables',
    primaryColor: '#D4AF37',
    secondaryColor: '#ffffff',
    dimensions: '',
    specialRequests: '',
    name: '',
    phone: '',
    email: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const supabase = createClient()
  useReveal()

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('site_config').select('custom_title, custom_subtitle').single()
      if (data) setSettings(data)
    }
    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    try {
      const { category, primaryColor, secondaryColor, dimensions, specialRequests, name, phone, email } = formData
      await supabase.from('custom_orders').insert([{
        customer_name: name, email, phone, category, dimensions,
        special_requests: specialRequests, status: 'pending'
      }])
      setSubmitted(true)
    } catch (error) {
      alert("Submission failed.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div style={{ padding: '12rem 0' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '8rem' }}>
        <h1 style={{ letterSpacing: '12px', textTransform: 'uppercase' }}>{settings.custom_title}</h1>
        <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', margin: '2rem auto' }}></div>
        <p style={{ color: '#888', fontSize: '1.1rem', letterSpacing: '2px', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto' }}>
          {settings.custom_subtitle}
        </p>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '8rem' }}>
        <div className="reveal">
          <div className="glass" style={{ padding: '4rem', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <div style={{ color: 'var(--color-gold)', fontSize: '5rem', marginBottom: '2rem' }}>💎</div>
                <h2 style={{ marginBottom: '1.5rem', letterSpacing: '2px' }}>REQUEST SUBMITTED</h2>
                <p style={{ color: '#aaa' }}>We will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 700 }}>COLLECTION TYPE</label>
                  <select name="category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '1.2rem', borderRadius: 0 }}>
                    <option value="MANDELA ART">Mandela Art</option>
                    <option value="PENDANTS">Pendants</option>
                    <option value="WALL CLOCKS">Wall Clocks</option>
                    <option value="VARMALA PRESERVATION">Varmala Preservation</option>
                    <option value="Resin Tables">Resin Tables</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <input type="text" placeholder="YOUR NAME" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input type="tel" placeholder="WHATSAPP NUMBER" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <input type="email" placeholder="EMAIL ADDRESS" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <textarea placeholder="DESCRIBE YOUR VISION..." rows={4} value={formData.specialRequests} onChange={e => setFormData({...formData, specialRequests: e.target.value})} />
                <button type="submit" className="btn-solid-gold" style={{ padding: '1.5rem' }} disabled={isSending}>
                  {isSending ? 'PROCESSING...' : 'SUBMIT COMMISSION'}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="reveal">
          <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>Our <span className="text-gold">Process</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {['CONCEPTUALIZATION', 'QUOTATION', 'CRAFTING', 'CURATION'].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '2rem' }}>
                <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>0{i+1}</span>
                <h3 style={{ fontSize: '1rem', letterSpacing: '3px' }}>{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
