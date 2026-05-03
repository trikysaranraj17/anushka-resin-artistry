'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '🛍️' },
    { name: 'Media', path: '/admin/media', icon: '📂' },
    { name: 'Inquiries', path: '/admin/inquiries', icon: '✉️' },
    { name: 'Custom', path: '/admin/custom-orders', icon: '🎨' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a', color: 'white', fontFamily: 'var(--font-sans)' }}>
      {/* Premium Admin Header */}
      <header style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/logo.png?v=3" alt="Logo" style={{ width: '80%' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700, color: '#D4AF37' }}>Anushka Resin</h1>
            <p style={{ fontSize: '0.7rem', margin: 0, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Panel</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.9rem' }}>Logout</button>
          <div style={{ fontSize: '1.5rem', cursor: 'pointer' }}>🌙</div>
          <div style={{ fontSize: '1.5rem', cursor: 'pointer' }}>☰</div>
        </div>
      </header>

      {/* Icon Navigation Bar */}
      <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        {navItems.map((item) => (
          <a 
            key={item.path}
            href={item.path}
            style={{
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: pathname === item.path ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              border: pathname === item.path ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.05)',
              fontSize: '1.5rem',
              transition: 'all 0.3s',
              boxShadow: pathname === item.path ? '0 0 15px rgba(212,175,55,0.2)' : 'none'
            }}
            title={item.name}
          >
            {item.icon}
          </a>
        ))}
        <button 
          onClick={handleSignOut}
          style={{
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.05)',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
          title="Logout"
        >
          🚪
        </button>
      </div>

      {/* Content Area */}
      <main style={{ padding: '1rem', maxWidth: '100%', margin: '0 auto', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
