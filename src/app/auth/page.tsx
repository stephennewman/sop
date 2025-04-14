'use client'
import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'

export default function AuthPage() {
  const supabase = createClient()
  const router = useRouter()
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  // Prevent rendering the Auth UI if the user is already known
  if (user) {
    return null // Or a loading indicator
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login / Sign Up</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['github']} // Example: Add providers like GitHub, Google, etc.
          redirectTo={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`}
          theme="default" // Use "dark" for dark mode
          socialLayout="horizontal"
          onlyThirdPartyProviders={false} // Set to true to only show social providers
        />
      </div>
    </div>
  )
} 