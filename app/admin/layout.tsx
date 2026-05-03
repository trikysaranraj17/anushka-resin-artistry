'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="admin-container" style={{ background: 'var(--color-black)', backgroundImage: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.1), transparent 500px)' }}>
      {/* Admin Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '2rem', textAlign: 'center' }}>
          <img src="/logo.png?v=3" alt="Anushka Resin Artistry Logo" style={{ height: '80px', filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.3))' }} />
          <div>
            <h2 className="glow-text" style={{ fontSize: '1.2rem', margin: 0 }}>Anushka Resin</h2>
            <p style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px' }}>Admin</p>
          </div>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <a href="/admin" style={{ padding: '0.8rem', borderRadius: '8px', color: 'var(--color-gold)', fontWeight: 600 }}>Dashboard</a>
          <a href="/admin/products" style={{ padding: '0.8rem', borderRadius: '8px', color: '#ccc' }}>Products</a>
          <a href="/admin/orders" style={{ padding: '0.8rem', borderRadius: '8px', color: '#ccc' }}>Orders</a>
          <a href="/admin/custom-orders" style={{ padding: '0.8rem', borderRadius: '8px', color: '#ccc' }}>Custom</a>
          <a href="/admin/inquiries" style={{ padding: '0.8rem', borderRadius: '8px', color: '#ccc' }}>Inquiries</a>
          <a href="/admin/media" style={{ padding: '0.8rem', borderRadius: '8px', color: '#ccc' }}>Media</a>
        </nav>

        <button onClick={handleSignOut} className="btn-solid-gold" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
          Sign Out
        </button>
      </aside>

      {/* Admin Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
