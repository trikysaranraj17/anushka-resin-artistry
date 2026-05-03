'use client'

import { useState } from 'react'

// Mock products list for the detail page
const productsList = [
  { id: "1", title: "Ocean Wave Name Board", price: 1500, category: "Name Boards", image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800" },
  { id: "2", title: "Gold Flake Keychain", price: 250, category: "Keychains", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800" },
  { id: "3", title: "Botanical Pendant", price: 450, category: "Pendants", image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800" },
  { id: "4", title: "Geode Wall Art", price: 3500, category: "Wall Hangings", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800" },
  { id: "5", title: "Wedding Varmala Preservation", price: 5000, category: "Preservation", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800" },
  { id: "6", title: "Custom Resin Table", price: 0, category: "Tables", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800" }
]

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [showPayment, setShowPayment] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  
  // Find the product based on ID, fallback to default
  const productData = productsList.find(p => p.id === params.id) || productsList[0]

  const product = {
    ...productData,
    description: "A beautiful handcrafted masterpiece featuring mesmerizing details. Made with premium epoxy resin and extreme attention to detail. Perfect for your home or as a luxury gift.",
    features: ["Hand-poured resin", "UV resistant finish", "Custom text available", "Premium packaging"]
  }

  const handleCheckout = () => setShowPayment(true)
  const handlePaymentProof = (e: React.FormEvent) => { e.preventDefault(); setPaymentConfirmed(true); }

  return (
    <div className="container animate-fade-in" style={{ padding: '6rem 0' }}>
      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        {/* Product Image */}
        <div style={{ flex: '1 1 400px' }}>
          <div className="glass" style={{ width: '100%', height: '600px', background: `url(${product.image}) center/cover`, borderRadius: '16px', boxShadow: '0 0 40px rgba(212,175,55,0.2)' }}></div>
        </div>

        {/* Product Details */}
        <div className="glass" style={{ flex: '1 1 400px', padding: '4rem', display: 'flex', flexDirection: 'column' }}>
          <p className="glow-text" style={{ textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1rem', fontWeight: 600 }}>{product.category}</p>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>{product.title}</h1>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--color-gold)' }}>
            {product.price > 0 ? `₹${product.price.toLocaleString()}` : 'Contact Us for Pricing'}
          </p>
          
          <p style={{ color: '#E0E0E0', marginBottom: '3rem', fontSize: '1.2rem', lineHeight: 1.8 }}>
            {product.description}
          </p>

          <ul style={{ listStyle: 'none', marginBottom: '4rem', color: '#ccc', paddingLeft: '1.5rem', borderLeft: '3px solid var(--color-gold)' }}>
            {product.features.map((feature, idx) => (
              <li key={idx} style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{feature}</li>
            ))}
          </ul>

          {!showPayment && !paymentConfirmed && product.price > 0 && (
            <button onClick={handleCheckout} className="btn-solid-gold" style={{ padding: '1.2rem', fontSize: '1.2rem' }}>
              Buy Now (UPI Only)
            </button>
          )}

          {!showPayment && !paymentConfirmed && product.price === 0 && (
            <a href="/custom-orders" className="btn-solid-gold" style={{ padding: '1.2rem', fontSize: '1.2rem', textAlign: 'center' }}>
              Request Quote
            </a>
          )}

          {/* Payment Flow */}
          {showPayment && !paymentConfirmed && (
            <div style={{ padding: '2rem', border: '1px solid var(--color-gold)', borderRadius: '12px', background: 'rgba(212,175,55,0.05)', animation: 'pulse-glow 3s infinite alternate' }}>
              <h3 className="glow-text" style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Complete Payment</h3>
              <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Total Amount: <strong className="text-gold">₹{product.price.toLocaleString()}</strong></p>
              
              <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '2rem', backgroundColor: 'var(--color-black)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: '200px', height: '200px', background: 'linear-gradient(45deg, #111, #222)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', border: '1px solid var(--color-gold)' }}>
                  SCAN QR CODE
                </div>
                <p style={{ marginTop: '1rem', color: 'var(--color-gold)', fontWeight: 'bold', letterSpacing: '1px' }}>UPI: jayachandran.r0110@okicici</p>
              </div>

              <form onSubmit={handlePaymentProof}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>UPI Reference Number</label>
                  <input type="text" required placeholder="e.g. 123456789012" />
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Upload Screenshot</label>
                  <input type="file" required accept="image/*" />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%' }}>Confirm Payment</button>
              </form>
            </div>
          )}

          {paymentConfirmed && (
            <div style={{ padding: '3rem', textAlign: 'center', border: '2px solid #4CAF50', borderRadius: '12px', background: 'rgba(76,175,80,0.1)' }}>
              <div style={{ color: '#4CAF50', fontSize: '4rem', marginBottom: '1rem', textShadow: '0 0 20px rgba(76,175,80,0.5)' }}>&#10003;</div>
              <h3 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Order Confirmed!</h3>
              <p style={{ color: '#E0E0E0', fontSize: '1.2rem' }}>
                Your payment screenshot has been uploaded. We will begin crafting your resin masterpiece immediately upon verification.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
