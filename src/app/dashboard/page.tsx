'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'
import { createClient } from '@/lib/supabase/client' // Client-side client

export default function DashboardPage() {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const isLoading = useUserStore((state) => state.user === undefined) // Check if user state is still loading
  const supabase = createClient()

  useEffect(() => {
    // Redirect to auth page if user is not logged in and loading is finished
    if (!isLoading && !user) {
      router.push('/auth')
    }
  }, [user, isLoading, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/') // Redirect to home page after sign out
  }

  if (isLoading) {
    return <div>Loading...</div> // Show loading state
  }

  if (!user) {
    return null // Avoid rendering if redirecting
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.email}!</p>
      <p>This is a protected page.</p>
      {/* Add dashboard content here */}
      <button
        onClick={handleSignOut}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  )
} 