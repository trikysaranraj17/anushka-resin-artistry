export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-gray)', padding: '4rem 0 2rem 0', marginTop: '4rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h3 className="text-gold">Anushka Resin Artistry</h3>
            <p>Crafted & Managed by Mr. Karthik</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
            <p>Phone: 98407 06312</p>
            <p>Email: jayachandran.r0110@gmail.com</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/">Home</a>
              <a href="/products">Shop Collection</a>
              <a href="/custom-orders">Custom Orders</a>
              <a href="/admin">Admin Portal</a>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Anushka Resin Artistry. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
