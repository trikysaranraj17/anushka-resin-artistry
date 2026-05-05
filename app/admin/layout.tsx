'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

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
    { name: 'Site Editor', path: '/admin/settings', icon: '⚙️' },
    { name: 'Products', path: '/admin/products', icon: '🛍️' },
    { name: 'Media Gallery', path: '/admin/media', icon: '📂' },
    { name: 'Customer Inquiries', path: '/admin/inquiries', icon: '✉️' },
    { name: 'Customization Requests', path: '/admin/custom-orders', icon: '🎨' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: 'white', fontFamily: 'var(--font-sans)' }}>
      {/* Premium Admin Header */}
      <header style={{ padding: '1.5rem 3rem', borderBottom: '1px solid rgba(212, 175, 55, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2px' }}>
            <div style={{ background: '#000', width: '100%', height: '100%', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/logo.png?v=3" alt="Logo" style={{ width: '70%' }} />
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 800, letterSpacing: '2px' }} className="text-gold">ANUSHKA ADMIN</h1>
            <p style={{ fontSize: '0.65rem', margin: 0, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px' }}>Luxury Management Suite</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button onClick={handleSignOut} className="btn-gold" style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem' }}>Log Out</button>
        </div>
      </header>

      {/* Modern Icon Navigation Bar */}
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', background: '#080808', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        {navItems.map((item) => (
          <Link 
            key={item.path}
            href={item.path}
            style={{
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: pathname === item.path ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: pathname === item.path ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.08)',
              fontSize: '1.6rem',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: pathname === item.path ? '0 0 20px rgba(212,175,55,0.2)' : 'none',
              cursor: 'pointer'
            }}
            title={item.name}
          >
            {item.icon}
          </Link>
        ))}
      </div>

      {/* Content Area */}
      <main style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto', minHeight: '60vh' }}>
        <div style={{ width: '100%', animation: 'fadeInUp 0.8s ease forwards' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
