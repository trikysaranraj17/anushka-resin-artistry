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
    { name: 'Dashboard', path: '/admin' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Custom', path: '/admin/custom-orders' },
    { name: 'Inquiries', path: '/admin/inquiries' },
    { name: 'Media', path: '/admin/media' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-black)', color: 'white' }}>
      {/* Top Professional Admin Bar */}
      <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '1rem 2rem', borderBottom: '1px solid var(--glass-border)', margin: '0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/logo.png?v=3" alt="Logo" style={{ height: '40px' }} />
            <div>
              <h2 className="glow-text" style={{ fontSize: '1.2rem', margin: 0 }}>Anushka Admin</h2>
            </div>
          </div>

          <nav style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }} className="admin-top-nav">
            {navItems.map((item) => (
              <a 
                key={item.path}
                href={item.path} 
                style={{ 
                  padding: '0.6rem 1.2rem', 
                  borderRadius: '30px', 
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  background: pathname === item.path ? 'var(--color-gold)' : 'transparent',
                  color: pathname === item.path ? 'var(--color-black)' : '#ccc',
                  fontWeight: pathname === item.path ? 700 : 400,
                  transition: 'all 0.3s'
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <button onClick={handleSignOut} className="btn-gold" style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="container" style={{ padding: '3rem 1rem' }}>
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      <style jsx>{`
        .admin-top-nav::-webkit-scrollbar {
          height: 4px;
        }
        .admin-top-nav::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}
