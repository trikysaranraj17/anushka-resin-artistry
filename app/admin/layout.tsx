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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-black)', backgroundImage: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.1), transparent 500px)' }}>
      {/* Admin Sidebar */}
      <aside style={{ width: '280px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', borderRight: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(16px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '2rem', textAlign: 'center' }}>
          <img src="/logo.png?v=3" alt="Anushka Resin Artistry Logo" style={{ height: '80px', filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.3))' }} />
          <div>
            <h2 className="glow-text" style={{ fontSize: '1.4rem', margin: 0, fontFamily: 'var(--font-serif)' }}>Anushka Resin Artistry</h2>
            <p style={{ fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.5rem' }}>Admin Portal</p>
          </div>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <a href="/admin" className="glass" style={{ padding: '1rem', borderRadius: '8px', color: 'var(--color-gold)', fontWeight: 600 }}>Dashboard</a>
          <a href="/admin/products" style={{ padding: '1rem', borderRadius: '8px', color: '#ccc', transition: 'all 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>Products Management</a>
          <a href="/admin/orders" style={{ padding: '1rem', borderRadius: '8px', color: '#ccc', transition: 'all 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>Orders</a>
          <a href="/admin/custom-orders" style={{ padding: '1rem', borderRadius: '8px', color: '#ccc', transition: 'all 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>Custom Requests</a>
          <a href="/admin/inquiries" style={{ padding: '1rem', borderRadius: '8px', color: '#ccc', transition: 'all 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>Inquiries</a>
          <a href="/admin/media" style={{ padding: '1rem', borderRadius: '8px', color: '#ccc', transition: 'all 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>Media Center</a>
        </nav>

        <button onClick={handleSignOut} className="btn-solid-gold" style={{ width: '100%' }}>
          Sign Out
        </button>
      </aside>

      {/* Admin Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
