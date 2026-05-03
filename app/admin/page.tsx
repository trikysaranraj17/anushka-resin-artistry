export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Card */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(20,28,50,1) 0%, rgba(10,14,26,1) 100%)',
        borderRadius: '24px',
        padding: '4rem 2rem',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Dashboard</h2>
        <p style={{ color: '#8892b0', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Overview of your luxury resin artistry empire</p>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(76,175,80,0.1)', padding: '0.5rem 1.5rem', borderRadius: '30px', border: '1px solid #4CAF50' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4CAF50', boxShadow: '0 0 10px #4CAF50' }}></div>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#4CAF50', letterSpacing: '1px' }}>LIVE</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {[
          { label: 'TOTAL PRODUCTS', value: '24', icon: '🛍️' },
          { label: 'TOTAL MEDIA', value: '28', icon: '📂' },
          { label: 'NEW INQUIRIES', value: '05', icon: '✉️' }
        ].map((stat, idx) => (
          <div key={idx} style={{ 
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <div style={{ fontSize: '2.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#D4AF37' }}>{stat.value}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '2px', color: '#8892b0' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity placeholder */}
      <div style={{ 
        background: 'rgba(255,255,255,0.01)',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid rgba(255,255,255,0.03)',
        textAlign: 'center',
        color: '#666'
      }}>
        System fully synchronized with Supabase cloud.
      </div>
    </div>
  )
}
