export default function AdminOrders() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)', letterSpacing: '2px' }}>Orders</h1>
          <p style={{ color: '#aaa' }}>Manage standard product orders and verify payments.</p>
        </div>
      </div>
      
      <div className="glass" style={{ padding: '2rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
                <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Order ID</th>
                <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Customer</th>
                <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Item</th>
                <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--color-gold)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📥</div>
                  <p>No standard orders have been placed yet.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
