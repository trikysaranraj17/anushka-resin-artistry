'use client'

import { useState, useEffect } from 'react'
import useReveal from '@/hooks/useReveal'
import { createClient } from '@/lib/supabase/client'

export default function Contact() {
  const [settings, setSettings] = useState({
    contact_mgmt: 'Mr. Karthik',
    contact_phone: '+91 98407 06312',
    contact_email: 'jayachandran.r0110@gmail.com'
  })
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const supabase = createClient()
  useReveal()

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('site_config').select('contact_mgmt, contact_phone, contact_email').single()
      if (data) setSettings(data)
    }
    fetchSettings()
  }, [])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    try {
      await supabase.from('contact_inquiries').insert([{ ...formData }])
      setSubmitted(true)
    } catch (error) {
      alert("Error sending message.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div style={{ padding: '12rem 0' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '8rem' }}>
        <h1 style={{ letterSpacing: '12px', textTransform: 'uppercase' }}>GET IN <span className="text-gold">TOUCH</span></h1>
        <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', margin: '2rem auto' }}></div>
        <p style={{ color: '#888', fontSize: '1.1rem', letterSpacing: '2px', fontStyle: 'italic' }}>
          Connect with our curation team to bring luxury resin art to your doorstep.
        </p>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '8rem' }}>
        <div className="reveal">
          <div className="glass" style={{ padding: '4rem', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '3rem', letterSpacing: '3px' }}>LUXURY <span className="text-gold">CONCIERGE</span></h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div>
                <h4 style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>Curation Management</h4>
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{settings.contact_mgmt}</p>
              </div>
              
              <div>
                <h4 style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>WhatsApp Concierge</h4>
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{settings.contact_phone}</p>
              </div>
              
              <div>
                <h4 style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>Direct Correspondence</h4>
                <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#aaa' }}>{settings.contact_email}</p>
              </div>

              <a href={`https://wa.me/${settings.contact_phone.replace(/[^0-9]/g, '')}`} target="_blank" className="btn-solid-gold" style={{ textAlign: 'center', marginTop: '2rem' }}>
                CONNECT ON WHATSAPP
              </a>
            </div>
          </div>
        </div>

        <div className="reveal">
          <div className="glass" style={{ padding: '4rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <div style={{ color: 'var(--color-gold)', fontSize: '5rem', marginBottom: '2rem' }}>💎</div>
                <h2 style={{ marginBottom: '1.5rem', letterSpacing: '2px' }}>INQUIRY RECEIVED</h2>
                <p style={{ color: '#aaa' }}>Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', letterSpacing: '3px' }}>DIRECT <span className="text-gold">INQUIRY</span></h2>
                <input type="text" placeholder="YOUR NAME" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="YOUR EMAIL" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <textarea placeholder="HOW CAN WE ASSIST YOU?" rows={5} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                <button type="submit" className="btn-solid-gold" style={{ padding: '1.5rem' }} disabled={isSending}>
                  {isSending ? 'TRANSMITTING...' : 'SEND INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
