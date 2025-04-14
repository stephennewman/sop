'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client' // Client-side client
import { useUserStore } from '@/stores/userStore'
import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ['latin'], variable: "--font-sans" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const setUser = useUserStore((state) => state.setUser)
  const supabase = createClient()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event, 'Session:', session)
        setUser(session?.user ?? null)
      }
    )

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session)
      setUser(session?.user ?? null)
    });

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [supabase, setUser])

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}

// Note: We are not exporting metadata here because it's handled client-side
// If you need static metadata, you would export it separately.
