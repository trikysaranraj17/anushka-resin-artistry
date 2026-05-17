import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vurkruawfkyzyujdqxzm.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_v_jxY0zAqyQmmsKkdLfdGw_9TGj9ahh'
  )
}
