'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchInquiries() {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setInquiries(data)
      setLoading(false)
    }
    fetchInquiries()
  }, [])

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Customer Inquiries</h1>
        <p style={{ color: '#aaa' }}>Manage messages sent through the contact form.</p>
      </div>

      <div className="glass" style={{ padding: '2rem' }}>
        {loading ? (
          <p>Loading inquiries...</p>
        ) : inquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>✉️</div>
            <p>No inquiries found yet.</p>
          </div>
        ) : (
          <div className="table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
                  <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Date</th>
                  <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Name</th>
                  <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Email</th>
                  <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Message</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#888' }}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{item.name}</td>
                    <td style={{ padding: '1rem', color: '#aaa' }}>{item.email}</td>
                    <td style={{ padding: '1rem' }}>{item.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
