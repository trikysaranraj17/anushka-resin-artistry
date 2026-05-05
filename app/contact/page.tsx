'use client'

import { useState } from 'react'
import useReveal from '@/hooks/useReveal'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  useReveal()

  const handleSend = async () => {
    const { name, email, message } = formData
    if (!name || !email || !message) {
      alert("Please fill out all fields.")
      return
    }

    setIsSending(true)

    try {
      await fetch("https://formsubmit.co/ajax/deepaksabari28@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            name, email, message,
            _subject: `New Inquiry from ${name}`
        })
      })

      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.from('contact_inquiries').insert([{ name, email, message }])

      setSubmitted(true)
    } catch (error) {
      alert("Something went wrong. Please try again.")
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
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>Mr. Karthik</p>
              </div>
              
              <div>
                <h4 style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>WhatsApp Concierge</h4>
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>+91 98407 06312</p>
              </div>
              
              <a href="https://wa.me/919840706312" target="_blank" className="btn-solid-gold" style={{ textAlign: 'center', marginTop: '2rem' }}>
                CONNECT ON WHATSAPP
              </a>
            </div>
          </div>
        </div>

        <div className="reveal">
          <div className="glass" style={{ padding: '4rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }} className="animate-fade-in">
                <div style={{ color: 'var(--color-gold)', fontSize: '5rem', marginBottom: '2rem' }}>💎</div>
                <h2 style={{ marginBottom: '1.5rem', letterSpacing: '2px' }}>INQUIRY RECEIVED</h2>
                <p style={{ color: '#aaa' }}>Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', letterSpacing: '3px' }}>DIRECT <span className="text-gold">INQUIRY</span></h2>
                <input type="text" placeholder="YOUR NAME" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '1.2rem', borderRadius: 0 }} />
                <input type="email" placeholder="YOUR EMAIL" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '1.2rem', borderRadius: 0 }} />
                <textarea placeholder="HOW CAN WE ASSIST YOU?" rows={5} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ padding: '1.2rem', borderRadius: 0 }}></textarea>
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
