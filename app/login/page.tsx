'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function Login() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/admin`
      }
    })
    
    if (error) {
      console.error('Error logging in:', error.message)
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass" style={{ padding: '3rem', borderRadius: '12px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Admin <span className="text-gold">Access</span></h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>
          Restricted to authorized personnel.
        </p>
        
        <button 
          onClick={handleLogin} 
          disabled={loading}
          className="btn-solid-gold" 
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          {loading ? 'Connecting...' : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
              </svg>
              Sign in with Google
            </>
          )}
        </button>
      </div>
    </div>
  )
}
