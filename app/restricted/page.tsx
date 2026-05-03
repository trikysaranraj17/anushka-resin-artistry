export default function Restricted() {
  return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass" style={{ padding: '3rem', borderRadius: '12px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <div style={{ color: 'red', fontSize: '3rem', marginBottom: '1rem' }}>
          &#9888;
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Access <span className="text-gold">Restricted</span></h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>
          You do not have administrative privileges to access this area.
        </p>
        <a href="/" className="btn-gold">Return Home</a>
      </div>
    </div>
  )
}
