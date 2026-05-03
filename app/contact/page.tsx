'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    const { name, email, message } = formData
    if (!name || !email || !message) {
      alert("Please fill out all fields.")
      return
    }

    setIsSending(true)

    try {
      // 1. Background Email via FormSubmit
      await fetch("https://formsubmit.co/ajax/deepaksabari28@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            message,
            _subject: `New Inquiry from ${name}`
        })
      })

      // 2. Background Save to Supabase
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.from('contact_inquiries').insert([{ name, email, message }])

      setSubmitted(true)
    } catch (error) {
      console.error("Submission failed:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  if (submitted) {
    return (
      <div className="container animate-fade-in" style={{ padding: '10rem 0', textAlign: 'center' }}>
        <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem' }}>
          <div style={{ color: 'var(--color-gold)', fontSize: '5rem', marginBottom: '2rem' }}>✓</div>
          <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Message Sent!</h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
            Your inquiry has been received automatically. We will get back to you shortly.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-gold" style={{ marginTop: '2rem' }}>Send Another</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '6rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="glow-text" style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '2px' }}>Contact Us</h1>
        <div style={{ width: '60px', height: '2px', background: 'var(--color-gold)', margin: '1rem auto' }}></div>
        <p style={{ color: '#aaa', fontSize: '1.2rem' }}>We'd love to hear from you</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
        <div className="glass" style={{ flex: '1 1 400px', padding: '4rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-gold)' }}>Get In Touch</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '0.5rem' }}>Management</h3>
              <p className="glow-text" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Mr. Karthik</p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '0.5rem' }}>Phone / WhatsApp</h3>
              <p className="glow-text" style={{ fontSize: '1.5rem', fontWeight: 600 }}>+91 98407 06312</p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '0.5rem' }}>Email</h3>
              <p className="glow-text" style={{ fontSize: '1.2rem', fontWeight: 600 }}>jayachandran.r0110@gmail.com</p>
            </div>
          </div>

          <div style={{ marginTop: '4rem' }}>
            <a href="https://wa.me/918838225583" target="_blank" rel="noopener noreferrer" className="btn-solid-gold" style={{ width: '100%', textAlign: 'center' }}>
              Direct WhatsApp
            </a>
          </div>
        </div>

        <div className="glass" style={{ flex: '1 1 400px', padding: '4rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-gold)' }}>Send a Message</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Name</label>
              <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Email</label>
              <input type="email" placeholder="Your Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Message</label>
              <textarea placeholder="How can we help you?" rows={5} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
            </div>
            <button type="submit" className="btn-solid-gold" style={{ width: '100%', opacity: isSending ? 0.7 : 1 }} disabled={isSending}>
              {isSending ? 'Sending Masterpiece...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
