'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import useReveal from '@/hooks/useReveal'

export default function CustomOrders() {
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
  useReveal()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    
    const { category, primaryColor, secondaryColor, dimensions, specialRequests, name, phone, email } = formData
    
    try {
      // 1. Background Email via FormSubmit
      await fetch("https://formsubmit.co/ajax/deepaksabari28@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            name,
            phone,
            email,
            category,
            colors: `${primaryColor}, ${secondaryColor}`,
            dimensions,
            requests: specialRequests,
            _subject: `NEW CUSTOM ORDER: ${category} from ${name}`
        })
      })

      // 2. Background Save to Supabase
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.from('custom_orders').insert([{
        customer_name: name,
        email,
        phone,
        category,
        dimensions,
        special_requests: specialRequests,
        status: 'pending'
      }])

      setSubmitted(true)
    } catch (error) {
      console.error("Custom order failed:", error)
      alert("Submission failed. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div style={{ padding: '12rem 0' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '8rem' }}>
        <h1 style={{ letterSpacing: '12px', textTransform: 'uppercase' }}>BESPOKE <span className="text-gold">ARTISTRY</span></h1>
        <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', margin: '2rem auto' }}></div>
        <p style={{ color: '#888', fontSize: '1.1rem', letterSpacing: '2px', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto' }}>
          Collaborate with our master artisans to create a one-of-a-kind resin masterpiece tailored to your exact vision.
        </p>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '8rem' }}>
        <div className="reveal">
          <div className="glass" style={{ padding: '4rem', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '4rem 0' }}
              >
                <div style={{ color: 'var(--color-gold)', fontSize: '5rem', marginBottom: '2rem' }}>💎</div>
                <h2 style={{ marginBottom: '1.5rem', letterSpacing: '2px' }}>REQUEST SUBMITTED</h2>
                <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: 1.8 }}>We have received your custom request. A consultant will contact you shortly to discuss your masterpiece.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 700 }}>COLLECTION TYPE</label>
                  <select name="category" value={formData.category} onChange={handleChange} style={{ padding: '1.2rem', borderRadius: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                    <option value="Resin Tables">Resin Tables (Custom Size)</option>
                    <option value="Name Boards">Name Boards</option>
                    <option value="Preservation Art">Preservation Art</option>
                    <option value="Wall Hangings">Wall Hangings</option>
                    <option value="Other">Other Custom Order</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 700 }}>PRIMARY HUE</label>
                    <input type="color" name="primaryColor" value={formData.primaryColor} onChange={handleChange} style={{ padding: '0', height: '60px', borderRadius: 0, border: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 700 }}>SECONDARY HUE</label>
                    <input type="color" name="secondaryColor" value={formData.secondaryColor} onChange={handleChange} style={{ padding: '0', height: '60px', borderRadius: 0, border: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 700 }}>DIMENSIONS (CM/FT)</label>
                  <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="e.g. 120cm x 60cm" style={{ padding: '1.2rem', borderRadius: 0 }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 700 }}>ARTISTIC VISION</label>
                  <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} placeholder="Describe your masterpiece..." rows={4} style={{ padding: '1.2rem', borderRadius: 0 }}></textarea>
                </div>

                <div style={{ margin: '2rem 0', height: '1px', background: 'rgba(212,175,55,0.1)' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="YOUR NAME" style={{ padding: '1.2rem', borderRadius: 0 }} />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="WHATSAPP NUMBER" style={{ padding: '1.2rem', borderRadius: 0 }} />
                </div>

                <button type="submit" className="btn-solid-gold" style={{ padding: '1.5rem' }} disabled={isSending}>
                  {isSending ? 'SENDING REQUEST...' : 'SUBMIT BESPOKE COMMISSION'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="reveal">
          <div style={{ position: 'sticky', top: '150px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>The <span className="text-gold">Curation</span></h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {[
                { step: '01', title: 'CONCEPTUALIZATION', desc: 'Share your vision, color palette, and architectural requirements.' },
                { step: '02', title: 'QUOTATION', desc: 'A custom investment proposal is generated for your unique piece.' },
                { step: '03', title: 'CRAFTING', desc: 'Our artisans begin the pouring process with high-grade liquid glass.' },
                { step: '04', title: 'CURATION', desc: 'Your masterpiece is secure-shipped with white-glove delivery service.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '2rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-gold)', opacity: 0.5 }}>{item.step}</span>
                  <div>
                    <h3 style={{ fontSize: '1rem', letterSpacing: '3px', marginBottom: '1rem' }}>{item.title}</h3>
                    <p style={{ color: '#888', lineHeight: 1.8 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
