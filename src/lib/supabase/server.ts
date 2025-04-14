import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  // Create a server's supabase client with newly configured cookie,this is used
  // for Server Components, Route Handlers, and Server Actions.
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // @ts-expect-error Property 'get' does exist on the resolved type
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // @ts-expect-error Property 'set' does exist on the resolved type
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
            // We'll log the error for debugging purposes.
            console.error('Error setting cookie from Server Component/Action:', error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            // @ts-expect-error Property 'set' does exist on the resolved type (used for removal)
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
            // We'll log the error for debugging purposes.
            console.error('Error removing cookie from Server Component/Action:', error)
          }
        },
      },
    }
  )
} 