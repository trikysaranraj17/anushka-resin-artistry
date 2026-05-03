export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', letterSpacing: '2px' }}>Dashboard Overview</h1>
          <p style={{ color: '#aaa' }}>Welcome back to the command center.</p>
        </div>
        <button className="btn-gold" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Generate Report</button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {/* Stat Cards */}
        {[
          { label: 'Total Products', value: '24', icon: '📦' },
          { label: 'New Orders', value: '5', icon: '🛍️' },
          { label: 'Custom Requests', value: '12', icon: '🎨' },
          { label: 'Total Revenue', value: '₹45,000', icon: '💎' }
        ].map((stat, idx) => (
          <div key={idx} className="glass" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '6rem', opacity: 0.05, filter: 'grayscale(100%)' }}>
              {stat.icon}
            </div>
            <div>
              <h3 style={{ color: '#ccc', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{stat.label}</h3>
              <p className="glow-text" style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        <div className="glass" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '1rem' }}>Recent Orders</h2>
          <div style={{ color: '#888', textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📥</div>
            <p>No recent orders found.</p>
          </div>
        </div>

        <div className="glass" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '1rem' }}>Recent Custom Requests</h2>
          <div style={{ color: '#888', textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>✨</div>
            <p>No new custom requests.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
