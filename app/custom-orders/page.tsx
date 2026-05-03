'use client'

import { useState } from 'react'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [isSending, setIsSending] = useState(false)

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
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Commission <span className="text-gold">Custom Art</span></h1>
        <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto' }}>
          Bring your vision to life. Fill out the form below with your requirements, and we will contact you to discuss pricing and design details.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div className="glass" style={{ padding: '3rem', borderRadius: '12px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ color: 'var(--color-gold)', fontSize: '4rem', marginBottom: '1rem' }}>&#10003;</div>
                <h2 style={{ marginBottom: '1rem' }}>Request Received</h2>
                <p>Thank you for your interest! We will contact you shortly via WhatsApp or Email to discuss your custom order.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} style={{ backgroundColor: 'var(--color-gray)', color: 'white' }}>
                    <option value="Resin Tables">Resin Tables (Custom Size)</option>
                    <option value="Name Boards">Name Boards</option>
                    <option value="Preservation Art">Preservation Art</option>
                    <option value="Wall Hangings">Wall Hangings</option>
                    <option value="Other">Other Custom Order</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Primary Color</label>
                    <input type="color" name="primaryColor" value={formData.primaryColor} onChange={handleChange} style={{ padding: '0', height: '50px', cursor: 'pointer' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Secondary Color</label>
                    <input type="color" name="secondaryColor" value={formData.secondaryColor} onChange={handleChange} style={{ padding: '0', height: '50px', cursor: 'pointer' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Dimensions (if applicable)</label>
                  <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="e.g. 4ft x 2ft" style={{ backgroundColor: 'var(--color-gray)', color: 'white' }} />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Special Requests</label>
                  <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} placeholder="Describe the design, shapes, add-ons..." rows={4} style={{ backgroundColor: 'var(--color-gray)', color: 'white' }}></textarea>
                </div>

                <hr style={{ borderColor: 'rgba(212,175,55,0.2)', margin: '2rem 0' }} />

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ backgroundColor: 'var(--color-gray)', color: 'white' }} />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Phone Number (WhatsApp)</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ backgroundColor: 'var(--color-gray)', color: 'white' }} />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ backgroundColor: 'var(--color-gray)', color: 'white' }} />
                </div>

                <button type="submit" className="btn-solid-gold" style={{ width: '100%', opacity: isSending ? 0.7 : 1 }} disabled={isSending}>
                  {isSending ? 'Processing Order...' : 'Submit Custom Request'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <div style={{ position: 'sticky', top: '100px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The <span className="text-gold">Process</span></h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 className="text-gold" style={{ marginBottom: '0.5rem' }}>1. Conceptualization</h3>
                <p style={{ color: '#aaa' }}>Share your vision, color preferences, and dimensions with us. We'll consult with you to refine the design.</p>
              </div>
              <div>
                <h3 className="text-gold" style={{ marginBottom: '0.5rem' }}>2. Quotation</h3>
                <p style={{ color: '#aaa' }}>Once the design is finalized, we will provide a custom quote. A 50% advance is required to begin.</p>
              </div>
              <div>
                <h3 className="text-gold" style={{ marginBottom: '0.5rem' }}>3. Crafting</h3>
                <p style={{ color: '#aaa' }}>We handcraft your piece with premium resin and materials. We'll share progress photos along the way.</p>
              </div>
              <div>
                <h3 className="text-gold" style={{ marginBottom: '0.5rem' }}>4. Delivery</h3>
                <p style={{ color: '#aaa' }}>After final payment via UPI, your masterpiece is securely packaged and shipped to your address.</p>
              </div>
            </div>
            
            <div className="glass" style={{ padding: '1.5rem', marginTop: '3rem', borderRadius: '8px', borderLeft: '4px solid var(--color-gold)' }}>
              <p style={{ fontStyle: 'italic', color: '#ccc' }}>"Every custom piece is a unique expression of art. No two resin pours are exactly identical, guaranteeing you a truly one-of-a-kind masterpiece."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
